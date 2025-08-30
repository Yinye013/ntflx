import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog";
import useCurrentUser from "@/app/hooks/useCurrentUser";
import { signOut } from "next-auth/react";

const Alert = () => {
  const { data } = useCurrentUser();
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full flex items-center gap-3 px-3 py-2 text-white text-sm hover:text-red-400 transition-colors duration-200 rounded-md">
        <svg 
          className="w-4 h-4 flex-shrink-0" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span>Sign out</span>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-black/95 backdrop-blur-sm border border-gray-700 rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white text-lg font-semibold">
            Sign out of Netflix?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300 text-sm">
            Hey {data?.name}, are you sure you want to sign out? You'll need to log in again to access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-3">
          <AlertDialogCancel className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600 hover:text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              signOut();
            }}
            className="bg-red-600 text-white hover:bg-red-700 border-red-600"
          >
            Sign out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Alert;
