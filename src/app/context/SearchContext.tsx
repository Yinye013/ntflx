"use client";
import React, { useState, useContext, createContext, ReactNode } from "react";

//1. DEFINING THE BODY OF THE CONTEXT
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
}

interface SearchResults {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface SearchContextProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  searchResults: SearchResults | undefined;
  setSearchResults: React.Dispatch<React.SetStateAction<SearchResults | undefined>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: any;
  setError: React.Dispatch<React.SetStateAction<any>>;
}

//2. Creating the context with default values
// FIXME: ADD A DEFAULT VALUE TO REMOVE THE UNDEFINED CLAIMS
const defaultValue: SearchContextProps = {
  query: "",
  setQuery: () => {},
  searchResults: undefined,
  setSearchResults: () => {},
  isLoading: false,
  setIsLoading: () => {},
  error: undefined,
  setError: () => {},
};

// FIXME: Consider using a meaningful default value for the context instead of undefined for better TypeScript safety.
const SearchContext = createContext<SearchContextProps>(defaultValue);

//3. Provider component
export const SearchProvider = ({ children }: { children: ReactNode }) => {
  //4. define global context values here
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResults | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(undefined);
  
  console.log("SearchProvider rendered with query:", query);
  //5. returning the searchcontext.provider
  return (
    <SearchContext.Provider value={{ 
      query, 
      setQuery, 
      searchResults, 
      setSearchResults, 
      isLoading, 
      setIsLoading, 
      error, 
      setError 
    }}>
      {children}
    </SearchContext.Provider>
  );
};

// 6. custom hook to use the search context
// export const useSearch = () => {
//   const context = useContext(SearchContext);
//   if (context === undefined) {
//     throw new Error("useSearch must be used with a search provider!");
//   }
//   return context;
// };

// FIXME:
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider!");
  }
  return context;
};
