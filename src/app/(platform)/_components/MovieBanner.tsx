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
          className="w-full min-h-screenz bg-cover bg-center bg-no-repeat brightness-50"
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
          className="absolute top-20 right-4 sm:top-24 sm:right-6 md:top-32 md:right-8 lg:top-40 lg:right-8 z-10 bg-black bg-opacity-60 hover:bg-opacity-80 transition-all duration-200 rounded-full p-2 sm:p-3 text-white"
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? (
            <FaVolumeMute className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          ) : (
            <FaVolumeUp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          )}
        </button>
      )}

      {/* Content Overlay */}
      <div className="absolute bottom-16 left-4 right-4 sm:bottom-20 sm:left-6 sm:right-6 md:bottom-24 md:left-8 md:right-8 lg:top-[40%] lg:left-16 lg:right-auto lg:bottom-auto lg:w-[85%] xl:left-20">
        <div className="max-w-2xl lg:max-w-4xl">
          <h1 className="text-white tracking-wide text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold drop-shadow-lg leading-tight mb-3 sm:mb-4 md:mb-5 lg:mb-6">
            {movie?.title}
          </h1>
          <p className="text-white text-sm sm:text-base md:text-lg lg:text-base drop-shadow-md leading-relaxed mb-4 sm:mb-5 md:mb-6 lg:mb-8 lg:w-[70%] line-clamp-3 sm:line-clamp-4 lg:line-clamp-none">
            {movie?.overview}
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <Link
              href={`/details/${movie?.id}`}
              onClick={handleLoading}
              className="text-white flex items-center justify-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-slate-600 opacity-80 hover:opacity-100 transition-all duration-200 rounded-md backdrop-blur-md text-sm sm:text-base md:text-lg font-medium w-full sm:w-auto"
            >
              {linkLoading ? (
                <ClipLoader size={16} color={"#fff"} loading={true} />
              ) : (
                <>
                  <FaInfoCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  Learn More
                </>
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieBanner;
