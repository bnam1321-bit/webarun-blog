import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { Metadata } from 'next';
import Link from 'next/link';
import InteractiveDetail from './InteractiveDetail';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: '페이지를 찾을 수 없습니다 | 위바른내과의원',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://webarunim.co.kr';
  const desc = post.metaDescription || post.description;

  return {
    title: `${post.seoTitle || post.title} | 위바른내과의원`,
    description: desc,
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: desc,
      type: 'article',
      publishedTime: post.published || post.date,
      modifiedTime: post.modified || post.date,
      url: `${siteUrl}/blog/${post.slug}`,
      siteName: '위바른내과의원 건강 칼럼',
      images: [
        {
          url: post.coverImage || '/logo.png',
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

  // 1. 모든 JSON 코드 펜스를 검사하여 실제 FAQPage JSON-LD만 정확히 추출 ([META] 블록과 혼동 방지)
  let embeddedJsonLd: any = null;
  const allJsonBlocks = [...rawContent.matchAll(/```json\s*(\{[\s\S]*?\})\s*```/gi)];
  for (const match of allJsonBlocks) {
    try {
      const parsed = JSON.parse(match[1]);
      if (parsed['@type'] === 'FAQPage' || parsed['@context']) {
        embeddedJsonLd = parsed;
        break;
      }
    } catch {
      // 무시하고 다음 블록 확인
    }
  }

  // 2. 본문에서 JSON 코드 블록, [META] 블록, HTML 주석(VALIDATION) 제거
  let mainContent = rawContent;
  mainContent = mainContent.replace(/```json[\s\S]*?```/gi, '');
  mainContent = mainContent.replace(/```json[\s\S]*$/gi, '');
  mainContent = mainContent.replace(/\[FAQPage JSON-LD\]/gi, '');
  mainContent = mainContent.replace(/```[\s\S]*?\[META\][\s\S]*?```/gi, '');
  mainContent = mainContent.replace(/\[META\][\s\S]*?(?=\r?\n# |\r?\n\*\*|$)/gi, '');
  mainContent = mainContent.replace(/<!--[\s\S]*?-->/g, '');
  mainContent = mainContent.replace(/<!--[\s\S]*$/g, '');

  // 3. [내부링크 제안] 섹션만 정밀 제거 (뒤따르는 FAQ 섹션이 잘리지 않도록 보호)
  mainContent = mainContent.replace(
    /(?:---\s*)?\[내부링크 제안\][\s\S]*?(?=\r?\n---\r?\n|\r?\n#{2,3}\s|$)/gi,
    ''
  );

  // 4. 자주 묻는 질문(FAQ) 섹션 파싱 및 본문에서 분리 (## 또는 ### 모두 지원, Q1:/Q./**Q1:** 모두 지원)
  const faqHeadingRegex = /(?:^|\r?\n)#{2,3}\s*(?:❓\s*)?자주\s*묻는\s*질문[\s\S]*/i;
  const faqSectionMatch = mainContent.match(faqHeadingRegex);
  const faqs: { question: string; answer: string }[] = [];

  if (faqSectionMatch && faqSectionMatch.index !== undefined) {
    const faqSection = faqSectionMatch[0];
    mainContent = mainContent.substring(0, faqSectionMatch.index);

    // FAQ 섹션 내부에 '진료 안내 및 주의사항'이 포함되어 있다면 그 이전까지만 FAQ로 파싱
    const noticeIdx = faqSection.search(/(?:^|\r?\n)#{2,3}\s*(?:💡\s*)?진료\s*안내/i);
    const pureFaqText = noticeIdx !== -1 ? faqSection.substring(0, noticeIdx) : faqSection;

    const lines = pureFaqText.split(/\r?\n/);
    let currentQ = '';
    let currentA = '';

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line || line === '---') continue;

      const qMatch = line.match(/^(?:#{2,4}\s*)?(?:\*\*|__)?Q\d*[\.:]\s*(.+?)(?:\*\*|__)?$/i);
      const aMatch = line.match(/^(?:\*\*|__)?A\d*[\.:]\s*(.+)$/i);

      if (qMatch) {
        if (currentQ && currentA) {
          faqs.push({ question: currentQ, answer: currentA.trim() });
        }
        currentQ = qMatch[1].replace(/\*\*|__/g, '').trim();
        currentA = '';
      } else if (aMatch) {
        currentA = aMatch[1].replace(/\*\*|__/g, '').trim();
      } else if (currentQ && currentA) {
        // 여러 줄로 이어지는 답변 처리 (단, 진료 안내 문구는 제외)
        if (!line.startsWith('**위바른내과의원') && !line.startsWith('💡')) {
          currentA += ' ' + line.replace(/\*\*|__/g, '');
        }
      }
    }
    if (currentQ && currentA) {
      faqs.push({ question: currentQ, answer: currentA.trim() });
    }
  }

  // 만약 JSON-LD로 파싱된 FAQ는 있는데 마크다운 파싱된 faqs가 비어 있다면 JSON-LD에서 역추출하여 화면에 표시
  if (faqs.length === 0 && embeddedJsonLd?.mainEntity && Array.isArray(embeddedJsonLd.mainEntity)) {
    for (const entity of embeddedJsonLd.mainEntity) {
      if (entity.name && entity.acceptedAnswer?.text) {
        faqs.push({
          question: String(entity.name).trim(),
          answer: String(entity.acceptedAnswer.text).trim(),
        });
      }
    }
  }

  // 반대로 faqs는 있는데 embeddedJsonLd가 없다면 자동으로 FAQPage JSON-LD 생성
  if (!embeddedJsonLd && faqs.length > 0) {
    embeddedJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    };
  }

  // 5. 하단 중복 '진료 안내 및 주의사항' 섹션 제거 (하단 고정 안내 카드와 중복 노출 방지)
  mainContent = mainContent.replace(
    /(?:---\s*)?(?:#{2,3}\s*(?:💡\s*)?진료\s*안내\s*및\s*주의사항|\*\*위바른내과의원\s*진료\s*안내\*\*|💡\s*\*\*진료\s*안내\s*및\s*주의사항\*\*)[\s\S]*$/i,
    ''
  );

  // 6. 상단 중복 H1 타이틀 또는 볼드 타이틀 줄 제거 (아티클 헤더의 H1과 중복 방지)
  mainContent = mainContent.trimStart();
  mainContent = mainContent.replace(/^#\s+[^\r\n]+\r?\n+/, '');
  if (mainContent.startsWith(`**${post.title}**`)) {
    mainContent = mainContent.replace(`**${post.title}**`, '').trimStart();
  }

  // 7. 이미지 가이드 플레이스홀더 제거
  const imageGuideRegex = /\[이미지:\s*(.*?)\s*\/\s*alt="(.*?)"\s*\/\s*filename="(.*?)"\]/g;
  mainContent = mainContent.replace(imageGuideRegex, '');
  mainContent = mainContent.replace(/\r?\n---\s*$/g, '').trim();

  // 8. 본문 헤딩(H2/H3) 목록 추출 (목차 생성용)
  const headingLines = mainContent.split('\n');
  const headings = headingLines
    .filter((line) => line.startsWith('## ') || line.startsWith('### '))
    .map((line) => {
      const isH3 = line.startsWith('### ');
      const text = line.replace(/^###?\s+/, '').replace(/\*\*|__/g, '').trim();
      const id = encodeURIComponent(text.replace(/\s+/g, '-').toLowerCase());
      return { text, id, isH3 };
    });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://webarunim.co.kr';

  // 9. MedicalWebPage + BlogPosting 구조화 데이터 구성 (검색엔진 및 AI 봇 최적화)
  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': ['BlogPosting', 'MedicalWebPage'],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
    headline: post.title,
    description: post.metaDescription || post.description,
    datePublished: post.published || post.date,
    dateModified: post.modified || post.date,
    inLanguage: 'ko-KR',
    keywords: post.tags?.join(', ') || post.targetKeyword,
    author: {
      '@type': 'Physician',
      name: '양경호',
      jobTitle: '대표원장 (소화기내과 전문의)',
      medicalSpecialty: 'Gastroenterology',
      worksFor: {
        '@type': 'MedicalClinic',
        name: '위바른내과의원',
        url: siteUrl,
        telephone: '+82-32-561-5570',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '인천광역시 서구 이음대로 378 로뎀타워 5층 (아라동)',
          addressLocality: '서구',
          addressRegion: '인천광역시',
          addressCountry: 'KR',
        },
      },
    },
    publisher: {
      '@type': 'MedicalClinic',
      name: '위바른내과의원',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
  };

  return (
    <div className="detail-container">
      {/* 검색엔진 및 AI 봇(ChatGPT, Gemini 등)용 JSON-LD 구조화 데이터 */}
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
        <div style={{ marginBottom: '2rem' }}>
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
            ← 전체 칼럼 목록으로
          </Link>
        </div>

        <header className="detail-header">
          <div className="detail-category">{post.cluster}</div>
          <h1 className="detail-title">{post.title}</h1>
          <div className="detail-meta-row">
            <time dateTime={post.date}>{post.date}</time>
            <span>위바른내과의원 건강 칼럼</span>
          </div>
        </header>

        {/* 핵심 요약 리드문 */}
        {post.description && (
          <div style={{ marginBottom: '2.5rem' }}>
            <p
              style={{
                fontSize: '1.08rem',
                color: 'var(--text-primary)',
                background: 'rgba(13, 148, 136, 0.05)',
                borderLeft: '4px solid var(--primary)',
                padding: '1.25rem 1.5rem',
                borderRadius: '0 12px 12px 0',
                lineHeight: '1.7',
                fontWeight: 500,
              }}
            >
              {post.description}
            </p>
          </div>
        )}

        {/* 마크다운 본문 */}
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

        {/* 진료 안내 및 주의사항 박스 */}
        <div
          style={{
            marginTop: '2.5rem',
            background: '#F8FAFC',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '1.5rem',
          }}
        >
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 700,
              color: 'var(--primary)',
              marginBottom: '0.5rem',
              fontSize: '0.95rem',
            }}
          >
            💡 위바른내과의원 진료 안내 및 주의사항
          </p>
          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              marginBottom: '0.5rem',
            }}
          >
            <strong>위치:</strong> 인천광역시 서구 이음대로 378 로뎀타워 5층 (아라동) |{' '}
            <strong>문의:</strong> 032-561-5570
            <br />
            <strong>진료시간:</strong> 평일 08:30~18:30 / 토요일 08:30~13:00 (토요일 점심시간 없음 / 일·공휴일 휴진)
          </p>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            본 글은 의료법 제56조 제1항을 준수하여 환자분들께 올바른 건강 정보를 제공하기 위해 작성되었습니다. 개인의 증상과 건강 상태에 따라 필요한 검사나 치료 방법이 달라질 수 있으므로, 정확한 진단은 내원하시어 전문의와 상담하시기 바랍니다.
          </p>
        </div>
      </article>

      {/* 오른쪽 사이드바 (목차 및 진료 문의) + 하단 FAQ */}
      <InteractiveDetail headings={headings} faqs={faqs} />
    </div>
  );
}
