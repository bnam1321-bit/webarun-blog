import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildUserPrompt, SYSTEM_PROMPT } from '@/lib/prompts';
import { getNextTopic } from '@/lib/topics';

export async function GET(request: Request) {
  try {
    // 1. Vercel Cron 보안 검증
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    // 로컬 환경(development)이 아니고 CRON_SECRET이 정의되어 있을 때만 검증을 강제
    if (process.env.NODE_ENV === 'production' && cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return new Response('Unauthorized', { status: 401 });
    }

    // 2. 환경 변수 추출
    const githubToken = process.env.GITHUB_TOKEN;
    const googleApiKey = process.env.GOOGLE_API_KEY;

    if (!githubToken) {
      return NextResponse.json({ error: 'GITHUB_TOKEN 환경 변수가 누락되었습니다.' }, { status: 500 });
    }
    if (!googleApiKey) {
      return NextResponse.json({ error: 'GOOGLE_API_KEY 환경 변수가 누락되었습니다.' }, { status: 500 });
    }

    const owner = process.env.GITHUB_OWNER || 'bnam1321-bit';
    const repo = process.env.GITHUB_REPO || 'webarun-blog';

    // 3. GitHub API로 기존 posts 개수 확인
    let postCount = 0;
    const listUrl = `https://api.github.com/repos/${owner}/${repo}/contents/content/posts`;
    
    const listRes = await fetch(listUrl, {
      method: 'GET',
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'webarun-blog-scheduler'
      },
      next: { revalidate: 0 } // 캐시 방지
    });

    if (listRes.ok) {
      const files = await listRes.json();
      if (Array.isArray(files)) {
        const mdFiles = files.filter(f => f.name.endsWith('.md') && f.type === 'file');
        postCount = mdFiles.length;
      }
    } else if (listRes.status !== 404) {
      // 404가 아닌 다른 에러가 난 경우 (예: 권한 실패 등)
      const errText = await listRes.text();
      return NextResponse.json({ 
        error: `GitHub 글 목록 조회 실패 (상태: ${listRes.status})`, 
        details: errText 
      }, { status: 500 });
    }

    // 4. 순환 주제 선정
    const activeTopic = getNextTopic(postCount);
    const { cluster, targetKeyword, topic } = activeTopic;

    // 5. Gemini API를 활용한 건강정보 본문 자동생성
    const genAI = new GoogleGenerativeAI(googleApiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 12000,
      },
    });

    const userPrompt = buildUserPrompt({ topic, targetKeyword, cluster, extraContext: '' });
    const fullPrompt = `${SYSTEM_PROMPT}\n\n${userPrompt}`;

    const genResult = await model.generateContent(fullPrompt);
    const content = genResult.response.text();

    // 5-1. 검증 — 불완전 포스트 필터링
    const { validateOutput } = await import('@/lib/prompts');
    const validation = validateOutput(content);
    if (!validation.passed) {
      console.warn('[Auto-Post] 검증 불통과, 저장하지 않고 종료합니다. 이슈:', validation.issues);
      return NextResponse.json({
        success: false,
        message: '검증 불통과로 포스트를 저장하지 않았습니다.',
        issues: validation.issues,
      });
    }

    // 6. 메타데이터 파싱 (slug, h1, meta_description)
    let slug = '';
    const slugMatch = content.match(/slug\s*:\s*([^\n\r]+)/i);
    if (slugMatch) {
      slug = slugMatch[1].trim().replace(/['"]/g, '');
    } else {
      slug = Math.random().toString(36).substring(7);
    }
    // 슬러그 공백/특수문자 정돈
    slug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

    let h1 = topic;
    const h1Match = content.match(/h1\s*:\s*([^\n\r]+)/i);
    if (h1Match) {
      h1 = h1Match[1].trim().replace(/['"]/g, '');
    }

    let description = '';
    const descMatch = content.match(/meta_description\s*:\s*([^\n\r]+)/i);
    if (descMatch) {
      description = descMatch[1].trim().replace(/['"]/g, '');
    }

    // 7. frontmatter 조립
    const today = new Date().toISOString().split('T')[0];
    const frontmatter = `---
title: "${h1}"
date: "${today}"
description: "${description}"
tags: ["${cluster}", "${targetKeyword}"]
author: "위바른내과의원"
coverImage: ""
published: "${today}"
modified: "${today}"
targetKeyword: "${targetKeyword}"
cluster: "${cluster}"
seoTitle: "${h1}"
metaDescription: "${description}"
---

${content}
`;

    // 8. GitHub API를 통해 신규 파일 커밋 & 푸시
    const commitFilename = `${today}-${slug}.md`;
    const uploadUrl = `https://api.github.com/repos/${owner}/${repo}/contents/content/posts/${commitFilename}`;
    const base64Content = Buffer.from(frontmatter, 'utf-8').toString('base64');

    const uploadRes = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'webarun-blog-scheduler'
      },
      body: JSON.stringify({
        message: `chore: [Auto-Post] ${h1}`,
        content: base64Content,
        branch: 'main'
      })
    });

    if (!uploadRes.ok) {
      const uploadErr = await uploadRes.text();
      return NextResponse.json({ 
        error: `GitHub 글 업로드 실패 (상태: ${uploadRes.status})`, 
        details: uploadErr 
      }, { status: 500 });
    }

    const uploadData = await uploadRes.json();

    return NextResponse.json({
      success: true,
      message: `🎉 월수금 자동 포스팅 발행 성공! (${commitFilename})`,
      topic: h1,
      cluster,
      targetKeyword,
      commitSha: uploadData.commit?.sha
    });

  } catch (error: any) {
    console.error('Cron Auto Post Error:', error);
    return NextResponse.json({ 
      error: '자동 포스팅 실행 중 예상치 못한 치명적인 오류가 발생했습니다.',
      details: error.message 
    }, { status: 500 });
  }
}
