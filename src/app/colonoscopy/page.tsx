import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '검단 대장내시경 · 위내시경 클리닉 | 당일 용종절제술·CO2 무통 송기·수면내시경 (인천 검단구 아라역)',
  description:
    '인천 검단구 아라역 초역세권 위바른내과의원의 검단 대장내시경·위내시경 전문 진료 안내입니다. 소화기내시경 세부전문의·내과 전문의 2인 진료, 올림푸스 CV-260 HD 고화질 내시경, CO2 무통 송기, 1회용 소모품 및 1:1 멸균 소독, 실시간 수면 모니터링과 당일 용종절제술을 시행합니다.',
  alternates: {
    canonical: 'https://webarunim.co.kr/colonoscopy',
  },
  openGraph: {
    title: '검단 대장내시경 · 위내시경 클리닉 | 당일 용종절제술·수면내시경 | 위바른내과의원',
    description:
      '소화기내시경 세부전문의·내과 전문의 2인 진료, 올림푸스 CV-260 고화질 내시경, CO2 무통 송기, 1회용 포셉 원칙, 실시간 수면 모니터링, 당일 대장용종절제술 시행 (인천 검단구 아라역 위바른내과의원).',
    url: 'https://webarunim.co.kr/colonoscopy',
    type: 'website',
  },
};

