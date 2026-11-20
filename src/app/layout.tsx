import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  metadataBase: new URL('https://webarunim.co.kr'),
  title: {
    default: '위바른내과의원 건강 칼럼 | 검단신도시 아라역 종합건강검진·위대장내시경 내과',
    template: '%s | 위바른내과의원',
  },
  description:
    '인천 서구 검단신도시 아라역 인근 위바른내과의원(전문의 2인 진료) 공식 건강 칼럼입니다. 개인·가족 종합건강검진, 6대암 국가검진, 수면 위·대장 내시경 및 당일 용종절제술(Olympus CV-260), 복부·심장·갑상선 초음파(GE LOGIQ P9), 저선량 CT(Canon Aquilion) 및 만성질환 관리 정보를 전해드립니다.',
  keywords: [
    '위바른내과',
    '위바른내과의원',
    '검단신도시 내과',
    '검단 내과',
    '아라역 내과',
    '아라동 내과',
    '인천 서구 내과',
    '검단신도시 종합건강검진',
    '검단 건강검진',
    '검단 위내시경',
    '검단 대장내시경',
    '아라역 건강검진',
    '검단 초음파',
    '검단 CT 내과',
    '소화기내과 전문의',
  ],
  alternates: {
    canonical: 'https://webarunim.co.kr',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://webarunim.co.kr',
    siteName: '위바른내과의원 건강 칼럼',
    title: '위바른내과의원 건강 칼럼 | 검단신도시 아라역 종합건강검진·위대장내시경 내과',
    description:
      '인천 서구 검단신도시 아라역 인근 위바른내과의원 공식 건강 칼럼입니다. 종합건강검진, 6대암 국가검진, 위·대장 내시경(Olympus CV-260), 정밀 초음파(GE LOGIQ P9), 저선량 CT 및 만성질환 진료를 시행합니다.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: '위바른내과의원 검단신도시 아라역 건강검진센터·내시경센터',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
};

const clinicJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  '@id': 'https://webarunim.co.kr/#clinic',
  name: '위바른내과의원',
  alternateName: ['위바른내과', '검단 위바른내과의원', '아라역 위바른내과의원'],
  url: 'https://webarunim.co.kr',
  sameAs: ['http://www.webarunclinic.co.kr'],
  logo: 'https://webarunim.co.kr/logo.png',
  image: 'https://webarunim.co.kr/logo.png',
  description:
    '인천 서구 검단신도시 아라역 바로 인근(아라동 로뎀타워 5층)에 위치한 내과 전문의 2인 진료 의료기관입니다. 개인·가족 맞춤형 종합건강검진, 국민건강보험공단 국가건강검진 및 6대암 검진, 대학병원급 올림푸스(Olympus) CV-260 위·대장 내시경 및 당일 용종절제술, GE LOGIQ P9(GE P9) 복부·심장·갑상선·경동맥 초음파, 캐논(Canon) Aquilion TSX-037A 저선량 흉부·복부 CT, Genoray MX-600 유방촬영, Osteopro Grand MINI 골밀도 검사, 24시간 심전도 홀터검사 및 만성질환(고혈압·당뇨·고지혈증) 주치의 클리닉을 원스톱 동선으로 운영합니다.',
  telephone: '+82-32-561-5570',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '이음대로 378 로뎀타워 5층 (검단신도시 아라동, 아라역 인근)',
    addressLocality: '서구',
    addressRegion: '인천광역시',
    postalCode: '22874',
    addressCountry: 'KR',
  },
  areaServed: [
    '검단신도시',
    '인천광역시 서구 아라동',
    '인천광역시 서구 당하동',
    '인천광역시 서구 마전동',
    '아라역',
  ],
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 37.5948,
    longitude: 126.7094,
  },
  medicalSpecialty: [
    'Gastroenterology',
    'InternalMedicine',
    'DiagnosticRadiology',
  ],
  availableService: [
    {
      '@type': 'MedicalProcedure',
      name: '수면·비수면 위내시경 및 대장내시경, 당일 대장용종절제술 (Olympus CV-260 HD 내시경 시스템, CO2 무통 송기, 1회용 소모품 사용 및 철저한 소독 관리)',
    },
    {
      '@type': 'MedicalTest',
      name: '개인·가족 맞춤형 종합건강검진 및 국민건강보험공단 일반검진·6대암 국가검진 (위암·대장암·간암·유방암·자궁경부암·폐암 원스톱 검진 동선)',
    },
    {
      '@type': 'MedicalTest',
      name: '정밀 초음파 클리닉: 복부·간·담낭·췌장·신장·갑상선·경동맥·심장초음파 (GE LOGIQ P9 초음파 진단기)',
    },
    {
      '@type': 'MedicalTest',
      name: '저선량 멀티슬라이스 CT 검사: 흉부·폐암검진 및 복부 정밀 CT (Canon Aquilion TSX-037A)',
    },
    {
      '@type': 'MedicalTest',
      name: '유방암 정밀 유방촬영술 (Genoray MX-600), 전신 엑스선 골밀도 검사 (Osteopro Grand MINI DEXA), 디지털 엑스레이 (EXSYS plus)',
    },
    {
      '@type': 'MedicalTest',
      name: '24시간 심전도 홀터검사 (부정맥·가슴 두근거림 정밀 진단) 및 고혈압·당뇨·고지혈증 만성질환 주치의 진료',
    },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:30',
      closes: '18:30',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:30',
      closes: '13:00',
    },
  ],
  employee: {
    '@type': 'Physician',
    name: '양경호',
    jobTitle: '대표원장 (소화기내과 전문의, 전문의 2인 진료)',
    medicalSpecialty: 'Gastroenterology',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicJsonLd) }}
        />

        {/* 배경 글로우 효과 데코레이션 */}
        <div className="bg-glow-container">
          <div className="bg-glow-1"></div>
          <div className="bg-glow-2"></div>
        </div>

        {/* 상단 헤더 */}
        <header className="premium-header">
          <div className="header-container">
            <Link href="/" className="logo-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <img 
                src="/logo.png" 
                alt="위바른내과의원 건강검진센터" 
                style={{ height: '40px', width: 'auto', objectFit: 'contain', display: 'block' }}
              />
            </Link>
            <nav className="nav-links" aria-label="주요 메뉴">
              <Link href="/" className="nav-link">
                건강 칼럼 홈
              </Link>
              <a
                href="http://www.webarunclinic.co.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                공식 홈페이지
              </a>
            </nav>
          </div>
        </header>

        {/* 메인 콘텐츠 영역 */}
        <main style={{ flexGrow: 1 }}>{children}</main>

        {/* 하단 푸터 */}
        <footer className="premium-footer">
          <div className="footer-container">
            <div className="footer-brand">
              <h4>위바른내과의원</h4>
              <p style={{ marginBottom: '1rem' }}>
                인천 서구 검단신도시 아라역 인근(아라동 로뎀타워 5층)에서 전문의 2인 진료 체계로 종합건강검진, 6대암 국가검진, 위·대장 내시경(Olympus CV-260), 초음파(GE LOGIQ P9), 저선량 CT(Canon Aquilion) 및 만성질환 진료를 시행하고 있습니다.
              </p>
              <p>사업자등록번호: 807-93-01343</p>
              <p>대표원장: 양경호 (소화기내과 전문의)</p>
            </div>
            
            <div className="footer-info">
              <h5>진료 시간 및 오시는 길</h5>
              <p>위치: 인천 서구 이음대로 378 로뎀타워 5층 (아라역 도보권)</p>
              <p>평일: 08:30 ~ 18:30 (점심시간 13:00 ~ 14:00)</p>
              <p>토요일: 08:30 ~ 13:00 (점심시간 없이 진료)</p>
              <p>일요일·공휴일: 휴진 | 주차: 건물 내 지하주차장 무료 이용</p>
            </div>

            <div className="footer-links">
              <h5>바로가기</h5>
              <ul className="footer-link-list">
                <li>
                  <a href="http://www.webarunclinic.co.kr" target="_blank" rel="noopener noreferrer">
                    진료 및 의료진 소개 (공식 홈페이지)
                  </a>
                </li>
                <li>
                  <Link href="/">전체 건강 칼럼 보기</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} 위바른내과의원. All rights reserved.</p>
            <p>인천광역시 서구 이음대로 378 로뎀타워 5층 (검단신도시 아라동, 아라역 인근) | 대표번호: 032-561-5570</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
