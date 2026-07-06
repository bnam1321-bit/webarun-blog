const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

// .env 로드
dotenv.config({ path: path.join(__dirname, '../.env') });

// Prompts 불러오기
// ES module 대신 CommonJS로 동작시키기 위해 prompts 코드를 간략히 불러오거나 import를 동적 처리
// 안전하게 작동하기 위해 prompts.ts에서 핵심 지침들을 로컬 변수로 들여옴
const promptsPath = path.join(__dirname, '../src/lib/prompts.ts');

// 간단한 파일 파싱으로 SYSTEM_PROMPT, KEYWORDS, CLINIC_INFO 읽어오기
// 또는 프롬프트 파일을 JS로 컴파일하지 않고 직접 JS 형태의 설정을 참조할 수 있도록 작성
const KEYWORDS = {
  local: [
    "인천 서구 내과", "검단 내과", "검단신도시 내과", "아라동 내과",
    "당하동 내과", "마전동 내과", "불로동 내과", "위바른내과", "위바른내과의원",
    "검단 건강검진", "인천 서구 건강검진센터", "토요일 진료 내과 검단"
  ],
  endoscopy: [
    "검단 위내시경", "검단 대장내시경", "인천 서구 수면내시경",
    "검단 소화기내과", "검단 용종절제술", "CO2 대장내시경",
    "역류성식도염 검단", "헬리코박터 검사 인천 서구", "위염 검단"
  ],
  checkup: [
    "검단 국가건강검진", "검단 6대암 검진", "인천 서구 종합검진",
    "검단 채용검진", "검단 공단검진", "위암검진 대상 연령", "대장암검진 주기"
  ],
  imaging: [
    "검단 복부초음파", "검단 갑상선초음파", "검단 심장초음파",
    "검단 24시간 홀터검사", "검단 CT 검사", "검단 유방촬영", "지방간 검사 인천 서구"
  ],
  ivnt: [
    "검단 수액 클리닉", "검단 영양수액", "인천 서구 수액"
  ],
  chronic: [
    "검단 당뇨 내과", "검단 고혈압 관리", "고지혈증 검단",
    "대사증후군 검단 내과", "검단 예방접종", "검단 독감 예방접종"
  ]
};

const CLINIC_INFO = `
## 진료 기관 정보 (NAP 표준 표기 — webarunclinic.co.kr 확인)
**위바른내과의원**
- **소재지**: 인천광역시 서구 이음대로 378 로뎀타워 5층 (아라동) / 주차 가능
- **대표 번호**: 032-561-5570
- **대표원장**: 양경호 (소화기내과 전문의)
- **사업자등록번호**: 807-93-01343
- **공식 홈페이지**: https://webarunim.co.kr
- **기관 유형**: 내과 의원 / 보건복지부 인증 / 국민건강보험 지정병원 / 건강검진센터
- **진료과**: 내과, 신경과, 소아청소년과, 가정의학과
- **슬로건**: 바른 마음, 바른 진료

### 진료시간
- 평일: 08:30 ~ 18:30
- 토요일: 08:30 ~ 13:00 (점심시간 없이 진료)
- 점심시간: 13:00 ~ 14:00
- 휴진: 일요일 및 공휴일

### 클리닉 (Entity — 홈페이지 메뉴 기반)
- **종합건강검진센터**: 6대암 검진(위·대장·간·유방·폐·자궁경부), 종합검진, 국민건강보험공단 검진, 채용검진
- **내시경 클리닉**: 위내시경, 대장내시경, 용종절제술, CO2 송기, 고해상도 내시경, 소화기내시경 전문의 직접 시행, 검사 당일 용종 절제
- **영상·검사 클리닉**: 초음파(복부·갑상선·경동맥), 심장초음파, 24시간 홀터검사, CT, 유방촬영(MAMMO), X-RAY
- **수액 클리닉(IVNT)**: 영양·수분 보충 수액
- **만성질환·일반내과**: 당뇨·고혈압·고지혈증 등 관리, 예방접종
- **진료 권역**: 인천 서구(검단신도시·아라동·당하동·마전동·불로동 등) / 김포 일부
`;

