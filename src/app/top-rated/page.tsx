"use client";
import React from "react";
import MainLayout from "../mainlayout";
import useInfiniteScrollMovies from "../hooks/useInfiniteScrollMovies";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import MovieCard from "../(platform)/_components/MovieCard";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const TopRatedPage: React.FC = () => {
  const {
    movies,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    totalResults,
    loadMore,
  } = useInfiniteScrollMovies({
    endpoint: "/movie/top_rated",
  });

  const loadMoreRef = useIntersectionObserver({
    onIntersect: loadMore,
    enabled: hasMore && !isLoadingMore,
  });

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
          <div className="min-h-screen">
            <LoadingSpinner />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center justify-center py-20">
            <div className="text-red-500 text-lg">
              Error loading top rated movies: {error}
            </div>
          </div>
        )}

        {/* Top Rated Movies Results */}
        {!isLoading && movies.length > 0 && (
          <div className="space-y-6">
            <div className="text-gray-300 text-sm">
              Found {totalResults} top rated movies - Showing {movies.length}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {movies.map((movie, index) => (
                <MovieCard key={`${movie.id}-${index}`} movie={movie} />
              ))}
            </div>

            {/* Load More Trigger */}
            {hasMore && (
              <div
                ref={loadMoreRef}
                className="flex justify-center py-8 min-h-[100px]"
              >
                {isLoadingMore ? (
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
                    <span className="text-gray-300">
                      Loading more movies...
                    </span>
                  </div>
                ) : (
                  <div className="text-gray-400 text-sm">
                    Scroll to load more...
                  </div>
                )}
              </div>
            )}

            {/* End of Results */}
            {!hasMore && movies.length > 0 && (
              <div className="flex justify-center py-8">
                <div className="text-gray-400 text-sm">
                  You've reached the end! No more movies to load.
                </div>
              </div>
            )}
          </div>
        )}

        {/* No Results */}
        {!isLoading && movies.length === 0 && !error && (
          <div className="flex items-center justify-center py-20 min-h-screen">
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
