/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import moment from 'moment';
import { RichText } from '@graphcms/rich-text-react-renderer';
import Image from 'next/image';
import Link from 'next/link';

const PostDetail = ({ post }) => (
  <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
    <div className="relative overflow-hidden shadow-md mb-6">
      <Image
        priority
        height={600}
        width={900}
        src={post.featuredImage.url}
        alt={post.title}
        className="object-top h-full w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg"
      />
    </div>
    <div className="px-4 lg:px-0">
      <div className="flex items-center mb-8 w-full">
        <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8">
          <Image
            alt={post.author.name}
            height="30"
            width="30"
            className="align-middle rounded-full"
            src={post.author.photo.url}
          />
          <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">{post.author.name}</p>
        </div>
        <div className="font-medium text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="align-middle">
            Updated At:
            {' '}
            {moment(post.updatedAt).format('MMM DD, YYYY')}
          </span>
        </div>
      </div>
      <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
      <RichText
        content={post.content.raw.children}
        renderers={{
          p: ({ children }) => <p className="mb-5">{children}</p>,
          bold: ({ children }) => <strong>{children}</strong>,
          h3: ({ children }) => <h3 className="text-xl font-semibold mb-4">{children}</h3>,
          h4: ({ children }) => <h4 className="text-md font-semibold mb-4">{children}</h4>,
          blockquote: ({ children }) => (
            <div className="p-4 italic my-4 bg-gray-50 border-l-4 border-gray-300 dark:border-yellow-800 dark:text-white dark:bg-yellow-600">
              {children}
            </div>
          ),
          img: ({
            src, altText, height, width,
          }) => (
            <Image
              src={src}
              alt={altText}
              height={height}
              width={width}
            />
          ),
          a: ({
            children, openInNewTab, href, rel, ...rest
          }) => {
            if (href.match(/^https?:\/\/|^\/\//i)) {
              return (
                <Link
                  href={href}
                  className="text-sky-400 font-semibold"
                  rel="noopener noreferrer"
                  target={openInNewTab ? '_blank' : '_self'}
                  {...rest}
                >
                  {children}
                </Link>
              );
            }
            return (
              <Link href={href} rel="noopener noreferrer" {...rest}>
                {children}
              </Link>
            );
          },
        }}
      />

    </div>
  </div>
);

export default PostDetail;
