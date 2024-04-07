


import React, { useState } from 'react';
import DetailedArticlesList from './detailedrticleslist';
import Navbar from './navbar';

function Articles() {
  // State variables for filter and search
  const [filter, setFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle filter changes
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  // Function to handle search query changes
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <div className="flex gap-5 justify-between mt-16 w-full max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-2 justify-center px-8 py-4 text-sm font-bold tracking-tight leading-5 text-white bg-blue-500 rounded-full max-md:px-5">
            <div className="my-auto">Filters</div>
            <select value={filter} onChange={handleFilterChange} className="bg-gray-100 text-gray-700">
              <option value="">All</option>
              <option value="filter1">Filter 1</option>
              <option value="filter2">Filter 2</option>
            </select>
          </div>

          <div className="flex gap-5 items-start px-6 py-3.5 text-base leading-10 border border-gray-300 rounded-lg text-gray-700 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
            <div className="flex-auto my-auto italic"></div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search an Article..."
              className="w-full focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        <DetailedArticlesList filter={filter} searchQuery={searchQuery} />

        <div className="flex flex-col self-center px-5 mt-24 w-full max-w-screen-lg max-md:mt-10 max-md:max-w-full">
          Embark on a journey through the pages of our diverse articles, each
          crafted to illuminate the unique tales and hidden treasures found within
          the world of retail. From insider tips to extraordinary discoveries, our
          community's narratives are your guide to a retail adventure like no
          other. Explore, be inspired, and uncover the stories that make shopping
          an unforgettable experience.
        </div>
      </div>
    </div>
  );
}

export default Articles;
