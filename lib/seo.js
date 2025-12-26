/**
 * Centralized SEO Utility for Bible Apologist Blog
 * Provides consistent metadata, OpenGraph, Twitter Cards, and structured data
 */

const SITE_CONFIG = {
    siteName: 'Bible Apologist',
    siteUrl: 'https://www.bibleapologist.com',
    siteDescription: 'Bible Apologist aims to defend the bible from lies and deception, provide sound theology to the users of this apologetics website and expose the truth about Islam and Muhammad.',
    author: 'Steed of Truth',
    //twitterHandle: '@bibleapologist', // Update with actual handle
    //defaultImage: 'https://www.bibleapologist.com/default-og-image.jpg', // Add default OG image
    organizationName: 'Bible Apologist',
    //organizationLogo: 'https://www.bibleapologist.com/logo.png', // Add logo URL
};

/**
 * Generate page title with consistent template
 */
export const generateTitle = (pageTitle, useSiteName = true) => {
    if (!pageTitle) return SITE_CONFIG.siteName;
    return useSiteName ? `${pageTitle} - ${SITE_CONFIG.siteName}` : pageTitle;
};

/**
 * Generate canonical URL
 */
export const generateCanonicalUrl = (path) => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${SITE_CONFIG.siteUrl}${cleanPath}`;
};

/**
 * Generate meta tags for a page
 */
export const generateMetaTags = ({
    title,
    description = SITE_CONFIG.siteDescription,
    canonical,
    image = '',
    imageAlt = title,
    type = 'website',
    author = SITE_CONFIG.author,
    publishedTime,
    modifiedTime,
    noindex = false,
    nofollow = false,
}) => {
    const fullTitle = generateTitle(title);
    const canonicalUrl = canonical ? generateCanonicalUrl(canonical) : null;

    const robots = [];
    if (noindex) robots.push('noindex');
    if (nofollow) robots.push('nofollow');
    const robotsContent = robots.length > 0 ? robots.join(', ') : 'index, follow';

    return {
        title: fullTitle,
        description,
        canonical: canonicalUrl,
        image,
        imageAlt,
        type,
        author,
        robots: robotsContent,
        publishedTime,
        modifiedTime,
    };
};

/**
 * Generate OpenGraph tags
 */
export const generateOpenGraphTags = (metaTags) => {
    return {
        'og:title': metaTags.title,
        'og:description': metaTags.description,
        'og:url': metaTags.canonical,
        'og:type': metaTags.type,
        'og:image': metaTags.image,
        'og:image:alt': metaTags.imageAlt,
        'og:site_name': SITE_CONFIG.siteName,
        ...(metaTags.publishedTime && { 'article:published_time': metaTags.publishedTime }),
        ...(metaTags.modifiedTime && { 'article:modified_time': metaTags.modifiedTime }),
    };
};

/**
 * Generate Twitter Card tags
 */
export const generateTwitterTags = (metaTags) => {
    return {
        'twitter:card': 'summary_large_image',
        'twitter:site': SITE_CONFIG.twitterHandle,
        'twitter:title': metaTags.title,
        'twitter:description': metaTags.description,
        'twitter:image': metaTags.image,
        'twitter:image:alt': metaTags.imageAlt,
    };
};

/**
 * Generate Organization structured data (JSON-LD)
 */
export const generateOrganizationSchema = () => {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_CONFIG.organizationName,
        url: SITE_CONFIG.siteUrl,
        logo: SITE_CONFIG.organizationLogo,
        description: SITE_CONFIG.siteDescription,
        sameAs: [
            // Add social media URLs here
            // 'https://twitter.com/bibleapologist',
            // 'https://facebook.com/bibleapologist',
        ],
    };
};

/**
 * Generate Website structured data (JSON-LD)
 */
export const generateWebsiteSchema = () => {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_CONFIG.siteName,
        url: SITE_CONFIG.siteUrl,
        description: SITE_CONFIG.siteDescription,
        publisher: {
            '@type': 'Organization',
            name: SITE_CONFIG.organizationName,
            logo: {
                '@type': 'ImageObject',
                url: SITE_CONFIG.organizationLogo,
            },
        },
    };
};

/**
 * Generate Article structured data (JSON-LD)
 */
export const generateArticleSchema = ({
    headline,
    description,
    image,
    datePublished,
    dateModified,
    authorName,
    url,
}) => {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline,
        description,
        image,
        datePublished,
        dateModified,
        author: {
            '@type': 'Person',
            name: authorName,
        },
        publisher: {
            '@type': 'Organization',
            name: SITE_CONFIG.organizationName,
            logo: {
                '@type': 'ImageObject',
                url: SITE_CONFIG.organizationLogo,
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': url,
        },
    };
};

/**
 * Generate BreadcrumbList structured data (JSON-LD)
 */
export const generateBreadcrumbSchema = (items) => {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
};

/**
 * Get site configuration
 */
export const getSiteConfig = () => SITE_CONFIG;
