import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  metadataBase: new URL('https://webarunim.co.kr'),
  title: {
    default: '위바른내과의원 건강 블로그 | 인천 서구 검단 소화기내과',
    template: '%s | 위바른내과의원',
  },
  description:
    '인천 서구 검단신도시 아라동에 위치한 위바른내과의원 공식 건강 블로그입니다. 소화기 전문의가 알려주는 위·대장 내시경, 용종절제술, 6대암 국가검진 및 만성질환 관리 정보.',
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
    '소화기내과 전문의',
  ],
  alternates: {
    canonical: 'https://webarunim.co.kr',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://webarunim.co.kr',
    siteName: '위바른내과의원 건강 블로그',
    title: '위바른내과의원 건강 블로그 | 인천 서구 검단 소화기내과',
    description:
      '인천 서구 검단신도시 아라동에 위치한 위바른내과의원 공식 건강 블로그입니다. 소화기 전문의가 알려주는 위·대장 내시경, 용종절제술, 6대암 국가검진 및 만성질환 관리 정보.',
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


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {/* 배경 글로우 효과 데코레이션 */}
        <div className="bg-glow-container">
          <div className="bg-glow-1"></div>
          <div className="bg-glow-2"></div>
        </div>

        {/* 플로팅 글래스 헤더 */}
        <header className="premium-header">
          <div className="header-container">
            <Link href="/" className="logo-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <img 
                src="/logo.png" 
                alt="위바른내과의원 건강검진센터" 
                style={{ height: '40px', width: 'auto', objectFit: 'contain', display: 'block' }}
              />
            </Link>
            <nav className="nav-links">
              <Link href="/" className="nav-link">
                건강정보 홈
              </Link>
              <a
                href="https://webarunim.co.kr"
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

        {/* 프리미엄 푸터 */}
        <footer className="premium-footer">
          <div className="footer-container">
            <div className="footer-brand">
              <h4>위바른내과의원</h4>
              <p style={{ marginBottom: '1rem' }}>
                소화기내과 전문의가 직접 진료하는 인천 서구 검단 건강검진 및 내시경 전문 의료기관입니다.
              </p>
              <p>사업자등록번호: 807-93-01343</p>
              <p>대표원장: 양경호 (소화기내과 전문의)</p>
            </div>
            
            <div className="footer-info">
              <h5>진료 시간 안내</h5>
              <p>평일: 08:30 ~ 18:30</p>
              <p>토요일: 08:30 ~ 13:00 (점심시간 없이 진료)</p>
              <p>점심시간: 13:00 ~ 14:00</p>
              <p>일요일·공휴일 휴진 (주차 가능)</p>
            </div>

            <div className="footer-links">
              <h5>고객 편의 바로가기</h5>
              <ul className="footer-link-list">
                <li>
                  <a href="https://webarunim.co.kr" target="_blank" rel="noopener noreferrer">
                    진료 및 의료진 소개
                  </a>
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
