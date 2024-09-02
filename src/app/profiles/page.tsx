"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import useCurrentUser from "../hooks/useCurrentUser";

function Profiles() {
  const { data } = useCurrentUser();

  //CHECK IF THERE IS A SESSION AND IF THERE IS NO SESSION, PUSH TO AUTH PAGE
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
    <div className="flex justify-center h-screen items-center ">
      <div className="flex flex-col">
        <h1 className="text-white text-3xl md:text-6xl ">Who's logged in?</h1>

        <div className="flex items-center justify-center gap-8 mt-10">
          <div
            onClick={() => {
              router.push("/");
            }}
          >
            <div className="group flex-row w-44 mx-auto">
              <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent  transition group-hover:cursor-pointer group-hover:border-white overflow-hidden ">
                <img src="/images/profileblue.png" alt="avatar" />
              </div>
              <div className="mt-4 text-gray-400 text-2xl text-center transition group-hover:text-white">
                {data?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profiles;
