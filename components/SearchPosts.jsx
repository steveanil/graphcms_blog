import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';

const SearchPosts = ({ post }) => (
  <div className="bg-white dark:bg-slate-800 shadow-lg rounded-xl p-0 lg:p-5 pb-10">
    <h1 className="md:truncate dark:hover:text-slate-400 duration-500 text-center mb-3 text-2xl font-semibold text-gray-800 dark:text-slate-50">
      <Link href={`/post/${post.slug}`}>
        {post.title}
      </Link>
    </h1>
    <div className="block lg:flex text-center items-center justify-center w-full">
      <div className="flex items-center h-full justify-center mb-4 lg:mb-0 lg:w-auto mr-8">
        <Image
          alt={post.author.name}
          height="35"
          width="30"
          className="align-middle rounded-full w-auto"
          src={post.author.photo.url}
        />
        <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg dark:text-slate-50">{post.author.name}</p>
      </div>
      <div className="font-medium text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="dark:text-slate-50">
          Updated At:
          {' '}
          {moment(post.updatedAt).format('MMM DD, YYYY')}
        </span>
      </div>
    </div>
    <p className="line-clamp-2 text-center text-lg text-gray-700 pt-2 font-normal dark:text-slate-200">{post.excerpt}</p>
    <div className="flex justify-center items-center pt-10 pb-5">
      <Link href={`/post/${post.slug}`}>
        <span className="transition duration-500 ease transform hover:-translate-y-1 bg-blue-600 hover:bg-blue-700 text-lg font-medium rounded-full text-white px-8 py-4 cursor-pointer">
          Continue Reading
        </span>
      </Link>
    </div>
  </div>
);

export default SearchPosts;
