import Link from "next/link";
import React from "react";
import FavoriteButton from "./FavoriteButton";

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  backdrop_path?: string;
  overview?: string;
  release_date?: string;
  vote_average?: number;
}

interface MovieCardProps {
  movie: Movie;
  showFavoriteButton?: boolean;
  badges?: React.ReactNode[];
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  showFavoriteButton = true,
  badges = [],
}) => {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group cursor-pointer transition-transform duration-300 hover:scale-105"
    >
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-800">
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/images/not-found.jpg'}
          alt={movie.title}
          className="w-full h-full object-cover"
        />

        {/* Favorite Button */}
        {showFavoriteButton && (
          <div className="absolute top-2 left-2 z-10">
            <FavoriteButton movie={movie} size={16} />
          </div>
        )}

        {/* Custom badges (like Coming Soon, Rating, etc.) */}
        {badges.map((badge, index) => (
          <div key={index} className="absolute bottom-2 left-2 z-10">
            {badge}
          </div>
        ))}

        {/* Default Rating Badge */}
        {movie.vote_average && movie.vote_average > 0 && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded-md">
            <div className="flex items-center">
              <span className="text-yellow-400 text-xs">★</span>
              <span className="text-white text-xs ml-1 font-semibold">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
          </div>
        )}

        {/* Overlay with movie info */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100">
          <div className="text-white text-sm font-medium mb-1 truncate">
            {movie.title}
          </div>
          <div className="text-gray-300 text-xs">
            {movie.release_date?.split("-")[0]}
          </div>
          {movie.vote_average && movie.vote_average > 0 && (
            <div className="flex items-center mt-1">
              <span className="text-yellow-400 text-xs">★</span>
              <span className="text-gray-300 text-xs ml-1">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
