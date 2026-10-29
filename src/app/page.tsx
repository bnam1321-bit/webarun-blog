import React from 'react';
import { getAllPosts } from '@/lib/blog';
import BlogListClient, { PostSummary } from '@/components/BlogListClient';

export default function HomePage() {
  const allPosts = getAllPosts();

  const postSummaries: PostSummary[] = allPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    description: post.description,
    tags: post.tags,
    coverImage: post.coverImage,
    cluster: post.cluster,
    targetKeyword: post.targetKeyword,
  }));

  // 검색엔진 및 AI 봇(ChatGPT, Gemini 등)이 메인 페이지에서 전체 글 목록을 즉시 파악할 수 있도록 CollectionPage + ItemList 구조화 데이터 제공
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '위바른내과의원 건강 칼럼 | 인천 서구 검단 소화기내과·건강검진센터',
    description:
      '인천 서구 검단신도시 아라동 위바른내과의원 소화기내과 전문의가 전하는 위·대장 내시경, 용종절제술, 국가건강검진, 초음파·CT 검사 및 만성질환 진료 안내 칼럼입니다.',
    url: 'https://webarunim.co.kr',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: postSummaries.length,
      itemListElement: postSummaries.map((p, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://webarunim.co.kr/blog/${p.slug}`,
        name: p.title,
        description: p.description,
      })),
    },
  };

  return (
    <div style={{ paddingBottom: '5rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      {/* 1. 상단 소개 영역 - 자연스럽고 신뢰감 있는 원내 인사말 */}
      <section className="hero-section">
        <p className="hero-subtitle">위바른내과의원 건강 칼럼</p>
        <h1 className="hero-title">
          진료실에서 미처 다 못 드린 이야기,
          <br />
          알기 쉽게 정리했습니다
        </h1>
        <p className="hero-description">
          인천 서구 검단(아라동) 위바른내과의원입니다. 위·대장 내시경 준비 과정부터 국가건강검진 항목, 만성질환 관리까지 환자분들이 진료실에서 자주 물어보시는 내용을 소화기내과 전문의가 차근차근 설명해 드립니다.
        </p>
      </section>

      {/* 2. 진료 시간 및 오시는 길 안내 배너 */}
      <section className="clinic-ticker-banner" aria-label="위바른내과의원 기본 진료 정보">
        <div className="ticker-card">
          <div className="ticker-item">
            <span className="ticker-icon" aria-hidden="true">📍</span>
            <div>
              <span className="ticker-label">오시는 길</span>
              <span className="ticker-val">인천 서구 이음대로 378 로뎀타워 5층 (아라동)</span>
            </div>
          </div>
          <div className="ticker-item">
            <span className="ticker-icon" aria-hidden="true">📞</span>
            <div>
              <span className="ticker-label">예약·상담 문의</span>
              <span className="ticker-val">032-561-5570</span>
            </div>
          </div>
          <div className="ticker-item">
            <span className="ticker-icon" aria-hidden="true">⏰</span>
            <div>
              <span className="ticker-label">진료 시간</span>
              <span className="ticker-val">평일 08:30~18:30 · 토요일 08:30~13:00 (토요일 점심시간 없음)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 진료 분야 필터 및 전체 칼럼 리스트 (SSR 적용) */}
      <BlogListClient initialPosts={postSummaries} />
    </div>
  );
}
