"use client";
import React, { useState, useEffect } from "react";
import MainLayout from "../mainlayout";
import MovieCard from "../(platform)/_components/MovieCard";
import useInfiniteScrollMovies from "../hooks/useInfiniteScrollMovies";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { ClipLoader } from "react-spinners";

const TrendingPage: React.FC = () => {
  console.log("TrendingPage component rendering");

  const [timeWindow, setTimeWindow] = useState<"day" | "week">("day");

  console.log("About to call useInfiniteScrollMovies");
  const {
    movies,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    totalResults,
    loadMore,
    reset,
  } = useInfiniteScrollMovies({
    endpoint: "/trending/movie",
    timeWindow,
  });

  console.log("useInfiniteScrollMovies returned:", {
    moviesCount: movies.length,
    isLoading,
    isLoadingMore,
    hasMore,
    error,
  });

  console.log("About to create intersection observer with:", {
    hasMore,
    isLoadingMore,
    enabled: hasMore && !isLoadingMore,
  });

  const loadMoreRef = useIntersectionObserver({
    onIntersect: loadMore,
    enabled: hasMore && !isLoadingMore,
  });

  console.log("loadMoreRef created:", loadMoreRef);

  console.log("TrendingPage final state:", {
    moviesCount: movies.length,
    isLoading,
    isLoadingMore,
    hasMore,
    timeWindow,
    observerEnabled: hasMore && !isLoadingMore,
  });

  const handleTimeWindowChange = (newTimeWindow: "day" | "week") => {
    setTimeWindow(newTimeWindow);
  };

  return (
    <MainLayout>
      <div className="pt-[130px] px-4 md:px-8 lg:px-16 bg-gradient-to-b from-black via-gray-900 to-black">
        {/* Header with Time Window Selector */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl text-white font-semibold mb-4">
            Trending Movies
          </h1>

          {/* Time Window Toggle */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => handleTimeWindowChange("day")}
              className={`px-4 py-2 rounded-md transition-all duration-200 ${
                timeWindow === "day"
                  ? "bg-red-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Today
            </button>
            <button
              onClick={() => handleTimeWindowChange("week")}
              className={`px-4 py-2 rounded-md transition-all duration-200 ${
                timeWindow === "week"
                  ? "bg-red-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              This Week
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex min-h-screen justify-center items-center py-20">
            <ClipLoader size={60} color={"#E50913"} loading={true} />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center justify-center py-20">
            <div className="text-red-500 text-lg">
              Error loading trending movies: {error}
            </div>
          </div>
        )}

        {/* Trending Movies Results */}
        {!isLoading && movies.length > 0 && (
          <div className="space-y-6">
            <div className="text-gray-300 text-sm">
              Found {totalResults} trending movies (
              {timeWindow === "day" ? "today" : "this week"}) - Showing{" "}
              {movies.length}
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
                className="flex justify-center py-8 min-h-[100px] bg-gray-800/20"
                style={{ border: "1px solid red" }} // Debug visual
              >
                {isLoadingMore ? (
                  <div className="flex items-center gap-3">
                    <ClipLoader size={24} color={"#E50913"} loading={true} />
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
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-400 text-lg">
              No trending movies found
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default TrendingPage;
