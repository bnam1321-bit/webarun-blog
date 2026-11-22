import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '검단 건강검진 안내 | 국가건강검진·6대암검진·종합검진 지정기관 (인천 검단구 아라역)',
  description:
    '인천 검단구 검단신도시 아라역 초역세권 위바른내과의원은 국민건강보험공단 국가건강검진 및 6대암 검진 지정 의료기관입니다. 검사 항목, 예약 방법, 금식 준비사항, 소요시간, 수면 위·대장내시경 동시 검진 및 원스톱 검사 동선을 안내합니다.',
  alternates: {
    canonical: 'https://webarunim.co.kr/health-checkup',
  },
  openGraph: {
    title: '검단 건강검진 안내 | 국가건강검진·6대암검진·종합검진 지정기관 | 위바른내과의원',
    description:
      '국민건강보험공단 국가건강검진·6대암검진 지정 의료기관 위바른내과의원(인천 검단구 아라역). 위·대장내시경 동시 검진, GE LOGIQ P9 초음파, 캐논 저선량 CT 원스톱 검진 안내.',
    url: 'https://webarunim.co.kr/health-checkup',
    type: 'website',
  },
};

export default function HealthCheckupPage() {
  const medicalWebPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: '검단 건강검진 안내 - 국가건강검진·6대암검진·종합건강검진 지정 의료기관 위바른내과의원',
    url: 'https://webarunim.co.kr/health-checkup',
    inLanguage: 'ko-KR',
    description:
      '인천광역시 검단구 아라역 인근 위바른내과의원(내과 전문의 2인 진료)의 국민건강보험공단 국가건강검진, 6대암 검진, 개인·가족 종합건강검진 항목, 예약, 준비사항, 소요시간 및 위·대장내시경 동시 검진 안내 페이지입니다.',
    about: [
      { '@type': 'MedicalTest', name: '국민건강보험공단 일반건강검진' },
      { '@type': 'MedicalTest', name: '6대암 국가검진 (위암·대장암·간암·유방암·자궁경부암·폐암)' },
      { '@type': 'MedicalTest', name: '개인·가족 맞춤형 종합건강검진' },
      { '@type': 'MedicalProcedure', name: '수면 위내시경·대장내시경 동시 검진 및 당일 대장용종절제술' },
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
        name: '위바른내과의원은 국민건강보험공단 국가건강검진 및 암검진 지정 의료기관인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 인천 검단구 아라역 인근에 위치한 위바른내과의원은 국민건강보험공단 지정 국가건강검진 및 6대암 검진(위암·대장암·간암·유방암·자궁경부암·폐암 관련 검사) 시행 의료기관입니다. 공단 일반검진과 암검진은 물론 개인·가족 맞춤형 종합건강검진까지 한 층에서 원스톱으로 받으실 수 있습니다.',
        },
      },
      {
        '@type': 'Question',
        name: '국가건강검진이나 종합검진 시 위내시경과 대장내시경을 같은 날 동시에 받을 수 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 사전 예약 시 한 번의 금식과 한 번의 수면(진정) 유도로 국가건강검진(또는 종합검진)과 수면 위내시경·대장내시경을 같은 날 동시에 받으실 수 있습니다. 검사 중 대장 용종이 발견되면 소화기내시경 전문의가 당일 즉시 용종절제술(EMR)을 시행하며, CO2 무통 송기 시스템으로 검사 후 복부 불편감을 최소화합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '건강검진 소요시간은 얼마나 걸리나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '공단 일반건강검진 단독 진행 시 약 30~40분, 일반검진과 수면 위내시경 병행 시 약 1시간~1시간 30분, 종합건강검진 또는 수면 위·대장내시경 동시 진행 시 회복 시간을 포함하여 약 2시간~2시간 30분이 소요됩니다. 로뎀타워 5층 단일 층에 모든 검사실과 회복실이 통합되어 층간 이동 없이 신속하게 진행됩니다.',
        },
      },
      {
        '@type': 'Question',
        name: '건강검진 전 금식 시간과 혈압약·당뇨약 복용 등 준비사항은 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '검진 전날 저녁 식사는 오후 8시 이전에 가볍게 마치시고, 밤 9시 이후부터는 물·커피·우유·껌·담배를 포함하여 최소 8~12시간 금식하셔야 합니다. 혈압약은 검진 당일 아침 6시경 소량의 물과 함께 복용하시고, 당뇨약(인슐린 포함)은 금식 중 저혈당 위험이 있으므로 검진 당일 아침에는 복용하지 마십시오. 아스피린·항혈전제·항응고제 복용자는 내시경 조직검사 및 용종절제 전 중단 여부를 반드시 사전 상담하셔야 합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '건강검진 예약 방법과 토요일 검진 가능 여부는 어떻게 되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '대표전화(032-561-5570) 또는 내원을 통해 예약하실 수 있습니다. 일반건강검진은 당일 금식 후 내원 검진도 가능하며, 위·대장내시경이나 초음파·CT가 포함된 종합검진은 사전 예약을 권장합니다. 평일(08:30~18:30)뿐만 아니라 토요일(08:30~13:00, 점심시간 없음)에도 국가검진·종합검진·수면 위대장내시경이 모두 가능합니다.',
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
          <div className="detail-category">국민건강보험공단 국가건강검진 · 6대암검진 지정 의료기관</div>
          <h1 className="detail-title">
            검단 건강검진센터 안내: 국가건강검진·6대암검진·종합검진 및 위·대장내시경 동시 검진
          </h1>
          <div className="detail-meta-row">
            <span>인천광역시 검단구 이음대로 378 로뎀타워 5층 (아라역 도보 1~2분)</span>
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
            ✅ 위바른내과의원 건강검진센터 5대 핵심 특징
          </p>
          <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            <li>
              <strong>국민건강보험공단 지정 검진기관</strong>: 공단 일반건강검진 및 <strong>6대암 국가검진(위암·대장암·간암·유방암·자궁경부암·폐암 관련 검사)</strong>, 채용검진, 개인·가족 맞춤형 종합건강검진 시행
            </li>
            <li>
              <strong>전문의 2인 진료 &amp; 위·대장내시경 동시 검진</strong>: 소화기내시경 세부전문의를 포함한 내과 전문의 2인이 상주하며, 한 번의 금식·수면으로 건강검진과 위·대장내시경 및 <strong>당일 대장용종절제술(EMR)</strong> 동시 시행
            </li>
            <li>
              <strong>대학병원급 정밀 장비 원내 완비</strong>: 올림푸스(Olympus) CV-260 HD 내시경(CO₂ 무통 송기·1회용 소모품), <strong>GE LOGIQ P9 정밀 초음파</strong>, <strong>캐논(Canon) Aquilion TSX-037A 저선량 멀티슬라이스 CT</strong>, 유방촬영기(Genoray MX-600), 골밀도(Osteopro Grand MINI DEXA), 24시간 홀터 심전도 보유
            </li>
            <li>
              <strong>로뎀타워 5층 단일 층 원스톱(One-Stop) 동선</strong>: 접수·기초계측·채혈·초음파·CT·유방촬영·수면내시경·독립 회복실까지 층간 이동 없이 한 층에서 완료
            </li>
            <li>
              <strong>검진 후 만성질환 주치의 연계</strong>: 검진에서 발견된 고혈압·당뇨병·고지혈증·지방간·역류성식도염·갑상선 질환을 타 병원 전원 없이 담당 전문의가 지속적으로 추적·처방 관리
            </li>
          </ul>
        </div>

        <div className="markdown-body" style={{ maxWidth: '100%' }}>
          <h2>1. 국가건강검진 · 6대암검진 · 종합건강검진 항목 안내</h2>
          <p>
            위바른내과의원은 국민건강보험공단 지정 건강검진 기관으로서 국가검진 대상자 조회부터 일반검진, 6대암 검진, 그리고 개인의 연령·가족력·증상에 맞춘 정밀 종합건강검진까지 체계적으로 시행합니다.
          </p>

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
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 800, width: '22%' }}>검진 구분</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 800, width: '25%' }}>대상 및 권장 주기</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>주요 검사 항목 및 본원 보유 장비</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>공단 일반건강검진</td>
                  <td style={{ padding: '0.75rem 1rem' }}>지역·직장가입자 및 피부양자 (2년 주기, 비사무직 1년)</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    신체계측·시력·청력·혈압, 흉부 디지털 X-ray(<strong>EXSYS plus</strong>), 요검사, 혈액검사(빈혈·당뇨 공복혈당·간기능·신장기능·이상지질혈증), 골밀도(해당 연령 여성, <strong>Osteopro Grand MINI</strong>)
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', background: '#FAFAFA' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>위암 검진</td>
                  <td style={{ padding: '0.75rem 1rem' }}>만 40세 이상 남녀 (2년 주기)</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    상부위장관내시경(위내시경, <strong>Olympus CV-260 HD</strong>, 수면·비수면 선택 가능, 필요 시 조직검사·헬리코박터 검사 동시 시행)
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>대장암 검진</td>
                  <td style={{ padding: '0.75rem 1rem' }}>만 50세 이상 남녀 (1년 주기)</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    분변잠혈검사(1차) 및 대장내시경(<strong>Olympus CV-260 HD · CO₂ 무통 송기</strong>, 용종 발견 시 <strong>당일 대장용종절제술</strong> 시행)
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', background: '#FAFAFA' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>간암 검진</td>
                  <td style={{ padding: '0.75rem 1rem' }}>만 40세 이상 고위험군 (6개월 주기)</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    간초음파(<strong>GE LOGIQ P9 정밀 초음파</strong>) + 혈청 알파태아단백(AFP) 혈액검사
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>유방암·자궁경부암</td>
                  <td style={{ padding: '0.75rem 1rem' }}>유방암 40세↑ / 자궁경부암 20세↑ 여성 (2년 주기)</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    유방촬영술(<strong>Genoray MX-600</strong> 고화질 유방암 진단장비) 및 자궁경부세포검사
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', background: '#FAFAFA' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>폐암·흉부 정밀검진</td>
                  <td style={{ padding: '0.75rem 1rem' }}>흡연력 등 고위험군 및 폐 정밀검진 희망자</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    원내 보유 <strong>캐논(Canon) Aquilion TSX-037A 저선량 멀티슬라이스 흉부 CT</strong> (흉부 X-ray 3장 수준 저선량으로 미세 폐결절 정밀 판독)
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>맞춤형 종합건강검진</td>
                  <td style={{ padding: '0.75rem 1rem' }}>20~70대 개인·부부·부모님 효도 종합검진</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    기초·정밀 혈액(종양표지자·갑상선·호르몬·비타민·대사증후군) + <strong>수면 위·대장내시경</strong> + <strong>정밀 초음파(복부·갑상선·경동맥·심장)</strong> + <strong>저선량 흉부·복부 CT</strong> + 골밀도 + 24시간 심전도 홀터검사 맞춤 구성
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>2. 위·대장내시경 동시 검진 및 당일 용종절제술 안내</h2>
          <p>
            국가건강검진(위암 검진 등)을 받으실 때 <strong>수면 대장내시경</strong>을 함께 신청하시면, 두 번 금식하거나 병원을 다시 방문할 필요 없이 <strong>한 번의 수면(진정) 상태에서 위내시경과 대장내시경을 동시에</strong> 마칠 수 있습니다.
          </p>
          <ul>
            <li>
              <strong>소화기내시경 세부전문의·내과 전문의 2인 직접 시술</strong>: 숙련된 전문의가 식도·위·십이지장부터 대장 전체 점막까지 정밀하게 관찰합니다.
            </li>
            <li>
              <strong>당일 대장용종절제술(EMR) 원스톱 시행</strong>: 대장내시경 중 대장암의 전구 병변인 선종성 용종이 발견되면, 별도의 재내원 없이 검사 당일 즉시 절제하여 대장암을 예방합니다.
            </li>
            <li>
              <strong>CO₂ 무통 송기 및 1회용 소모품 원칙</strong>: 체내 흡수가 약 150배 빠른 의료용 CO₂ 가스를 사용하여 내시경 후 복부 팽만감과 복통을 크게 줄였으며, 조직검사용 포셉 등 모든 소모품은 1회용 사용 후 즉시 폐기합니다.
            </li>
          </ul>

          <h2>3. 검진 예약 방법 및 단계별 소요시간</h2>
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
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 800, width: '28%' }}>검진 구성</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 800, width: '22%' }}>예상 소요시간</th>
                  <th style={{ padding: '0.75rem 1rem', fontWeight: 800 }}>예약 및 진행 안내 (로뎀타워 5층 원스톱 동선)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>공단 일반건강검진 단독</td>
                  <td style={{ padding: '0.75rem 1rem' }}>약 30분 ~ 40분</td>
                  <td style={{ padding: '0.75rem 1rem' }}>8시간 이상 금식 후 신분증 지참 당일 내원 가능 (전화 예약 시 대기 시간 단축)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', background: '#FAFAFA' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>국가검진 + 수면 위내시경</td>
                  <td style={{ padding: '0.75rem 1rem' }}>약 1시간 ~ 1시간 30분</td>
                  <td style={{ padding: '0.75rem 1rem' }}>사전 전화 예약 권장 (032-561-5570) · 수면 회복실 안정 및 전문의 당일 영상 설명 포함</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>검진 + 수면 위·대장 동시 내시경</td>
                  <td style={{ padding: '0.75rem 1rem' }}>약 2시간 ~ 2시간 30분</td>
                  <td style={{ padding: '0.75rem 1rem' }}>사전 예약 필수 (장정결제 수령 및 복용 안내) · 당일 용종절제 및 전용 회복실 안정 포함</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>맞춤 종합건강검진 (초음파·CT 포함)</td>
                  <td style={{ padding: '0.75rem 1rem' }}>약 2시간 ~ 3시간</td>
                  <td style={{ padding: '0.75rem 1rem' }}>사전 전화 상담 후 맞춤 항목 설계 · 5층 단일 층 내에서 기초·초음파·CT·내시경 원스톱 진행</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>4. 건강검진 전 필수 준비사항 (금식 · 복용 약물 · 주의사항)</h2>
          <ul>
            <li>
              <strong>금식 시간</strong>: 검진 전날 저녁 식사는 오후 8시 이전에 가볍게 드시고, <strong>밤 9시 이후부터는 물·커피·차·우유·주스·껌·담배를 포함하여 최소 8~12시간 완전 금식</strong>하셔야 정확한 혈액·초음파·내시경 결과를 얻을 수 있습니다.
            </li>
            <li>
              <strong>음주 제한</strong>: 알코올은 간 효소 수치(AST, ALT, GGT)와 중성지방·혈당 수치에 영향을 주므로 <strong>검진 최소 2~3일 전부터 금주</strong>하십시오.
            </li>
            <li>
              <strong>평소 복용 약물 관리</strong>:
              <ul>
                <li>
                  <strong>혈압약·갑상선약</strong>: 검진 당일 아침 6시경 소량의 맹물(반 컵 이내)과 함께 복용하십시오.
                </li>
                <li>
                  <strong>당뇨약·인슐린</strong>: 공복 상태에서 복용 시 저혈당 위험이 있으므로 <strong>검진 당일 아침에는 복용(투여)하지 마십시오.</strong>
                </li>
                <li>
                  <strong>아스피린·항혈전제·항응고제(와파린, 플라빅스 등)</strong>: 내시경 조직검사나 당일 대장용종절제술 시 출혈 위험이 있으므로, 처방 주치의 및 본원 의료진과 사전에 상담하여 검진 5~7일 전 중단 여부를 반드시 확인하십시오.
                </li>
              </ul>
            </li>
            <li>
              <strong>수면(진정) 내시경 당일 주의사항</strong>: 수면내시경 후에는 진정제 영향으로 <strong>당일 자가운전 및 정밀 기계 조작이 불가</strong>합니다. 본원은 <strong>인천 1호선 아라역 출구 바로 앞 도보 1~2분 초역세권</strong>에 위치해 있으므로 대중교통을 이용하시거나 보호자와 동반 내원하시기 바랍니다.
            </li>
          </ul>
        </div>

        {/* 자주 묻는 질문 */}
        <section className="faq-container" aria-label="건강검진 자주 묻는 질문">
          <h2 className="faq-main-title">건강검진 자주 묻는 질문 (FAQ)</h2>
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

        {/* 하단 진료 안내 및 관련 페이지 이동 */}
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
            🏥 위바른내과의원 건강검진센터 예약 및 오시는 길
          </p>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '0.75rem' }}>
            <strong>주소:</strong> 인천광역시 검단구 이음대로 378 로뎀타워 5층 (검단신도시 아라동, 인천 1호선 아라역 도보 1~2분)
            <br />
            <strong>대표전화:</strong> 032-561-5570
            <br />
            <strong>진료·검진 시간:</strong> 평일 08:30~18:30 (점심 13:00~14:00) / 토요일 08:30~13:00 (점심시간 없이 연속 진료) / 일·공휴일 휴진 / 건물 내 지하주차장 무료 지원
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <Link href="/colonoscopy" className="cluster-btn active" style={{ textDecoration: 'none' }}>
              검단 대장·위내시경 클리닉 안내 보기 →
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
