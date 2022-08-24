import React, {useState, useEffect} from 'react';

import Link from 'next/link';

import { getCategories } from '../services';

// Navbar

const Header = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((newCategories) => setCategories(newCategories))
  }, []);
  return (
    <div className='container mx-auto px-10 mb-8'>
        <div className='border-b w-full inline-block border-blue-400 py-8'>
            <div className='md: float-left block'>
                <Link href='/'>
                    <span className='cursor-pointer font-bold text-4xl text-white'>
                        ReasonAndFaith
                    </span>
                </Link>
            </div>
            <div className='hidden md:float-left md:contents'>
                {categories.map((category) => (
                    <Link key={category.slug} href={`/category/${category.slug}`}>
                        <span className='md:float-right text-white mt-2 align-middle transition duration-400 hover:bg-gradient-to-r from-pink-500 to-yellow-500 hover:text-transparent bg-clip-text transform hover:-translate-y-1 ml-4 font-bold cursor-pointer'>
                            {category.name}
                        </span>
                    </Link>
                ))}
            </div>
        </div>

    </div>
  )
}

export default Header;