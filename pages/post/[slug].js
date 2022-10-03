import React from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router';

import { getPosts, getPostDetails } from '../../services';
import { PostDetail, Categories, PostWidget, Author, Comments, CommentsForm, Loader } from '../../components';
import { AdjacentPosts } from '../../sections';

const PostDetails = ({ post }) => {
  const router = useRouter();

  if(router.isFallback){
    return <Loader />
  }
  
  return (
    <>
      <div className="container mx-auto px-10 mb-8">
        <Head>
          <title>{post.title} - Bible Apologist</title>
          <meta name="description" content={`${post.excerpt}`} />
          <meta property="og:title" content={`${ post.title } - Bible Apologist`} />
          <meta property="og:description" content={`Learn more about: ${post.title}`} />
          <meta property="url" content={`https://www.bibleapologist.com/post/${post.slug}`} />
          <meta property="og:type" content="website" />
          <meta name='keywords' content={`${post.title}, Bible, Bible Apologist, bible apologist, Theology, Trinity, Jesus Christ, Truth, Apologetics,Answering Islam, Islam, Quran, Muhammad, Christianity`}></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post} />
            <Author author={post.author} />
            <AdjacentPosts slug={post.slug} updatedAt={post.updatedAt} />
            <CommentsForm slug={post.slug} />
            <Comments slug={post.slug} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)} />
              <Categories />
            </div>
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
    }
  }
}

export async function  getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug }}) => ({ params: { slug }})),
    fallback: true,
  };
}