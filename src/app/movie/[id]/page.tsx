"use client";

import React, { useCallback } from "react";
import MovieDetailBanner from "../../(platform)/_components/MovieDetailBanner";
import { useParams, useRouter } from "next/navigation";

import MainLayout from "@/app/mainlayout";
import useGetMovies from "@/app/hooks/useGetMovies";

export default function MoviePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data, isLoading } = useGetMovies({ movieId: id });

  const handleViewDetails = useCallback(() => {
    router.push(`/details/${id}`);
  }, [id, router]);

  return (
    <MainLayout>
      {!id ? (
        <div className="text-white">Invalid movie ID</div>
      ) : (
        <MovieDetailBanner
          movie={data}
          isLoading={isLoading}
          onViewDetails={handleViewDetails}
        />
      )}
    </MainLayout>
  );
}
