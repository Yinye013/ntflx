"use client";

import React, { useCallback, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Input from "../../_components/Input";
import Logo from "../../_components/Logo";
import axios from "axios";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "../../../../components/ui/button";

function AuthPageContent() {
  const [email, setEmail] = useState("");
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toggler, setToggler] = useState("login");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);

  const searchParams = useSearchParams();
  const error = searchParams?.get("error");

  // useEffect(() => {
  //   if (error) {
  //     console.error("OAuth Error:", error);
  //   }
  // }, [error]);

  //using usecallback to create a toggler
  const toggleToggler = useCallback(() => {
    setToggler((curr) => (curr === "login" ? "register" : "login"));
  }, []);

  // creating a callback function to toggle password visibility
  const togglePasswordVisibility = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPasswordVisible((current) => !current);
  }, []);

  // LOGIN FUNCTION
  const login = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });

      if (result?.error) {
        console.error(result.error);
      } else {
        console.log("Successfully signed in");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [email, password]);

  //REGISTER FUNCTION
  const register = useCallback(async () => {
    setIsLoading(true);
    try {
      await axios.post("api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [email, name, password, login]);

  // FORM SUBMIT HANDLER
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Form submitted:", { toggler, email, password, name });

      if (toggler === "login") {
        await login();
      } else {
        await register();
      }
    },
    [toggler, login, register, email, password, name]
  );

  //SIGNIN WITH GOOGLE
  const signInWithGoogle = useCallback(async () => {
    setIsGoogleLoading(true);
    try {
      await signIn("google", {
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsGoogleLoading(false);
    }
  }, []);

  //SIGNIN WITH GITHUB

  const signInWithGithub = useCallback(async () => {
    setIsGithubLoading(true);
    try {
      await signIn("github", {
        callbackUrl: "/profiles",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsGithubLoading(false);
    }
  }, []);

  return (
    <div className="relative h-[100vh] w-full bg-[url('/images/background-image.jpg')] bg-no-repeat bg-center bg-fixed bg-cover ">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Logo />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white font-semibold text-3xl mb-8">
              {toggler === "login" ? "Sign In" : "Register"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {toggler === "register" && (
                <Input
                  label="Username"
                  onChange={(e: any) => {
                    setUsername(e.target.value);
                  }}
                  id="name"
                  type="text"
                  value={name}
                />
              )}

              <Input
                label="Email"
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
                id="email"
                type="email"
                value={email}
              />

              <div className="relative w-full">
                <div className="relative flex items-center rounded-md px-6 pt-6 text-md text-white bg-neutral-700 focus-within:outline-none focus-within:ring-0">
                  <input
                    onChange={(e: any) => {
                      setPassword(e.target.value);
                    }}
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    value={password}
                    required
                    className="w-full bg-neutral-700 text-white focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-6 cursor-pointer z-20 p-1"
                  >
                    {!isPasswordVisible ? (
                      <FaEyeSlash className="text-white" />
                    ) : (
                      <FaEye className="text-white" />
                    )}
                  </button>
                  <label
                    htmlFor="password"
                    className="absolute text-md text-zinc-300 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                  >
                    Password
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                variant={"login_signup"}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : toggler === "login" ? (
                  "Login"
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>

            {/* GITHUB AND GOOGLE BUTTONS */}
            <div className="flex items-center gap-4 mt-8 justify-center items-center">
              <div
                onClick={signInWithGoogle}
                className="flex w-10
              h-10
              bg-white
              rounded-full
              items-center justify-center
              cursor-pointer
              hover:opacity-80
              transition
              "
              >
                {isGoogleLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                ) : (
                  <FcGoogle size={30} />
                )}
              </div>
              <div
                onClick={signInWithGithub}
                className="flex w-10
              h-10
              bg-white
              rounded-full
              items-center justify-center
              cursor-pointer
              hover:opacity-80
              transition
              "
              >
                {isGithubLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                ) : (
                  <FaGithub size={30} />
                )}
              </div>
            </div>

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

function page() {
  return (
    <Suspense fallback={<div className="flex justify-center h-screen items-center bg-black"><div className="text-white text-xl">Loading...</div></div>}>
      <AuthPageContent />
    </Suspense>
  );
}

export default page;
