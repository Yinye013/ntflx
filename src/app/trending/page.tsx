"use client";
import React, { useState } from "react";
import MainLayout from "../mainlayout";
import useTrendingMovies from "../hooks/useTrendingMovies";
import Link from "next/link";

const TrendingPage: React.FC = () => {
  const [timeWindow, setTimeWindow] = useState<'day' | 'week'>('day');
  const { data, error, isLoading } = useTrendingMovies(timeWindow);

  return (
    <MainLayout>
      <div className="pt-[130px] px-4 md:px-8 lg:px-16">
        {/* Header with Time Window Selector */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl text-white font-semibold mb-4">
            Trending Movies
          </h1>
          
          {/* Time Window Toggle */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setTimeWindow('day')}
              className={`px-4 py-2 rounded-md transition-all duration-200 ${
                timeWindow === 'day'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setTimeWindow('week')}
              className={`px-4 py-2 rounded-md transition-all duration-200 ${
                timeWindow === 'week'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              This Week
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-white text-lg">Loading trending movies...</div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center justify-center py-20">
            <div className="text-red-500 text-lg">
              Error loading trending movies: {error.message}
            </div>
          </div>
        )}

        {/* Trending Movies Results */}
        {data && data.results && (
          <div className="space-y-6">
            <div className="text-gray-300 text-sm">
              Found {data.total_results} trending movies ({timeWindow === 'day' ? 'today' : 'this week'})
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {data.results.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/details/${movie.id}`}
                  className="group cursor-pointer transition-transform duration-300 hover:scale-105"
                >
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
                    {movie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                    
                    {/* Overlay with movie info */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100">
                      <div className="text-white text-sm font-medium mb-1 truncate">
                        {movie.title}
                      </div>
                      <div className="text-gray-300 text-xs">
                        {movie.release_date?.split('-')[0]}
                      </div>
                      <div className="flex items-center mt-1">
                        <span className="text-yellow-400 text-xs">★</span>
                        <span className="text-gray-300 text-xs ml-1">
                          {movie.vote_average?.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {data && data.results && data.results.length === 0 && (
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
