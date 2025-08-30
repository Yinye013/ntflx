"use client";
import React from "react";
import Link from "next/link";
import MainLayout from "../../mainlayout";
import usePersonDetails from "../../hooks/usePersonDetails";
import usePersonMovies from "../../hooks/usePersonMovies";
import { useParams } from "next/navigation";

const PersonDetailsPage: React.FC = () => {
  const { id } = useParams();
  const { data, error, isLoading } = usePersonDetails(id);
  const { data: movieCredits } = usePersonMovies(id);

  if (!id) {
    return (
      <MainLayout>
        <div className="pt-[130px] px-4 md:px-8 lg:px-16">
          <div className="flex items-center justify-center py-20">
            <div className="text-red-500 text-lg">Invalid person ID</div>
          </div>
        </div>
      </MainLayout>
    );
  }

  const getGenderText = (gender: number) => {
    switch (gender) {
      case 1:
        return "Female";
      case 2:
        return "Male";
      case 3:
        return "Non-binary";
      default:
        return "Not specified";
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateAge = (birthday: string, deathday?: string) => {
    if (!birthday) return null;

    const birthDate = new Date(birthday);
    const endDate = deathday ? new Date(deathday) : new Date();
    const age = endDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = endDate.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && endDate.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }
    return age;
  };

  return (
    <MainLayout>
      <div className="pt-[130px] px-4 md:px-8 lg:px-16 bg-gradient-to-b from-black via-gray-900 to-black min-h-screen">
        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-white text-lg">Loading person details...</div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center justify-center py-20">
            <div className="text-red-500 text-lg">
              Error loading person details: {error.message}
            </div>
          </div>
        )}

        {/* Person Details */}
        {data && (
          <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-8">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="w-64 mx-auto lg:mx-0">
                  <div className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-700">
                    <img
                      src={
                        data.profile_path
                          ? `https://image.tmdb.org/t/p/w500${data.profile_path}`
                          : "/images/not-found.jpg"
                      }
                      alt={data.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Person Info */}
              <div className="flex-1 space-y-6">
                <div>
                  <h1 className="text-3xl md:text-4xl text-white font-bold mb-2">
                    {data.name}
                  </h1>
                  <p className="text-gray-300 text-lg">
                    {data.known_for_department}
                  </p>
                </div>

                {/* Quick Facts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-white font-semibold mb-1">Gender</h3>
                      <p className="text-gray-300">
                        {getGenderText(data.gender)}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-white font-semibold mb-1">
                        Birthday
                      </h3>
                      <p className="text-gray-300">
                        {formatDate(data.birthday)}
                        {data.birthday && !data.deathday && (
                          <span className="text-gray-400 ml-2">
                            (Age {calculateAge(data.birthday)})
                          </span>
                        )}
                      </p>
                    </div>

                    {data.deathday && (
                      <div>
                        <h3 className="text-white font-semibold mb-1">Died</h3>
                        <p className="text-gray-300">
                          {formatDate(data.deathday)}
                          <span className="text-gray-400 ml-2">
                            (Age {calculateAge(data.birthday, data.deathday)})
                          </span>
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-white font-semibold mb-1">
                        Place of Birth
                      </h3>
                      <p className="text-gray-300">
                        {data.place_of_birth || "Unknown"}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-white font-semibold mb-1">
                        Popularity
                      </h3>
                      <p className="text-gray-300">
                        {data.popularity?.toFixed(1)}
                      </p>
                    </div>

                    {data.homepage && (
                      <div>
                        <h3 className="text-white font-semibold mb-1">
                          Website
                        </h3>
                        <a
                          href={data.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 underline"
                        >
                          Official Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Biography */}
            {data.biography && (
              <div className="space-y-4">
                <h2 className="text-2xl text-white font-bold">Biography</h2>
                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {data.biography}
                </div>
              </div>
            )}

            {/* Movie Credits */}
            {movieCredits &&
              (movieCredits.cast.length > 0 ||
                movieCredits.crew.length > 0) && (
                <div className="space-y-6">
                  <h2 className="text-2xl text-white font-bold">Filmography</h2>

                  {/* Cast Credits */}
                  {movieCredits.cast.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-xl text-white font-semibold">
                        Acting
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {movieCredits.cast
                          .sort(
                            (a, b) =>
                              new Date(b.release_date || "").getTime() -
                              new Date(a.release_date || "").getTime()
                          )
                          .slice(0, 12)
                          .map((movie) => (
                            <Link
                              key={movie.id}
                              href={`/details/${movie.id}`}
                              className="flex items-center justify-center gap-3 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200 group"
                            >
                              <div className="flex-shrink-0 w-16 h-20">
                                <img
                                  src={
                                    movie.poster_path
                                      ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                                      : "/images/not-found.jpg"
                                  }
                                  alt={movie.title}
                                  className="w-full h-full object-cover rounded"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-white font-medium text-sm group-hover:text-blue-400 transition-colors truncate">
                                  {movie.title}
                                </h4>
                                <p className="text-gray-400 text-xs mb-1">
                                  {movie.release_date
                                    ? new Date(movie.release_date).getFullYear()
                                    : "TBA"}
                                </p>
                                {movie.character && (
                                  <p className="text-gray-300 text-xs">
                                    as {movie.character}
                                  </p>
                                )}
                              </div>
                            </Link>
                          ))}
                      </div>
                      {movieCredits.cast.length > 12 && (
                        <p className="text-gray-400 text-sm">
                          And {movieCredits.cast.length - 12} more movies...
                        </p>
                      )}
                    </div>
                  )}

                  {/* Crew Credits */}
                  {movieCredits.crew.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-xl text-white font-semibold">
                        Production
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {movieCredits.crew
                          .sort(
                            (a, b) =>
                              new Date(b.release_date || "").getTime() -
                              new Date(a.release_date || "").getTime()
                          )
                          .slice(0, 8)
                          .map((movie) => (
                            <Link
                              key={`${movie.id}-${movie.job}`}
                              href={`/details/${movie.id}`}
                              className="flex gap-3 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200 group"
                            >
                              <div className="flex-shrink-0 w-16 h-20">
                                <img
                                  src={
                                    movie.poster_path
                                      ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                                      : "/images/not-found.jpg"
                                  }
                                  alt={movie.title}
                                  className="w-full h-full object-cover rounded"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-white font-medium text-sm group-hover:text-blue-400 transition-colors truncate">
                                  {movie.title}
                                </h4>
                                <p className="text-gray-400 text-xs mb-1">
                                  {movie.release_date
                                    ? new Date(movie.release_date).getFullYear()
                                    : "TBA"}
                                </p>
                                {movie.job && (
                                  <p className="text-gray-300 text-xs">
                                    {movie.job}
                                  </p>
                                )}
                              </div>
                            </Link>
                          ))}
                      </div>
                      {movieCredits.crew.length > 8 && (
                        <p className="text-gray-400 text-sm">
                          And {movieCredits.crew.length - 8} more credits...
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

            {/* External Links */}
            <div className="flex gap-4">
              {data.imdb_id && (
                <a
                  href={`https://www.imdb.com/name/${data.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                >
                  View on IMDb
                </a>
              )}
              <a
                href={`https://www.themoviedb.org/person/${data.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
              >
                View on TMDB
              </a>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default PersonDetailsPage;
