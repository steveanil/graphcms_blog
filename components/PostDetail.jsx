/* eslint-disable quotes */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import moment from "moment";
import { RichText } from "@graphcms/rich-text-react-renderer";
import Image from "next/image";
import Link from "next/link";

import { AiFillCalendar } from "react-icons/ai";
import { ToolTip as Tooltip } from "./ToolTip";

const PostDetail = ({ post }) => (
  <div className="bg-white dark:bg-slate-800 dark:text-slate-200 shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
    <div className="relative overflow-hidden shadow-md pb-64 lg:py-64 mb-6">
      <Image
        priority
        src={post.featuredImage.url}
        alt={post.title}
        fill
        sizes="(max-width: 768px) 100vw,
        (max-width: 1200px) 50vw,
        33vw"
        className="object-cover shadow-lg rounded-t-lg lg:rounded-lg"
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
          <p className="dark:text-white dark:font-bold inline align-middle text-gray-700 ml-2 font-medium text-lg">
            {post.author.name}
          </p>
        </div>
        <div className="font-medium text-gray-700">
          <AiFillCalendar className="h-6 w-6 inline mr-2 text-blue-500" />
          <span className="dark:text-white align-middle">
            Updated At: {moment(post.updatedAt).format("MMM DD, YYYY")}
          </span>
        </div>
      </div>
      <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
      <RichText
        content={post.content.raw.children}
        renderers={{
          p: ({ children }) => <p className="mb-5">{children}</p>,
          bold: ({ children }) => <strong>{children}</strong>,
          h3: ({ children }) => (
            <h3 className="text-xl font-bold mb-4">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-semibold mb-4">{children}</h4>
          ),
          blockquote: ({ children }) => (
            <div className="p-4 italic my-4 bg-gray-50 border-l-4 border-gray-300 dark:border-neutral-400 dark:text-white dark:bg-slate-500">
              {children}
            </div>
          ),
          img: ({ src, altText, height, width }) => (
            <Image src={src} alt={altText} height={height} width={width} />
          ),
          a: ({ children, openInNewTab, title, href, rel, ...rest }) => {
            if (href.match(/^https?:\/\/|^\/\//i)) {
              return (
                <Tooltip message={title}>
                  <Link legacyBehavior href={href} passHref>
                    <a
                      href={href}
                      target={openInNewTab ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      className="text-sky-400 font-semibold"
                      {...rest}
                    >
                      {children}
                    </a>
                  </Link>
                </Tooltip>
              );
            }
            return (
              <Link legacyBehavior href={href} passHref>
                <a {...rest}>{children}</a>
              </Link>
            );
          },
        }}
      />
    </div>
  </div>
);

export default PostDetail;
