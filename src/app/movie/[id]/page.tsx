"use client";

import React from "react";
import MovieDetailBanner from "../../(platform)/_components/MovieDetailBanner";
import { useParams, useRouter } from "next/navigation";

import MainLayout from "@/app/mainlayout";
import useGetMovies from "@/app/hooks/useGetMovies";

const page = () => {
  const { id } = useParams(); // Extracts the 'id' parameter from the URL
  const router = useRouter();

  if (!id) {
    return <div className="text-white">Invalid movie ID</div>;
  }

  const movieProps = { movieId: id }; // Creates an object with 'movieId' to pass to the custom hook.
  const { data, error, isLoading } = useGetMovies(movieProps); // Uses the custom hook to fetch movie data.

  const handleViewDetails = () => {
    router.push(`/details/${id}`);
  };

  return (
    <MainLayout>
      <MovieDetailBanner
        movie={data}
        isLoading={isLoading}
        onViewDetails={handleViewDetails}
      />
    </MainLayout>
  );
};

export default page;