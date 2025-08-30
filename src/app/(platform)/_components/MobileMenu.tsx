import React from "react";
import Link from "next/link";

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }
  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-300">
      <div className="flex flex-col gap-4">
        <Link href="/" className="px-3 text-center text-white hover:underline">
          Home
        </Link>
        <Link href="/trending" className="px-3 text-center text-white hover:underline">
          Trending
        </Link>
        <Link href="/top-rated" className="px-3 text-center text-white hover:underline">
          Top Rated
        </Link>
        <Link href="/upcoming" className="px-3 text-center text-white hover:underline">
          Upcoming
        </Link>
        <Link href="/favorites" className="px-3 text-center text-white hover:underline">
          My List
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
