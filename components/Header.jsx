/* eslint-disable max-len */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

import { BiMenu, BiX } from 'react-icons/bi';

import Link from 'next/link';

import { IBM_Plex_Sans } from '@next/font/google';

import bibleLogo from '../public/Images/bible.png';

import { getCategories } from '../services';

const ibm = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: '400',
});

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
      <div className={`${ibm.className} pb-5 h-full md:flex items-center justify-between bg-white py-4 md:px-10 px-7`}>
        <div className="font-bold text-3xl flex items-center text-gray-800">
          <Link href="/">
            <span className="container relative hover:cursor-pointer">
              <Image
                src={bibleLogo}
                alt="Bible Logo"
                width="50"
                height="auto"
              />
            </span>
          </Link>
          <Link href="/">
            <h1 className="px-2 ml-1 mt-2 hover:cursor-pointer">Bible Apologist</h1>
          </Link>
        </div>
        <div onClick={() => setToggle(!toggle)} className="text-3xl absolute right-2 top-7 cursor-pointer md:hidden">
          {toggle ? <BiX size={30} /> : <BiMenu size={30} /> }
        </div>
        <ul className={`md:flex md:items-center md:pb-0 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease in ${toggle ? 'top-20 opacity-100' : 'top-[-490px]'} md:opacity-100`}>
          {categories.map((category) => (
            <Link href={`/category/${category.slug}`}>
              <li key={category.slug} className="cursor-pointer md:ml-8 text-lg md:my-0 my-7">
                <a className="cursor-pointer text-gray-800 hover:text-blue-700 duration-500 ">
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
