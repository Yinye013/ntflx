import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarItemProps {
  label: string;
  link: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, link }) => {
  const pathname = usePathname();
  return (
    <Link
      href={link}
      className={`${
        pathname === link ? "text-red-700 font-semibold" : "text-white"
      } cursor-pointer  hover:text-red-700 transition`}
    >
      {label}
    </Link>
  );
};

export default NavbarItem;
