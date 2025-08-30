import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

// This endpoint will be called by a cron job or background service
export async function POST(req: NextRequest) {
  try {
    // Simple authentication - in production, you'd want proper API key auth
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    console.log("Starting movie release check...");

    // Get all unique movie IDs from favorites that were marked as "coming soon"
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const favorites = await prisma.favorite.findMany({
      where: {
        releaseDate: {
          gte: thirtyDaysAgo.toISOString().split('T')[0], // Last 30 days in YYYY-MM-DD format
        },
      },
      select: {
        movieId: true,
        userId: true,
        title: true,
        posterPath: true,
        releaseDate: true,
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const TMDB_API_URL = process.env.NEXT_PUBLIC_TMDB_URL;

    if (!TMDB_API_KEY || !TMDB_API_URL) {
      return NextResponse.json({ error: "TMDB API configuration missing", status: 500 });
    }

    const processedMovies = new Set<string>();
    const notificationsCreated = [];

    for (const favorite of favorites) {
      const movieKey = `${favorite.movieId}-${favorite.userId}`;
      
      // Skip if we already processed this movie for this user
      if (processedMovies.has(movieKey)) {
        continue;
      }
      processedMovies.add(movieKey);

      try {
        // Check if we already sent a notification for this movie to this user
        const existingNotification = await prisma.notification.findFirst({
          where: {
            userId: favorite.userId,
            movieId: favorite.movieId,
            type: "movie_released",
          },
        });

        if (existingNotification) {
          continue; // Skip if notification already exists
        }

        // Fetch current movie data from TMDB
        const movieResponse = await axios.get(
          `${TMDB_API_URL}/movie/${favorite.movieId}?api_key=${TMDB_API_KEY}`
        );

        const movieData = movieResponse.data;
        const currentReleaseDate = new Date(movieData.release_date);
        const today = new Date();
        const thirtyDaysAgoFromToday = new Date();
        thirtyDaysAgoFromToday.setDate(today.getDate() - 30);
        
        // Check if the movie was "coming soon" but is now released
        const favoriteReleaseDate = new Date(favorite.releaseDate || movieData.release_date);
        const wasComingSoon = favoriteReleaseDate > thirtyDaysAgoFromToday; // Was in future 30 days ago
        const isNowReleased = currentReleaseDate <= new Date(); // Is now released

        if (wasComingSoon && isNowReleased) {
          // Create notification
          const notification = await prisma.notification.create({
            data: {
              userId: favorite.userId,
              movieId: favorite.movieId,
              type: "movie_released",
              title: "Movie Now Available!",
              message: `${favorite.title} is now available to watch!`,
              movieTitle: favorite.title,
              moviePoster: favorite.posterPath,
            },
          });

          notificationsCreated.push({
            userId: favorite.userId,
            movieTitle: favorite.title,
            notificationId: notification.id,
          });

          console.log(`Created notification for user ${favorite.userId} - movie: ${favorite.title}`);
        }
      } catch (movieError) {
        console.error(`Error processing movie ${favorite.movieId}:`, movieError);
        // Continue processing other movies
      }
    }

    return NextResponse.json({
      message: "Movie release check completed",
      notificationsCreated: notificationsCreated.length,
      details: notificationsCreated,
      status: 200,
    });

  } catch (error) {
    console.error("Error in movie release check:", error);
    return NextResponse.json({ 
      error: "Failed to check movie releases", 
      details: error instanceof Error ? error.message : 'Unknown error',
      status: 500 
    });
  }
}