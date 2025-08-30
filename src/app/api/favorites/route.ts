import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import serverAuth from "../../lib/serverAuth";

const prisma = new PrismaClient();

// GET - Fetch user's favorites
export async function GET(req: NextRequest) {
  try {
    const { currentUser } = await serverAuth(req);

    const favorites = await prisma.favorite.findMany({
      where: {
        userId: currentUser.id,
      },
      orderBy: {
        addedAt: 'desc',
      },
    });

    return NextResponse.json({ favorites, status: 200 });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json({ error: "Failed to fetch favorites", status: 500 });
  }
}

// POST - Add movie to favorites
export async function POST(req: NextRequest) {
  try {
    const { currentUser } = await serverAuth(req);
    const body = await req.json();
    
    const { 
      movieId, 
      title, 
      posterPath, 
      backdropPath, 
      overview, 
      releaseDate, 
      voteAverage 
    } = body;

    if (!movieId || !title) {
      return NextResponse.json({ 
        error: "Missing required fields: movieId and title", 
        status: 400 
      });
    }

    // Check if already in favorites
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_movieId: {
          userId: currentUser.id,
          movieId: parseInt(movieId),
        },
      },
    });

    if (existingFavorite) {
      return NextResponse.json({ 
        error: "Movie already in favorites", 
        status: 409 
      });
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId: currentUser.id,
        movieId: parseInt(movieId),
        title,
        posterPath,
        backdropPath,
        overview,
        releaseDate,
        voteAverage: voteAverage ? parseFloat(voteAverage) : null,
      },
    });

    return NextResponse.json({ favorite, status: 201 });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return NextResponse.json({ error: "Failed to add to favorites", status: 500 });
  }
}