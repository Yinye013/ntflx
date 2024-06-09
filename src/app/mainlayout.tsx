"use client";
import React, { useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { SearchProvider } from "./context/SearchContext";
import Navbar from "./(platform)/_components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
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
      <div className="container mx-auto">
        <Navbar />
        <main className="">{children}</main>
      </div>
    </SearchProvider>
  );
};

export default MainLayout;
