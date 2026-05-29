'use client';

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/navigation';
import { validateOutput, ValidationResult } from '@/lib/prompts';

interface KeywordMap {
  [key: string]: string[];
}

const RECOMMENDED_KEYWORDS: KeywordMap = {
  '소화기·내시경 클리닉': [
    '검단 위내시경', '검단 대장내시경', '인천 서구 수면내시경',
    '검단 소화기내과', '검단 용종절제술', 'CO2 대장내시경',
    '역류성식도염 검단', '헬리코박터 검사 인천 서구', '위염 검단'
  ],
  '건강검진센터': [
    '검단 국가건강검진', '검단 6대암 검진', '인천 서구 종합검진',
    '검단 채용검진', '검단 공단검진', '위암검진 대상 연령', '대장암검진 주기'
  ],
  '영상·검사 클리닉': [
    '검단 복부초음파', '검단 갑상선초음파', '검단 심장초음파',
    '검단 24시간 홀터검사', '검단 CT 검사', '검단 유방촬영', '지방간 검사 인천 서구'
  ],
  '수액 클리닉(IVNT)': [
    '검단 수액 클리닉', '검단 영양수액', '인천 서구 수액'
  ],
  '만성질환·일반내과': [
    '검단 당뇨 내과', '검단 고혈압 관리', '고지혈증 검단',
    '대사증후군 검단 내과', '검단 예방접종', '검단 독감 예방접종'
  ]
};

const RECOMMENDED_TOPICS: KeywordMap = {
  '소화기·내시경 클리닉': [
    '위내시경 검사 전 물 마셔도 되나요? 금식 가이드',
    '대장내시경 용종절제술 당일 시술 가능 여부와 식사 관리',
    '역류성식도염 가슴 통증 증상과 내과 내시경 검사 필요성',
    '헬리코박터균 검사 주기와 제균 치료 부작용 예방'
  ],
  '건강검진센터': [
    '국가건강검진 항목 대상자 조회 및 올해 검사 주기',
    '6대암 건강검진 위암 대장암 유방암 대상 연령과 검사항목',
    '공단검진 전 금식 시간과 전날 술 섭취 시 영향'
  ],
  '영상·검사 클리닉': [
    '오른쪽 옆구리 통증 원인 진단을 위한 복부 초음파 검사',
    '가슴 두근거림 심장 부정맥 확인을 위한 24시간 홀터 검사',
    '유방암 유방촬영 통증 줄이는 팁과 치밀유방 정밀 검사'
  ],
  '수액 클리닉(IVNT)': [
    '만성 피로 회복을 위한 내과 영양 수액 종류와 성분',
    '탈수 증상 해결을 위한 아미노산 수분 보충 수액 주의사항'
  ],
  '만성질환·일반내과': [
    '고혈압 공복 수치 측정법과 약물 치료 시 주의할 부작용',
    '당뇨병 초기 증상 3가지와 공복 혈당 관리 식이요법',
    '독감 예방접종 시기와 감기 독감 차이점 및 내과 예방 접종'
  ]
};

const CLUSTER_OPTIONS = [
  '소화기·내시경 클리닉',
  '건강검진센터',
  '영상·검사 클리닉',
  '수액 클리닉(IVNT)',
  '만성질환·일반내과'
];

