import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { Metadata } from 'next';
import Link from 'next/link';
import InteractiveDetail from './InteractiveDetail';

interface Props {
  params: Promise<{ slug: string }>;
}

// 빌드 시점에 정적 페이지 생성을 위한 함수
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// 동적 SEO 메타데이터 생성
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: '페이지를 찾을 수 없습니다 | 위바른내과의원',
    };
  }

  return {
    title: `${post.seoTitle || post.title} | 위바른내과의원`,
    description: post.metaDescription || post.description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.published || post.date,
      modifiedTime: post.modified || post.date,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/blog/${post.slug}`,
      siteName: '위바른내과의원 공식블로그',
      images: [
        {
          url: post.coverImage || '/images/og-default.jpg',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const rawContent = post.content;

  // 1. FAQPage JSON-LD 파싱 및 추출 (코드 펜스 내 JSON 추출)
  let embeddedJsonLd: any = null;
  const jsonLdMatch = rawContent.match(/```json\s*(\{[\s\S]+?\})\s*```/i);
  if (jsonLdMatch) {
    try {
      embeddedJsonLd = JSON.parse(jsonLdMatch[1]);
    } catch (e) {
      console.error('JSON-LD 파싱 실패:', e);
    }
  }

  // 2. 자주 묻는 질문(FAQ) 섹션 분리 및 어코디언용 객체 파싱
  const faqSectionMatch = rawContent.match(/##\s+자주\s+묻는\s+질문[\s\S]+/i);
  let mainContent = rawContent;
  const faqs: { question: string; answer: string }[] = [];

  if (faqSectionMatch) {
    const faqSection = faqSectionMatch[0];
    // 본문에서는 FAQ 원본 섹션 텍스트를 제거하고 아코디언 컴포넌트로 따로 그림
    mainContent = rawContent.substring(0, rawContent.indexOf(faqSection));

    // Q와 A 목록 매칭
    const qMatches = faqSection.match(/(?:Q\.|Q:)\s*([^\n\r]+)/gi) || [];
    const aMatches = faqSection.match(/(?:A\.|A:)\s*([^\n\r]+)/gi) || [];

    for (let i = 0; i < qMatches.length; i++) {
      const questionText = qMatches[i].replace(/^(?:Q\.|Q:)\s*/i, '').replace(/\*\*|__/g, '').trim();
      const answerText = aMatches[i] ? aMatches[i].replace(/^(?:A\.|A:)\s*/i, '').replace(/\*\*|__/g, '').trim() : '';
      if (questionText) {
        faqs.push({ question: questionText, answer: answerText });
      }
    }
  }

  // 본문에서 JSON 코드 블록(상단 메타데이터 및 하단 FAQPage 등)을 완전히 제거하여 독자에게 노출되지 않도록 함
  mainContent = mainContent.replace(/```json[\s\S]*?```/gi, '');

  // 내부링크 제안 추천 텍스트 영역을 본문에서 잘라내어 제거함
  const internalLinkIndex = mainContent.indexOf('[내부링크 제안]');
  if (internalLinkIndex !== -1) {
    mainContent = mainContent.substring(0, internalLinkIndex);
  }

  // 3. 본문 중 이미지 가이드 마크다운 텍스트를 완전히 제거 (GEO용 텍스트 집중을 위해 이미지 레이아웃 제외)
  const imageGuideRegex = /\[이미지:\s*(.*?)\s*\/\s*alt="(.*?)"\s*\/\s*filename="(.*?)"\]/g;
  mainContent = mainContent.replace(imageGuideRegex, '');

  // 4. 본문 헤딩(H2/H3) 목록 추출 (TOC 생성용)
  const headingLines = mainContent.split('\n');
  const headings = headingLines
    .filter((line) => line.startsWith('## ') || line.startsWith('### '))
    .map((line) => {
      const isH3 = line.startsWith('### ');
      const text = line.replace(/^###?\s+/, '').replace(/\*\*|__/g, '').trim();
      const id = encodeURIComponent(text.replace(/\s+/g, '-').toLowerCase());
      return { text, id, isH3 };
    });

  // 5. 기본 BlogPosting 구조화 데이터 구성
  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.published || post.date,
    dateModified: post.modified || post.date,
    author: {
      '@type': 'Physician',
      name: '양경호',
      medicalSpecialty: 'Gastroenterology',
      worksFor: {
        '@type': 'MedicalClinic',
        name: '위바른내과의원',
        url: 'http://webarunclinic.co.kr',
      },
    },
  };

  return (
    <div className="detail-container">
      {/* 구글 검색 크롤러용 구조화 데이터 삽입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      {embeddedJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(embeddedJsonLd) }}
        />
      )}

      {/* 왼쪽 메인 본문 영역 */}
      <article className="detail-main">
        {/* 뒤로가기 버튼 */}
        <div style={{ marginBottom: '2rem' }}>
          <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            ← 건강정보 목록으로 돌아가기
          </Link>
        </div>

        {/* 아티클 헤더 */}
        <header className="detail-header">
          <div className="detail-category">{post.cluster}</div>
          <h1 className="detail-title">{post.title}</h1>
          <div className="detail-meta-row">
            <div className="detail-author-badges">
              <span className="badge-eeat">전문가 작성·감수</span>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>양경호 원장</span>
              <span style={{ color: 'var(--text-muted)' }}>소화기내과 전문의</span>
            </div>
            <time>{post.date}</time>
          </div>
        </header>

        {/* 요약본 / 리드문 (TL;DR) */}
        {post.description && (
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-primary)', background: 'rgba(16, 185, 129, 0.05)', borderLeft: '4px solid var(--primary)', padding: '1.25rem 1.75rem', borderRadius: '0 16px 16px 0', lineHeight: '1.7', fontWeight: 500 }}>
              {post.description}
            </p>
          </div>
        )}

        {/* 마크다운 랜더러 본문 */}
        <div className="markdown-body">
          <ReactMarkdown
            components={{
              h2: ({ ...props }) => {
                const text = String(props.children || '');
                const id = encodeURIComponent(text.replace(/\s+/g, '-').toLowerCase());
                return <h2 id={id} {...props} />;
              },
              h3: ({ ...props }) => {
                const text = String(props.children || '');
                const id = encodeURIComponent(text.replace(/\s+/g, '-').toLowerCase());
                return <h3 id={id} {...props} />;
              },
            }}
          >
            {mainContent}
          </ReactMarkdown>
        </div>

        {/* 의사 프로필 배지 위젯 (E-E-A-T 신호 강화) */}
        <div className="author-stamp-widget">
          <div className="doctor-avatar">🩺</div>
          <div className="doctor-info">
            <div className="doctor-name">양경호 대표원장</div>
            <div className="doctor-title">위바른내과의원 소화기내과 전문의</div>
            <p className="doctor-bio">
              위바른내과의원은 풍부한 임상경험을 바탕으로 위·대장 내시경, 대장용종 당일절제술 및 5대암 국가건강검진을 전문적으로 시행합니다. 환자 개개인의 안전을 최우선으로 생각하며 바른 마음으로 정직하게 진료합니다.
            </p>
          </div>
        </div>

        {/* 경고/주의사항 안내판 */}
        <div style={{ marginTop: '2.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.5rem' }}>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
            💡 진료 안내 및 주의사항
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            본 게시물은 의료법 제56조 1항을 준수하여 의료 정보 제공 목적으로 작성되었습니다. 제공된 의학 정보는 환자의 상태 및 체질에 따라 진료 결과가 다를 수 있으며, 부작용이 발생할 수 있으므로 검사·시술 전 반드시 전문의와 충분한 상담을 진행하시기 바랍니다.
          </p>
        </div>
      </article>

      {/* 오른쪽 사이드바 (TOC 및 예약 위젯) + 하단 FAQs (클라이언트 공유 컴포넌트) */}
      <InteractiveDetail headings={headings} faqs={faqs} />
    </div>
  );
}
