import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import serverAuth from "../../../lib/serverAuth";

const prisma = new PrismaClient();

// DELETE - Remove movie from favorites
export async function DELETE(
  req: NextRequest,
  { params }: { params: { movieId: string } }
) {
  try {
    const { currentUser } = await serverAuth(req);
    const { movieId } = params;

    if (!movieId) {
      return NextResponse.json({ 
        error: "Movie ID is required", 
        status: 400 
      });
    }

    const deletedFavorite = await prisma.favorite.deleteMany({
      where: {
        userId: currentUser.id,
        movieId: parseInt(movieId),
      },
    });

    if (deletedFavorite.count === 0) {
      return NextResponse.json({ 
        error: "Favorite not found", 
        status: 404 
      });
    }

    return NextResponse.json({ 
      message: "Successfully removed from favorites", 
      status: 200 
    });
  } catch (error) {
    console.error("Error removing from favorites:", error);
    return NextResponse.json({ error: "Failed to remove from favorites", status: 500 });
  }
}

// GET - Check if movie is in favorites
export async function GET(
  req: NextRequest,
  { params }: { params: { movieId: string } }
) {
  try {
    const { currentUser } = await serverAuth(req);
    const { movieId } = params;

    if (!movieId) {
      return NextResponse.json({ 
        error: "Movie ID is required", 
        status: 400 
      });
    }

    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_movieId: {
          userId: currentUser.id,
          movieId: parseInt(movieId),
        },
      },
    });

    return NextResponse.json({ 
      isFavorite: !!favorite, 
      favorite: favorite || null,
      status: 200 
    });
  } catch (error) {
    console.error("Error checking favorite status:", error);
    return NextResponse.json({ error: "Failed to check favorite status", status: 500 });
  }
}