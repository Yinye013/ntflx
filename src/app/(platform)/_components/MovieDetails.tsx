"use client";
import React from "react";
import BackButton from "./BackButton";
import Rating from "./Rating";
// import ReactStars from "react-rating-stars-component"
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

type MovieDetailsProps = {
  movie: any;
  isLoading: boolean;
  error: string;
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
}) => {
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
          <div className="">
            <h1 className="text-white lg:text-[2.6rem] font-bold tracking-wide pt-14">
              {movie?.title}
            </h1>
            <div className="flex items-center justify-between w-[70%] text-white">
              <p className="flex items-center gap-2">
                Rating: <Rating voteAverage={movie?.vote_average} />{" "}
                {movie?.vote_average}
              </p>{" "}
              <p>Runtime: {movie?.runtime} mins</p>
            </div>
            <p className="text-white w-[65%] mt-8">{movie?.overview}</p>

            <div>
              {movie?.genres.map((genre: any) => (
                <ul className="flex flex-row items-center gap-2 text-white">
                  <li key={genre.id} className="flex items-center  gap-2">
                    {genreIcons[genre.name] || <FaTheaterMasks />}
                    {genre.name}
                  </li>
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
