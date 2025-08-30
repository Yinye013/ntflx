"use client";
import React, { useState } from "react";
import BackButton from "./BackButton";
import Rating from "./Rating";
import { format, parse } from "date-fns";
import { ClipLoader } from "react-spinners";
import {
  FaClock,
  FaCalendarAlt,
  FaDollarSign,
  FaUsers,
  FaExternalLinkAlt,
  FaTheaterMasks,
  FaLaugh,
  FaBolt,
  FaHeart,
  FaFilm,
  FaGhost,
  FaSkull,
  FaChild,
  FaSpaceShuttle,
  FaMusic,
  FaGlobe,
} from "react-icons/fa";

import {
  GiWarAxe,
  GiDramaMasks,
  GiWesternHat,
  GiWitchFlight,
  GiMagicBroom,
  GiMusicalNotes,
  GiCrimeSceneTape,
} from "react-icons/gi";
import Link from "next/link";

type MovieDetailsProps = {
  movie: any;
  isLoading: boolean;
  error: string;
  cast: any;
};

const genreIcons: { [key: string]: JSX.Element } = {
  Drama: <GiDramaMasks size={20} />,
  War: <GiWarAxe size={20} />,
  Action: <FaBolt size={20} />,
  Comedy: <FaLaugh size={20} />,
  Romance: <FaHeart size={20} />,
  Documentary: <FaFilm size={20} />,
  Horror: <FaGhost size={20} />,
  Thriller: <FaSkull size={20} />,
  Family: <FaChild size={20} />,
  "Science Fiction": <FaSpaceShuttle size={20} />,
  Music: <FaMusic size={20} />,
  Fantasy: <GiMagicBroom size={20} />,
  Mystery: <GiWitchFlight size={20} />,
  Western: <GiWesternHat size={20} />,
  Musical: <GiMusicalNotes size={20} />,
  Crime: <GiCrimeSceneTape size={20} />,
  Adventure: <FaGlobe size={20} />,
};

const MovieDetails: React.FC<MovieDetailsProps> = ({
  movie,
  isLoading,
  error,
  cast,
}) => {
  const [showFullOverview, setShowFullOverview] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <ClipLoader size={60} color={"#E50913"} loading={true} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-red-500 text-lg">Error loading movie details</div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      const date = parse(dateString, "yyyy-MM-dd", new Date());
      return format(date, "MMMM do, yyyy");
    } catch {
      return dateString;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const shouldTruncateOverview = movie?.overview?.length > 300;
  const displayOverview =
    showFullOverview || !shouldTruncateOverview
      ? movie?.overview
      : movie?.overview?.slice(0, 300) + "...";

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <BackButton />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 mt-8">
          {/* Movie Poster */}
          <div className="lg:col-span-2">
            <div className="sticky top-8">
              <div className="relative group">
                <img
                  src={
                    movie?.poster_path
                      ? `https://image.tmdb.org/t/p/w780${movie.poster_path}`
                      : "/images/no-poster.png"
                  }
                  alt={movie?.title}
                  className="w-full max-w-md mx-auto lg:mx-0 rounded-xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>

          {/* Movie Information */}
          <div className="lg:col-span-3 space-y-8">
            {/* Title and Tagline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {movie?.title}
              </h1>
              {movie?.tagline && (
                <p className="text-xl md:text-2xl text-gray-300 italic font-light">
                  "{movie.tagline}"
                </p>
              )}
            </div>

            {/* Key Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3 text-white">
                <FaCalendarAlt
                  className="text-red-500 flex-shrink-0"
                  size={20}
                />
                <div>
                  <div className="text-sm text-gray-400">Release Date</div>
                  <div className="font-semibold">
                    {formatDate(movie?.release_date)}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-white">
                <FaClock className="text-red-500 flex-shrink-0" size={20} />
                <div>
                  <div className="text-sm text-gray-400">Runtime</div>
                  <div className="font-semibold">
                    {movie?.runtime ? formatRuntime(movie.runtime) : "N/A"}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-white">
                <Rating voteAverage={movie?.vote_average} />
                <div>
                  <div className="text-sm text-gray-400">Rating</div>
                  <div className="font-semibold">
                    {movie?.vote_average?.toFixed(1)}/10
                  </div>
                </div>
              </div>

              {movie?.budget > 0 && (
                <div className="flex items-center space-x-3 text-white">
                  <FaDollarSign
                    className="text-red-500 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <div className="text-sm text-gray-400">Budget</div>
                    <div className="font-semibold">
                      {formatCurrency(movie.budget)}
                    </div>
                  </div>
                </div>
              )}

              {movie?.revenue > 0 && (
                <div className="flex items-center space-x-3 text-white">
                  <FaDollarSign
                    className="text-green-500 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <div className="text-sm text-gray-400">Revenue</div>
                    <div className="font-semibold">
                      {formatCurrency(movie.revenue)}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Genres */}
            {movie?.genres && movie.genres.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Genres</h3>
                <div className="flex flex-wrap gap-3">
                  {movie.genres.map((genre: any) => (
                    <div
                      key={genre.id}
                      className="flex items-center space-x-2 bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700 hover:bg-gray-700/60 transition-colors duration-200"
                    >
                      {genreIcons[genre.name] || <FaTheaterMasks size={16} />}
                      <span className="text-white font-medium">
                        {genre.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Overview */}
            {movie?.overview && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Overview</h3>
                <div className="text-gray-300 leading-relaxed text-lg">
                  {displayOverview}
                  {shouldTruncateOverview && (
                    <button
                      onClick={() => setShowFullOverview(!showFullOverview)}
                      className="ml-2 text-red-400 hover:text-red-300 font-medium transition-colors duration-200 underline"
                    >
                      {showFullOverview ? "Show less" : "Read more"}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Cast Preview */}
            {cast?.cast && cast.cast.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
                    <FaUsers className="text-red-500" />
                    <span>Cast</span>
                  </h3>
                  <Link
                    href={`/cast/${movie?.id}`}
                    className="flex items-center space-x-1 text-red-400 hover:text-red-300 transition-colors duration-200 font-medium"
                  >
                    <span>View Full Cast</span>
                    <FaExternalLinkAlt size={12} />
                  </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {cast.cast.slice(0, 6).map((actor: any) => (
                    <Link
                      key={actor.id}
                      href={`/person/${actor.id}`}
                      className="group bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:bg-gray-700/50 transition-all duration-200 hover:scale-105"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                          {actor.profile_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                              alt={actor.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <FaUsers size={16} />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-white font-medium truncate group-hover:text-red-400 transition-colors">
                            {actor.name}
                          </div>
                          <div className="text-gray-400 text-sm truncate">
                            {actor.character}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* External Links */}
            <div className="flex flex-wrap gap-4 pt-6">
              {movie?.imdb_id && (
                <a
                  href={`https://www.imdb.com/title/${movie.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  <FaExternalLinkAlt />
                  <span>View on IMDb</span>
                </a>
              )}
              <a
                href={`https://www.themoviedb.org/movie/${movie?.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                <FaExternalLinkAlt />
                <span>View on TMDB</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
