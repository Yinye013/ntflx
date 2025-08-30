"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import useCurrentUser from "../hooks/useCurrentUser";
import Image from "next/image";

function Profiles() {
  const { data, isLoading } = useCurrentUser();
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

  if (isLoading) {
    return (
      <div className="flex justify-center h-screen items-center bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center h-screen items-center bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="flex flex-col">
        <h1 className="text-white text-3xl md:text-6xl text-center">
          Who's watching?
        </h1>

        <div className="flex items-center justify-center gap-8 mt-10">
          <div
            onClick={() => router.push("/")}
            className="group flex flex-col items-center cursor-pointer"
          >
            <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent transition group-hover:border-white overflow-hidden bg-gray-800">
              <Image
                src="/images/profileblue.png"
                alt="Profile Avatar"
                width={176}
                height={176}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 text-gray-400 text-2xl text-center transition group-hover:text-white">
              {data?.name || "User"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profiles;
