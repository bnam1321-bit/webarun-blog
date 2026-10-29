import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
  author: string;
  coverImage?: string;
  published?: string;
  modified?: string;
  targetKeyword?: string;
  cluster?: string;
  seoTitle?: string;
  metaDescription?: string;
}

// posts 디렉토리가 존재하는지 확인하고 생성
function ensureDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
}

// 본문 내 JSON 메타블록에서 누락된 메타데이터 보완 추출
function extractEmbeddedMeta(content: string): {
  seoTitle?: string;
  metaDescription?: string;
  h1?: string;
  cluster?: string;
  targetKeyword?: string;
} {
  const seoTitleMatch = content.match(/"?seo_title"?\s*:\s*"([^"\n\r]+)"/i);
  const metaDescMatch = content.match(/"?meta_description"?\s*:\s*"([^"\n\r]+)"/i);
  const h1Match = content.match(/"?h1"?\s*:\s*"([^"\n\r]+)"/i);
  const clusterMatch = content.match(/"?cluster"?\s*:\s*"([^"\n\r]+)"/i);
  const keywordMatch = content.match(/"?target_keyword"?\s*:\s*"([^"\n\r]+)"/i);

  return {
    seoTitle: seoTitleMatch?.[1]?.trim(),
    metaDescription: metaDescMatch?.[1]?.trim(),
    h1: h1Match?.[1]?.trim(),
    cluster: clusterMatch?.[1]?.trim(),
    targetKeyword: keywordMatch?.[1]?.trim(),
  };
}

export function getAllPosts(): Post[] {
  ensureDirectory();
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const embedded = extractEmbeddedMeta(content);

        const title = data.title || embedded.h1 || '제목 없음';
        const description = data.description || data.metaDescription || embedded.metaDescription || '';
        const seoTitle = data.seoTitle || embedded.seoTitle || title;
        const metaDescription = data.metaDescription || description;

        return {
          ...data,
          slug,
          content,
          title,
          date: data.date || new Date().toISOString().split('T')[0],
          description,
          tags: Array.isArray(data.tags) ? data.tags : [],
          author: data.author || '위바른내과의원',
          coverImage: data.coverImage || '',
          published: data.published || data.date || '',
          modified: data.modified || data.date || '',
          targetKeyword: data.targetKeyword || embedded.targetKeyword || '',
          cluster: data.cluster || embedded.cluster || '일반내과',
          seoTitle,
          metaDescription,
        } as Post;
      });

    // 날짜 역순 정렬 (최신순)
    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (error) {
    console.error('Error reading all posts:', error);
    return [];
  }
}

export function getPostBySlug(slug: string): Post | null {
  ensureDirectory();
  try {
    const decodedSlug = decodeURIComponent(slug);
    const fullPath = path.join(postsDirectory, `${decodedSlug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const embedded = extractEmbeddedMeta(content);

    const title = data.title || embedded.h1 || '제목 없음';
    const description = data.description || data.metaDescription || embedded.metaDescription || '';
    const seoTitle = data.seoTitle || embedded.seoTitle || title;
    const metaDescription = data.metaDescription || description;

    return {
      ...data,
      slug: decodedSlug,
      content,
      title,
      date: data.date || new Date().toISOString().split('T')[0],
      description,
      tags: Array.isArray(data.tags) ? data.tags : [],
      author: data.author || '위바른내과의원',
      coverImage: data.coverImage || '',
      published: data.published || data.date || '',
      modified: data.modified || data.date || '',
      targetKeyword: data.targetKeyword || embedded.targetKeyword || '',
      cluster: data.cluster || embedded.cluster || '일반내과',
      seoTitle,
      metaDescription,
    } as Post;
  } catch (error) {
    console.error(`Error reading post by slug (${slug}):`, error);
    return null;
  }
}

export function savePost(slug: string, rawContent: string): boolean {
  ensureDirectory();
  try {
    const decodedSlug = decodeURIComponent(slug);
    const fullPath = path.join(postsDirectory, `${decodedSlug}.md`);
    fs.writeFileSync(fullPath, rawContent, 'utf8');
    return true;
  } catch (error) {
    console.error(`Error saving post (${slug}):`, error);
    throw error;
  }
}

export function deletePost(slug: string): boolean {
  ensureDirectory();
  try {
    const decodedSlug = decodeURIComponent(slug);
    const fullPath = path.join(postsDirectory, `${decodedSlug}.md`);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error deleting post (${slug}):`, error);
    return false;
  }
}
