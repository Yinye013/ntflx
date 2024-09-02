"use client";
import React, { useCallback, useState } from "react";
import Logo from "./Logo";
import NavbarItem from "./NavbarItem";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";
import Search from "./Search";
import { IoChevronDownSharp } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { SearchProvider } from "@/app/context/SearchContext";

const Navbar = () => {
  // SHOWING MOBILE MENU
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  //SHOWING ACCOUNT MENU
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);
  return (
    <nav className=" lg:w-full fixed z-40 backdrop-blur-sm lg:container mx-auto">
      <div className="flex flex-row items-center justify-around px-4 md:px-16 py-5  transition duration-500 bg-opacity-50">
        <Logo />
        <div className="flex-row gap-7 hidden lg:flex">
          <NavbarItem label={"Home"} link={"/"} />
          <NavbarItem label={"Trending"} link={"/trending"} />
          <NavbarItem label={"Top Rated"} link={"/top_Rated"} />
          <NavbarItem label={"Upcoming"} link={"/upcoming"} />
          <NavbarItem label={"My List"} link={"/favorites"} />
          {/* <NavbarItem label={"Browse by Languages"} /> */}
        </div>

        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 pl-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <IoChevronDownSharp className="text-white transition" />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <SearchProvider>
              <Search />
            </SearchProvider>
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <FaBell />
          </div>
          <div className="flex flex-row items-center gap-2 cursor-pointer relative">
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img
                onClick={toggleAccountMenu}
                src="/images/profileblue.png"
                alt=""
              />
            </div>
            <IoChevronDownSharp className="text-white transition" />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
