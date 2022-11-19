/* eslint-disable react/function-component-definition */
import Head from 'next/head';

import { PostCard, PostWidget } from '../components';
import { getPosts } from '../services';
import { FeaturedPosts } from '../sections';

// posts is a prop
export default function Home({ posts }) {
  return (
    <div className="container mx-auto px-10 mb-8 ">
      <Head lang="en">
        <title>Bible Apologist</title>
        <meta httpEquiv="content-language" content="en-gb" />
        <link rel="canonical" href="https://www.bibleapologist.com/" />

        <meta name="description" content="Bible Apologist aims to defend the bible from lies and deception, provide sound theology to the users of this apologetics website and expose the truth about Islam and Muhammad." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="Bible, Bible Apologist, bible apologist, Trinity, Jesus Christ, Apologetics, Quran, Muhammad, Christianity" />

        <meta property="og:title" content="Bible Apologist" />
        <meta property="og:url" content="https://www.bibleapologist.com/" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />

        <script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" />
        <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js" />

      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post) => <PostCard post={post.node} key={post.title} />)}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
          </div>
        </div>
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

