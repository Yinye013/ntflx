import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import serverAuth from "../../lib/serverAuth";

const prisma = new PrismaClient();

// GET - Fetch user's notifications
export async function GET(req: NextRequest) {
  try {
    const { currentUser } = await serverAuth(req);
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const unreadOnly = url.searchParams.get('unreadOnly') === 'true';

    const skip = (page - 1) * limit;

    const where = {
      userId: currentUser.id,
      ...(unreadOnly ? { isRead: false } : {}),
    };

    const notifications = await prisma.notification.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    });

    const totalCount = await prisma.notification.count({ where });
    const unreadCount = await prisma.notification.count({
      where: {
        userId: currentUser.id,
        isRead: false,
      },
    });

    return NextResponse.json({
      notifications,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
      },
      unreadCount,
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json({ error: "Failed to fetch notifications", status: 500 });
  }
}

// POST - Create a new notification (for system use)
export async function POST(req: NextRequest) {
  try {
    const { currentUser } = await serverAuth(req);
    const body = await req.json();
    
    const { 
      movieId, 
      type, 
      title, 
      message, 
      movieTitle, 
      moviePoster 
    } = body;

    if (!movieId || !type || !title || !message) {
      return NextResponse.json({ 
        error: "Missing required fields: movieId, type, title, message", 
        status: 400 
      });
    }

    const notification = await prisma.notification.create({
      data: {
        userId: currentUser.id,
        movieId: parseInt(movieId),
        type,
        title,
        message,
        movieTitle,
        moviePoster,
      },
    });

    return NextResponse.json({ notification, status: 201 });
  } catch (error) {
    console.error("Error creating notification:", error);
    return NextResponse.json({ error: "Failed to create notification", status: 500 });
  }
}

// PATCH - Mark all notifications as read
export async function PATCH(req: NextRequest) {
  try {
    const { currentUser } = await serverAuth(req);

    await prisma.notification.updateMany({
      where: {
        userId: currentUser.id,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    return NextResponse.json({ 
      message: "All notifications marked as read", 
      status: 200 
    });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    return NextResponse.json({ error: "Failed to mark notifications as read", status: 500 });
  }
}