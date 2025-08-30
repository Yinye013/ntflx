"use client";

import React, { useEffect, useState, Suspense } from "react";
import MainLayout from "../mainlayout";
import { useSearch } from "../context/SearchContext";
import useSearchMovies from "../hooks/useSearchMovies";
import { useSearchParams } from "next/navigation";
import MovieCard from "../(platform)/_components/MovieCard";

const SearchPageContent: React.FC = () => {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") || "";
  const [page, setPage] = useState(1);
  
  const {
    query,
    setQuery,
    searchResults: contextData,
    error: contextError,
    isLoading: contextLoading,
  } = useSearch();

  // Set query from URL if it exists and context query is empty
  useEffect(() => {
    if (urlQuery && !query) {
      setQuery(urlQuery);
    }
  }, [urlQuery, query, setQuery]);

  // Reset page to 1 when query changes
  useEffect(() => {
    setPage(1);
  }, [query, urlQuery]);

  // Use URL query if context query is empty
  const activeQuery = query || urlQuery;

  // Use hook data with pagination for search results page
  const {
    data: hookData,
    error: hookError,
    isLoading: hookLoading,
  } = useSearchMovies(activeQuery, page);

  // For search page, prioritize hook data with pagination over context data
  const data = hookData || contextData;
  const error = hookError || contextError;
  const isLoading = hookLoading || contextLoading;

  const handleNextPage = () => {
    if (data && page < data.total_pages) {
      setPage(page + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <MainLayout>
      <div className="pt-[130px] px-4 md:px-8 lg:px-16">
        {/* Search Header */}
        <div className="mb-8">
          {activeQuery ? (
            <h1 className="text-2xl md:text-3xl text-white font-semibold">
              Search results for "{activeQuery}"
            </h1>
          ) : (
            <h1 className="text-2xl md:text-3xl text-white font-semibold">
              Search for movies
            </h1>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-white text-lg">Searching movies...</div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center justify-center py-20">
            <div className="text-red-500 text-lg">
              Error loading search results: {error.message}
            </div>
          </div>
        )}

        {/* Search Results */}
        {data && data.results && (
          <div className="space-y-6">
            <div className="flex justify-between items-center text-gray-300 text-sm">
              <div>
                Found {data.total_results} results for "{activeQuery}"
                {data.total_pages > 1 && (
                  <span> - Page {page} of {data.total_pages}</span>
                )}
              </div>
              
              {/* Pagination Controls */}
              {data.total_pages > 1 && (
                <div className="flex gap-2">
                  <button
                    onClick={handlePrevPage}
                    disabled={page === 1}
                    className={`px-3 py-1 rounded-md transition-all duration-200 ${
                      page === 1
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleNextPage}
                    disabled={!data || page >= data.total_pages}
                    className={`px-3 py-1 rounded-md transition-all duration-200 ${
                      !data || page >= data.total_pages
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {data.results.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                />
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {data && data.results && data.results.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-400 text-lg">
              No movies found for "{query}"
            </div>
          </div>
        )}

        {/* Empty State */}
        {!query && !isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-400 text-lg">
              Use the search bar to find movies
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

const SearchPage: React.FC = () => {
  return (
    <Suspense fallback={
      <MainLayout>
        <div className="pt-[130px] px-4 md:px-8 lg:px-16">
          <div className="flex items-center justify-center py-20">
            <div className="text-white text-lg">Loading search...</div>
          </div>
        </div>
      </MainLayout>
    }>
      <SearchPageContent />
    </Suspense>
  );
};

export default SearchPage;
