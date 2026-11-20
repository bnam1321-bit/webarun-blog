import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '검단 소화기내과 클리닉 | 역류성식도염·속쓰림·소화불량·위염·헬리코박터 진료 (인천 검단구 아라역 위바른내과의원)',
  description:
    '인천 검단구 아라역 위바른내과의원 소화기 클리닉입니다. 역류성식도염(가슴쓰림·목이물감), 공복·식후 속쓰림, 만성 소화불량·복부팽만, 만성·위축성 위염·장상피화생, 헬리코박터균 검사 및 제균치료를 증상부터 위내시경·복부초음파 정밀검사, 맞춤 약물 진료까지 원스톱으로 시행합니다.',
  alternates: {
    canonical: 'https://webarunim.co.kr/digestive-clinic',
  },
  openGraph: {
    title: '검단 소화기내과 클리닉 | 역류성식도염·속쓰림·소화불량·위염·헬리코박터 | 위바른내과의원',
    description:
      '증상 감별부터 올림푸스 CV-260 고해상도 위내시경·GE LOGIQ P9 복부초음파 정밀검사, 맞춤 약물·제균치료까지 (인천 검단구 아라역 위바른내과의원).',
    url: 'https://webarunim.co.kr/digestive-clinic',
    type: 'website',
  },
};

