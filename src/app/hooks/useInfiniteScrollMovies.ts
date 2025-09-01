import { useState, useEffect, useCallback } from "react";
import axios from "axios";

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

interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface UseInfiniteScrollMoviesProps {
  endpoint: string; // e.g., '/trending/movie/day', '/movie/top_rated', etc.
  timeWindow?: 'day' | 'week';
  query?: string; // For search functionality
}

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_API_URL = process.env.NEXT_PUBLIC_TMDB_URL;

const useInfiniteScrollMovies = ({ endpoint, timeWindow }: UseInfiniteScrollMoviesProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  const buildUrl = useCallback(() => {
    console.log('buildUrl called with:', { TMDB_API_KEY: !!TMDB_API_KEY, TMDB_API_URL, endpoint, timeWindow, page });
    
    if (!TMDB_API_KEY || !TMDB_API_URL) {
      console.error('Missing TMDB configuration:', { TMDB_API_KEY: !!TMDB_API_KEY, TMDB_API_URL });
      return null;
    }
    
    let url;
    if (endpoint.includes('trending') && timeWindow) {
      url = `${TMDB_API_URL}/trending/movie/${timeWindow}?api_key=${TMDB_API_KEY}&page=${page}`;
    } else {
      url = `${TMDB_API_URL}${endpoint}?api_key=${TMDB_API_KEY}&page=${page}`;
    }
    console.log('Built URL:', url);
    return url;
  }, [endpoint, timeWindow, page]);


  const loadMore = useCallback(() => {
    console.log('loadMore called:', { isLoadingMore, hasMore, currentPage: page });
    if (!isLoadingMore && hasMore) {
      console.log('Setting page to:', page + 1);
      setPage(prev => prev + 1);
    } else {
      console.log('loadMore blocked - isLoadingMore:', isLoadingMore, 'hasMore:', hasMore);
    }
  }, [isLoadingMore, hasMore, page]);

  const reset = useCallback(() => {
    setMovies([]);
    setPage(1);
    setError(null);
    setHasMore(true);
    setTotalResults(0);
  }, []);

  // Initial load or when endpoint/timeWindow changes
  useEffect(() => {
    console.log('Initial load triggered for:', { endpoint, timeWindow });
    setMovies([]);
    setPage(1);
    setError(null);
    setHasMore(true);
    setTotalResults(0);
  }, [endpoint, timeWindow]);

  // Fetch movies when dependencies change
  useEffect(() => {
    const url = buildUrl();
    if (!url) return;

    const fetchData = async () => {
      const isFirstLoad = page === 1;
      
      try {
        if (isFirstLoad) {
          setIsLoading(true);
          setError(null);
        } else {
          setIsLoadingMore(true);
        }

        console.log(`Fetching movies from ${url}`);
        const response = await axios.get<MovieResponse>(url);
        const data = response.data;

        if (isFirstLoad) {
          setMovies(data.results);
          setTotalResults(data.total_results);
        } else {
          setMovies(prev => [...prev, ...data.results]);
        }

        setHasMore(page < data.total_pages);
        
      } catch (error: any) {
        console.error("Error fetching movies:", error);
        setError(error.message || "Failed to fetch movies");
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    };

    fetchData();
  }, [buildUrl, page]);

  return {
    movies,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    totalResults,
    loadMore,
    reset,
  };
};

export default useInfiniteScrollMovies;