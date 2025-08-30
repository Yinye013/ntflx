"use client";
import React, { useCallback, useState } from "react";
import Logo from "./Logo";
import NavbarItem from "./NavbarItem";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";
import Search from "./Search";
import NotificationBell from "./NotificationBell";
import { IoChevronDownSharp } from "react-icons/io5";

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
    <nav className="w-full fixed top-0 left-0 z-40 bg-black bg-opacity-10 backdrop-blur-sm">
      <div className="flex flex-row items-center justify-between px-4 md:px-8 lg:px-16 py-4 transition duration-500">
        {/* Left Section - Logo & Navigation */}
        <div className="flex flex-row items-center lg:gap-40">
          <Logo />
          <div className="flex-row gap-7 hidden lg:flex">
            <NavbarItem label={"Home"} link={"/"} />
            <NavbarItem label={"Trending"} link={"/trending"} />
            <NavbarItem label={"Top Rated"} link={"/top-rated"} />
            <NavbarItem label={"Upcoming"} link={"/upcoming"} />
            <NavbarItem label={"My List"} link={"/favorites"} />
          </div>

          {/* Mobile Browse Menu */}
          <div
            onClick={toggleMobileMenu}
            className="lg:hidden flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <p className="text-white text-sm">Browse</p>
            <IoChevronDownSharp className="text-white transition" />
            <MobileMenu visible={showMobileMenu} />
          </div>
        </div>

        {/* Right Section - Search, Notifications, Profile */}
        <div className="flex flex-row gap-4 lg:gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <Search />
          </div>
          <NotificationBell />
          <div className="flex flex-row items-center gap-2 cursor-pointer relative">
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img
                onClick={toggleAccountMenu}
                src="/images/profileblue.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <IoChevronDownSharp
              onClick={toggleAccountMenu}
              className="text-white transition hover:text-gray-300"
              size={16}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
