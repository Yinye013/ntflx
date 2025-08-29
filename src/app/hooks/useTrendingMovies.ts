import useSWR from "swr";
import axios from "axios";

const fetcher = async (url: string) => {
  try {
    console.log(`Fetching trending movies from ${url}`);
    const response = await axios.get(url);
    console.log("Trending movies response:", response.data);
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch trending movies from ${url}: ${error.message}`);
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

interface TrendingMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_API_URL = process.env.NEXT_PUBLIC_TMDB_URL;

const useTrendingMovies = (timeWindow: 'day' | 'week' = 'day') => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<TrendingMoviesResponse>(
    TMDB_API_KEY && TMDB_API_URL
      ? `${TMDB_API_URL}/trending/movie/${timeWindow}?api_key=${TMDB_API_KEY}`
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

export default useTrendingMovies;