export interface TopicItem {
  cluster: string;
  targetKeyword: string;
  topic: string;
}

export const TOPIC_POOL: TopicItem[] = [
  // 소화기·내시경 클리닉
  { 
    cluster: '소화기·내시경 클리닉', 
    targetKeyword: '검단 위내시경', 
    topic: '위내시경 검사 전 물 마셔도 되나요? 금식 가이드' 
  },
  { 
    cluster: '소화기·내시경 클리닉', 
    targetKeyword: '검단 용종절제술', 
    topic: '대장내시경 용종절제술 당일 시술 가능 여부와 식사 관리' 
  },
  { 
    cluster: '소화기·내시경 클리닉', 
    targetKeyword: '역류성식도염 검단', 
    topic: '역류성식도염 가슴 통증 증상과 내과 내시경 검사 필요성' 
  },
  { 
    cluster: '소화기·내시경 클리닉', 
    targetKeyword: '헬리코박터 검사 인천 서구', 
    topic: '헬리코박터균 검사 주기와 제균 치료 부작용 예방' 
  },
  
  // 건강검진센터
  { 
    cluster: '건강검진센터', 
    targetKeyword: '검단 국가건강검진', 
    topic: '국가건강검진 항목 대상자 조회 및 올해 검사 주기' 
  },
  { 
    cluster: '건강검진센터', 
    targetKeyword: '검단 6대암 검진', 
    topic: '6대암 건강검진 위암 대장암 유방암 대상 연령과 검사항목' 
  },
  { 
    cluster: '건강검진센터', 
    targetKeyword: '검단 공단검진', 
    topic: '공단검진 전 금식 시간과 전날 술 섭취 시 영향' 
  },
  
  // 영상·검사 클리닉
  { 
    cluster: '영상·검사 클리닉', 
    targetKeyword: '검단 복부초음파', 
    topic: '오른쪽 옆구리 통증 원인 진단을 위한 복부 초음파 검사' 
  },
  { 
    cluster: '영상·검사 클리닉', 
    targetKeyword: '검단 24시간 홀터검사', 
    topic: '가슴 두근거림 심장 부정맥 확인을 위한 24시간 홀터 검사' 
  },
  { 
    cluster: '영상·검사 클리닉', 
    targetKeyword: '지방간 검사 인천 서구', 
    topic: '지방간 원인과 정밀 진단 복부초음파 검사 필요성' 
  },
  { 
    cluster: '영상·검사 클리닉', 
    targetKeyword: '검단 유방촬영', 
    topic: '유방암 유방촬영 통증 줄이는 팁과 치밀유방 정밀 검사' 
  },
  
  // 수액 클리닉(IVNT)
  { 
    cluster: '수액 클리닉(IVNT)', 
    targetKeyword: '검단 영양수액', 
    topic: '만성 피로 회복을 위한 내과 영양 수액 종류와 성분' 
  },
  { 
    cluster: '수액 클리닉(IVNT)', 
    targetKeyword: '인천 서구 수액', 
    topic: '탈수 증상 해결을 위한 아미노산 수분 보충 수액 주의사항' 
  },
  
  // 만성질환·일반내과
  { 
    cluster: '만성질환·일반내과', 
    targetKeyword: '검단 고혈압 관리', 
    topic: '고혈압 공복 수치 측정법과 약물 치료 시 주의할 부작용' 
  },
  { 
    cluster: '만성질환·일반내과', 
    targetKeyword: '검단 당뇨 내과', 
    topic: '당뇨병 초기 증상 3가지와 공복 혈당 관리 식이요법' 
  },
  { 
    cluster: '만성질환·일반내과', 
    targetKeyword: '검단 예방접종', 
    topic: '독감 예방접종 시기와 감기 독감 차이점 및 내과 예방 접종' 
  }
];

export function getNextTopic(existingFileCount: number): TopicItem {
  if (TOPIC_POOL.length === 0) {
    throw new Error('주제 풀(TOPIC_POOL)이 비어 있습니다.');
  }
  const index = Math.max(0, existingFileCount) % TOPIC_POOL.length;
  return TOPIC_POOL[index];
}
