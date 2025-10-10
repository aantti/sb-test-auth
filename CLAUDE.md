# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js application demonstrating Supabase authentication and Row Level Security (RLS) policies. The project showcases how authenticated users can read their own data while public data remains accessible to everyone.

## Development Commands

```bash
# Install dependencies
npm install

# Development server (uses Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## Supabase Setup

### Local Development

```bash
# Initialize Supabase (first time only)
npx supabase init

# Start local Supabase instance
npx supabase start

# Re-apply migrations and seed data
npx supabase db reset
```

### Remote/Managed Database

```bash
# Login to Supabase
npx supabase login

# Link to your project
npx supabase link

# Push schema and seed data
npx supabase db push --include-seed
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL (or `http://127.0.0.1:54321` for local dev)
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY` - Your Supabase anon/publishable key
- `NEXT_PUBLIC_POSTGREST_URL` - (Optional) Custom PostgREST endpoint for database queries

## Architecture

### Supabase Client Instances

The project uses three separate Supabase client patterns based on context:

1. **Server Components** (`lib/supabase/server.ts`): Creates a server client using Next.js cookies() for server-side rendering.

2. **Client Components** (`lib/supabase/client.ts`): Browser client for client-side operations. Includes optional fetch override to redirect PostgREST (database) requests to a custom endpoint while keeping Auth/Realtime/Storage requests on the original URL.

3. **Middleware** (`lib/supabase/middleware.ts`): Refreshes user sessions via cookies. Protects routes by redirecting unauthenticated users to `/auth/login` (except `/`, `/login`, and `/auth/*` routes).

### Authentication Flow

- Middleware (`middleware.ts`) runs on all routes except static assets and images
- `supabase.auth.getClaims()` must be called immediately after creating the server client in middleware to prevent session issues
- Protected routes redirect to `/auth/login` for unauthenticated users
- Email confirmation required for new user signups

### Database Schema

Two demonstration tables with different RLS policies:

- `anyone_can_read_table`: Public read access for all users (authenticated or not)
- `only_auth_users_can_read`: Users can only read/insert their own data (filtered by `auth.uid()`)

See `supabase/schemas/schema.sql` for complete schema and RLS policies.

### Path Aliases

- `@/*` maps to the project root directory
- Use `@/lib/supabase/server` or `@/components/xyz` for imports

### Key Components

- `components/db/fetch-table-data.tsx`: Client component that fetches table data using the browser Supabase client, demonstrates RLS in action
- `app/protected/*`: Example protected routes requiring authentication
- `app/auth/*`: Authentication pages (login, sign-up, password reset, email confirmation)

## Custom PostgREST Endpoint

The browser client (`lib/supabase/client.ts`) can optionally redirect database queries to a custom PostgREST URL via `NEXT_PUBLIC_POSTGREST_URL`. Auth, Realtime, and Storage requests continue using the standard Supabase URL. Includes request logging for debugging.

## Testing Authentication & RLS

1. Sign up as a new user
2. Confirm email via confirmation link
3. Sign in
4. Click "Add My Data to Table" on homepage and reload
5. Compare data visibility:
   - `anyone_can_read_table`: Shows public data to all users
   - `only_auth_users_can_read`: Shows only your data (RLS filters by user_id)
   - Seed data includes an unreachable row with a non-existent user_id that nobody can read
