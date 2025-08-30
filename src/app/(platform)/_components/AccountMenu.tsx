import React, { useState } from "react";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import Alert from "./Alert";

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data } = useCurrentUser();

  if (!visible) return null;
  return (
    <div className="bg-black/95 backdrop-blur-sm absolute top-14 right-0 rounded-lg border border-gray-700 shadow-2xl overflow-hidden min-w-[200px] animate-in slide-in-from-top-2 duration-200">
      {/* User Profile Section */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <img
              className="w-10 h-10 rounded-lg object-cover transition-all duration-200"
              src="/images/profileblue.png"
              alt="avatar"
            />
            <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium text-sm truncate group-hover:text-gray-200 transition-colors">
              {data?.name || "User"}
            </p>
            <p className="text-gray-400 text-xs">Netflix Member</p>
          </div>
        </div>
      </div>

      {/* Sign Out Section */}
      <div className="p-2">
        <div className="rounded-md hover:bg-gray-800 transition-colors duration-200">
          <Alert />
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
