import useSWR from "swr";
import axios from "axios";

const fetcher = async (url: string) => {
  try {
    console.log(`Fetching data from ${url}`);
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
  release_date: string;
  // Add any other fields you expect in your movie object
}

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMBD_API_URL = process.env.NEXT_PUBLIC_TMDB_URL;

const useSearchMovies = (query: any) => {
  if (!query) {
    return {
      data: undefined,
      error: undefined,
      isLoading: false,
      isValidating: false,
      mutate: () => {},
    };
  }
  const { data, error } = useSWR<Movie>(
    query
      ? `${TMBD_API_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}`
      : null,
    fetcher
  );
  const isLoading = !data && !error;

  return {
    data,
    error,
    isLoading,
  };
};

export default useSearchMovies;
