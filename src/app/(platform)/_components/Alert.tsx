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
      <AlertDialogTrigger>Sign out from Netflix</AlertDialogTrigger>
      <AlertDialogContent className="bg-black">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            Are you absolutely sure, {data?.name}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you really sure you want to do this? Kindly note that you will have to log in again.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              signOut();
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Alert;
