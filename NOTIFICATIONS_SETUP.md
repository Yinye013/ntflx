# Movie Release Notifications Setup

This system automatically notifies users when their favorited "Coming Soon" movies become available.

## How It Works

1. **User Favorites Coming Soon Movies**: Users add movies with future release dates to their favorites
2. **Background Check**: A cron job runs daily to check if any "Coming Soon" movies are now released
3. **Notification Creation**: When a movie is released, notifications are created for users who favorited it
4. **Real-time Updates**: The navbar bell shows unread notification count and updates automatically

## Environment Variables Needed

Add these to your `.env.local`:

```bash
# For cron job authentication (generate a secure random string)
CRON_SECRET=your_secure_random_string_here

# TMDB API (already configured)
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
NEXT_PUBLIC_TMDB_URL=https://api.themoviedb.org/3
```

## Setting Up the Cron Job

### Option 1: Vercel Cron Jobs (Recommended for Production)

Create `vercel.json` in your project root:

```json
{
  "crons": [
    {
      "path": "/api/notifications/check-releases",
      "schedule": "0 9 * * *"
    }
  ]
}
```

### Option 2: External Cron Service (cron-job.org, etc.)

Set up a daily POST request to:
```
POST https://your-domain.com/api/notifications/check-releases
Headers:
  Authorization: Bearer YOUR_CRON_SECRET
  Content-Type: application/json
Body: {}
```

### Option 3: Local Development

For testing, you can manually trigger the check:

```bash
curl -X POST http://localhost:3000/api/notifications/check-releases \
  -H "Authorization: Bearer YOUR_CRON_SECRET" \
  -H "Content-Type: application/json" \
  -d '{}'
```

## API Endpoints

### Notifications
- `GET /api/notifications` - Get user notifications (paginated)
- `POST /api/notifications` - Create notification (system use)
- `PATCH /api/notifications` - Mark all notifications as read
- `PATCH /api/notifications/[id]` - Mark specific notification as read
- `DELETE /api/notifications/[id]` - Delete specific notification

### Background Service
- `POST /api/notifications/check-releases` - Check for newly released movies (cron job)

## Features

### For Users
- ✅ Automatic notifications when favorited movies are released
- ✅ Real-time notification count in navbar
- ✅ Rich notification dropdown with movie posters
- ✅ Mark individual/all notifications as read
- ✅ Delete notifications
- ✅ Quick access to movie details from notifications

### For Developers
- ✅ Scalable notification system
- ✅ Optimistic UI updates
- ✅ Automatic cleanup of old notifications
- ✅ Error handling and retry logic
- ✅ Performance optimized with SWR caching

## Database Schema

The system adds a `Notification` model to your Prisma schema:

```prisma
model Notification {
  id String @id @default(auto()) @map("_id") @db.ObjectId
  userId String @db.ObjectId
  movieId Int
  type String
  title String
  message String
  movieTitle String?
  moviePoster String?
  isRead Boolean @default(false)
  createdAt DateTime @default(now())
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId, isRead])
  @@index([createdAt])
}
```

## Testing

1. Add a movie with a future release date to favorites
2. Manually run the cron job endpoint
3. Check if notifications appear in the navbar
4. Test marking as read/deleting notifications

The system is designed to be efficient and user-friendly, only notifying users about movies they've explicitly shown interest in by favoriting them.