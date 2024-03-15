/* eslint-disable quotes */
import React from "react";
import Head from "next/head";
import moment from "moment";
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

  return (
    <>
      <Head lang="en-gb">
        <title lang="en-gb">{`${post.title} - Bible Apologist`}</title>

        <link
          rel="canonical"
          href={`https://www.bibleapologist.com/post/${post.slug}`}
        />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={`${post.excerpt}`} />
        <meta name="author" content={post.author.name} />
        <meta
          name="date"
          content={`${moment(post.updatedAt).format("MMM DD, YYYY")}`}
        />
        <meta
          name="keywords"
          content={`${post.title}, Bible, Bible Apologist, Trinity, Jesus, jesus, Islam, Quran, Muhammad`}
        />

        <meta property="og:title" content={`${post.title} - Bible Apologist`} />
        <meta property="og:description" content={`${post.excerpt}`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${post.featuredImage.url}`} />
        <meta property="og:image:alt" content={`${post.title}`} />
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
