import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import serverAuth from "@/app/lib/serverAuth";

const prisma = new PrismaClient();

// PATCH - Mark a specific notification as read
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { currentUser } = await serverAuth(req);
    const { id } = params;

    if (!id) {
      return NextResponse.json({ 
        error: "Notification ID is required", 
        status: 400 
      });
    }

    const notification = await prisma.notification.findFirst({
      where: {
        id,
        userId: currentUser.id,
      },
    });

    if (!notification) {
      return NextResponse.json({ 
        error: "Notification not found", 
        status: 404 
      });
    }

    const updatedNotification = await prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });

    return NextResponse.json({ 
      notification: updatedNotification, 
      status: 200 
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return NextResponse.json({ error: "Failed to mark notification as read", status: 500 });
  }
}

// DELETE - Delete a specific notification
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { currentUser } = await serverAuth(req);
    const { id } = params;

    if (!id) {
      return NextResponse.json({ 
        error: "Notification ID is required", 
        status: 400 
      });
    }

    const deletedNotification = await prisma.notification.deleteMany({
      where: {
        id,
        userId: currentUser.id,
      },
    });

    if (deletedNotification.count === 0) {
      return NextResponse.json({ 
        error: "Notification not found", 
        status: 404 
      });
    }

    return NextResponse.json({ 
      message: "Notification deleted successfully", 
      status: 200 
    });
  } catch (error) {
    console.error("Error deleting notification:", error);
    return NextResponse.json({ error: "Failed to delete notification", status: 500 });
  }
}