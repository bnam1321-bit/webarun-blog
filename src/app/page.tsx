'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  coverImage?: string;
  cluster?: string;
  targetKeyword?: string;
}

const CLUSTERS = [
  { name: '전체보기', id: 'all' },
  { name: '소화기·내시경 클리닉', id: '소화기·내시경 클리닉' },
  { name: '건강검진센터', id: '건강검진센터' },
  { name: '영상·검사 클리닉', id: '영상·검사 클리닉' },
  { name: '수액 클리닉(IVNT)', id: '수액 클리닉(IVNT)' },
  { name: '만성질환·일반내과', id: '만성질환·일반내과' },
];

function getClusterEnglish(clusterName?: string) {
  switch (clusterName) {
    case '소화기·내시경 클리닉':
      return 'GI Endoscopy';
    case '건강검진센터':
      return 'Health Checkup';
    case '영상·검사 클리닉':
      return 'Imaging & Ultrasound';
    case '수액 클리닉(IVNT)':
      return 'IV Therapy (IVNT)';
    case '만성질환·일반내과':
      return 'Chronic Care';
    default:
      return 'Webarun Clinic';
  }
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCluster, setSelectedCluster] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 포스트 데이터 가져오기
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/posts');
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        }
      } catch (error) {
        console.error('포스트 로딩 중 오류:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  // 결정론적 그라디언트 배경색 지정 (슬러그 기준)
  const getGlowColor = (clusterName?: string) => {
    switch (clusterName) {
      case '소화기·내시경 클리닉':
        return '#0D9488'; // Teal
      case '건강검진센터':
        return '#0284C7'; // Blue
      case '영상·검사 클리닉':
        return '#0369A1'; // Deep Blue
      case '수액 클리닉(IVNT)':
        return '#8B5CF6'; // Violet
      case '만성질환·일반내과':
        return '#F59E0B'; // Amber
      default:
        return '#0D9488';
    }
  };

  // 컨셉을 해치지 않는 고급 메디컬 파스텔톤 커버 배경 그라디언트
  const getCoverBackground = (clusterName?: string) => {
    switch (clusterName) {
      case '소화기·내시경 클리닉':
        return 'linear-gradient(135deg, #E6FBF0 0%, #F0FDF4 100%)'; // Soft Teal Green
      case '건강검진센터':
        return 'linear-gradient(135deg, #E0F2FE 0%, #F0F9FF 100%)'; // Soft Blue
      case '영상·검사 클리닉':
        return 'linear-gradient(135deg, #E0F7FA 0%, #E8F8F9 100%)'; // Soft Cyan
      case '수액 클리닉(IVNT)':
        return 'linear-gradient(135deg, #F3E8FF 0%, #F9F5FF 100%)'; // Soft Lavender
      case '만성질환·일반내과':
        return 'linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 100%)'; // Soft Amber/Sand
      default:
        return 'linear-gradient(135deg, #F4F4F5 0%, #FAFAFA 100%)'; // Soft Gray
    }
  };

  // 필터링 적용된 포스트 목록
  const filteredPosts = posts.filter((post) => {
    const matchesCluster =
      selectedCluster === 'all' || post.cluster === selectedCluster;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCluster && matchesSearch;
  });

  return (
    <div style={{ paddingBottom: '5rem' }}>
      {/* 1. 영웅 섹션 - 깔끔한 센터 정렬 */}
      <section className="hero-section">
        <h5 className="hero-subtitle">위바른내과의원 의학 매거진</h5>
        <h1 className="hero-title">올바른 의학 정보를<br />쉽고 직관적으로 전합니다</h1>
        <p className="hero-description">
          인천 서구 검단 위바른내과의원 의료진이 감수하는 공식 건강 채널입니다. 의료법을 준수하여 환자분들께 안전하고 신뢰할 수 있는 정확한 정보만을 기록합니다.
        </p>
      </section>

      {/* 2. 진료 기관 기본 안내 배너 */}
      <section className="clinic-ticker-banner">
        <div className="ticker-card">
          <div className="ticker-item">
            <span className="ticker-icon">📍</span>
            <div>
              <span className="ticker-label">의원 주소</span>
              <span className="ticker-val">인천 서구 이음대로 378 로뎀타워 5층 (아라동)</span>
            </div>
          </div>
          <div className="ticker-item">
            <span className="ticker-icon">📞</span>
            <div>
              <span className="ticker-label">진료 상담</span>
              <span className="ticker-val">032-561-5570</span>
            </div>
          </div>
          <div className="ticker-item">
            <span className="ticker-icon">⏰</span>
            <div>
              <span className="ticker-label">진료 안내</span>
              <span className="ticker-val">평일 08:30~18:30 / 토요일 08:30~13:00 (점심없음)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 카테고리 알약 필터 및 검색창 (직관적인 2열 정렬) */}
      <section className="cluster-nav-container">
        <div className="cluster-grid-row">
          <div>
            <h3 className="cluster-title">관심 카테고리 선택</h3>
            <div className="cluster-flex-row">
              {CLUSTERS.map((cl) => {
                const count = cl.id === 'all'
                  ? posts.length
                  : posts.filter(p => p.cluster === cl.id).length;
                return (
                  <button
                    key={cl.id}
                    className={`cluster-btn ${selectedCluster === cl.id ? 'active' : ''}`}
                    onClick={() => setSelectedCluster(cl.id)}
                  >
                    {cl.name}
                    <span className="cluster-count">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="cluster-title" style={{ fontSize: '0.85rem' }}>의학 칼럼 검색</h3>
            <div className="search-box-editorial">
              <input
                type="text"
                className="search-input-editorial"
                placeholder="검색어를 입력해 주세요 (예: 내시경, 지방간)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="search-btn-editorial">검색</button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 직관적인 3열 포스트 그리드 피드 */}
      <section className="blog-section">
        {loading ? (
          <div className="blog-grid">
            {[1, 2, 3].map((n) => (
              <div key={n} className="blog-card" style={{ height: '340px', opacity: 0.5 }}>
                <div className="card-cover">
                  <div className="loader-spinner"></div>
                </div>
                <div className="card-body">
                  <div style={{ height: '16px', background: 'var(--border-color)', marginBottom: '0.75rem', width: '30%' }}></div>
                  <div style={{ height: '24px', background: 'var(--border-color)', marginBottom: '0.75rem', width: '90%' }}></div>
                  <div style={{ height: '48px', background: 'var(--border-color)' }}></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📝</span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>일치하는 건강 정보 글이 없습니다</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              {searchQuery ? '입력하신 검색어와 관련된 의학 칼럼이 저널 데이터베이스에 없습니다.' : '발행된 글이 없습니다. 글 작성을 통해 채널을 활성화해보세요.'}
            </p>
            {!searchQuery && (
              <Link href="/admin" className="nav-button-admin" style={{ marginTop: '1rem' }}>
                건강 정보 글 작성하기 🚀
              </Link>
            )}
          </div>
        ) : (
          <div className="blog-grid">
            {filteredPosts.map((post) => {
              const themeColor = getGlowColor(post.cluster);
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="blog-card"
                  style={{ 
                    '--bg-glow-color': themeColor,
                    '--cover-bg': getCoverBackground(post.cluster)
                  } as React.CSSProperties}
                >
                  {/* 정갈한 파스텔 단색식 헤더 */}
                  <div className="card-cover">
                    <div className="card-cover-pattern"></div>
                    <div className="card-cover-gradient"></div>
                    <div className="card-cover-content">
                      <span className="card-cover-brand-badge">
                        {getClusterEnglish(post.cluster)}
                      </span>
                      <h2 className="card-cover-h2">{post.title}</h2>
                    </div>
                  </div>

                  {/* 카드 내용 */}
                  <div className="card-body">
                    <div className="card-meta">
                      <span className="card-cluster-badge">{post.cluster}</span>
                      <time className="card-date">{post.date}</time>
                    </div>
                    <p className="card-description">{post.description}</p>
                    
                    <div className="card-footer">
                      <div className="card-tags">
                        {post.tags.slice(0, 2).map((t, idx) => (
                          <span key={idx} className="card-tag">#{t}</span>
                        ))}
                      </div>
                      <span className="card-link-text">
                        자세히 보기 →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
