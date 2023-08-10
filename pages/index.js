/* eslint-disable react/function-component-definition */
import Head from 'next/head';

import { PostCard, SearchBar } from '../components';
import { getPosts } from '../services';

// posts is a prop
export default function Home({ posts }) {
  return (
    <div className="container mx-auto px-10 mb-8">
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {posts.map((post, index) => <PostCard post={post.node} key={index} />)}
      </div>
    </div>
  );
}

// getStaticProps is from nextJS. This will query all this information and statically render during build time and display

export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  // return data as props
  return {
    props: {
      posts,
    },
  };
}

  <Head lang="en">
    <title>Bible Apologist</title>
    <meta httpEquiv="content-language" content="en-gb" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link rel="canonical" href="https://www.bibleapologist.com/" />

    <meta name="description" content="Bible Apologist aims to defend the bible from lies and deception, provide sound theology to the users of this apologetics website and expose the truth about Islam and Muhammad." />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="keywords" content="Bible, Bible Apologist, bible apologist, Trinity, Jesus Christ, Apologetics, Quran, Muhammad, Christianity" />

    <meta property="og:title" content="Bible Apologist" />
    <meta property="og:description" content="Bible Apologist aims to defend the bible from lies and deception, provide sound theology to the users of this apologetics website and expose the truth about Islam and Muhammad." />
    <meta property="og:url" content="https://www.bibleapologist.com/" />
    <meta property="og:type" content="website" />
    <link rel="icon" href="/favicon.ico" />
  </Head>;
