import { PrismaClient } from "@prisma/client";

// create client
const client = global.prismadb || new PrismaClient();
if (process.env.NODE_ENV === "production") {
  global.prismadb = client;
}

//did this because of nextjs hot reloading - on code change, code updates and reruns.
//this is a trick to save prisma clients in a global file which are not affected by hot reloading.
//to fix the prisma client error with typescript, create a global.d.ts file as seen in the file directory.

export default client;
