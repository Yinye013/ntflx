"use client";
import React from "react";
import MainLayout from "../../mainlayout";
import useGetMovieCredits from "../../hooks/useGetMovieCredits";
import { useParams } from "next/navigation";
import Card from "@/app/(platform)/_components/Card";

const page = () => {
  const { id } = useParams(); // Extracts the 'id' parameter from the URL

  if (!id) {
    return <div className="text-white">Invalid movie ID</div>;
  }

  const movieProps = { movieId: id };
  const { data } = useGetMovieCredits(movieProps);
  console.log(data);
  return (
    <MainLayout>
      <div className="text-white pt-[130px] misc-container">
        <div className="grid lg:grid-cols-3 gap-[20px]">
          {data?.cast?.map((cast: any) => (
            <Card
              originalName={cast.name}
              characterName={cast.character}
              image={`https://image.tmdb.org/t/p/w500${cast?.profile_path}`}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default page;
