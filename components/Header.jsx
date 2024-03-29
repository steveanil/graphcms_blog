/* eslint-disable max-len */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BiMenu, BiX } from 'react-icons/bi';
import Link from 'next/link';
import { IBM_Plex_Sans } from 'next/font/google';
import SearchBar from './SearchBar';
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
    <div className="w-full sticky top-0 left-0 z-50 mb-10">
      <div className={`${ibm.className} border-b border-slate-700 bg-white dark:bg-slate-800 shadow-md px-4 md:px-10 py-4 md:flex md:items-center md:justify-between`}>
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
          <Link href="/" className=" dark:text-white px-2 ml-1 mt-2 hover:cursor-pointer font-bold text-3xl flex items-center text-gray-800">
            Bible Apologist
          </Link>
        </div>
        <div onClick={() => setToggle(!toggle)} className="dark:text-white text-3xl absolute right-2 top-7 cursor-pointer lg:hidden">
          {toggle ? <BiX size={30} /> : <BiMenu size={30} /> }
        </div>
        <ul className={`dark:bg-slate-800 bg-white lg:flex lg:items-center lg:pb-0 absolute lg:static lg:z-auto z-[-1] left-0 w-full lg:w-auto lg:pl-0 pl-9 transition-all duration-500 ease in ${toggle ? 'top-20 opacity-100' : 'top-[-490px]'} lg:opacity-100`}>
          <SearchBar />
          {categories.map((category, index) => (
            <Link key={index} href={`/category/${category.slug}`} prefetch={false} className=" dark:text-white flex col-span-1 lg:ml-8 text-base lg:my-0 my-7 cursor-pointer text-gray-800 hover:text-blue-700 dark:hover:text-slate-400 duration-500">
              {category.name}
            </Link>
          ))}
        </ul>
      </div>
    </div>

  );
};

export default Header;
