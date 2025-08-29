import useSWR from "swr";
import axios from "axios";

const fetcher = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch data from ${url}: ${error.message}`);
  }
};

interface Video {
  key: string;
  site: string;
  type: string;
  name: string;
  official: boolean;
}

interface VideosResponse {
  id: number;
  results: Video[];
}

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_API_URL = process.env.NEXT_PUBLIC_TMDB_URL;

const useMovieVideos = (movieId: string | number | undefined) => {
  const { data, error, isLoading } = useSWR<VideosResponse>(
    movieId && TMDB_API_KEY && TMDB_API_URL
      ? `${TMDB_API_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`
      : null,
    fetcher
  );

  // Find the best trailer
  const trailer = data?.results?.find(
    (video) => video.site === "YouTube" && 
               (video.type === "Trailer" || video.type === "Teaser") &&
               video.official
  ) || data?.results?.find(
    (video) => video.site === "YouTube" && 
               (video.type === "Trailer" || video.type === "Teaser")
  );

  return {
    data,
    trailer,
    error,
    isLoading,
  };
};

export default useMovieVideos;