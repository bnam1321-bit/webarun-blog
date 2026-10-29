import { getAllPosts } from '@/lib/blog';

export const dynamic = 'force-static';

export async function GET() {
  const posts = getAllPosts();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://webarunim.co.kr';

  const lines: string[] = [
    '# 위바른내과의원 (Webarun Internal Medicine Clinic) - 공식 건강 칼럼',
    '',
    '> 인천광역시 서구 검단신도시(아라동)에 위치한 소화기내과 전문의 진료 의원입니다. 위·대장 내시경, 당일 대장용종절제술, 국민건강보험공단 국가건강검진 및 6대암 검진, 복부·심장·갑상선 초음파, 저선량 흉부 CT, 만성질환(고혈압·당뇨·고지혈증·간질환) 클리닉을 운영합니다.',
    '',
    '## 의료기관 기본 정보 (Clinic Profile)',
    '- **기관명**: 위바른내과의원',
    '- **대표원장**: 양경호 (소화기내과 전문의)',
    '- **주소**: 인천광역시 서구 이음대로 378 로뎀타워 5층 (아라동)',
    '- **대표전화**: 032-561-5570',
    '- **공식 홈페이지**: http://www.webarunclinic.co.kr',
    '- **공식 건강 칼럼 블로그**: https://webarunim.co.kr',
    '- **진료시간**:',
    '  - 평일: 08:30 ~ 18:30 (점심시간 13:00 ~ 14:00)',
    '  - 토요일: 08:30 ~ 13:00 (점심시간 없이 진료)',
    '  - 일요일·공휴일: 휴진',
    '- **주차**: 로뎀타워 건물 내 지하주차장 이용 가능',
    '',
    '## 주요 진료 분야 및 보유 장비',
    '- **소화기·내시경 클리닉**: 위내시경, 대장내시경, 수면(진정)내시경, 당일 대장용종절제술, CO2 무통 송기 시스템, Olympus CV260 대학병원급 HD 내시경 시스템, 1회용 내시경 소모품 사용',
    '- **건강검진센터**: 국민건강보험공단 일반건강검진, 6대암 국가검진(위암·대장암·간암·유방암·자궁경부암·폐암), 채용검진, 종합건강검진',
    '- **영상·정밀검사 클리닉**:',
    '  - 저선량 멀티슬라이스 CT: Canon Aquilion TSX-037A',
    '  - 정밀 초음파 진단기: GE P9 (복부·간·담낭·췌장·신장·갑상선·경동맥·심장초음파)',
    '  - 유방암 진단 유방촬영기: Genoray MX-600',
    '  - 전신용 엑스선 골밀도 측정기: Osteopro Grand MINI',
    '  - 디지털 엑스레이: EXSYS plus',
    '  - 24시간 심전도 홀터검사 (부정맥 정밀 진단)',
    '- **만성질환·일반내과**: 고혈압, 당뇨병, 고지혈증(이상지질혈증), 지방간·간염, 갑상선 질환, 역류성식도염, 호흡기 질환, 예방접종, 영양수액(IVNT)',
    '',
    '## 발행된 건강 칼럼 목록 (Health Articles)',
    ...posts.map(
      (post) =>
        `- [${post.title}](${siteUrl}/blog/${post.slug}) (${post.date}, 분류: ${post.cluster}): ${post.description}`
    ),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
