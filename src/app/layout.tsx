import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  metadataBase: new URL('https://webarunim.co.kr'),
  title: {
    default: '위바른내과의원 건강 칼럼 | 인천 서구 검단 소화기내과·건강검진센터',
    template: '%s | 위바른내과의원',
  },
  description:
    '인천 서구 검단신도시 아라동 위바른내과의원 공식 건강 칼럼입니다. 소화기내과 전문의가 위·대장 내시경, 대장용종 당일절제술, 국가건강검진(6대암), 초음파·CT 검사 및 만성질환 관리 정보를 알기 쉽게 전해드립니다.',
  keywords: [
    '위바른내과',
    '위바른내과의원',
    '인천 서구 내과',
    '검단 내과',
    '아라동 내과',
    '검단신도시 내과',
    '검단 위내시경',
    '검단 대장내시경',
    '검단 건강검진',
    '검단 초음파',
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
    title: '위바른내과의원 건강 칼럼 | 인천 서구 검단 소화기내과·건강검진센터',
    description:
      '인천 서구 검단신도시 아라동 위바른내과의원 공식 건강 칼럼입니다. 소화기내과 전문의가 위·대장 내시경, 용종절제술, 6대암 국가검진 및 만성질환 관리 정보를 전해드립니다.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: '위바른내과의원',
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
  alternateName: '위바른내과',
  url: 'https://webarunim.co.kr',
  sameAs: ['http://www.webarunclinic.co.kr'],
  logo: 'https://webarunim.co.kr/logo.png',
  image: 'https://webarunim.co.kr/logo.png',
  description:
    '인천 서구 검단(아라동)에 위치한 소화기내과 전문의 진료 의원으로, 위·대장 내시경 및 당일 용종절제술, 6대암 국가건강검진, 복부·심장·갑상선 초음파, 저선량 흉부 CT, 만성질환 클리닉을 운영합니다.',
  telephone: '+82-32-561-5570',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '이음대로 378 로뎀타워 5층 (아라동)',
    addressLocality: '서구',
    addressRegion: '인천광역시',
    postalCode: '22874',
    addressCountry: 'KR',
  },
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
    { '@type': 'MedicalProcedure', name: '위내시경 및 수면위내시경 (Olympus CV260)' },
    { '@type': 'MedicalProcedure', name: '대장내시경 및 당일 대장용종절제술 (CO2 송기)' },
    { '@type': 'MedicalTest', name: '국가건강검진 및 6대암 검진 (위암·대장암·간암·유방암·자궁경부암·폐암)' },
    { '@type': 'MedicalTest', name: '복부·심장·경동맥·갑상선 초음파 (GE P9)' },
    { '@type': 'MedicalTest', name: '저선량 다중채널 CT 검사 (Canon Aquilion TSX-037A)' },
    { '@type': 'MedicalTest', name: '유방촬영술 (Genoray MX-600) 및 골밀도 검사 (Osteopro Grand MINI)' },
    { '@type': 'MedicalTest', name: '24시간 심전도 홀터검사' },
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
    jobTitle: '대표원장 (소화기내과 전문의)',
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
                인천 서구 검단(아라동)에서 소화기내과 전문의가 직접 위·대장 내시경과 국가건강검진, 만성질환 진료를 시행하고 있습니다.
              </p>
              <p>사업자등록번호: 807-93-01343</p>
              <p>대표원장: 양경호 (소화기내과 전문의)</p>
            </div>
            
            <div className="footer-info">
              <h5>진료 시간 안내</h5>
              <p>평일: 08:30 ~ 18:30 (점심시간 13:00 ~ 14:00)</p>
              <p>토요일: 08:30 ~ 13:00 (점심시간 없이 진료)</p>
              <p>일요일·공휴일: 휴진</p>
              <p>주차: 로뎀타워 건물 내 지하주차장 이용 가능</p>
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
            <p>인천광역시 서구 이음대로 378 로뎀타워 5층 (아라동) | 대표번호: 032-561-5570</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
