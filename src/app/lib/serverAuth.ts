import { NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "./authOptions";

const prisma = new PrismaClient();

const serverAuth = async (_req: NextRequest) => {
  const session = await getServerSession(authOptions);

  console.log("Server session:", session);

  if (!session?.user?.email) {
    throw new Error("Not signed in!");
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed in!");
  }
  return { currentUser };
};

export default serverAuth;
