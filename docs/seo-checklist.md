# SEO Checklist - Bible Apologist Blog

## Overview

This document describes how SEO metadata is generated for the Bible Apologist blog and how to ensure new content is properly optimized for search engines.

## How Metadata is Generated

### Centralized SEO Utility

Located in `lib/seo.js`, this utility provides consistent SEO metadata across the site including:

- **Page titles** - Automatically formatted as `{Page Title} - Bible Apologist`
- **Meta descriptions** - Falls back to site description if not provided
- **Canonical URLs** - Absolute URLs for all pages
- **OpenGraph tags** - For social sharing (Facebook, LinkedIn, etc.)
- **Twitter Card tags** - For Twitter sharing
- **Structured data** - JSON-LD for rich results in Google

### Page-Specific Metadata

#### Homepage (`/`)
- Title: "Bible Apologist"
- Description: Site tagline
- Type: Website
- Structured data: Organization + Website schema

#### Blog Posts (`/post/[slug]`)
- Title: `{Post Title} - Bible Apologist`
- Description: Post excerpt
- Type: Article
- Structured data: Article schema + BreadcrumbList
- Additional: Published/modified dates, author info

#### Categories (`/category/[slug]`)
- Title: `{Category Name} Articles - Bible Apologist`
- Description: `Read articles about {Category} on Bible Apologist`
- Type: Website
- Structured data: BreadcrumbList

#### Search Results (`/search/[slug]`)
- **Noindex, nofollow** - Not indexed by search engines
- Used for internal site search only

## Adding New Posts in Hygraph

To ensure proper SEO for new blog posts, make sure the following fields are populated:

### Required Fields
- **Title** - Clear, descriptive title (50-60 characters ideal)
- **Slug** - URL-friendly identifier (lowercase, hyphens, no special characters)
- **Excerpt** - Brief summary (150-160 characters ideal for meta description)
- **Featured Image** - High quality image (1200x630px recommended for OG image)
- **Author** - Author name
- **Categories** - At least one category

### Best Practices
- **Title**: Should be unique and descriptive
  - ✅ "Understanding the Trinity in Christianity"
  - ❌ "Article 1"
  
- **Slug**: Should match the title but be URL-safe
  - ✅ "understanding-the-trinity-in-christianity"
  - ❌ "Understanding the Trinity in Christianity!!!"
  
- **Excerpt**: Should be a compelling summary
  - ✅ "Explore the biblical foundation of the Trinity and why it's central to Christian theology."
  - ❌ "This is an article about the Trinity."

- **Featured Image**: Should be relevant and high quality
  - Recommended size: 1200x630px (Facebook OG image standard)
  - Format: JPG or PNG
  - File size: Under 1MB for performance

## Validating SEO Locally

### 1. View Source

**How to check:**
1. Run `npm run dev`
2. Open `http://localhost:3000`
3. Right-click → "View Page Source"

**What to verify:**
- ✅ `<title>` tag is present and formatted correctly
- ✅ `<meta name="description">` is present
- ✅ `<link rel="canonical">` points to correct URL
- ✅ OpenGraph tags (`og:title`, `og:description`, `og:url`, `og:image`)
- ✅ Twitter Card tags (`twitter:card`, `twitter:title`, etc.)
- ✅ Structured data `<script type="application/ld+json">` is valid JSON

### 2. Lighthouse SEO Audit

**How to run:**
1. Open site in Chrome
2. Press F12 to open DevTools
3. Click "Lighthouse" tab
4. Select "SEO" category
5. Click "Analyze page load"

**Target score:** 95-100

**Common issues to fix:**
- Missing meta description
- Low contrast text
- Images without alt text
- Links without descriptive text

### 3. Google Rich Results Test

**How to test:**
1. Visit: https://search.google.com/test/rich-results
2. Enter your blog post URL
3. Click "Test URL"

**What to verify:**
- ✅ Article schema detected
- ✅ Breadcrumb schema detected
- ✅ All required fields present (headline, image, datePublished, author)
- ✅ No errors or warnings

### 4. Facebook Sharing Debugger

**How to test:**
1. Visit: https://developers.facebook.com/tools/debug/
2. Enter your blog post URL
3. Click "Debug"

**What to verify:**
- ✅ Correct title displayed
- ✅ Correct description displayed
- ✅ Featured image displayed (1200x630px)
- ✅ No warnings about missing tags

### 5. Twitter Card Validator

**How to test:**
1. Visit: https://cards-dev.twitter.com/validator
2. Enter your blog post URL
3. Click "Preview card"

**What to verify:**
- ✅ Card type: "Summary Card with Large Image"
- ✅ Correct title displayed
- ✅ Correct description displayed
- ✅ Featured image displayed

## Sitemaps

### Accessing Sitemaps

- **Sitemap Index**: https://www.bibleapologist.com/sitemap.xml
- **Posts Sitemap**: https://www.bibleapologist.com/sitemap-posts.xml
- **Categories Sitemap**: https://www.bibleapologist.com/sitemap-categories.xml

### How They Work

- Sitemaps are **automatically generated** on every request
- Post sitemap includes all published posts with `lastmod` from Hygraph
- Category sitemap includes all categories
- Homepage is included in posts sitemap with highest priority

### Submitting to Google Search Console

1. Log in to [Google Search Console](https://search.google.com/search-console)
2. Select your property (bibleapologist.com)
3. Go to "Sitemaps" in left menu
4. Enter: `https://www.bibleapologist.com/sitemap.xml`
5. Click "Submit"

Google will automatically discover the sub-sitemaps (posts, categories).

## Robots.txt

Located at `/public/robots.txt`, this file tells search engines:
- ✅ **Allow** all pages (default)
- ❌ **Disallow** `/api/` (API endpoints)
- ❌ **Disallow** `/search/` (search results pages)
- 📍 **Sitemap** location for crawlers

**Access it at:** https://www.bibleapologist.com/robots.txt

## Troubleshooting

### Page Not Indexed

1. Verify it's in sitemap
2. Check for `noindex` meta tag in source
3. Check Google Search Console for errors
4. Submit URL for indexing manually

### Wrong Title/Description in Google

1. Google may override your meta description
2. Ensure title and description are relevant
3. Wait for recrawl (can take days/weeks)
4. Use "Request Indexing" in Search Console

### Featured Image Not Showing

1. Verify image URL is absolute (not relative)
2. Check image is accessible publicly
3. Ensure image meets size requirements (min 200x200px)
4. Use Facebook Debugger to diagnose

### Structured Data Errors

1. Run Rich Results Test
2. Fix JSON syntax errors
3. Ensure required fields are present
4. Verify dates are in ISO format

## Performance Tips

### Image Optimization

- Use Next.js `<Image>` component (automatic optimization)
- Set explicit `width` and `height` to prevent layout shift
- Use WebP format when possible
- Compress images before uploading to Hygraph

### Loading Speed

- Homepage uses ISR (revalidates daily)
- Post pages use ISR (revalidates daily)
- Category pages use ISR (revalidates daily)
- This ensures fresh content without slow builds

## Summary

**Automated:**
- ✅ Metadata generation
- ✅ Sitemap creation
- ✅ Structured data
- ✅ Robots.txt

**Manual (Content Strategy):**
- ✏️ Writing compelling titles and excerpts
- ✏️ Creating high-quality featured images
- ✏️ Choosing relevant categories
- ✏️ Internal linking between posts
- ✏️ Regular content updates

---

For questions or issues, refer to the [implementation plan](./implementation_plan.md) or review the SEO utility code in `lib/seo.js`.
