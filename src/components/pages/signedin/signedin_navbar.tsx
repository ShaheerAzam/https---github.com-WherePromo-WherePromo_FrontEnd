// import React, { useState } from 'react';

import { Link } from "react-router-dom";

const handleLogout = () => {
  window.localStorage.clear();
  window.location.href = "./";
};

const Signedin_Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-4 py-4 flex justify-between items-center w-full">
      <div className="flex items-center">
        <span className="text-xl text-sky-500 font-bold mr-4">WherePromo</span>
      </div>

      <div className="flex space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-500">
          Home
        </Link>

        <Link to="/about" className="text-gray-700 hover:text-blue-500">
          About
        </Link>
        <Link
          to="/signedin_article"
          className="text-gray-700 hover:text-blue-500"
        >
          Articles
        </Link>
        <Link to="/favourites" className="text-gray-700 hover:text-blue-500">
          Favourites
        </Link>

        <Link to="/maps" className="text-gray-700 hover:text-blue-500">
          Maps
        </Link>
      </div>

      <div>
        <button
          className="bg-blue-500 text-white font-bold rounded-2xl px-4 py-2"
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Signedin_Navbar;