export default function ColonoscopyPage() {
  const medicalWebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: '검단 대장내시경 · 위내시경 클리닉 - 인천 검단구 아라역 위바른내과의원',
    url: 'https://webarunim.co.kr/colonoscopy',
    inLanguage: 'ko-KR',
    description:
      '인천광역시 검단구 아라역 바로 앞 위바른내과의원의 검단 대장내시경·위내시경·당일 용종절제술 전문 진료 페이지입니다. 소화기내시경 세부전문의 자격 및 내과 전문의 2인 진료 체계, 올림푸스 CV-260 고화질 HD 내시경, CO2 송기, 1:1 멸균 소독, 수면 실시간 모니터링 시스템을 안내합니다.',
    about: [
      { '@type': 'MedicalProcedure', name: '검단 대장내시경 (Colonoscopy)' },
      { '@type': 'MedicalProcedure', name: '당일 대장용종절제술 (Endoscopic Polypectomy / EMR)' },
      { '@type': 'MedicalProcedure', name: '수면 위내시경 (Esophagogastroduodenoscopy, EGD)' },
    ],
    mainEntity: {
      '@type': 'MedicalClinic',
      name: '위바른내과의원',
      telephone: '+82-32-561-5570',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '인천광역시 검단구 이음대로 378 로뎀타워 5층 (아라동, 아라역 도보 1~2분)',
        addressLocality: '검단구',
        addressRegion: '인천광역시',
        addressCountry: 'KR',
      },
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '위바른내과의원의 검단 대장내시경은 어떤 전문의가 시행하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '위바른내과의원은 소화기내시경 세부전문의를 포함한 내과 전문의 2인이 상주하며, 대장내시경 삽입부터 미세 점막 관찰, 조직검사, 당일 대장용종절제술(EMR)까지 전 과정을 숙련된 전문의가 직접 시행합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '대장내시경 검사 중 용종이 발견되면 당일 바로 제거할 수 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 대장내시경 검사 중 대장암의 씨앗이 되는 선종성 용종 등이 발견되면 별도의 재방문이나 재장정결 번거로움 없이 검사 당일 즉시 내시경 용종절제술을 시행합니다. 다만 용종의 크기가 매우 크거나 출혈·천공 위험이 높은 특수 위치인 경우 환자분의 안전을 최우선으로 고려하여 전문의 상담 후 추가 치료 계획을 안내해 드립니다.',
        },
      },
      {
        '@type': 'Question',
        name: '검단 대장내시경 후 배가 아프거나 가스가 차는 불편감을 줄이는 시스템이 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 위바른내과의원은 일반 공기 대신 체내 흡수 및 배출 속도가 약 150배 빠른 의료용 이산화탄소(CO₂) 무통 송기 시스템을 전 내시경 검사에 적용하여, 검사 후 발생하는 복부 팽만감과 가스 통증을 최소화하고 빠른 일상 복귀를 돕습니다.',
        },
      },
      {
        '@type': 'Question',
        name: '내시경 세척·소독과 수면(진정) 내시경 안전 모니터링은 어떻게 관리되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '대한소화기내시경학회 소독 지침에 따라 매 검사 직후 1:1 자동 세척 및 고수준 멸균 소독을 시행하며, 조직검사용 겸자(포셉)와 용종절제 올가미 등 모든 내시경 소모품은 1회용으로만 사용하고 즉시 폐기합니다. 또한 수면(진정) 내시경 시 검사 시작부터 전용 독립 회복실 퇴실까지 산소포화도·심전도·혈압·맥박·호흡을 1:1 실시간 모니터링하여 안전을 철저히 관리합니다.',
        },
      },
    ],
  };

  return (
    <div className="detail-container" style={{ gridTemplateColumns: '1fr' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalWebPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <article className="detail-main" style={{ maxWidth: '960px', margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <Link
            href="/"
            style={{
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            ← 홈으로 돌아가기
          </Link>
        </div>

        <header className="detail-header">
          <div className="detail-category">소화기내시경 세부전문의 · 내과 전문의 2인 진료</div>
          <h1 className="detail-title">
            검단 대장내시경 · 위내시경 클리닉: 당일 용종절제술과 4대 안전·정밀 내시경 시스템
          </h1>
          <div className="detail-meta-row">
            <span>인천광역시 검단구 이음대로 378 로뎀타워 5층 (인천 1호선 아라역 도보 1~2분)</span>
            <span>예약·문의: 032-561-5570</span>
          </div>
        </header>

        {/* 핵심 요약 박스 */}
        <div
          style={{
            marginBottom: '2.5rem',
            background: 'rgba(13, 148, 136, 0.05)',
            borderLeft: '4px solid var(--primary)',
            padding: '1.25rem 1.5rem',
            borderRadius: '0 12px 12px 0',
            lineHeight: 1.75,
          }}
        >
          <p style={{ fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.05rem' }}>
            ✅ 위바른내과의원 검단 대장내시경·위내시경 핵심 신뢰 지표
          </p>
          <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            <li>
              <strong>의료진 자격 및 전문성</strong>: <strong>소화기내시경 세부전문의를 포함한 내과 전문의 2인 상주 진료</strong> — 풍부한 위·대장내시경 및 치료내시경(용종절제술) 임상 경험을 바탕으로 전 검사를 전문의가 직접 시행합니다.
            </li>
            <li>
              <strong>당일 대장용종절제술(One-Stop EMR)</strong>: 대장내시경 검사 중 발견된 선종성 대장 용종을 검사 당일 즉시 절제하여 재방문 및 재장정결 부담을 줄이고 대장암을 조기 예방합니다.
            </li>
            <li>
              <strong>고화질 HD 내시경 (`Olympus CV-260`)</strong>: 대학병원급 올림푸스 고해상도 HD 영상 내시경 시스템으로 미세 점막 혈관 변화와 평탄형·톱니형 용종까지 정밀하게 관찰합니다.
            </li>
            <li>
              <strong>CO₂ 무통 송기 · 1회용 소모품 · 실시간 수면 모니터링</strong>: CO₂ 가스 송기로 검사 후 복통·팽만감을 최소화하고, 포셉 등 모든 소모품은 1회용 사용 후 즉시 폐기하며, 수면내시경 전 과정에서 생체징후를 실시간 모니터링합니다.
            </li>
          </ul>
        </div>

        <div className="markdown-body" style={{ maxWidth: '100%' }}>
          <h2>1. 의료진의 내시경 전문성과 임상 경력</h2>
          <p>
            대장내시경은 굴곡진 대장 내부로 내시경을 부드럽게 진입시키면서 장 주름 뒤쪽에 숨어 있는 수 mm 단위의 미세 용종까지 놓치지 않고 찾아내야 하는 고도의 숙련도가 요구되는 검사입니다.
          </p>
          <ul>
            <li>
              <strong>소화기내시경 세부전문의 및 내과 전문의 2인 진료 체제</strong>: 위바른내과의원은 내시경 수련과 풍부한 임상 경험을 갖춘 소화기내과·내과 전문의가 직접 상담부터 내시경 삽입, 점막 관찰, 조직검사 및 용종절제술, 그리고 검사 후 영상 결과 설명까지 전 과정을 책임 진료합니다.
            </li>
            <li>
              <strong>검진·초음파·저선량 CT 통합 연계 판독</strong>: 내시경 단독 검사에 그치지 않고, 복부 정밀 초음파(<strong>GE LOGIQ P9</strong>) 및 원내 보유 저선량 멀티슬라이스 CT(<strong>Canon Aquilion TSX-037A</strong>)와 연계하여 복통·혈변·체중 감소·소화불량의 원인을 입체적으로 감별합니다.
            </li>
          </ul>

          <h2>2. 위바른내과의원 4대 내시경 신뢰 시스템 (장비 · CO₂ 송기 · 소독 · 수면 모니터링)</h2>
          <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.9rem',
                border: '1px solid var(--border-color)',
              }}
            >
              <thead>
                <tr style={{ background: '#F1F5F9', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 800, width: '26%' }}>4대 내시경 핵심 영역</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>위바른내과의원 운영 기준 및 장비 명세</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>① 고화질 HD 내시경 장비</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    대학병원에서 널리 도입하는 <strong>올림푸스(Olympus) CV-260 HD/Full-HD 고해상도 내시경 시스템</strong>을 가동하여 식도·위·십이지장·대장 점막의 미세 병변과 조기 위암·대장 선종을 선명하게 식별합니다.
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', background: '#FAFAFA' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>② CO₂(이산화탄소) 무통 송기</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    내시경 관찰을 위해 장관을 부풀릴 때 일반 공기 대신 체내 흡수·배출이 약 150배 빠른 <strong>의료용 CO₂ 가스 송기 시스템</strong>을 사용하여 검사 후 배가 빵빵하거나 아픈 복부 팽만감을 현저히 줄입니다.
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>③ 1:1 멸균 소독 &amp; 1회용 소모품</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    대한소화기내시경학회 감염관리 및 소독 지침을 철저히 준수하여 매 검사 직후 1:1 자동 세척기 및 고수준 소독액으로 멸균 소독하며, <strong>조직검사용 겸자(포셉)·용종절제 올가미·주사침 등 일체의 내시경 소모품은 100% 1회용으로만 사용하고 즉시 폐기</strong>합니다.
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>④ 수면(진정) 실시간 모니터링</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    개인의 연령·체중·기저질환에 맞춘 안전한 진정제 용량을 투여하며, 검사 중은 물론 전용 독립 회복실에서 완전히 깨어날 때까지 <strong>산소포화도(SpO₂)·심전도·혈압·맥박·호흡을 1:1 실시간 모니터링</strong>합니다.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>3. 검단 대장내시경 · 당일 용종절제술이 필요한 경우</h2>
          <ul>
            <li>
              <strong>정기 대장암 예방 검진</strong>: 만 40~50세 이상 성인(3~5년 주기 권장), 또는 대장암·대장용종 가족력이 있는 분
            </li>
            <li>
              <strong>배변 습관 변화 및 장 증상</strong>: 만성 설사, 변비, 변이 가늘어짐, 잔변감, 복부 팽만감이나 하복부 통증이 지속되는 분
            </li>
            <li>
              <strong>혈변 및 분변잠혈 양성</strong>: 배변 시 선홍색 피가 묻어나거나, 국가건강검진 분변잠혈검사에서 양성(이상) 소견을 받은 분
            </li>
            <li>
              <strong>과거 대장 용종 절제 이력</strong>: 이전 대장내시경에서 선종성 용종을 제거한 후 정기 추적 내시경 검사 시기가 도래한 분
            </li>
          </ul>

          <h2>4. 검단 대장내시경 검사 과정 및 시술 후 식사 관리</h2>
          <ol>
            <li>
              <strong>사전 진료 및 장정결 안내</strong>: 복용 중인 약물(특히 아스피린·항혈전제·당뇨약)을 확인하고, 검사 3일 전부터 씨 있는 과일·잡곡·해조류·견과류를 피한 저잔사 식단과 장정결제 복용법을 안내받습니다.
            </li>
            <li>
              <strong>검사 당일 수면 위·대장내시경 및 당일 용종절제술</strong>: 인천 1호선 아라역 바로 앞 로뎀타워 5층 내시경센터에서 수면(진정) 유도 후 약 15~20분간 대장 전체 점막을 관찰하며, 용종 발견 시 당일 즉시 절제술을 시행합니다. (위내시경 동시 진행 시 약 5~10분 추가)
            </li>
            <li>
              <strong>전용 회복실 안정 및 전문의 1:1 결과 설명</strong>: 회복실에서 30분~1시간 충분히 휴식한 뒤, 전문의가 촬영된 고화질 내시경 사진을 직접 보여주며 점막 상태와 용종 절제 결과를 상세히 설명합니다.
            </li>
            <li>
              <strong>용종절제술 후 식사 및 주의사항</strong>: 용종절제술을 시행한 경우 절제 부위 회복을 위해 시술 직후 금식 시간 준수 후 흰죽·미음 등 부드러운 유동식부터 시작하며, 약 3~7일간 자극적인 음식·음주·격렬한 운동을 피하셔야 합니다. 대장내시경 및 용종절제술은 드물게 출혈·천공 등 합병증이 발생할 수 있으므로 시술 후 심한 복통이나 혈변이 있을 경우 즉시 본원으로 연락 또는 내원하셔야 합니다.
            </li>
          </ol>
        </div>

        {/* 자주 묻는 질문 */}
        <section className="faq-container" aria-label="검단 대장내시경 자주 묻는 질문">
          <h2 className="faq-main-title">검단 대장내시경 자주 묻는 질문 (FAQ)</h2>
          {faqJsonLd.mainEntity.map((item, idx) => (
            <div key={idx} className="faq-item open">
              <div className="faq-question">
                <span>Q. {item.name}</span>
              </div>
              <div className="faq-answer">
                <p>A. {item.acceptedAnswer.text}</p>
              </div>
            </div>
          ))}
        </section>

        {/* 하단 진료 안내 */}
        <div
          style={{
            marginTop: '2.5rem',
            background: '#F8FAFC',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '1.5rem',
          }}
        >
          <p style={{ fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1rem' }}>
            🏥 위바른내과의원 내시경센터 예약 및 오시는 길
          </p>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '0.75rem' }}>
            <strong>주소:</strong> 인천광역시 검단구 이음대로 378 로뎀타워 5층 (검단신도시 아라동, 인천 1호선 아라역 도보 1~2분)
            <br />
            <strong>대표전화:</strong> 032-561-5570
            <br />
            <strong>진료·내시경 시간:</strong> 평일 08:30~18:30 (점심 13:00~14:00) / 토요일 08:30~13:00 (점심시간 없이 연속 진료) / 일·공휴일 휴진 / 건물 내 지하주차장 무료 지원
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <Link href="/health-checkup" className="cluster-btn active" style={{ textDecoration: 'none' }}>
              국가건강검진·종합검진 안내 보기 →
            </Link>
            <Link href="/digestive-clinic" className="cluster-btn" style={{ textDecoration: 'none' }}>
              역류성식도염·속쓰림·위염·헬리코박터 진료 안내 →
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
