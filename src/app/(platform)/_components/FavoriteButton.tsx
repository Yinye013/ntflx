"use client";
import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import useFavorites from "../../hooks/useFavorites";

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  backdrop_path?: string;
  overview?: string;
  release_date?: string;
  vote_average?: number;
}

interface FavoriteButtonProps {
  movie: Movie;
  size?: number;
  className?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ 
  movie, 
  size = 20, 
  className = "" 
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isLoading, setIsLoading] = useState(false);

  const isMovieFavorite = isFavorite(movie.id);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) return;

    try {
      setIsLoading(true);
      await toggleFavorite(movie);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`
        group relative p-2 rounded-full transition-all duration-200
        hover:bg-black/60 hover:scale-110
        disabled:cursor-not-allowed disabled:opacity-50
        ${className}
      `}
      aria-label={isMovieFavorite ? "Remove from My List" : "Add to My List"}
    >
      {/* Loading spinner overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {/* Heart icon */}
      <div className={`transition-opacity duration-200 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {isMovieFavorite ? (
          <FaHeart 
            size={size} 
            className="text-red-500 drop-shadow-lg group-hover:text-red-400 transition-colors duration-200" 
          />
        ) : (
          <FaRegHeart 
            size={size} 
            className="text-white drop-shadow-lg group-hover:text-red-400 transition-colors duration-200" 
          />
        )}
      </div>
    </button>
  );
};

export default FavoriteButton;