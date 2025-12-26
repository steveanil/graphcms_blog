// Sitemap for categories
import { getCategories } from '../services';

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

function generateSiteMap(categories) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${categories
            .map((category) => {
                return `
  <url>
    <loc>${escapeXml(`https://www.bibleapologist.com/category/${category.slug}`)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
            })
            .join('')}
</urlset>`;
}

export async function getServerSideProps({ res }) {
    // Fetch all categories
    const categories = await getCategories();

    // Generate the XML sitemap
    const sitemap = generateSiteMap(categories);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default function SitemapCategories() {
    // This function is never called, Next.js uses getServerSideProps
    return null;
}
