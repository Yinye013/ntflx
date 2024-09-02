"use client";
import React, { useState, useContext, createContext, ReactNode } from "react";

//1. DEFINING THE BODY OF THE CONTEXT
interface SearchContextProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

//2. Creating the context with default values
// FIXME: ADD A DEFAULT VALUE TO REMOVE THE UNDEFINED CLAIMS
const defaultValue: SearchContextProps = {
  query: "",
  setQuery: () => {},
};

// FIXME: Consider using a meaningful default value for the context instead of undefined for better TypeScript safety.
const SearchContext = createContext<SearchContextProps>(defaultValue);

//3. Provider component
export const SearchProvider = ({ children }: { children: ReactNode }) => {
  //4. define global context values here
  const [query, setQuery] = useState<string>("");
  console.log("SearchProvider rendered with query:", query);
  //5. returning the searchcontext.provider
  return (
    <SearchContext.Provider value={{ query, setQuery }}>
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
