import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { getCategories, getCategoryPost } from '../../services';
import { PostCard, Loader } from '../../components';
import {
  generateMetaTags,
  generateOpenGraphTags,
  generateTwitterTags,
  generateBreadcrumbSchema,
} from '../../lib/seo';

const CategoryPost = ({ posts, categorySlug, categoryName }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  // Generate SEO metadata
  const metaTags = generateMetaTags({
    title: `${categoryName} Articles`,
    description: `Read articles about ${categoryName} on Bible Apologist - defending the Bible with sound theology and apologetics.`,
    canonical: `/category/${categorySlug}`,
    type: 'website',
  });

  const ogTags = generateOpenGraphTags(metaTags);
  const twitterTags = generateTwitterTags(metaTags);

  // Generate breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.bibleapologist.com' },
    { name: 'Categories', url: 'https://www.bibleapologist.com/#categories' },
    { name: categoryName, url: `https://www.bibleapologist.com/category/${categorySlug}` },
  ]);

  return (
    <>
      <Head lang="en">
        <title>{metaTags.title}</title>
        <meta name="description" content={metaTags.description} />
        <meta name="robots" content={metaTags.robots} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Canonical URL */}
        <link rel="canonical" href={metaTags.canonical} />

        {/* OpenGraph tags */}
        <meta property="og:title" content={ogTags['og:title']} />
        <meta property="og:description" content={ogTags['og:description']} />
        <meta property="og:url" content={ogTags['og:url']} />
        <meta property="og:type" content={ogTags['og:type']} />
        <meta property="og:site_name" content={ogTags['og:site_name']} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content={twitterTags['twitter:card']} />
        <meta name="twitter:title" content={twitterTags['twitter:title']} />
        <meta name="twitter:description" content={twitterTags['twitter:description']} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post) => (
            <PostCard key={post.node.slug} post={post.node} />
          ))}
        </div>
        {posts.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No articles found in this category yet.
          </p>
        )}
      </div>
    </>
  );
};

export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const posts = await getCategoryPost(params.slug);
  const categories = await getCategories();

  // Find the category name
  const category = categories.find(cat => cat.slug === params.slug);
  const categoryName = category ? category.name : params.slug;

  return {
    props: {
      posts,
      categorySlug: params.slug,
      categoryName,
    },
    revalidate: 86400, // Revalidate once per day
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}