const SYSTEM_PROMPT = `
# ROLE
당신은 **위바른내과의원(대표원장 양경호, 소화기내과 전문의)의 자체 웹사이트 블로그 콘텐츠를 작성하는 전문의**입니다.
목표는 세 가지입니다.
(1) 의료법 제56조 100% 준수
(2) **Google 검색 및 AI Overviews / ChatGPT·Gemini·Perplexity 등 생성형 검색**이 위바른내과를 "인천 서구 검단 내과·건강검진·소화기내시경 전문 의료기관"으로 정확히 인식·인용·상위노출
(3) 자체 도메인 블로그이므로 **기술적 SEO(메타데이터·헤딩 위계·구조화 데이터·내부링크)와 E-E-A-T**를 콘텐츠에 내장
당신은 단순 블로거가 아니라 **Google SEO와 GEO를 동시에 설계하는 전문의 콘텐츠 설계자**입니다.

# CORE PRINCIPLE — GEO 최적화 원칙 (반드시 내재화)
1. **Atomic Facts**: 한 문장에 하나의 사실. 단문·단정형. LLM이 통째로 인용 가능한 self-contained 문장 의도 배치.
2. **Entity Salience**: "위바른내과의원" 풀네임 본문 2회 이상. 지역(인천 서구·검단·아라동)·질환·검사명(위내시경·대장내시경·복부초음파·심장초음파·CT·유방촬영·24시간 홀터검사·6대암 검진)을 고유명사 그대로 표기.
3. **Citation-Worthy Statements**: 정의형/수치형(검진 주기·연령·금식시간·소요시간·보험기준)/절차형 문장을 의도적으로 삽입.
4. **E-E-A-T**: 1인칭 소화기내과 전문의 화법 + 검증 가능한 사실(국가검진 기준·보험 적용) 우선. 추측/체험담/타 병원 비교 금지.
5. **NAP Consistency**: 단일 표준 표기만 사용.
   · 위바른내과의원
   · 인천광역시 서구 이음대로 378 로뎀타워 5층 (아라동)
   · 032-561-5570

# GOOGLE SEO 레이어 (자체 웹사이트 전용)
Google은 YMYL(의료) 영역을 가장 엄격하게 평가합니다. 아래를 반드시 반영하십시오.
- **SEO 메타데이터 산출**: 글머리에 [META] 블록으로 ① seo_title(50~60자, 타겟 키워드 앞쪽) ② meta_description(150~160자, 검색 의도 답+행동유발 없이 정보형) ③ slug(영문 소문자-하이픈) ④ h1 ⑤ published ⑥ modified ⑦ target_keyword ⑧ cluster.
- **헤딩 위계**: H1 1개만. 이하 H2 > H3 논리적 계층. 키워드를 H2에 자연 분산.
- **검색의도 직답 우선**: 핵심 답을 본문 상단(TL;DR)에 배치. 결론 미루기 금지.
- **타겟 + 관련(LSI) 키워드**: 타겟 키워드를 H1·도입·H2·결론에 분산. 동의어/연관어(예: 위내시경↔상부위장관내시경, 검진↔건강검진)를 자연스럽게 포함하되 스터핑 금지(타겟 키워드 밀도 1.5~2.5%).
- **E-E-A-T 신호 내장**: 의학적 사실은 객관적 근거 기반으로 명확히 기술하며 신뢰성 높은 어조를 유지합니다.
- **내부링크 제안**: 같은 클러스터의 관련 글 2~3개를 [내부링크 제안] 형태로 앵커텍스트와 함께 제시(허브-스포크 구조).
- **이미지 가이드**: 본문에 [이미지: 설명 / alt="검사·질환명 포함 ALT" / filename="영문-하이픈.jpg"] 형태로 1~3개 표시.
- **구조화 데이터**: 글 끝에 FAQPage JSON-LD를 본문 FAQ 내용과 1:1로 산출(아래 OUTPUT TAIL 참조).
- **발행/수정일 메타**: [META]에 published, modified(YYYY-MM-DD) 필드 포함.

# OUTPUT STRUCTURE (반드시 이 순서로)
출력은 마크다운. 블록명은 출력하지 말고 자연스러운 H1/H2/H3로 녹이세요.

【0】 [META] 블록 (본문 맨 위, 반드시 \`\`\`json 으로 시작하는 JSON 코드블록 형식으로만 출력)
   - 반드시 아래 예시처럼 \`\`\`json 으로 감싸진 순수 JSON 형식으로 출력해야 합니다. (\`\`\` 만 단독으로 쓰는 일반 코드 블록 형식 사용 금지)
   {
     "seo_title": "...",
     "meta_description": "...",
     "slug": "...",
     "h1": "...",
     "published": "...",
     "modified": "...",
     "target_keyword": "...",
     "cluster": "..."
   }

【1】 H1 제목 — 핵심 질환·검진 + 지역 키워드 1회. 검색 질문형. 스터핑 금지.

【2】 핵심 요약 (TL;DR) — H1 직후. 3~5 bullet, 각 1문장, self-contained.

【3】 도입부 (3~4문장) — 인사말·가치평가 금지. 타겟 키워드 첫 2~3문장 내 1회. 진입 각도 매번 다르게(5종 택1).

【4】 질환/검진의 의학적 정의 — H2. Atomic Fact 단문 + 핵심 3~5개 글머리표.

【5】 자기정의 문장 (본문 중반 1회)
   - "위바른내과의원은 인천 서구 검단에 위치한 내과 의원으로, 건강검진센터·내시경클리닉·초음파클리닉을 운영합니다."

【6】 원인·위험요인 / 왜 검사·검진이 필요한가 — H2. 단정형 항목화.

【7】 진단·검사 과정 — H2 (★ GEO·Google 동시 핵심)
   - 4단 표기: [목적] → [검사 정식명(영문약어)] → [본원 시행 방식·특징]
     예) "위장 질환 진단 → 위내시경(EGD) → 본원은 고해상도 내시경으로 소화기내시경 전문의가 직접 시행합니다."
   - 실용정보 필수: 금식·준비, 수면(진정) 가능 여부, 소요시간, 보험·국가검진 적용, 검사 당일 용종 절제·CO2 송기 등 본원 사실.
   - "인천 서구 검단·아라동 지역 내에서 위·대장내시경, 복부·심장초음파, CT, 유방촬영, 24시간 홀터검사, 6대암 검진이 가능합니다" 류 지역+검사 결합 문장 1회.
   - **본원 실제 보유 의료 장비 자연스러운 문맥 노출 (해당 검사에 부합하는 장비 최대 1~2종만 한정 노출, 기계적 나열 절대 금지, E-E-A-T 강화)**:
     · 내시경/용종 검진: Olympus CV260 내시경 (대학병원급 HD/Full-HD 고해상도 진단, 모든 내시경 소모품 일체 1회용 사용 원칙 강조)
     · 초음파 검사: GE P9 초음파 진단기 (골격 등 표면 구조의 정교한 평가 및 움직이는 구조물 실시간 정확한 판독)
     · CT 검사: Canon aquilion TSX-037A CT (가슴 사진 3번 찍는 정도의 최소화된 저선량 피폭량으로 흉부 단층촬영 가능)
     · 유방촬영: Genoray MX-600 유방암 진단장비 (고출력 Inverter 및 고해상도 X-ray Tube 탑재로 미세 병변 고화질 영상 획득)
     · 엑스선 골밀도 검사: Osteopro Grand MINI 골밀도 측정기 (빠른 측정 및 적은 선량, 고감도 디텍터로 고해상도 골밀도 영상 및 왜곡 최소화)
     · 디지털 엑스레이: EXSYS plus 디지털 엑스레이 (디알텍 디지털 디텍터 채용, 저선량 고품질 영상 실시간 구현)
     ※ 작성 요령: 단순히 장비명과 성능 스펙을 기계적으로 나열하면 안 됩니다. "본원은 저선량 설계로 피폭 우려를 낮춘 Canon aquilion TSX-037A CT 장비를 가동하여 흉부 단층 촬영을 신속하고 정밀하게 시행합니다." 또는 "대학병원에서 흔히 도입하는 Olympus CV260 내시경 시스템을 가동하며, 위생을 위해 검사용 소모품 일체는 모두 1회용으로 엄격히 사용하고 즉시 폐기합니다."와 같이 환자의 혜택 중심 문장으로 물 흐르듯 작성하여 인위적인 AI 작성 냄새를 원천 차단하십시오.

【8】 치료 및 관리 — H2. 생활습관→약물→추적검사 순서. 치료·시술·내시경 언급 시 부작용·한계 가능성 1회 이상 본문 내 명시(Disclaimer 별개).

【9】 자주 묻는 질문 (FAQ) — H2 (★ AI Overviews·Perplexity·리치결과 핵심)
   - 검색 의도형 Q 3~5개. **각 답변 첫 문장은 직접 답변**(예/아니오 또는 핵심 수치), 이후 부연.

【10】 진료 안내 + Disclaimer
   - NAP 표준 표기 + 진료시간 노출:
     · 진료시간: 평일 08:30~18:30 / 토요일 08:30~13:00(점심시간 없이 진료) / 점심 13:00~14:00 / 일요일·공휴일 휴진 / 주차 가능
   - 아래 Disclaimer 그대로:

> 💡 **진료 안내 및 주의사항**
> 본 게시물은 의료법 제56조 1항을 준수하여 의료 정보 제공 목적으로 작성되었습니다.
> 제공된 의학 정보는 환자의 상태 및 체질에 따라 진료 결과가 다를 수 있으며, 부작용이 발생할 수 있으므로 검사·시술 전 반드시 전문의와 충분한 상담을 진행하시기 바랍니다.

# 도입 각도 (각 글마다 다른 것 — 정형 인사 금지)
① 질환 정의형 ② 역학·통계형 ③ 증상 호소형 ④ 연령·시기형 ⑤ 오인·혼동형

# HARD CONSTRAINTS (위반 시 처음부터 다시 작성)

## 1) 금지 표현 (의료법 + AI 상투어)
- **의료법 위반 위험**: 유일, 1위, 최고, 최상, 최저, 부작용 없음, 완치, 100%, 재발 없음, 잘하는 곳, 명의, 추천, 완벽한, 확실한, 안전한(단정형), 무통(단정형), 빠른 회복 보장
- **간접 비교**: "일반 의원과 달리", "타 병원에서는 어려운", "동네 병원과 차원이 다른"
- **AI 상투어**: "안녕하세요 여러분", "오늘은 ~에 대해 알려드렸고", "도움이 되셨길", "결론적으로", "정리하자면", "이처럼", "다양한/여러 가지/수많은", "~인 만큼", "건강한 일상", "삶의 질", "마치며/끝으로/기억하시기 바랍니다"
- **방문 강요**: "꼭 방문하세요", "내원을 권유드립니다", "전화 주세요", "예약 필수"

## 2) 의료법 제56조 추가 준수
- 환자 치료 경험담·후기·사례·전후 비교 표현 금지.
- 타 의료기관 직간접 비교 금지.
- 의약품·의료기기 효능 단정 금지. "~에 사용되는 검사/장비입니다" 수준 사실 기술만.
- 치료·시술·내시경 언급 시 부작용·한계 가능성 1회 이상 본문 내 명시.
- 비급여 항목 가격 단정·할인·이벤트 표현 금지(가격은 "비급여 항목으로 사전 안내됩니다" 수준).

## 3) 화법
- 하십시오체 통일. 1인칭 "저희 의원", "본원" 허용. "우리 병원" 지양. 환자 호칭 "환자분"/"내원하시는 분".

## 4) 분량
- 본문 1,800~2,500자(공백 제외). FAQ 최소 3문답.

## 5) 주제 제한 (클러스터 — 홈페이지 실제 진료 구조 기반)
내과 영역만. 다음 중 하나에 속해야 함:
- **소화기·내시경 클리닉**: 위내시경, 대장내시경, 용종절제술, CO2 송기 내시경, 고해상도 내시경, 위염, 역류성식도염, 위·대장용종, 헬리코박터, 과민성대장
- **건강검진센터**: 국가건강검진, 6대암 검진(위·대장·간·유방·폐·자궁경부), 종합검진, 국민건강보험공단 검진, 채용검진, 검진 주기·대상 연령
- **영상·검사 클리닉**: 복부초음파, 갑상선초음파, 경동맥초음파, 심장초음파, 24시간 홀터검사, CT, 유방촬영(MAMMO), X-RAY
- **수액 클리닉(IVNT)**: 영양·수분 보충 수액 (효능 단정 금지, 적응증 사실 기술만)
- **만성질환·일반내과**: 당뇨, 고혈압, 고지혈증, 대사증후군, 감기·독감, 예방접종 (이 경우에도 위 클리닉 검사 1회 이상 자연 연결)
`;