export default function AdminPage() {
  const router = useRouter();

  // 입력 필드 상태
  const [cluster, setCluster] = useState('소화기·내시경 클리닉');
  const [targetKeyword, setTargetKeyword] = useState('');
  const [topic, setTopic] = useState('');
  const [extraContext, setExtraContext] = useState('');

  // 생성 프로세스 상태
  const [generating, setGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  
  // 생성 결과 상태
  const [generatedRaw, setGeneratedRaw] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [postSlug, setPostSlug] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');
  
  // 편집 탭
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  
  // 검사 결과 실시간 상태
  const [validation, setValidation] = useState<ValidationResult | null>(null);

  // 클러스터 변경 시 추천 키워드 및 주제 초기화 연동
  useEffect(() => {
    const keywords = RECOMMENDED_KEYWORDS[cluster];
    const topics = RECOMMENDED_TOPICS[cluster];
    if (keywords && keywords.length > 0) setTargetKeyword(keywords[0]);
    if (topics && topics.length > 0) setTopic(topics[0]);
  }, [cluster]);

  // 사용자가 편집기 텍스트를 고칠 때마다 실시간으로 검증 결과 업데이트
  useEffect(() => {
    if (editedContent) {
      const result = validateOutput(editedContent);
      setValidation(result);
    } else {
      setValidation(null);
    }
  }, [editedContent]);

  // 글 생성 API 호출
  const handleGenerate = async () => {
    setGenerating(true);
    setGenerationStep('Gemini API를 호출하여 프롬프트 설계 중...');
    
    try {
      const steps = [
        '의학 가이드북을 분석하여 초고 개요를 집필하는 중...',
        '의료광고법 제56조 금지어 필터 점검 실시 중...',
        'GEO 핵심 엔티티 및 NAP 정보 정렬 중...',
        'SEO 메타데이터 및 FAQPage 구조화 데이터 빌드 중...'
      ];

      let stepIdx = 0;
      const interval = setInterval(() => {
        if (stepIdx < steps.length) {
          setGenerationStep(steps[stepIdx]);
          stepIdx++;
        }
      }, 2000);

      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, targetKeyword, cluster, extraContext }),
      });

      clearInterval(interval);

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || '글 생성 실패');
      }

      const data = await res.json();
      
      // 상태 업데이트
      setGeneratedRaw(data.content);
      setEditedContent(data.content);
      setPostSlug(data.metadata.slug);
      setPostTitle(data.metadata.title);
      setPostDescription(data.metadata.description);
      
    } catch (error: any) {
      alert(`에러 발생: ${error.message}`);
    } finally {
      setGenerating(false);
      setGenerationStep('');
    }
  };

  // 포스트 최종 저장 및 발행 API 호출
  const handleSave = async () => {
    if (!postSlug) {
      alert('생성된 슬러그가 없어 저장할 수 없습니다.');
      return;
    }

    try {
      // gray-matter 형식을 맞추기 위해 상단에 프론트매터 블록 구성
      const today = new Date().toISOString().split('T')[0];
      const frontmatter = `---
title: "${postTitle}"
date: "${today}"
description: "${postDescription}"
tags: ["${cluster}", "${targetKeyword}"]
author: "위바른내과의원"
coverImage: ""
published: "${today}"
modified: "${today}"
targetKeyword: "${targetKeyword}"
cluster: "${cluster}"
seoTitle: "${postTitle}"
metaDescription: "${postDescription}"
---

${editedContent}
`;

      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: postSlug,
          rawContent: frontmatter,
        }),
      });

      if (!res.ok) {
        throw new Error('포스트 저장 실패');
      }

      alert('🎉 글이 성공적으로 발행되었습니다! 홈 화면으로 이동합니다.');
      router.push('/');
      router.refresh();
    } catch (e: any) {
      alert(`저장 중 오류 발생: ${e.message}`);
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <div>
          <h1 className="admin-title">AI 의학 건강정보 글 작성기</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            위바른내과의원 의료법 제56조 및 Google SEO 지침에 최적화된 콘텐츠를 자동 생성하고 검증합니다.
          </p>
        </div>
      </header>

      <div className="admin-workspace">
        {/* 왼쪽: 설정 영역 */}
        <div className="admin-panel">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
            생성 세부 설정
          </h3>

          <div className="form-group">
            <label className="form-label">의학 정보 카테고리 (클러스터)</label>
            <select
              className="form-select"
              value={cluster}
              onChange={(e) => setCluster(e.target.value)}
            >
              {CLUSTER_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">타겟 키워드 (SEO 분산)</label>
            <input
              type="text"
              className="form-input"
              value={targetKeyword}
              onChange={(e) => setTargetKeyword(e.target.value)}
              placeholder="예: 검단 대장내시경"
            />
            {/* 추천 키워드 칩 */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
              {RECOMMENDED_KEYWORDS[cluster]?.map((k) => (
                <span
                  key={k}
                  style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: '6px', cursor: 'pointer' }}
                  onClick={() => setTargetKeyword(k)}
                >
                  {k}
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">포스팅 주제 (Topic)</label>
            <input
              type="text"
              className="form-input"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="포스팅하고 싶은 주제를 적으세요"
            />
            {/* 추천 주제 칩 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.4rem' }}>
              {RECOMMENDED_TOPICS[cluster]?.map((t) => (
                <span
                  key={t}
                  style={{ fontSize: '0.75rem', padding: '0.3rem 0.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', borderRadius: '6px', cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  onClick={() => setTopic(t)}
                  title={t}
                >
                  💡 {t}
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">추가 반영 팩트 (컨텍스트 - 선택사항)</label>
            <textarea
              className="form-textarea"
              rows={3}
              value={extraContext}
              onChange={(e) => setExtraContext(e.target.value)}
              placeholder="예: CO2 송기 내시경 기기 가동 사실 반영, 고해상도 내시경 장비 강조 등 본원 사실 기술"
            />
          </div>

          <button
            className="btn-generate"
            onClick={handleGenerate}
            disabled={generating || !topic || !targetKeyword}
          >
            {generating ? '초고 빌딩 중...' : '건강정보 글 자동생성 시작 🤖'}
          </button>

          {/* 실시간 프롬프트 하네스 검증 결과 패널 */}
          {validation && (
            <div className="validation-card">
              <div className="validation-header">
                <span className="validation-title">하네스 검증 결과</span>
                <span className={`validation-badge ${validation.passed ? 'pass' : 'fail'}`}>
                  {validation.passed ? '통과' : '경고 발견'}
                </span>
              </div>
              <ul className="validation-list">
                <li className={`validation-item ${validation.brandCount >= 2 ? '' : 'error'}`}>
                  <span className="validation-icon">{validation.brandCount >= 2 ? '✅' : '❌'}</span>
                  <span>브랜드명("위바른내과") 노출: {validation.brandCount}회 (2회 이상 권장)</span>
                </li>
                <li className={`validation-item ${validation.charCount >= 1800 && validation.charCount <= 2800 ? '' : 'error'}`}>
                  <span className="validation-icon">{validation.charCount >= 1800 && validation.charCount <= 2800 ? '✅' : '❌'}</span>
                  <span>글자 수(공백 제외): {validation.charCount}자 (1800~2500자 준수)</span>
                </li>
                {validation.issues.map((issue, idx) => (
                  <li key={idx} className="validation-item error">
                    <span className="validation-icon">⚠️</span>
                    <span>{issue}</span>
                  </li>
                ))}
                {validation.passed && (
                  <li className="validation-item" style={{ color: 'var(--primary)' }}>
                    <span className="validation-icon">✨</span>
                    <span>의료법 준수 및 구글 검색/생성형검색 상위노출 요건 충족!</span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* 오른쪽: 결과 뷰어 및 에디터 */}
        <div className="editor-panel">
          <div className="editor-tabs">
            <div className="editor-tab-group">
              <button
                className={`editor-tab ${activeTab === 'editor' ? 'active' : ''}`}
                onClick={() => setActiveTab('editor')}
              >
                마크다운 편집기
              </button>
              <button
                className={`editor-tab ${activeTab === 'preview' ? 'active' : ''}`}
                onClick={() => setActiveTab('preview')}
              >
                미리보기
              </button>
            </div>

            {editedContent && (
              <div className="editor-actions">
                <button className="btn-save" onClick={handleSave}>
                  블로그 글 저장 및 발행 🚀
                </button>
              </div>
            )}
          </div>

          <div className="editor-content-area">
            {generating ? (
              <div className="loading-container">
                <div className="loader-spinner"></div>
                <p style={{ fontWeight: 600 }}>{generationStep}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  평균 10초 ~ 20초 정도 소요될 수 있습니다.
                </p>
              </div>
            ) : editedContent ? (
              activeTab === 'editor' ? (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '1rem' }}>
                  {/* 슬러그 및 세부 메타 정보 수정 */}
                  <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '0.75rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                    <label className="form-label" style={{ alignSelf: 'center' }}>URL 영문 슬러그</label>
                    <input
                      type="text"
                      className="form-input"
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                      value={postSlug}
                      onChange={(e) => setPostSlug(e.target.value)}
                    />
                    
                    <label className="form-label" style={{ alignSelf: 'center' }}>대표 H1 (글 제목)</label>
                    <input
                      type="text"
                      className="form-input"
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                    />

                    <label className="form-label" style={{ alignSelf: 'center' }}>검색 메타 설명문</label>
                    <input
                      type="text"
                      className="form-input"
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                      value={postDescription}
                      onChange={(e) => setPostDescription(e.target.value)}
                    />
                  </div>
                  
                  {/* 편집용 원문 텍스트 영역 */}
                  <textarea
                    className="editor-textarea"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    placeholder="생성된 포스팅 내용을 편집하여 하네스 경고 사항을 해결해 보세요..."
                  />
                </div>
              ) : (
                <div className="editor-preview markdown-body">
                  <ReactMarkdown>{editedContent}</ReactMarkdown>
                </div>
              )
            ) : (
              <div className="loading-container" style={{ color: 'var(--text-muted)' }}>
                <span style={{ fontSize: '3rem', marginBottom: '1rem' }}>✍️</span>
                <p>설정을 채우고 자동생성 버튼을 누르면 이 영역에 건강정보 본문이 렌더링됩니다.</p>
                <p style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>
                  생성된 글은 에디터로 미세한 자구 수정이 가능합니다.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
