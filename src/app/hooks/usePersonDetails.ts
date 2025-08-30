import useSWR from "swr";
import axios from "axios";

const fetcher = async (url: string) => {
  try {
    console.log(`Fetching person details from ${url}`);
    const response = await axios.get(url);
    console.log("Person details response:", response.data);
    return response.data;
  } catch (error: any) {
    throw new Error(`Failed to fetch person details from ${url}: ${error.message}`);
  }
};

interface PersonDetails {
  id: number;
  name: string;
  birthday: string;
  deathday?: string;
  also_known_as: string[];
  gender: number;
  biography: string;
  popularity: number;
  place_of_birth: string;
  profile_path: string;
  adult: boolean;
  imdb_id: string;
  homepage?: string;
  known_for_department: string;
}

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_API_URL = process.env.NEXT_PUBLIC_TMDB_URL;

const usePersonDetails = (personId: string | string[]) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR<PersonDetails>(
    TMDB_API_KEY && TMDB_API_URL && personId
      ? `${TMDB_API_URL}/person/${personId}?api_key=${TMDB_API_KEY}`
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

export default usePersonDetails;