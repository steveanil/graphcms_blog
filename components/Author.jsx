import React from 'react';
import Image from 'next/image';

export const Author = ({ author }) => (
  <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
    <div className="absolute items-center flex justify-center left-0 right-5 -top-14">
      <Image
        alt={author.name}
        height="100"
        width="100"
        src={author.photo.url}
      />
    </div>
    <h3 className="text-white mt-4 mb-4 text-xl font-bold">{author.name}</h3>
    <p className="text-white text-lg">{author.bio}</p>
  </div>
);

export default Author;
