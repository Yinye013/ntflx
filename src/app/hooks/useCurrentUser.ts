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

interface User {
  id: string;
  name: string;
  email: string;
  currentUser: any;
  // Add any other fields you expect in your user object
}

interface UseCurrentUser {
  data: User | undefined;
  error: Error | undefined;
  isLoading: boolean;
  isValidating: boolean;
  mutate: () => void;
}

const useCurrentUser = (): UseCurrentUser => {
  const { data, error, isValidating, mutate } = useSWR<User>(
    "/api/current",
    fetcher
  );

  const isLoading = !data && !error;

  return {
    data: data?.currentUser,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export default useCurrentUser;
