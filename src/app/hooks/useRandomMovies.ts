import React, { useState, useEffect } from "react";
import axios from "axios";

interface Movie {
  id: string;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
}

interface Video {
  key: string;
  site: string;
  type?: string;
}
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMBD_API_URL = process.env.NEXT_PUBLIC_TMDB_URL;

const useRandomMovies = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [video, setVideo] = useState<Video | null>(null);
  // const { setMovieId } = useMovieContext();

  useEffect(() => {
    const fetchRandomMovie = async () => {
      try {
        setLoading(true);
        console.log("TMDB API Config:", { TMDB_API_KEY: !!TMDB_API_KEY, TMBD_API_URL });

        if (!TMDB_API_KEY || !TMBD_API_URL) {
          setError("TMDB API configuration missing");
          return;
        }

        const {
          data: { total_pages },
        } = await axios.get(
          `${TMBD_API_URL}/movie/popular?api_key=${TMDB_API_KEY}`
        );
        console.log("Total pages:", total_pages);
        
        const randomPage = Math.floor(Math.random() * Math.min(total_pages, 500)) + 1;
        console.log("Random page:", randomPage);

        const moviesResponse = await axios.get(
          `${TMBD_API_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${randomPage}`
        );
        const movies = moviesResponse.data.results;
        console.log("Movies found:", movies.length);
        
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setMovie(randomMovie);
        console.log("Selected movie:", randomMovie.title, randomMovie.id);
        
        const response = await axios.get(
          `${TMBD_API_URL}/movie/${randomMovie.id}/videos?api_key=${TMDB_API_KEY}`
        );
        const videoData = response.data;
        console.log("Video data:", videoData);
        
        const youtubeVideo = videoData.results.find(
          (v: Video) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
        );
        
        if (youtubeVideo) {
          console.log("YouTube video found:", youtubeVideo);
          setVideo(youtubeVideo);
        } else {
          console.log("No YouTube trailer found, using backdrop image");
          setVideo(null);
        }
      } catch (error: any) {
        console.error("Error fetching movie data:", error);
        setError(`Failed to fetch movie data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomMovie();
  }, []);

  return {
    movie,
    video,
    error,
    loading,
  };
};

export default useRandomMovies;
