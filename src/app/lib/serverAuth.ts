import { NextRequest } from "next/server";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest } from "next";

const prisma = new PrismaClient();

function nextRequestToApiRequest(req: NextRequest): NextApiRequest {
  const headers: Record<string, string | string[]> = {};
  req.headers.forEach((value, key) => {
    headers[key] = value;
  });

  return {
    ...req,
    headers,
  } as unknown as NextApiRequest;
}

const serverAuth = async (req: NextRequest) => {
  const apiReq = nextRequestToApiRequest(req);
  const session = await getSession({ req: apiReq });

  console.log(session);

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
