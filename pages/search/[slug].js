import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { getSearchPost } from '../../services';
import { Loader, SearchPosts } from '../../components';

const searchPost = ({ posts, searchQuery }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <>
      <Head lang="en">
        <title>Search Results - Bible Apologist</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto px-10 mb-8">
        <h1 className="text-3xl font-bold mb-8">
          Search Results {searchQuery && `for "${searchQuery}"`}
        </h1>
        {router.isFallback ? (
          <Loader />
        ) : (
          <>
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {posts.map((post) => (
                  <SearchPosts key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 mt-8">
                No results found. Try a different search term.
              </p>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default searchPost;

// Use server-side rendering to avoid generating static paths
export async function getServerSideProps({ params }) {
  const posts = await getSearchPost(params.slug);

  return {
    props: {
      posts,
      searchQuery: params.slug,
    },
  };
}
