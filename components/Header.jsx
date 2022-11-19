/* eslint-disable max-len */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import Link from 'next/link';

import { getCategories } from '../services';

// Navbar

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((newCategories) => setCategories(newCategories));
  }, []);
  return (
    <div className="shadow-md w-full sticky top-0 left-0 z-50 mb-10">
      <div className="pb-5 h-full md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div className="font-bold text-3xl flex items-center text-gray-800">
          <Link href="/" passHref>
            <span className="relative p-5 w-20 hover:cursor-pointer">
              <Image
                src="/Images/bible.png"
                layout="fill"
                objectFit="contain"
              />
            </span>
          </Link>
          <Link href="/">
            <h1 className="hover:cursor-pointer">Bible Apologist</h1>
          </Link>
        </div>
        <div onClick={() => setToggle(!toggle)} className="text-3xl absolute right-2 top-6 cursor-pointer md:hidden">
          <ion-icon name={`${toggle ? 'close' : 'menu'}`}></ion-icon>
        </div>
        <ul className={`md:flex md:items-center md:pb-0 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease in ${toggle ? 'top-20 opacity-100' : 'top-[-490px]'} md:opacity-100`}>
          {categories.map((category) => (
            <Link passHref href={`/category/${category.slug}`}>
              <li key={category.slug} className="cursor-pointer md:ml-8 text-lg md:my-0 my-7">
                <a className="cursor-pointer text-gray-800 hover:text-amber-700 duration-500 ">
                  {category.name}
                </a>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>

  );
};

export default Header;
