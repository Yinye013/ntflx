"use client";
import React, { useState } from "react";
import MainLayout from "../mainlayout";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import MovieCard from "../(platform)/_components/MovieCard";

const TopRatedPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useTopRatedMovies(page);

  const handleNextPage = () => {
    if (data && page < data.total_pages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <MainLayout>
      <div className="pt-[130px] px-4 md:px-8 lg:px-16 bg-gradient-to-b from-black via-gray-900 to-black">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl text-white font-semibold mb-4">
            Top Rated Movies
          </h1>
          <p className="text-gray-300 text-sm">
            Discover the highest rated movies of all time
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-white text-lg">
              Loading top rated movies...
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center justify-center py-20">
            <div className="text-red-500 text-lg">
              Error loading top rated movies: {error.message}
            </div>
          </div>
        )}

        {/* Top Rated Movies Results */}
        {data && data.results && (
          <div className="space-y-6">
            <div className="flex justify-between items-center text-gray-300 text-sm">
              <div>
                Found {data.total_results} top rated movies (Page {page} of{" "}
                {data.total_pages})
              </div>

              {/* Pagination Controls */}
              <div className="flex gap-2">
                <button
                  onClick={handlePrevPage}
                  disabled={page === 1}
                  className={`px-3 py-1 rounded-md transition-all duration-200 ${
                    page === 1
                      ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={!data || page >= data.total_pages}
                  className={`px-3 py-1 rounded-md transition-all duration-200 ${
                    !data || page >= data.total_pages
                      ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  Next
                </button>
              </div>
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
              No top rated movies found
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default TopRatedPage;
