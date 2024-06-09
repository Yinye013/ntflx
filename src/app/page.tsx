"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import Navbar from "./(platform)/_components/Navbar";
import MainLayout from "./mainlayout";
import { SearchProvider } from "./context/SearchContext";
// import { MovieProvider } from "./context/MovieContext";
import MovieBanner from "./(platform)/_components/MovieBanner";

const Home = () => {
  const router = useRouter();

  //CHECK IF THERE IS A SESSION AND IF THERE IS NO SESSION, PUSH TO AUTH PAGE

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
    <MainLayout>
      <main>
        <MovieBanner />
      </main>
    </MainLayout>
  );
};

export default Home;
