import useSWR from "swr";
import axios from "axios";
import { toast } from "react-hot-toast";

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

interface Favorite {
  id: string;
  movieId: number;
  title: string;
  posterPath?: string;
  backdropPath?: string;
  overview?: string;
  releaseDate?: string;
  voteAverage?: number;
  addedAt: string;
}

interface FavoritesResponse {
  favorites: Favorite[];
  status: number;
}

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  backdrop_path?: string;
  overview?: string;
  release_date?: string;
  vote_average?: number;
}

const useFavorites = () => {
  const { data, error, mutate, isLoading } = useSWR<FavoritesResponse>(
    '/api/favorites',
    fetcher
  );

  const addToFavorites = async (movie: Movie) => {
    try {
      // Optimistic update
      const newFavorite: Favorite = {
        id: `temp-${movie.id}`,
        movieId: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
        overview: movie.overview,
        releaseDate: movie.release_date,
        voteAverage: movie.vote_average,
        addedAt: new Date().toISOString(),
      };

      if (data?.favorites) {
        mutate({
          ...data,
          favorites: [newFavorite, ...data.favorites]
        }, false);
      }

      const response = await axios.post('/api/favorites', {
        movieId: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
        overview: movie.overview,
        releaseDate: movie.release_date,
        voteAverage: movie.vote_average,
      });

      // Revalidate data
      mutate();
      toast.success('Added to My List');
      
      return response.data;
    } catch (error: any) {
      console.error('Error adding to favorites:', error);
      
      // Revert optimistic update
      mutate();
      
      if (error.response?.status === 409) {
        toast.error('Already in My List');
      } else {
        toast.error('Failed to add to My List');
      }
      throw error;
    }
  };

  const removeFromFavorites = async (movieId: number) => {
    try {
      // Optimistic update
      if (data?.favorites) {
        mutate({
          ...data,
          favorites: data.favorites.filter(fav => fav.movieId !== movieId)
        }, false);
      }

      await axios.delete(`/api/favorites/${movieId}`);
      
      // Revalidate data
      mutate();
      toast.success('Removed from My List');
    } catch (error: any) {
      console.error('Error removing from favorites:', error);
      
      // Revert optimistic update
      mutate();
      toast.error('Failed to remove from My List');
      throw error;
    }
  };

  const isFavorite = (movieId: number): boolean => {
    return data?.favorites?.some(fav => fav.movieId === movieId) || false;
  };

  const toggleFavorite = async (movie: Movie) => {
    if (isFavorite(movie.id)) {
      await removeFromFavorites(movie.id);
    } else {
      await addToFavorites(movie);
    }
  };

  return {
    favorites: data?.favorites || [],
    error,
    isLoading,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    mutate,
  };
};

export default useFavorites;