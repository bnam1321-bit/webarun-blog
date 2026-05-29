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

        return {
          slug,
          content,
          title: data.title || '제목 없음',
          date: data.date || new Date().toISOString().split('T')[0],
          description: data.description || '',
          tags: Array.isArray(data.tags) ? data.tags : [],
          author: data.author || '위바른내과의원',
          coverImage: data.coverImage || '',
          published: data.published || data.date || '',
          modified: data.modified || data.date || '',
          targetKeyword: data.targetKeyword || '',
          cluster: data.cluster || '일반내과',
          seoTitle: data.seoTitle || data.title || '',
          metaDescription: data.metaDescription || data.description || '',
          ...data,
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

    return {
      slug: decodedSlug,
      content,
      title: data.title || '제목 없음',
      date: data.date || new Date().toISOString().split('T')[0],
      description: data.description || '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      author: data.author || '위바른내과의원',
      coverImage: data.coverImage || '',
      published: data.published || '',
      modified: data.modified || '',
      targetKeyword: data.targetKeyword || '',
      cluster: data.cluster || '일반내과',
      seoTitle: data.seoTitle || '',
      metaDescription: data.metaDescription || '',
      ...data,
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
