import React from 'react';
import { useRouter } from 'next/router';

import { getSearchPost, searchQuery } from '../../services';
import { Loader, SearchPosts } from '../../components';

const searchPost = ({ posts }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      {router.isFallback ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post) => (
            <SearchPosts key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};
export default searchPost;

export async function getStaticProps({ params }) {
  const posts = await getSearchPost(params.slug);

  return {
    props: { posts },
  };
}

export async function getStaticPaths() {
  const searchResults = await searchQuery(); // Fetch search results using your searchQuery function

  // Create an array of paths based on the fetched search results
  const paths = await Promise.all(
    searchResults.map(async (searchResult) => ({
      params: { slug: searchResult.slug },
    })),
  );

  return {
    paths,
    fallback: true, // Enable fallback for uncached paths
  };
}
