"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import MainLayout from "./mainlayout";
import { SearchProvider } from "./context/SearchContext";
import MovieBanner from "./(platform)/_components/MovieBanner";

const Home = () => {
  const router = useRouter();

  //TODO: CHECK IF THERE IS A SESSION AND IF THERE IS NO SESSION, PUSH TO AUTH PAGE

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (!session) {
        router.push("/auth");
      }
    };

    checkSession();
  }, [router]);

  return (
    <SearchProvider>
      <MainLayout>
        <main>
          <MovieBanner />
        </main>
      </MainLayout>
    </SearchProvider>
  );
};

export default Home;
