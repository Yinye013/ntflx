"use client";

import React from "react";
import MainLayout from "../mainlayout";
import { useSearch } from "../context/SearchContext";
import useSearchMovies from "../hooks/useSearchMovies";
const page: React.FC = () => {
  const { query, setQuery } = useSearch();
  const { data, error, isLoading } = useSearchMovies(query);

  return (
    <MainLayout>
      <div className="pt-[130px] text-white">
        <p className="text-white">{query}</p>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && <p>{data.title}</p>}
      </div>
    </MainLayout>
  );
};

export default page;
