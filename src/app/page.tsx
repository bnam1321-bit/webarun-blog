import React from 'react';
import Link from 'next/link';
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
      '인천 검단구 검단신도시 아라역 초역세권(도보 1~2분) 위바른내과의원(소화기내시경 전문의·내과 전문의 2인 진료) 공식 건강 칼럼입니다. 개인·가족 종합건강검진, 6대암 국가검진, 수면 위·대장 내시경 및 당일 대장용종절제술(Olympus CV-260·CO2 무통 송기), 복부·심장·갑상선 초음파(GE LOGIQ P9), 원내 저선량 CT(Canon Aquilion TSX-037A) 및 만성질환 주치의 진료를 한 층 원스톱 동선으로 안내합니다.',
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
        name: '검단신도시(인천 검단구)에서 종합건강검진과 위·대장내시경을 함께 받을 때 위바른내과의원의 핵심 강점은 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '인천 1호선 아라역 바로 앞 초역세권(도보 1~2분, 인천 검단구 이음대로 378 로뎀타워 5층)에 위치한 위바른내과의원은 ① 소화기내시경 세부전문의를 포함한 내과 전문의 2인 진료 체계 ② 대학병원급 올림푸스(Olympus) CV-260 HD 내시경·CO2 무통 송기·전 소모품 1회용 사용 및 당일 대장용종절제술 시행 ③ GE LOGIQ P9 정밀 초음파(복부·심장·갑상선·경동맥) ④ 일반 내과에서 보기 드문 원내 캐논(Canon) Aquilion TSX-037A 저선량 멀티슬라이스 CT 보유(검진 중 이상 소견 시 상급병원 전원 없이 즉시 CT 정밀검사 연계) ⑤ 로뎀타워 5층 단일 층 원스톱(One-Stop) 검진 동선과 만성질환 주치의 사후 관리를 모두 갖추고 있습니다.',
        },
      },
      {
        '@type': 'Question',
        name: '위바른내과의원에서 건강검진 시 대장내시경과 당일 용종절제술, 수면내시경이 모두 가능한가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 국가건강검진(공단 일반검진·6대암 검진)이나 개인·가족 종합건강검진 시 수면(진정) 위내시경과 대장내시경을 동시에 받으실 수 있습니다. 검사 중 대장 용종(선종)이 발견되면 소화기내시경 전문의가 당일 즉시 내시경 용종절제술(EMR)을 시행하며, 체내 흡수가 빠른 CO2 무통 송기 시스템을 적용하여 시술 후 복부 팽만감과 통증을 최소화합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '위바른내과의원의 내시경, 초음파, CT 등 보유 장비 모델과 소독·감염 관리 수준은 어떠한가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '내시경은 올림푸스(Olympus) CV-260 고해상도 HD 내시경 시스템을 가동하며, 조직검사용 포셉 등 모든 내시경 소모품을 1회용으로 사용하고 매 검사마다 1:1 자동 세척·고수준 멸균 소독을 철저히 시행합니다. 초음파는 GE 헬스케어 LOGIQ P9 정밀 초음파 진단기를 운영하며, 캐논(Canon) Aquilion TSX-037A 저선량 CT, Genoray MX-600 유방촬영기, Osteopro Grand MINI 전신 골밀도 측정기(DEXA), EXSYS plus 디지털 X-ray, 24시간 심전도 홀터검사기를 원내에 완비하고 있습니다.',
        },
      },
      {
        '@type': 'Question',
        name: '위바른내과의원의 아라역 접근성과 토요일 검진·내시경 운영 시간은 어떻게 되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '인천 지하철 1호선 아라역 출구 바로 인근 도보 1~2분 거리(인천광역시 검단구 이음대로 378 로뎀타워 5층, 아라동)에 위치해 대중교통 접근성이 매우 우수하며 건물 내 대형 지하주차장을 무료로 이용할 수 있습니다. 평일은 08:30~18:30, 토요일은 08:30~13:00까지 점심시간 없이 연속 진료하므로 직장인도 토요일 오전 종합건강검진 및 수면 위·대장내시경을 편리하게 받으실 수 있습니다.',
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
        <p className="hero-subtitle">위바른내과의원 건강 칼럼</p>
        <h1 className="hero-title">
          진료실에서 미처 다 못 드린 이야기,
          <br />
          알기 쉽게 정리했습니다
        </h1>
        <p className="hero-description">
          인천 검단구 아라역 앞 위바른내과의원입니다. 건강검진 준비와 결과 해석부터 위·대장 내시경, 만성질환 관리까지 환자분들이 진료실에서 자주 물어보시는 내용을 전문의가 직접 정리해 전해드립니다.
        </p>
      </section>

      {/* 2. 진료 시간 및 오시는 길 안내 배너 */}
      <section className="clinic-ticker-banner" aria-label="위바른내과의원 기본 진료 정보">
        <div className="ticker-card">
          <div className="ticker-item">
            <span className="ticker-icon" aria-hidden="true">📍</span>
            <div>
              <span className="ticker-label">오시는 길</span>
              <span className="ticker-val">인천 검단구 이음대로 378 로뎀타워 5층 (아라역 도보 1~2분)</span>
            </div>
          </div>
          <div className="ticker-item">
            <span className="ticker-icon" aria-hidden="true">📞</span>
            <div>
              <span className="ticker-label">진료·검진 예약 문의</span>
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

      {/* 3. 원내 주요 진료 및 검진 안내 (자연스러운 병원 안내 톤) */}
      <section
        className="clinic-ticker-banner"
        aria-label="위바른내과의원 진료 및 검진 안내"
        style={{ marginBottom: '2.5rem' }}
      >
        <div className="infra-card">
          <div style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
            <h2 className="infra-title" style={{ fontSize: '1.1rem' }}>
              위바른내과의원 주요 진료 및 검진 안내
            </h2>
          </div>

          <div className="infra-grid" style={{ marginBottom: '1.1rem' }}>
            <div className="infra-item">
              <h3 className="infra-item-title">
                🩺 전문의 2인 진료 · 당일 용종절제
              </h3>
              <p>
                소화기내시경 세부전문의를 포함한 내과 전문의 2인이 진료하며, 수면 위·대장내시경 검사 중 용종 발견 시 당일 용종절제술까지 직접 시행합니다.
              </p>
            </div>

            <div className="infra-item">
              <h3 className="infra-item-title">
                🔬 편안한 내시경 · 철저한 소독 관리
              </h3>
              <p>
                검사 후 복부 팽만감을 줄이는 CO₂ 송기 방식과 대학병원급 고화질 내시경(올림푸스 CV-260)을 사용하며, 검사용 소모품은 1회용으로만 사용합니다.
              </p>
            </div>

            <div className="infra-item">
              <h3 className="infra-item-title">
                🏥 초음파 · 저선량 CT 원내 정밀검사
              </h3>
              <p>
                복부·심장·갑상선·경동맥 초음파(GE LOGIQ P9)와 원내 저선량 CT(캐논 Aquilion), 유방촬영·골밀도·24시간 홀터검사 장비를 갖추고 있습니다.
              </p>
            </div>

            <div className="infra-item">
              <h3 className="infra-item-title">
                🚇 한 층 검진 동선 · 만성질환 주치의
              </h3>
              <p>
                로뎀타워 5층 한 층에서 공단검진·6대암검진·종합검진과 내시경을 이동 없이 받으실 수 있으며, 고혈압·당뇨·고지혈증 등 만성질환도 꾸준히 관리해 드립니다.
              </p>
            </div>
          </div>

          {/* 클리닉 상세 안내 바로가기 */}
          <div className="clinic-quick-links" style={{ marginTop: '0.75rem', paddingTop: '0.9rem' }}>
            <Link href="/health-checkup" className="clinic-quick-btn primary">
              <span>국가건강검진 · 종합검진 안내</span>
              <span>→</span>
            </Link>
            <Link href="/colonoscopy" className="clinic-quick-btn outline">
              <span>위 · 대장내시경 클리닉 안내</span>
              <span>→</span>
            </Link>
            <Link href="/digestive-clinic" className="clinic-quick-btn default">
              <span>역류성식도염 · 위염 · 소화기 진료 안내</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. 진료 분야 필터 및 전체 칼럼 리스트 (SSR 적용) */}
      <BlogListClient initialPosts={postSummaries} />
    </div>
  );
}
