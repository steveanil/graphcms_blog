/* eslint-disable max-len */
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const SearchBar = () => {
  const router = useRouter();
  const [searches, setSearches] = useState(''); // searches will contain whatever I type on the search bar

  function handleSubmit(e) {
    e.preventDefault();
    const cleanedQuery = searches.trim().replace('?', '').replace(/\s+/g, ' ').toLowerCase();
    const originalQuery = cleanedQuery;
    const hyphenatedQuery = cleanedQuery.replace(/\s+/g, '-');

    router.push(`/search/${originalQuery}`);
    router.push(`/search/${hyphenatedQuery}`);
    setSearches('');
  }

  return (
    <form className="max-w-lg relative lg:pt-0 pt-3 mx-auto flex justify-center" onSubmit={handleSubmit}>
      <div className="relative">
        <input
          type="search"
          required
          value={searches}
          onChange={(e) => setSearches(e.target.value)}
          className="p-3 md:p-2 text-white rounded-full w-full bg-slate-700 border-black outline-none"
          placeholder=" Search Posts..."
          aria-label="Search"
        />
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 p-3 md:p-3 bg-slate-900 rounded-full"
          type="submit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5 md:h-5 md:w-5 text-cyan-100 hover:text-cyan-200"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
