"use client";
import React from "react";
import MainLayout from "../mainlayout";
import useFavorites from "../hooks/useFavorites";
import MovieCard from "../(platform)/_components/MovieCard";

const FavoritesPage: React.FC = () => {
  const { favorites, isLoading, error } = useFavorites();

  const convertFavoriteToMovie = (favorite: any) => ({
    id: favorite.movieId,
    title: favorite.title,
    poster_path: favorite.posterPath,
    backdrop_path: favorite.backdropPath,
    overview: favorite.overview,
    release_date: favorite.releaseDate,
    vote_average: favorite.voteAverage,
  });

  return (
    <MainLayout>
      <div className="pt-[130px] px-4 md:px-8 lg:px-16 bg-gradient-to-b from-black via-gray-900 to-black min-h-screen">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl text-white font-semibold mb-4">
            My List
          </h1>
          <p className="text-gray-300 text-sm">
            Your personal collection of favorite movies
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-white text-lg">Loading your favorites...</div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center justify-center py-20">
            <div className="text-red-500 text-lg">
              Error loading favorites: {error.message}
            </div>
          </div>
        )}

        {/* Favorites Grid */}
        {!isLoading && !error && favorites && (
          <div className="space-y-6">
            {favorites.length > 0 ? (
              <>
                <div className="text-gray-300 text-sm">
                  {favorites.length} movie{favorites.length !== 1 ? 's' : ''} in your list
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {favorites.map((favorite) => (
                    <MovieCard
                      key={favorite.id}
                      movie={convertFavoriteToMovie(favorite)}
                      showFavoriteButton={true}
                    />
                  ))}
                </div>
              </>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
                    <svg 
                      className="w-12 h-12 text-gray-500" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Your list is empty
                  </h3>
                  <p className="text-gray-400 max-w-md">
                    Start adding movies to your list by clicking the heart icon on any movie card. 
                    Explore trending, top rated, or upcoming movies to find something you like!
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/trending"
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    Browse Trending Movies
                  </a>
                  <a
                    href="/top-rated"
                    className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    Explore Top Rated
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default FavoritesPage;