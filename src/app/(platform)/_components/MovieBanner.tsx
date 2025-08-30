import React, { useState, useRef } from "react";
import useRandomMovies from "@/app/hooks/useRandomMovies";
import { ClipLoader } from "react-spinners";
import Link from "next/link";
import { FaInfoCircle, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const MovieBanner = () => {
  const [linkLoading, setLinkLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
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

  const toggleMute = () => {
    if (iframeRef.current && video) {
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);

      // Update the iframe src to toggle mute parameter
      const currentSrc = iframeRef.current.src;
      const baseUrl = currentSrc.split("?")[0];
      const newSrc = `${baseUrl}?autoplay=1&mute=${
        newMutedState ? 1 : 0
      }&controls=0&loop=1&playlist=${video.key}`;
      iframeRef.current.src = newSrc;
    }
  };

  return (
    <div className="relative">
      {/* Video Background - YouTube embed */}
      {video?.site === "YouTube" ? (
        <iframe
          ref={iframeRef}
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${video.key}?autoplay=1&mute=${
            isMuted ? 1 : 0
          }&controls=0&loop=1&playlist=${video.key}`}
          title="Movie Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-[100vh] brightness-50"
        ></iframe>
      ) : (
        /* Fallback Background Image */
        <div
          className="w-full min-h-screen bg-cover bg-center bg-no-repeat brightness-50"
          style={{
            backgroundImage: movie?.backdrop_path
              ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
              : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        />
      )}

      {/* Mute/Unmute Button - Top Right */}
      {video?.site === "YouTube" && (
        <button
          onClick={toggleMute}
          className="absolute top-40 right-8 z-10 bg-black bg-opacity-60 hover:bg-opacity-80 transition-all duration-200 rounded-full p-3 text-white"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <FaVolumeMute size={24} /> : <FaVolumeUp size={24} />}
        </button>
      )}

      {/* Content Overlay */}
      <div className="absolute top-[65%] pl-[4rem] lg:top-[40%] lg:pl-[8rem] w-[85%]">
        <h1 className="text-white tracking-wide text-3xl w-full lg:text-5xl font-bold h-full drop-shadow-lg">
          {movie?.title}
        </h1>
        <p className="text-white w-full mt-5 lg:w-[60%] lg:mt-8 drop-shadow-md">
          {movie?.overview}
        </p>
        <div className="flex items-center gap-4 mt-5 lg:mt-7">
          <Link
            href={`/details/${movie?.id}`}
            onClick={handleLoading}
            className="text-white flex items-center justify-center gap-2 px-5 py-2 bg-slate-600 opacity-80 hover:opacity-100 transition-opacity rounded-md backdrop-blur-md"
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
    </div>
  );
};

export default MovieBanner;
