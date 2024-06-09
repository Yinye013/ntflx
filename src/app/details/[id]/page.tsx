"use client";

import React from "react";
import MovieDetails from "../../(platform)/_components/MovieDetails";
import { useParams } from "next/navigation";

import MainLayout from "@/app/mainlayout";
import useGetMovies from "@/app/hooks/useGetMovies";

const page = () => {
  const { id } = useParams(); // Extracts the 'id' parameter from the URL

  if (!id) {
    return <div className="text-white">Invalid movie ID</div>;
  }

  const movieProps = { movieId: id }; // Creates an object with 'movieId' to pass to the custom hook.
  const { data, error, isLoading } = useGetMovies(movieProps); // Uses the custom hook to fetch movie data.
  //   MOST LIKELY THE SOLUTION TO THIS ERROR LMAO
  // CAN'T SEEM TO FIGURE OUT WHAT IT IS BUT IT IS MOST LIKELY THIS!!

  return (
    <MainLayout>
      <MovieDetails movie={data} isLoading={isLoading} error={error} />
    </MainLayout>
  );
};

export default page;
