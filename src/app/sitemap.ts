import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://webarunim.co.kr';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const today = new Date().toISOString().split('T')[0];

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.modified || post.date,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: today,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/health-checkup`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/colonoscopy`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/digestive-clinic`,
      lastModified: today,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    ...postEntries,
  ];
}
