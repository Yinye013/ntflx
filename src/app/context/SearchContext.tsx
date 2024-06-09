"use client";
import React, { useState, useContext, createContext, ReactNode } from "react";

//1. DEFINING THE BODY OF THE CONTEXT
interface SearchContextProps {
  query: string;
  setQuery: (query: string) => void;
}

//2. Creating the context with default values
const SearchContext = createContext<SearchContextProps | undefined>(undefined);

//3. Provider component
export const SearchProvider = ({ children }: { children: ReactNode }) => {
  //4. define global context values here
  const [query, setQuery] = useState<string>("");
  //5. returning the searchcontext.provider
  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

// 6. custom hook to use the search context
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used with a search provider!");
  }
  return context;
};
