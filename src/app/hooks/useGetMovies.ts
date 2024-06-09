import React from "react";
import useSWR from "swr";
import axios from "axios";

const fetcher = async (url: string) => {
  try {
    console.log(`Fetching data from: ${url}`);
    const response = await axios.get(url);
    console.log("Response data:", response.data);

    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch data from ${url}: ${error.message}`);
  }
};

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: string;
  original_title: string;
  title: string;
  overview: string;
  runtime: number;
  genres: Genre[];
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  // Add any other fields you expect in your movie object
}

interface PropsMovie {
  movieId: any;
}

// interface UseGetMovies {
//   data: Movie | undefined;
//   error: Error | undefined;a
//   isLoading: boolean;
//   isValidating: boolean;
//   mutate: () => void;
// }

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMBD_API_URL = process.env.NEXT_PUBLIC_TMDB_URL;

const useGetMovies = ({ movieId }: PropsMovie) => {
  if (!movieId) {
    return {
      data: undefined,
      error: undefined,
      isLoading: false,
      isValidating: false,
      mutate: () => {},
    };
  }

  const { data, error, isValidating, mutate } = useSWR<Movie>(
    movieId ? `${TMBD_API_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}` : null,
    fetcher
  );
  const isLoading = !data && !error;

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export default useGetMovies;
