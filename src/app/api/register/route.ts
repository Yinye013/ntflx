import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";
// import prismadb from "../../lib/prismadb";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const payload = await req.json();

    const { email, name, password } = payload;

    const existingUser = prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!existingUser) {
      return NextResponse.json({
        error: "Email taken"!,
        status: 422,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const createUser = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return NextResponse.json({
      data: createUser,
      success: true,
      createUser,
    });

    // return NextResponse.json({
    //   data: createUser,
    //   success: true,
    // });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
