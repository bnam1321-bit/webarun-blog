'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface PostSummary {
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
  { name: '전체 글', id: 'all' },
  { name: '소화기·내시경 클리닉', id: '소화기·내시경 클리닉' },
  { name: '건강검진센터', id: '건강검진센터' },
  { name: '영상·검사 클리닉', id: '영상·검사 클리닉' },
  { name: '수액 클리닉(IVNT)', id: '수액 클리닉(IVNT)' },
  { name: '만성질환·일반내과', id: '만성질환·일반내과' },
];

function getClusterLabel(clusterName?: string) {
  switch (clusterName) {
    case '소화기·내시경 클리닉':
      return '위·대장내시경 · 소화기';
    case '건강검진센터':
      return '공단검진 · 6대암검진';
    case '영상·검사 클리닉':
      return '초음파 · 저선량 CT · 심장검사';
    case '수액 클리닉(IVNT)':
      return '영양수액 · 피로회복';
    case '만성질환·일반내과':
      return '고혈압 · 당뇨 · 고지혈증';
    default:
      return '위바른내과 건강칼럼';
  }
}

export default function BlogListClient({ initialPosts }: { initialPosts: PostSummary[] }) {
  const [selectedCluster, setSelectedCluster] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getGlowColor = (clusterName?: string) => {
    switch (clusterName) {
      case '소화기·내시경 클리닉':
        return '#0D9488';
      case '건강검진센터':
        return '#0284C7';
      case '영상·검사 클리닉':
        return '#0369A1';
      case '수액 클리닉(IVNT)':
        return '#8B5CF6';
      case '만성질환·일반내과':
        return '#F59E0B';
      default:
        return '#0D9488';
    }
  };

  const getCoverBackground = (clusterName?: string) => {
    switch (clusterName) {
      case '소화기·내시경 클리닉':
        return 'linear-gradient(135deg, #E6FBF0 0%, #F0FDF4 100%)';
      case '건강검진센터':
        return 'linear-gradient(135deg, #E0F2FE 0%, #F0F9FF 100%)';
      case '영상·검사 클리닉':
        return 'linear-gradient(135deg, #E0F7FA 0%, #E8F8F9 100%)';
      case '수액 클리닉(IVNT)':
        return 'linear-gradient(135deg, #F3E8FF 0%, #F9F5FF 100%)';
      case '만성질환·일반내과':
        return 'linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 100%)';
      default:
        return 'linear-gradient(135deg, #F4F4F5 0%, #FAFAFA 100%)';
    }
  };

  const filteredPosts = initialPosts.filter((post) => {
    const matchesCluster =
      selectedCluster === 'all' || post.cluster === selectedCluster;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.description.toLowerCase().includes(q) ||
      (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(q)));
    return matchesCluster && matchesSearch;
  });

  return (
    <>
      {/* 진료 분야 탭 필터 및 검색창 */}
      <section className="cluster-nav-container" aria-label="진료 분야 및 검색">
        <div className="cluster-grid-row">
          <div>
            <h2 className="cluster-title">진료 분야별 보기</h2>
            <div className="cluster-flex-row">
              {CLUSTERS.map((cl) => {
                const count =
                  cl.id === 'all'
                    ? initialPosts.length
                    : initialPosts.filter((p) => p.cluster === cl.id).length;
                return (
                  <button
                    key={cl.id}
                    type="button"
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
            <h2 className="cluster-title" style={{ fontSize: '0.85rem' }}>
              증상·검사 검색
            </h2>
            <div className="search-box-editorial">
              <input
                type="search"
                className="search-input-editorial"
                placeholder="궁금한 증상이나 검사명 (예: 위내시경, 금식, 용종)"
                aria-label="건강 칼럼 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="button" className="search-btn-editorial">
                검색
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 포스트 그리드 목록 (서버 사이드 초기 렌더링 포함) */}
      <section className="blog-section" aria-label="건강 칼럼 목록">
        {filteredPosts.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🔍</span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
              찾으시는 내용의 글이 아직 없습니다
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              다른 검색어를 입력하시거나 위 진료 분야 탭에서 원하시는 주제를 선택해 보세요.
            </p>
          </div>
        ) : (
          <div className="blog-grid">
            {filteredPosts.map((post) => {
              const themeColor = getGlowColor(post.cluster);
              return (
                <article key={post.slug} className="blog-card-wrapper" style={{ display: 'flex' }}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="blog-card"
                    style={
                      {
                        width: '100%',
                        '--bg-glow-color': themeColor,
                        '--cover-bg': getCoverBackground(post.cluster),
                      } as React.CSSProperties
                    }
                  >
                    <div className="card-cover">
                      <div className="card-cover-pattern"></div>
                      <div className="card-cover-gradient"></div>
                      <div className="card-cover-content">
                        <span className="card-cover-brand-badge">
                          {getClusterLabel(post.cluster)}
                        </span>
                        <h3 className="card-cover-h2">{post.title}</h3>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="card-meta">
                        <span className="card-cluster-badge">{post.cluster}</span>
                        <time className="card-date" dateTime={post.date}>
                          {post.date}
                        </time>
                      </div>
                      <p className="card-description">{post.description}</p>

                      <div className="card-footer">
                        <div className="card-tags">
                          {post.tags.slice(0, 2).map((t, idx) => (
                            <span key={idx} className="card-tag">
                              #{t}
                            </span>
                          ))}
                        </div>
                        <span className="card-link-text">글 읽기 →</span>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
