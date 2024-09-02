"use client";
import React, { useState } from "react";
import BackButton from "./BackButton";
import Rating from "./Rating";
import { format, parse } from "date-fns";
import { ClipLoader } from "react-spinners";

import {
  FaStar,
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
import { text } from "stream/consumers";

type MovieDetailsProps = {
  movie: any;
  isLoading: boolean;
  error: string;
  cast: any;
};
//

const genreIcons: { [key: string]: JSX.Element } = {
  Drama: <GiDramaMasks size={30} />,
  War: <GiWarAxe size={30} />,
  Action: <FaBolt />,
  Comedy: <FaLaugh />,
  Romance: <FaHeart />,
  Documentary: <FaFilm />,
  Horror: <FaGhost />,
  Thriller: <FaSkull />,
  Family: <FaChild />,
  ScienceFiction: <FaSpaceShuttle />,
  Music: <FaMusic />,
  Fantasy: <GiMagicBroom />,
  Mystery: <GiWitchFlight />,
  Western: <GiWesternHat />,
  Musical: <GiMusicalNotes />,
  Crime: <GiCrimeSceneTape />,
  Adventure: <FaGlobe />,
  // Add other genres as necessary
};

//
const MovieDetails: React.FC<MovieDetailsProps> = ({
  movie,
  isLoading,
  error,
  cast,
}) => {
  const [isTruncated, setIsTruncated] = useState(true);
  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <ClipLoader size={120} color={"#ffffff"} loading={true} />
      </div>
    );
  }

  if (error) {
    return <div className="text-white">Error loading movie details</div>;
  }

  // RE: FORMATTING THE RELEASED DATE, AGAIN

  const formatDate = (dateString: any) => {
    // parse first
    const date = parse(dateString, "yyyy-MM-d", new Date());
    // format next
    return format(date, "do MMMM, yyyy");
  };
  const formattedDate = formatDate(movie?.release_date);

  // TRUNCATING THE TEXT
  const truncateText = (text: string) => {
    if (text.length <= 20) {
      return text;
    }
    return text.slice(0, 100) + "...";
  };
  const formattedMovieOverview = truncateText(movie?.overview);

  return (
    <>
      <div className="container mx-auto pt-[130px]">
        <BackButton />
        <div className="grid lg:grid-cols-2  gap-8">
          <div className="flex items-center justify-center">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
              alt="movie-img"
              className="w-[60%] object-cover rounded-md"
            />
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="text-white text-2xl lg:text-[2.6rem] font-bold tracking-wide pt-14">
              {movie?.title}
            </h1>
            <div className="grid lg:grid-cols-2 gap-3 lg:w-[100%] text-white">
              <p className="flex items-center gap-2">
                <strong> Rating:</strong>{" "}
                <Rating voteAverage={movie?.vote_average} />{" "}
                {movie?.vote_average}
              </p>{" "}
              <p>
                <strong>Runtime:</strong> {movie?.runtime} mins
              </p>
            </div>
            <div>
              <p className="text-white flex gap-2">
                <strong>Released: </strong>
                {formattedDate}
              </p>
            </div>
            <div>
              <h3 className="text-white text-[1.4rem] font-semibold mb-2">
                Overview
              </h3>{" "}
              <p className="text-white w-[65%]">
                {isTruncated ? formattedMovieOverview : movie?.overview}
                <span
                  className="text-white text-[13px] cursor-pointer transition duration-200  hover:underline"
                  onClick={toggleTruncate}
                >
                  {isTruncated ? "view more" : "view less"}
                </span>
              </p>
            </div>

            <div>
              <ul className="flex flex-col lg:flex-row lg:items-center gap-2 text-white">
                <strong className="text-white">Genre:</strong>
                {movie?.genres.map((genre: any) => (
                  <li key={genre.id} className="flex items-center  gap-2">
                    {genreIcons[genre.name] || <FaTheaterMasks />}
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-white">
              Cast: {cast?.cast[0].name}, {cast?.cast[1].name},{" "}
              {cast?.cast[2].name}...{" "}
              <Link
                href={`/cast/${movie?.id}`}
                className="text-[13px] cursor-pointer transition duration-200"
              >
                view more
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
