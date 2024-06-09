"use client";
import React, { useState, useCallback, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useSearch } from "@/app/context/SearchContext";

const Search: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const { query, setQuery } = useSearch();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    setIsActive(true);
  };

  useCallback(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  const handleBlur = () => {
    if (query === "") {
      setIsActive(false);
    }
  };
  return (
    <div className="relative flex items-center">
      {isActive ? (
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={handleBlur}
          className="transition-width duration-300 ease-in-out w-0 sm:w-64 px-4 py-1 border border-gray-300 rounded-md focus:outline-none"
          placeholder="Search..."
        />
      ) : (
        <button onClick={handleSearchClick} className="p-2">
          <FaSearch />
        </button>
      )}
    </div>
  );
};

export default Search;
