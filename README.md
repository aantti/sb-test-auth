This project is based on [Use Supabase Auth with Next.js](https://supabase.com/docs/guides/auth/quickstarts/nextjs)
See the original README [here](https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md)

## Clone and run locally

1. You'll first need a Supabase account & project/database

2. Clone the repo

   ```bash
   git clone git@github.com:aantti/sb-test-auth.git
   ```

3. Inside the `sb-test-auth` directory:

   ```bash
   cd sb-test-auth && \
   npm install
   ```

4. Rename `.env.example` to `.env.local` and update the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```
   
   Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in [your Supabase project's API settings](https://supabase.com/dashboard/project/_?showConnect=true). Select the project, then check "App Frameworks"  and "Next.js."

   When using [local development](https://supabase.com/docs/guides/local-development) enviroment, set these to:

   ```
   NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT PUBLISHABLE KEY FROM LOCAL DEV]
   ```

5. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   The starter kit should now be running on [localhost:3000](http://localhost:3000/).