export default function DigestiveClinicPage() {
  const medicalWebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: '검단 소화기내과 클리닉 - 역류성식도염·속쓰림·소화불량·위염·헬리코박터 진료 (위바른내과의원)',
    url: 'https://webarunim.co.kr/digestive-clinic',
    inLanguage: 'ko-KR',
    description:
      '인천광역시 검단구 아라역 인근 위바른내과의원(내과 전문의 2인 진료)의 역류성식도염, 속쓰림, 만성 소화불량, 위염(위축성 위염·장상피화생), 헬리코박터균 진단 및 치료 안내 페이지입니다.',
    about: [
      { '@type': 'MedicalCondition', name: '역류성식도염 (GERD)' },
      { '@type': 'MedicalCondition', name: '속쓰림 및 소화성 궤양 (Heartburn & Peptic Ulcer)' },
      { '@type': 'MedicalCondition', name: '기능성 소화불량 (Functional Dyspepsia)' },
      { '@type': 'MedicalCondition', name: '만성 위염·위축성 위염·장상피화생 (Chronic Gastritis)' },
      { '@type': 'MedicalCondition', name: '헬리코박터 파일로리 감염 (Helicobacter pylori)' },
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
        name: '역류성식도염과 속쓰림, 만성 소화불량이 있을 때 왜 위내시경과 복부초음파 검사가 필요한가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '속쓰림, 타는 듯한 가슴 통증, 명치 답답함, 소화불량은 단순 위염이나 역류성식도염뿐 아니라 위·십이지장 궤양, 조기 위암, 담석증·담낭염·췌장 질환과 증상이 매우 비슷합니다. 위바른내과의원에서는 올림푸스 CV-260 HD 위내시경으로 식도·위·십이지장 점막을 직접 확인하고, 필요 시 GE LOGIQ P9 복부초음파로 간·담낭·췌장까지 감별하여 정확한 원인에 맞는 약물 치료를 시행합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '위내시경에서 위축성 위염이나 장상피화생 진단을 받았는데 어떻게 관리해야 하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '위축성 위염과 장상피화생은 만성적인 위 점막 염증으로 점막이 얇아지거나 장 점막처럼 변한 상태로, 일반인보다 위암 발생 위험이 높아 정기적인 고해상도 위내시경 추적 검사가 필수적입니다. 헬리코박터균 감염이 동반된 경우 제균 치료를 통해 진행을 억제하고, 1~2년 주기로 소화기내시경 전문의의 정밀 내시경 및 조직검사로 관리해야 합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '헬리코박터균 검사와 제균 치료는 어떤 과정으로 진행되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '위내시경 검사 중 조직을 소량 채취하는 신속요소분해효소검사(CLO 검사)·조직검사 또는 요소호기검사(UBT)로 감염 여부를 확인합니다. 제균 치료가 필요한 경우 1~2주간 위산분비억제제와 항생제 병합 요법(1차·2차 제균 치료)을 처방하며, 약물 복용 완료 후 일정 기간이 지난 뒤 요소호기검사로 균이 완전히 소멸되었는지 최종 확인합니다.',
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
          <div className="detail-category">검단 소화기내과 클리닉 · 증상별 원인 진단 및 맞춤 치료</div>
          <h1 className="detail-title">
            역류성식도염 · 속쓰림 · 소화불량 · 위염 · 헬리코박터균 증상과 검사·진료 안내
          </h1>
          <div className="detail-meta-row">
            <span>인천광역시 검단구 이음대로 378 로뎀타워 5층 (인천 1호선 아라역 도보 1~2분)</span>
            <span>예약·문의: 032-561-5570</span>
          </div>
        </header>

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
          <p style={{ fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem', fontSize: '1.05rem' }}>
            ✅ 위바른내과의원 소화기 질환 3단계 표준 진료 시스템 (증상 → 정밀검사 → 맞춤진료)
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.93rem' }}>
            반복되는 속쓰림·명치 통증·소화불량은 단순 제산제 복용만으로 근본 원인을 해결하기 어렵습니다. 위바른내과의원은 <strong>① 환자 체감 증상 및 위험 신호 문진 → ② 올림푸스 CV-260 HD 위내시경 및 GE LOGIQ P9 복부초음파를 통한 정확한 원인·합병증 감별 검사 → ③ 위산분비억제제·위장관운동조절제·헬리코박터 제균치료 및 정기 추적 내시경 진료</strong>의 3단계로 체계적인 치료를 제공합니다.
          </p>
        </div>

        <div className="markdown-body" style={{ maxWidth: '100%' }}>
          <h2>1. 5대 주요 소화기 질환별 증상 · 검사 · 진료 총정리</h2>
          <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.88rem',
                border: '1px solid var(--border-color)',
              }}
            >
              <thead>
                <tr style={{ background: '#F1F5F9', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 800, width: '18%' }}>질환 / 클리닉</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 800, width: '27%' }}>주요 체감 증상 (내원 신호)</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 800, width: '27%' }}>본원 정밀 검사 방법</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>맞춤 진료 및 관리</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>역류성식도염 (GERD)</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    가슴 타는 듯한 통증(가슴쓰림), 신물 역류, 목 이물감(매핵기), 만성 마른기침, 쉰 목소리
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <strong>위내시경(EGD, Olympus CV-260)</strong>으로 식도 점막 미란·바렛식도 유무 확인 및 심장 질환(심전도·홀터) 감별
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    양성자펌프억제제(PPI)/P-CAB 약물 치료 및 식후 눕지 않기·야식 제한 등 생활습관 교정
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', background: '#FAFAFA' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>속쓰림 · 위·십이지장 궤양</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    공복 시 또는 식후 명치 쓰림·찌르는 통증, 새벽 속쓰림으로 잠을 깸, 흑색변
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <strong>고화질 위내시경 및 조직검사</strong>, 헬리코박터균 감염 검사, 진통소염제(NSAIDs) 복용력 평가
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    궤양 치유 약물(4~8주 투여), 점막 보호제 처방, 헬리코박터 양성 시 제균 치료 및 추적 내시경
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>만성 소화불량 · 복부팽만</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    조기 포만감, 식후 더부룩함, 잦은 트림·가스, 명치 답답함, 오심·체중 감소
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <strong>위내시경(위 배출·기질적 병변 확인) + 복부초음파(GE LOGIQ P9, 담석·담낭·췌장·간 감별)</strong> + 필요 시 복부 CT
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    위장관운동촉진제·소화효소제·위산조절제 맞춤 병합 처방 및 저포드맵·식습관 관리
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', background: '#FAFAFA' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>만성 위염 · 위축성 위염 · 장상피화생</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    무증상(검진에서 우연히 발견) 또는 간헐적 소화불량, 속 더부룩함, 명치 불쾌감
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <strong>고해상도 위내시경(Olympus CV-260) 점막 정밀 관찰 및 표적 조직검사</strong>, 헬리코박터 검사
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    위암 고위험군 등록 후 <strong>1~2년 주기 정기 추적 위내시경</strong>, 헬리코박터 제균 및 저염식 관리
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>헬리코박터 파일로리균</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    만성 위염·위궤양 재발, 위암 가족력, MALT 림프종, 조기 위암 내시경 절제 후
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    내시경 시 <strong>신속요소분해효소검사(CLO)·조직검사</strong> 및 치료 후 <strong>요소호기검사(UBT)</strong>
                  </td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    1~2주 1차 제균 치료(항생제+위산억제제) → 호기검사 판정 → 필요 시 2차 제균 요법까지 체계적 완결
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>2. 증상별 상세 진료 가이드 바로가기</h2>
          <ul>
            <li>
              <Link href="/blog/2026-11-02-yeokryuseong-sikdo-yeom-geomdan-naesigyeong-geumsa">
                <strong>[역류성식도염]</strong> 역류성식도염 가슴 통증, 검단 내과에서 내시경 검사로 정확히 진단해야 합니다
              </Link>
            </li>
            <li>
              <Link href="/blog/2026-11-21-geomdan-heartburn-epigastric-pain-endoscopy-treatment">
                <strong>[속쓰림·명치통증]</strong> 검단 속쓰림 내과: 공복·식후 속쓰림과 명치 통증 원인, 위내시경 검사 및 맞춤 진료
              </Link>
            </li>
            <li>
              <Link href="/blog/2026-11-21-geomdan-indigestion-bloating-endoscopy-ultrasound-clinic">
                <strong>[만성 소화불량]</strong> 검단 소화불량 내과: 만성 소화불량·복부 팽만감 증상과 위내시경·복부초음파 원인 검사 및 진료
              </Link>
            </li>
            <li>
              <Link href="/blog/2026-11-21-geomdan-chronic-atrophic-gastritis-intestinal-metaplasia-endoscopy">
                <strong>[만성·위축성 위염]</strong> 검단 위염 내과: 만성 위염·위축성 위염·장상피화생 증상과 고해상도 위내시경 추적 진료
              </Link>
            </li>
            <li>
              <Link href="/blog/2026-11-21-geomdan-helicobacter-pylori-test-eradication-therapy-guide">
                <strong>[헬리코박터균]</strong> 검단 헬리코박터균 검사 및 제균 치료: 위내시경 조직검사·요소호기검사와 1·2차 제균 진료 안내
              </Link>
            </li>
          </ul>
        </div>

        {/* 자주 묻는 질문 */}
        <section className="faq-container" aria-label="소화기 클리닉 자주 묻는 질문">
          <h2 className="faq-main-title">소화기 클리닉 자주 묻는 질문 (FAQ)</h2>
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
            🏥 위바른내과의원 소화기·내시경 클리닉 안내
          </p>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
            <strong>주소:</strong> 인천광역시 검단구 이음대로 378 로뎀타워 5층 (검단신도시 아라동, 인천 1호선 아라역 도보 1~2분)
            <br />
            <strong>대표전화:</strong> 032-561-5570 | <strong>진료시간:</strong> 평일 08:30~18:30 / 토요일 08:30~13:00 (점심시간 없음)
          </p>
        </div>
      </article>
    </div>
  );
}
