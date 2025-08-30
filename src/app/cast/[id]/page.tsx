"use client";
import React from "react";
import MainLayout from "../../mainlayout";
import useGetMovieCredits from "../../hooks/useGetMovieCredits";
import { useParams } from "next/navigation";
import Card from "@/app/(platform)/_components/Card";

const CastPage: React.FC = () => {
  const { id } = useParams();

  if (!id) {
    return (
      <MainLayout>
        <div className="pt-[130px] px-4 md:px-8 lg:px-16">
          <div className="flex items-center justify-center py-20">
            <div className="text-red-500 text-lg">Invalid movie ID</div>
          </div>
        </div>
      </MainLayout>
    );
  }

  const movieProps = { movieId: id };
  const { data, error, isLoading } = useGetMovieCredits(movieProps);

  return (
    <MainLayout>
      <div className="pt-[130px] px-4 md:px-8 lg:px-16 bg-gradient-to-b from-black via-gray-900 to-black">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl text-white font-semibold mb-4">
            Cast & Crew
          </h1>
          <p className="text-gray-300 text-sm">
            Meet the talented people behind this movie
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-white text-lg">
              Loading cast information...
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center justify-center py-20">
            <div className="text-red-500 text-lg">
              Error loading cast information: {error.message}
            </div>
          </div>
        )}

        {/* Cast Grid */}
        {data && data.cast && (
          <div className="space-y-6">
            <div className="text-gray-300 text-sm">
              {data.cast.length} cast members
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {data.cast.map((cast: any, index: number) => (
                <Card
                  key={cast.id || index}
                  castId={cast.id}
                  originalName={cast.name}
                  characterName={cast.character}
                  image={
                    cast.profile_path
                      ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
                      : "/images/not-found.jpg"
                  }
                />
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {data && (!data.cast || data.cast.length === 0) && (
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-400 text-lg">
              No cast information available
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CastPage;