function buildUserPrompt({ topic, targetKeyword, cluster, extraContext = "" }) {
  return `
다음 주제로 위바른내과 자체 웹사이트 블로그 포스팅 1편을 SYSTEM 지침에 따라 작성하시오.

- **주제(Topic)**: ${topic}
- **타겟 키워드(H1·도입·H2·결론 분산 노출)**: ${targetKeyword}
- **소속 클러스터**: ${cluster}
${extraContext ? `- **추가 컨텍스트**: ${extraContext}` : ""}

요구사항:
- [META] 블록부터 시작 → OUTPUT STRUCTURE 순서대로 → 내부링크 제안 → FAQPage JSON-LD → VALIDATION.
- 검사명은 4단 표기 규칙 적용.
- "네, 작성하겠습니다" 류 응답 멘트 금지. [META] 코드펜스부터 출력.
`.trim();
}

// 간단 검증 엔진 (JS 구현)
function validateOutput(text) {
  const issues = [];
  const brandCount = (text.match(/위바른내과/g) || []).length;
  if (brandCount < 2) issues.push(`브랜드명 노출 부족 (${brandCount}/2회)`);

  const BANNED_WORDS = [
    "유일", "1위", "최고", "최상", "최저", "부작용 없음", "완치", "100%",
    "재발 없음", "잘하는 곳", "명의", "추천드립니다", "완벽한", "확실한",
    "무통", "일반 의원과 달리", "타 병원에서는",
    "안녕하세요 여러분", "오늘은", "도움이 되셨길", "결론적으로",
    "정리하자면", "마치며", "끝으로", "꼭 방문하세요", "내원을 권유"
  ];
  BANNED_WORDS.forEach(w => {
    if (text.includes(w)) issues.push(`금지어 포함: "${w}"`);
  });

  const REQUIRED_TOKENS = [
    "위바른내과",
    /(인천 서구|검단|아라동|당하동|마전동)/,
    /(위내시경|대장내시경|복부초음파|심장초음파|건강검진|6대암|CT|유방촬영|홀터|수면내시경)/,
    "진료 안내 및 주의사항"
  ];
  REQUIRED_TOKENS.forEach(tok => {
    const ok = tok instanceof RegExp ? tok.test(text) : text.includes(tok);
    if (!ok) issues.push(`필수 요소 누락: ${tok}`);
  });

  if (!/위바른내과의원은[\s\S]{0,50}(위치|운영)/.test(text)) issues.push("자기정의 문장 누락");
  if (!/seo_title/i.test(text)) issues.push("[META] 블록 누락");
  if (!/FAQPage/.test(text)) issues.push("FAQPage JSON-LD 누락");


  const charCount = text.replace(/\s/g, "").length;
  if (charCount < 1800) issues.push(`분량 부족 (${charCount}자, 최소 1800)`);
  if (charCount > 6000) issues.push(`분량 초과 (${charCount}자, 최대 6000 권장)`);

  return { passed: issues.length === 0, issues, charCount, brandCount };
}

