import React, { useState } from "react";
import useRandomMovies from "@/app/hooks/useRandomMovies";
import { ClipLoader } from "react-spinners";
import Link from "next/link";
import { FaInfoCircle } from "react-icons/fa";

const MovieBanner = () => {
  const [linkLoading, setLinkLoading] = useState(false);
  const { movie, video, error, loading } = useRandomMovies();

  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <ClipLoader size={120} color={"#E50913"} loading={true} />
      </div>
    );
  if (error)
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <p className="text-white">Error loading movie: {error}</p>
      </div>
    );

  const handleLoading = () => {
    setLinkLoading(true);
  };

  return (
    <div className="relative">
      {video?.site === "YouTube" && (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${video.key}?autoplay=1&mute=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-[100vh] brightness-50"
        ></iframe>
      )}

      <div className="absolute top-[65%] pl-[4rem] lg:top-[40%] lg:pl-[8rem] w-[85%]">
        <h1 className="text-white tracking-wide text-3xl w-full lg:text-5xl font-bold h-full">
          {movie?.title}
        </h1>
        <p className="text-white w-full mt-5 lg:w-[60%] lg:mt-8">
          {movie?.overview}
        </p>
        <Link
          href={`/details/${movie?.id}`}
          onClick={handleLoading}
          className="text-white mt-5 lg:w-[16%] lg:mt-7 flex items-center justify-center gap-2 px-5 py-2 bg-slate-600 opacity-40 rounded-md backdrop-blur-md"
        >
          {linkLoading ? (
            <ClipLoader size={20} color={"#fff"} loading={true} />
          ) : (
            <>
              <FaInfoCircle />
              Learn More
            </>
          )}
        </Link>
      </div>
    </div>
  );
};

export default MovieBanner;
