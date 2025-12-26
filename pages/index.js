/* eslint-disable comma-dangle */
/* eslint-disable no-shadow */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable react/function-component-definition */
import Head from "next/head";
import React, { useState } from "react";

import { PostCard } from "../components";
import { getPosts } from "../services";

// initialPosts is a prop
export default function Home({ initialPosts }) {
  // loads initial 7 posts
  const [posts, setPosts] = useState(initialPosts.posts || []);
  const [after, setAfter] = useState(initialPosts.pageInfo?.endCursor);
  const [hasNextPage, setHasNextPage] = useState(
    initialPosts.pageInfo?.hasNextPage
  );

  const handleLoadMore = async () => {
    try {
      // When you click load more, it will load 6 posts everytime
      const newPostsData = await getPosts(6, after);
      if (newPostsData.error) {
        console.error('Error loading more posts:', newPostsData.error);
        return;
      }
      setPosts([...posts, ...newPostsData.posts]);
      setAfter(newPostsData.pageInfo.endCursor);
      setHasNextPage(newPostsData.pageInfo.hasNextPage);
    } catch (error) {
      console.error('Error loading more posts:', error);
    }
  };

  return (
    <>
      <Head lang="en">
        <title>Bible Apologist</title>
        <meta httpEquiv="content-language" content="en-gb" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link rel="canonical" href="https://www.bibleapologist.com/" />

        <meta
          name="description"
          content="Bible Apologist aims to defend the bible from lies and deception, provide sound theology to the users of this apologetics website and expose the truth about Islam and Muhammad."
        />
        <meta name="author" content="Steed of Truth" />
        <meta
          name="keywords"
          content="bible, bible apologist, apologist, apologetics, Trinity, Jesus Christ, Apologetics, Quran, Muhammad, Christianity"
        />

        <meta property="og:title" content="Bible Apologist" />
        <meta
          property="og:description"
          content="Bible Apologist aims to defend the bible from lies and deception, provide sound theology to the users of this apologetics website and expose the truth about Islam and Muhammad."
        />
        <meta property="og:url" content="https://www.bibleapologist.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Bible Apologist" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bible Apologist" />
        <meta
          name="twitter:description"
          content="Bible Apologist aims to defend the bible from lies and deception, provide sound theology to the users of this apologetics website and expose the truth about Islam and Muhammad."
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Bible Apologist",
            url: "https://www.bibleapologist.com",
            description: "Bible Apologist aims to defend the bible from lies and deception, provide sound theology to the users of this apologetics website and expose the truth about Islam and Muhammad.",
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Bible Apologist",
            url: "https://www.bibleapologist.com",
            description: "Bible Apologist aims to defend the bible from lies and deception, provide sound theology to the users of this apologetics website and expose the truth about Islam and Muhammad.",
            publisher: {
              "@type": "Organization",
              name: "Bible Apologist",
            },
          })}
        </script>

        <link rel="icon" href="/favicon.ico" />
      </Head>
      ;
      <div className="container mx-auto px-9 lg:px-0 mb-8">
        <div className="grid grid-cols-1 pb-8 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post) => (
            <PostCard post={post} key={post.slug} />
          ))}
        </div>
        {/* Render your posts here */}
        <div className="container flex justify-center">
          {hasNextPage && (
            <span
              onClick={handleLoadMore}
              className="transition duration-500 ease transform bg-blue-600 hover:bg-blue-700 text-xl font-semibold rounded-3xl text-white px-14 py-4 cursor-pointer"
            >
              Load More
            </span>
          )}
        </div>
        <div className="container">
          <script
            async
            id="apg-beacon"
            data-translation="nkjv"
            data-color="rgb(37 99 235)"
            data-headless="false"
            data-lang="en"
            src="https://apologist.ai/beacon/agent.min.js"
          />
        </div>
      </div>
    </>
  );
}

// getStaticProps is from nextJS. This will query all this information and statically render during build time and display
export async function getStaticProps() {
  const initialPosts = (await getPosts()) || [];

  // return data as props
  return {
    props: {
      initialPosts,
    },
    // Revalidate at a fixed interval to update static content
    revalidate: 86400, // In seconds, 1 day
  };
}
