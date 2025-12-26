/* eslint-disable quotes */
import React from "react";
import Head from "next/head";
import { format } from "date-fns";
import { useRouter } from "next/router";

import { getPosts, getPostDetails } from "../../services";
import {
  PostDetail,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
  Loader,
} from "../../components";
import { AdjacentPosts } from "../../sections";

const PostDetails = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  // // Handle case when post fails to load
  // if (!post) {
  //   return (
  //     <div className="container mx-auto px-10 mb-8">
  //       <div className="bg-white rounded-lg p-8 text-center">
  //         <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
  //         <p className="text-gray-600">This post could not be loaded. Please try again later.</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <Head lang="en-gb">
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            image: post.featuredImage.url,
            author: {
              "@type": "Person",
              name: post.author.name,
            },
            publisher: {
              "@type": "Organization",
              name: "Bible Apologist",
              logo: {
                "@type": "ImageObject",
                url: "",
              },
            },
            datePublished: format(new Date(post.createdAt), "yyyy-MM-dd"),
            dateModified: format(new Date(post.updatedAt), "yyyy-MM-dd"),
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.bibleapologist.com/post/${post.slug}`,
            },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.bibleapologist.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://www.bibleapologist.com/#blog",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: post.title,
                item: `https://www.bibleapologist.com/post/${post.slug}`,
              },
            ],
          })}
        </script>
        <title>{`${post.title} - Bible Apologist`}</title>

        <link
          rel="canonical"
          href={`https://www.bibleapologist.com/post/${post.slug}`}
        />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={`${post.excerpt}`} />
        <meta name="author" content={post.author.name} />
        <meta
          name="date"
          content={`${format(new Date(post.updatedAt), "yyyy-MM-dd")}`}
        />
        <meta
          name="keywords"
          content={`${post.title}, Bible, Bible Apologist, Trinity, Jesus, jesus, Islam, Quran, Muhammad`}
        />

        <meta property="og:title" content={`${post.title} - Bible Apologist`} />
        <meta property="og:description" content={`${post.excerpt}`} />
        <meta property="og:url" content={`https://www.bibleapologist.com/post/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={`${post.featuredImage.url}`} />
        <meta property="og:image:alt" content={`${post.title}`} />
        <meta property="og:site_name" content="Bible Apologist" />
        <meta property="article:published_time" content={format(new Date(post.createdAt), "yyyy-MM-dd'T'HH:mm:ssxxx")} />
        <meta property="article:modified_time" content={format(new Date(post.updatedAt), "yyyy-MM-dd'T'HH:mm:ssxxx")} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} - Bible Apologist`} />
        <meta name="twitter:description" content={`${post.excerpt}`} />
        <meta name="twitter:image" content={`${post.featuredImage.url}`} />
        <meta name="twitter:image:alt" content={`${post.title}`} />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post} />
            <Author author={post.author} />
            <AdjacentPosts slug={post.slug} updatedAt={post.updatedAt} />
            <CommentsForm slug={post.slug} />
            <Comments slug={post.slug} />
          </div>
          <div className="col-span-1 lg:col-span-4 relative lg:sticky top-8">
            <PostWidget
              slug={post.slug}
              categories={post.categories.map((category) => category.slug)}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default PostDetails;

export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);

  return {
    props: {
      post: data,
    },
    revalidate: 86400, // 1 day
  };
}

export async function getStaticPaths() {
  const { posts } = await getPosts(7); // Fetch the first 10 posts for generating paths

  // Ensure you're accessing the posts array correctly
  const paths = posts.map(({ slug }) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: true, // can also be 'blocking' if you want server-side rendering on-demand for paths not generated at build time
  };
}
