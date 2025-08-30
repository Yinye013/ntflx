# Netflix Clone

A full-featured Netflix clone built with Next.js 14, TypeScript, and modern web technologies. This application provides movie browsing, user authentication, personalized favorites, real-time notifications, and a seamless streaming-like experience.

## 🚀 Features

### Core Functionality

- **User Authentication**: Sign in with email/password, Google, or GitHub OAuth
- **Movie Discovery**: Browse trending, top-rated, and upcoming movies
- **Advanced Search**: Real-time movie search with debounced queries
- **Personal Favorites**: Add/remove movies to favorites with persistence
- **User Profiles**: Profile selection interface
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Advanced Features

- **Real-time Notifications**: Automatic notifications for movie releases
- **Movie Details**: Comprehensive movie information with cast, crew, and trailers
- **Pagination**: Efficient loading of large movie lists
- **Loading States**: Smooth UX with loading spinners and skeleton screens
- **Error Handling**: Graceful error states and user feedback

## 🛠️ Tech Stack

### Frontend Technologies

#### Core Framework & Language
- **Next.js 14** - React framework with App Router and SSR/SSG capabilities
- **React 18** - Component-based UI library with hooks and concurrent features
- **TypeScript** - Static type checking for enhanced development experience

#### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Tailwind Animate** - Animation utilities for Tailwind
- **Tailwind Merge** - Utility for merging Tailwind classes
- **shadcn/ui** - Modern, accessible component library built on Radix UI
- **Radix UI** - Unstyled, accessible component primitives
- **Class Variance Authority (CVA)** - CSS-in-TS utility for component variants
- **clsx** - Utility for constructing className strings conditionally

#### State Management & Data Fetching
- **SWR** - Data fetching library with caching, revalidation, and real-time updates
- **React Context API** - Built-in state management for search and global state
- **Custom React Hooks** - Encapsulated business logic (useCurrentUser, useFavorites, useGetMovies)

#### User Experience
- **React Hot Toast** - Toast notification system
- **React Icons** - Comprehensive icon library
- **React Spinners** - Loading spinner components
- **NextJS TopLoader** - Page transition loading indicator
- **date-fns** - Modern JavaScript date utility library

### Backend Technologies

#### Server & API
- **Next.js API Routes** - Full-stack serverless functions
- **Server Actions** - React Server Components for server-side operations
- **Middleware** - Request/response interceptors for authentication

#### Database & ORM
- **Prisma** - Modern database toolkit and ORM
- **MongoDB** - NoSQL document database for flexible data storage
- **@prisma/client** - Type-safe database client
- **Database Schema** - User profiles, favorites, notifications, and movie relationships

#### Authentication & Security
- **NextAuth.js** - Complete authentication solution
- **@next-auth/prisma-adapter** - Prisma adapter for NextAuth
- **bcrypt** - Password hashing and salt generation
- **JWT Tokens** - Secure session management
- **OAuth Providers** - Google and GitHub authentication

#### External APIs & Services
- **TMDB API** - The Movie Database for comprehensive movie data
- **Axios** - Promise-based HTTP client for API requests
- **CRON Jobs** - Automated movie release notifications

### Development & DevOps

#### Type Safety & Code Quality
- **TypeScript** - Static type checking across the entire stack
- **@types packages** - Type definitions for JavaScript libraries
- **ESLint** - Code linting and formatting rules
- **Next.js built-in optimizations** - Image optimization, bundle splitting, etc.

#### Build & Deployment
- **PostCSS** - CSS processing and optimization
- **Vercel** - Optimized deployment platform for Next.js
- **Environment Variables** - Secure configuration management

## 📋 Prerequisites

- Node.js 18+
- MongoDB database (local or cloud)
- TMDB API key
- OAuth credentials (Google/GitHub)

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Yinye013/ntflx.git
   cd ntflx
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

   ```bash
   # Database
   DATABASE_URL="mongodb://localhost:27017/netflix-clone"

   # TMDB API
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
   NEXT_PUBLIC_TMDB_URL=https://api.themoviedb.org/3

   # NextAuth
   NEXTAUTH_SECRET=your_nextauth_secret_here
   NEXTAUTH_JWT_SECRET=your_jwt_secret_here

   # OAuth Providers
   GITHUB_ID=your_github_client_id
   GITHUB_SECRET=your_github_client_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # Notifications (Optional)
   CRON_SECRET=your_cron_secret_here
   ```

4. **Database Setup**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Push schema to database
   npx prisma db push
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── (platform)/
│   │   ├── _components/          # Shared UI components
│   │   │   ├── Navbar.tsx        # Main navigation
│   │   │   ├── MovieCard.tsx     # Movie display card
│   │   │   ├── Search.tsx        # Search component
│   │   │   └── ...
│   │   ├── auth/                 # Authentication pages
│   │   ├── cast/                 # Cast details pages
│   │   ├── details/              # Movie details pages
│   │   ├── favorites/            # User favorites page
│   │   ├── person/               # Person details pages
│   │   ├── profiles/             # Profile selection
│   │   ├── search/               # Search results page
│   │   ├── trending/             # Trending movies
│   │   ├── top-rated/            # Top rated movies
│   │   └── upcoming/             # Upcoming movies
│   ├── api/                      # API routes
│   │   ├── auth/                 # NextAuth configuration
│   │   ├── current/              # Current user endpoint
│   │   ├── favorites/            # Favorites CRUD
│   │   ├── notifications/        # Notifications system
│   │   └── register/             # User registration
│   ├── context/                  # React contexts
│   │   └── SearchContext.tsx     # Search state management
│   ├── hooks/                    # Custom React hooks
│   │   ├── useCurrentUser.ts     # User data hook
│   │   ├── useFavorites.ts       # Favorites management
│   │   ├── useGetMovies.ts       # Movie fetching
│   │   └── ...
│   ├── lib/                      # Utility libraries
│   │   ├── authOptions.ts        # NextAuth configuration
│   │   ├── prismadb.ts           # Prisma client
│   │   └── serverAuth.ts         # Server-side auth
│   ├── layout.tsx                # Root layout
│   ├── mainlayout.tsx            # Main app layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
prisma/
├── schema.prisma                 # Database schema
public/
├── images/                       # Static images
└── ...
```

## 🎯 Key Components

### Authentication Flow

- **NextAuth Integration**: Handles OAuth and credentials authentication
- **Session Management**: JWT-based sessions with secure token handling
- **Protected Routes**: Automatic redirects for unauthenticated users

### Movie Data Management

- **TMDB Integration**: Fetches movie data, images, and metadata
- **Caching**: SWR for efficient data fetching and caching
- **Search Optimization**: Debounced search with real-time results

### Database Schema

- **User Management**: Profiles, favorites, and notification preferences
- **Movie Relations**: Efficient storage of user-movie relationships
- **Notification System**: Automated alerts for movie releases

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📊 API Endpoints

### Authentication

- `POST /api/auth/[...nextauth]` - NextAuth handler
- `POST /api/register` - User registration

### Movies

- `GET /api/movies` - Fetch movies (via TMDB)

### User Data

- `GET /api/current` - Current user information
- `GET/POST /api/favorites` - Manage user favorites
- `GET/PUT/DELETE /api/notifications` - Notification management

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx prisma studio    # Open Prisma Studio
npx prisma db push   # Push schema changes
```

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (via ESLint)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for movie data
- [Next.js](https://nextjs.org/) for the amazing framework
- [Prisma](https://prisma.io/) for database management
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) for UI components

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Built with ❤️ using Next.js and modern web technologies.
