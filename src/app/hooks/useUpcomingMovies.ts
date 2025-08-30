import useSWR from "swr";
import axios from "axios";

const fetcher = async (url: string) => {
  try {
    console.log(`Fetching upcoming movies from ${url}`);
    const response = await axios.get(url);
    console.log("Upcoming movies response:", response.data);
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch upcoming movies from ${url}: ${error.message}`);
  }
};

interface Movie {
  id: number;
  original_title: string;
  title: string;
  overview: string;
  runtime?: number;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  genre_ids: number[];
}

interface UpcomingMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_API_URL = process.env.NEXT_PUBLIC_TMDB_URL;

const useUpcomingMovies = (page: number = 1) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<UpcomingMoviesResponse>(
    TMDB_API_KEY && TMDB_API_URL
      ? `${TMDB_API_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&page=${page}`
      : null,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export default useUpcomingMovies;