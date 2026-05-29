import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildUserPrompt, SYSTEM_PROMPT, validateOutput } from '@/lib/prompts';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { topic, targetKeyword, cluster, extraContext = '' } = body;

    if (!topic || !targetKeyword || !cluster) {
      return NextResponse.json(
        { error: '주제, 타겟 키워드, 소속 클러스터는 필수 입력 항목입니다.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: '서버에 GOOGLE_API_KEY가 설정되어 있지 않습니다.' },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8000,
      },
    });

    const userPrompt = buildUserPrompt({ topic, targetKeyword, cluster, extraContext });
    const fullPrompt = `${SYSTEM_PROMPT}\n\n${userPrompt}`;

    const result = await model.generateContent(fullPrompt);
    const content = result.response.text();

    // 프롬프트 하네스 검증 실행
    const validation = validateOutput(content);

    // META 블록 파싱 시도
    let slug = '';
    const slugMatch = content.match(/slug\s*:\s*([^\n\r]+)/i);
    if (slugMatch) {
      slug = slugMatch[1].trim().replace(/['"]/g, '');
    } else {
      slug = Math.random().toString(36).substring(7);
    }

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

    return NextResponse.json({
      content,
      validation,
      metadata: {
        slug,
        title: h1,
        description,
        cluster,
        targetKeyword,
        date: new Date().toISOString().split('T')[0],
      },
    });
  } catch (error: any) {
    console.error('API Generation Error:', error);
    return NextResponse.json(
      { error: error.message || '글 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
