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

        const {
          data: { total_pages },
        } = await axios.get(
          `${TMBD_API_URL}/movie/popular?api_key=${TMDB_API_KEY}`
        );
        const randomPage = (Math.floor(Math.random() * total_pages) + 1) / 1000;

        const moviesResponse = await axios.get(
          `${TMBD_API_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${randomPage}`
        );
        const movies = moviesResponse.data.results;
        console.log(movies.length);
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setMovie(randomMovie);
        // setMovieId(randomMovie.id);
        console.log(randomMovie.id);
        const response = await axios.get(
          `${TMBD_API_URL}/movie/${randomMovie.id}/videos?api_key=${TMDB_API_KEY}`
        );
        const videoData = response.data;
        console.log(videoData);
        const youtubeVideo = videoData.results.find(
          (v: Video) => v.site === "YouTube"
        );
        setVideo(youtubeVideo || null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch movie data.");
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
