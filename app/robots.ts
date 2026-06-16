import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cryptoluckyguia.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Disallow EN blog article pages (they redirect to ES, but belt-and-suspenders)
        disallow: ['/en/blog/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
