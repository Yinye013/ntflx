import { PrismaClient } from "@prisma/client";

declare global {
  namespace globalThis {
    var prismadb = new PrismaClient();
  }
  
  // Add type declarations for CSS modules
  declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
  }
  
  declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
  }
}
