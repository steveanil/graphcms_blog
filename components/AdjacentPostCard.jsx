import React from 'react';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';

const AdjacentPostCard = ({ post, position }) => (
  <>
    <Image
      priority
      width={400}
      height={200}
      alt={post.title}
      src={post.featuredImage.url}
      className="absolute rounded-lg block shadow-md w-full h-full"
    />
    <div className="absolute rounded-lg bg-center bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black w-full h-72" />
    <div className="flex flex-col rounded-lg p-4 items-center justify-center absolute w-full h-full">
      <p className="text-white text-shadow font-semibold text-xs">{moment(post.updatedAt).format('MMM DD, YYYY')}</p>
      <p className="text-white text-shadow font-semibold text-2xl text-center">{post.title}</p>
    </div>
    <Link href={`/post/${post.slug}`}><span className="z-10 cursor-pointer absolute w-full h-full" /></Link>
    {position === 'LEFT' && (
      <div className="absolute arrow-btn bottom-5 flex justify-center text-center py-3 cursor-pointer bg-blue-600 left-4 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </div>
    )}
    {position === 'RIGHT' && (
      <div className="absolute arrow-btn bottom-5 flex justify-center text-center py-3 cursor-pointer bg-blue-600 right-4 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    )}
  </>
);

export default AdjacentPostCard;
