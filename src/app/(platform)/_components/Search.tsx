"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useSearch } from "@/app/context/SearchContext";
import { usePathname, useRouter } from "next/navigation";

const Search: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { query, setQuery } = useSearch();
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    setIsExpanded(true);
    // Focus input after animation starts
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  const handleClose = () => {
    setQuery("");
    setIsExpanded(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push("/search");
    }
  };

  useEffect(() => {
    if (pathname === "/search") {
      setIsExpanded(true);
    }
  }, [pathname]);

  const handleBlur = () => {
    // Only close if query is empty and we're not on search page
    if (query === "" && pathname !== "/search") {
      setIsExpanded(false);
    }
  };

  return (
    <div className="relative flex items-center">
      <form onSubmit={handleSubmit} className="flex items-center">
        {/* Search Input with Smooth Expansion */}
        <div className="relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={handleBlur}
            className={`
              transition-all duration-500 ease-in-out
              ${
                isExpanded
                  ? "w-48 md:w-80 lg:w-60 opacity-100 px-4 py-2 pl-10"
                  : "w-0 opacity-0 px-0 py-2"
              }
              bg-black bg-opacity-70 border border-gray-600 rounded-md 
              text-white placeholder-gray-400 
              focus:outline-none focus:border-white focus:bg-opacity-90
              backdrop-blur-sm
            `}
            placeholder="Search movies, shows..."
          />

          {/* Search Icon - Always Visible */}
          <button
            type="button"
            onClick={isExpanded ? () => inputRef.current?.focus() : handleSearchClick}
            className={`
              ${
                isExpanded
                  ? "absolute left-2 top-1/2 transform -translate-y-1/2"
                  : ""
              }
              p-2 text-gray-200 hover:text-white transition-all duration-300
              ${
                isExpanded
                  ? "cursor-text z-10"
                  : "cursor-pointer hover:scale-110"
              }
            `}
          >
            <FaSearch size={16} />
          </button>

          {/* Close Button - Only when expanded and has content */}
          {isExpanded && query && (
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-3 top-1/2 transform -translate-y-1/2
                text-gray-400 hover:text-white transition-all duration-200"
            >
              <FaTimes size={14} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Search;
