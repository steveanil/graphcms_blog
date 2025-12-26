// Sitemap index - main sitemap that points to other sitemaps
function generateSitemapIndex() {
    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://www.bibleapologist.com/sitemap-posts.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://www.bibleapologist.com/sitemap-categories.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
</sitemapindex>`;
}

export async function getServerSideProps({ res }) {
    // Generate the sitemap index
    const sitemapIndex = generateSitemapIndex();

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemapIndex);
    res.end();

    return {
        props: {},
    };
}

export default function Sitemap() {
    // This function is never called, Next.js uses getServerSideProps
    return null;
}
