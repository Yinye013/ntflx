"use client";
import React from "react";
import MainLayout from "../../mainlayout";
import usePersonDetails from "../../hooks/usePersonDetails";
import { useParams } from "next/navigation";

const PersonDetailsPage: React.FC = () => {
  const { id } = useParams();
  const { data, error, isLoading } = usePersonDetails(id);

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
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="w-64 mx-auto lg:mx-0">
                  <div className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-700">
                    {data.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${data.profile_path}`}
                        alt={data.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg
                          className="w-24 h-24"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
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
