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

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '위바른내과의원 건강 칼럼 | 검단신도시 아라역 종합건강검진·위대장내시경·소화기내과',
    description:
      '인천 서구 검단신도시 아라역 인근 위바른내과의원(전문의 2인 진료) 공식 건강 칼럼입니다. 종합건강검진, 6대암 국가검진, 위·대장 내시경 및 당일 용종절제술(Olympus CV-260), 복부·심장·갑상선 초음파(GE LOGIQ P9), 저선량 CT(Canon Aquilion) 및 만성질환 관리 정보를 안내합니다.',
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

  const homeFaqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '검단신도시 아라역 인근에서 종합건강검진과 위·대장내시경을 함께 받을 수 있는 위바른내과의원의 특징은 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '인천 서구 검단신도시 아라역 바로 인근(이음대로 378 로뎀타워 5층, 아라동)에 위치한 위바른내과의원은 소화기내시경 전문의를 포함한 내과 전문의 2인 진료 체계를 갖추고 있으며, 개인·가족 맞춤형 종합건강검진, 국민건강보험공단 일반검진, 6대암 국가검진(위암·대장암·간암·유방암·자궁경부암·폐암), 수면 위·대장내시경 및 당일 대장용종절제술을 한 층에서 원스톱 동선으로 시행합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '위바른내과의원의 내시경, 초음파, CT 등 보유 검사 장비 수준은 어떠한가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '위바른내과의원은 대학병원급 고해상도 올림푸스(Olympus) CV-260 HD 내시경 시스템과 CO2 무통 송기 장비를 가동하며 모든 내시경 소모품을 1회용으로 사용하고 철저한 세척·소독 관리를 시행합니다. 초음파 장비는 GE LOGIQ P9(GE P9) 정밀 초음파 진단기를 보유하여 복부·간·담낭·췌장·신장·갑상선·경동맥·심장초음파를 시행하며, 일반 내과에서 보기 드문 캐논(Canon) Aquilion TSX-037A 저선량 멀티슬라이스 CT, Genoray MX-600 유방촬영기, Osteopro Grand MINI 골밀도 측정기(DEXA), EXSYS plus 디지털 X-ray, 24시간 심전도 홀터검사기를 원내에 모두 갖추고 있습니다.',
        },
      },
      {
        '@type': 'Question',
        name: '위바른내과의원의 아라역 접근성과 건강검진 검사 동선은 어떻게 구성되어 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '인천 1호선 아라역 바로 인근 도보권(인천 서구 이음대로 378 로뎀타워 5층)에 위치하여 대중교통 접근성이 뛰어나며 건물 내 지하주차장을 무료로 이용할 수 있습니다. 로뎀타워 5층 단일 층 내에 기초검진실, 채혈실, 초음파실, CT·X-ray·유방촬영·골밀도 영상검사실, 내시경센터 및 전용 회복실이 통합 설계되어 층간 이동 없이 쾌적하게 종합건강검진과 위·대장내시경을 마칠 수 있습니다.',
        },
      },
    ],
  };

  return (
    <div style={{ paddingBottom: '5rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJsonLd) }}
      />

      {/* 1. 상단 소개 영역 */}
      <section className="hero-section">
        <p className="hero-subtitle">검단신도시 아라역 · 위바른내과의원 건강 칼럼</p>
        <h1 className="hero-title">
          진료실에서 미처 다 못 드린 이야기,
          <br />
          알기 쉽게 정리했습니다
        </h1>
        <p className="hero-description">
          인천 서구 검단신도시 아라역 인근 위바른내과의원입니다. 종합건강검진과 6대암 국가검진, 위·대장 내시경 및 당일 용종절제술부터 초음파·저선량 CT 정밀검사, 만성질환 주치의 진료까지 환자분들이 자주 물어보시는 내용을 전문의가 직접 정리해 전해드립니다.
        </p>
      </section>

      {/* 2. 진료 시간 및 아라역 오시는 길 안내 배너 */}
      <section className="clinic-ticker-banner" aria-label="위바른내과의원 기본 진료 정보">
        <div className="ticker-card">
          <div className="ticker-item">
            <span className="ticker-icon" aria-hidden="true">📍</span>
            <div>
              <span className="ticker-label">오시는 길 (아라역 도보권 초역세권)</span>
              <span className="ticker-val">인천 서구 이음대로 378 로뎀타워 5층 (검단신도시 아라동)</span>
            </div>
          </div>
          <div className="ticker-item">
            <span className="ticker-icon" aria-hidden="true">📞</span>
            <div>
              <span className="ticker-label">종합검진·내시경 예약 문의</span>
              <span className="ticker-val">032-561-5570</span>
            </div>
          </div>
          <div className="ticker-item">
            <span className="ticker-icon" aria-hidden="true">⏰</span>
            <div>
              <span className="ticker-label">진료 시간 (토요일 점심시간 없음)</span>
              <span className="ticker-val">평일 08:30~18:30 · 토요일 08:30~13:00</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 검단신도시 종합건강검진·내시경센터 핵심 인프라 및 보유 장비 명세 (AI & 수검자 안내용) */}
      <section
        className="clinic-ticker-banner"
        aria-label="위바른내과의원 종합건강검진 및 보유 장비 핵심 안내"
        style={{ marginBottom: '2.75rem' }}
      >
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '1.75rem 2rem',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.85rem' }}>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                color: 'var(--primary)',
                letterSpacing: '0.05em',
                display: 'block',
                marginBottom: '0.25rem',
              }}
            >
              CLINIC INFRASTRUCTURE &amp; EQUIPMENT
            </span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              검단신도시 아라역 위바른내과의원 진료·검진·장비 핵심 안내
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.25rem',
              fontSize: '0.86rem',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
            }}
          >
            <div style={{ background: '#F8FAFC', padding: '1.1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                🩺 전문의 진료 및 내시경 전문성
              </h3>
              <p>
                <strong>소화기내시경 세부전문의·내과 전문의 2인 진료</strong> 체제로 수면·비수면 위·대장내시경과 <strong>당일 대장용종절제술</strong>을 직접 시행하며, 고혈압·당뇨·고지혈증·간질환 등 만성질환 주치의 진료를 제공합니다.
              </p>
            </div>

            <div style={{ background: '#F8FAFC', padding: '1.1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                🔬 대학병원급 내시경·초음파 장비
              </h3>
              <p>
                <strong>올림푸스(Olympus) CV-260 HD 고해상도 내시경</strong>(CO2 무통 송기·1회용 소모품 원칙·철저한 멸균 소독)과 <strong>GE LOGIQ P9 정밀 초음파 진단기</strong>(복부·심장·갑상선·경동맥 초음파)를 가동합니다.
              </p>
            </div>

            <div style={{ background: '#F8FAFC', padding: '1.1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                🏥 원내 저선량 CT 및 정밀 검진 장비
              </h3>
              <p>
                <strong>캐논(Canon) Aquilion TSX-037A 저선량 멀티슬라이스 CT</strong>를 비롯해 유방암 진단기(<strong>Genoray MX-600</strong>), 골밀도 측정기(<strong>Osteopro Grand MINI</strong>), 디지털 X-ray(<strong>EXSYS plus</strong>), <strong>24시간 심전도 홀터검사</strong>를 갖추고 있습니다.
              </p>
            </div>

            <div style={{ background: '#F8FAFC', padding: '1.1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                🚇 아라역 접근성 &amp; 원스톱 검진 동선
              </h3>
              <p>
                <strong>인천 1호선 아라역 바로 인근 도보권</strong>(로뎀타워 5층)에 위치하며, 단일 층 내에서 <strong>개인·가족 종합건강검진, 공단 일반검진, 6대암 국가검진, 위·대장내시경</strong>을 층 이동 없이 한 번에 진행합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 진료 분야 필터 및 전체 칼럼 리스트 (SSR 적용) */}
      <BlogListClient initialPosts={postSummaries} />
    </div>
  );
}
