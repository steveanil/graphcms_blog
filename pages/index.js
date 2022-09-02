import Head from 'next/head'
import { PostCard, Categories, PostWidget } from '../components';
import { getPosts } from '../services';
import { FeaturedPosts } from '../sections';


export default function Home({ posts }) {
  return (
    <div className="container mx-auto px-10 mb-8 ">
      <Head>
        <title>Bible Apologist</title>
        <meta name='description' content="Bible Apologist aims to defend the bible from lies and deception and provide sound theology to the users of this apologetics website."></meta>
        <meta name='keywords' content='Bible, Theology, Trinity, Jesus Christ, Truth, Apologetics, Questions and Answers, Islam'></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedPosts />
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
        <div className='lg:col-span-8 col-span-1'>
          {posts.map((post) => <PostCard post={post.node} key={post.title} />)}
        </div>
        <div className='lg:col-span-4 col-span-1'>
          <div className='lg:sticky relative top-8'>
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts },
  };
}