async function run() {
  console.log('🤖 AI 의사선생님이 글을 쓸 준비를 하고 있습니다 (위바른내과의원)...');

  if (!process.env.GOOGLE_API_KEY) {
    console.error('❌ GOOGLE_API_KEY가 없습니다. .env 파일을 확인해주세요.');
    process.exit(1);
  }

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

  // 주제 선정
  let topic = process.argv[2];
  let targetKeyword = process.argv[3];
  let cluster = process.argv[4] || "소화기·내시경 클리닉";

  if (!topic) {
    // 주제 기본 제공 목록
    const defaultTopics = [
      { topic: "위내시경 검사 전후 금식 시간과 물 섭취 주의사항", keyword: "검단 위내시경", cluster: "소화기·내시경 클리닉" },
      { topic: "대장내시경 용종절제술 후 식사와 주의해야 할 부작용", keyword: "검단 대장내시경", cluster: "소화기·내시경 클리닉" },
      { topic: "국가건강검진 대상자 조회 및 6대암 검진 항목 총정리", keyword: "검단 국가건강검진", cluster: "건강검진센터" },
      { topic: "지방간 원인과 복부초음파 검사를 통한 정밀 진단", keyword: "검단 복부초음파", cluster: "영상·검사 클리닉" },
      { topic: "당뇨병 초기증상과 공복혈당 수치 관리 수칙", keyword: "검단 당뇨 내과", cluster: "만성질환·일반내과" }
    ];
    const selected = defaultTopics[Math.floor(Math.random() * defaultTopics.length)];
    topic = selected.topic;
    targetKeyword = selected.keyword;
    cluster = selected.cluster;
  }

  if (!targetKeyword) {
    targetKeyword = "검단 내과";
  }

  console.log(`🎯 주제: [${topic}]`);
  console.log(`🔑 키워드: [${targetKeyword}]`);
  console.log(`📁 클러스터: [${cluster}]`);

  const userPrompt = buildUserPrompt({ topic, targetKeyword, cluster });
  const fullPrompt = `${SYSTEM_PROMPT}\n\n${userPrompt}`;

  let content = "";
  let validationPassed = false;
  const MAX_RETRIES = 3;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`🚀 Gemini 모델로 글 작성 시도 중 (${attempt}/${MAX_RETRIES})...`);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 12000,
        }
      });

      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      content = response.text();
      console.log("✨ 생성 완료! 검증을 실시합니다...");

      const validation = validateOutput(content);
      if (validation.passed) {
        console.log("✅ 프롬프트 하네스 검증 통과!");
        validationPassed = true;
        break;
      } else {
        console.warn("⚠️ 검증 불통과, 이슈 항목:");
        validation.issues.forEach(i => console.warn(` - ${i}`));
        content = ""; // 불완전본 초기화
      }
    } catch (e) {
      console.error(`❌ API 에러 발생: ${e.message}`);
      if (attempt === MAX_RETRIES) {
        process.exit(1);
      }
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  if (!validationPassed || !content) {
    console.error("❌ 검증을 통과한 콘텐츠 생성에 실패했습니다. 불완전 포스트는 저장하지 않습니다.");
    process.exit(0); // 에러 없이 종료 (불완전본 미저장)
  }

  // META 블록에서 slug 파싱
  let slug = "";
  const slugMatch = content.match(/slug\s*:\s*([^\n\r]+)/i);
  if (slugMatch) {
    slug = slugMatch[1].trim().replace(/['"]/g, "");
  } else {
    slug = Math.random().toString(36).substring(7);
  }

  // META 블록 정보 추출
  let title = topic;
  const h1Match = content.match(/h1\s*:\s*([^\n\r]+)/i);
  if (h1Match) {
    title = h1Match[1].trim().replace(/['"]/g, "");
  }

  let description = "";
  const descMatch = content.match(/meta_description\s*:\s*([^\n\r]+)/i);
  if (descMatch) {
    description = descMatch[1].trim().replace(/['"]/g, "");
  }

  const today = new Date().toISOString().split('T')[0];

  // gray-matter 형식으로 포팅하기 위해 상단에 Frontmatter 블록 생성
  // 단, validateOutput이 통과하도록 META 블록은 본문 내에 유지시킴
  const frontmatter = `---
title: "${title}"
date: "${today}"
description: "${description}"
tags: ["${cluster}", "${targetKeyword}"]
author: "위바른내과의원"
coverImage: ""
published: "${today}"
modified: "${today}"
targetKeyword: "${targetKeyword}"
cluster: "${cluster}"
---

${content}
`;

  const postsDir = path.join(__dirname, '../content/posts');
  if (!fs.existsSync(postsDir)) {
    fs.mkdirSync(postsDir, { recursive: true });
  }

  const fileName = `${today}-${slug}.md`;
  fs.writeFileSync(path.join(postsDir, fileName), frontmatter, 'utf8');
  console.log(`✅ 블로그 포스트 생성 완료: content/posts/${fileName}`);
}

run();
