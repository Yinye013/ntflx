"use client";

import React, { useCallback, useState } from "react";
import Input from "../components/Input";

function page() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toggler, setToggler] = useState("login");

  //using usecallback to create a toggler
  const toggleToggler = useCallback(() => {
    setToggler((curr) => (curr === "login" ? "register" : "login"));
  }, []);

  return (
    <div className="relative h-full w-full bg-[url('/images/background-image.jpg')] bg-no-repeat bg-center bg-fixed bg-cover ">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img
            src="/images/netflix-logo-removebg-preview.png"
            alt="logo"
            className="h-20"
          />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white font-semibold text-3xl mb-8">
              {toggler === "login" ? "Sign In" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {toggler === "register" && (
                <Input
                  label="Email"
                  onChange={(e: any) => {
                    setEmail(e.target.value);
                  }}
                  id="email"
                  type="email"
                  value={email}
                />
              )}

              <Input
                label="Username"
                onChange={(e: any) => {
                  setUsername(e.target.value);
                }}
                id="name"
                type="name"
                value={username}
              />
              <Input
                label="Password"
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              {toggler === "login" ? "Login" : "Sign Up"}
            </button>
            <p className="text-neutral-500 mt-12 text-[12px]">
              {toggler === "login"
                ? " First time using Netflix?"
                : "Already have an account?"}{" "}
              <span
                className="text-white ml-1 underline cursor-pointer"
                onClick={toggleToggler}
              >
                {toggler === "login" ? " Create an account." : "Login."}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
