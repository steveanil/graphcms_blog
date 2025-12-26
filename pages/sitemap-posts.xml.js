// Sitemap for blog posts
import { getPosts } from '../services';

// Helper to escape XML special characters
const escapeXml = (unsafe) => {
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });
};

function generateSiteMap(posts) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.bibleapologist.com</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${posts
            .map((post) => {
                return `
  <url>
    <loc>${escapeXml(`https://www.bibleapologist.com/post/${post.slug}`)}</loc>
    <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
            })
            .join('')}
</urlset>`;
}

export async function getServerSideProps({ res }) {
    // Fetch all posts
    const allPosts = [];
    let hasNextPage = true;
    let after = null;

    while (hasNextPage) {
        const { posts, pageInfo } = await getPosts(100, after);
        allPosts.push(...posts);
        hasNextPage = pageInfo.hasNextPage;
        after = pageInfo.endCursor;
    }

    // Generate the XML sitemap
    const sitemap = generateSiteMap(allPosts);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default function SitemapPosts() {
    // This function is never called, Next.js uses getServerSideProps
    return null;
}
