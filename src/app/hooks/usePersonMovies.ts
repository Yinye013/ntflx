import useSWR from "swr";
import axios from "axios";

const fetcher = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch person movies from ${url}: ${error.message}`);
  }
};

interface MovieCredit {
  id: number;
  title: string;
  release_date: string;
  character?: string;
  job?: string;
  poster_path?: string;
  vote_average: number;
  overview: string;
}

interface PersonMovieCredits {
  cast: MovieCredit[];
  crew: MovieCredit[];
}

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_API_URL = process.env.NEXT_PUBLIC_TMDB_URL;

const usePersonMovies = (personId: string | string[]) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<PersonMovieCredits>(
    TMDB_API_KEY && TMDB_API_URL && personId
      ? `${TMDB_API_URL}/person/${personId}/movie_credits?api_key=${TMDB_API_KEY}`
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

export default usePersonMovies;