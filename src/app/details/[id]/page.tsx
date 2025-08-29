"use client";

import React from "react";
import MovieDetails from "../../(platform)/_components/MovieDetails";
import MovieDetailBanner from "../../(platform)/_components/MovieDetailBanner";
import { useParams } from "next/navigation";

import MainLayout from "@/app/mainlayout";
import useGetMovies from "@/app/hooks/useGetMovies";
import useGetMovieCredits from "@/app/hooks/useGetMovieCredits";

const page = () => {
  const { id } = useParams(); // Extracts the 'id' parameter from the URL

  if (!id) {
    return <div className="text-white">Invalid movie ID</div>;
  }

  const movieProps = { movieId: id }; // Creates an object with 'movieId' to pass to the custom hook.
  const { data, error, isLoading } = useGetMovies(movieProps); // Uses the custom hook to fetch movie data.
  const { data: cast } = useGetMovieCredits(movieProps);

  const scrollToDetails = () => {
    const detailsElement = document.getElementById('movie-details');
    if (detailsElement) {
      detailsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MainLayout>
      {/* Movie Banner */}
      <MovieDetailBanner
        movie={data}
        isLoading={isLoading}
        onViewDetails={scrollToDetails}
      />
      
      {/* Movie Details Section */}
      <div id="movie-details">
        <MovieDetails
          movie={data}
          isLoading={isLoading}
          error={error}
          cast={cast}
        />
      </div>
    </MainLayout>
  );
};

export default page;
