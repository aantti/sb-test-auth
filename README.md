This project is based on [Use Supabase Auth with Next.js](https://supabase.com/docs/guides/auth/quickstarts/nextjs)

See the original README [here](https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md).

## How to use

1. Clone the repo:

   ```bash
   git clone git@github.com:aantti/sb-test-auth.git
   ```

2. Proceed to `sb-test-auth` directory:

   ```bash
   cd sb-test-auth && \
   npm install
   ```

3. Rename `.env.example` to `.env.local` and update the following:

   ```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   ```
   
   Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in [your Supabase project's API settings](https://supabase.com/dashboard/project/_?showConnect=true). Select the project, then check "App Frameworks"  and "Next.js"

4. Initialize the database

  Use [local development](https://supabase.com/docs/guides/local-development) environment to initialize remote managed database:

  ```bash
  npx supabase init
  ```

  ```bash
  npx supabase start
  ```

  ```bash
  npx supabase db push
  ``` 

5. Seed the tables

  Copy & paste, then run [seed.sql](./supabase/seed.sql) into the SQL Editor in the managed Supabase UI.

6. Start the Next.js local development server:

   ```bash
   npm run dev
   ```

   Check [localhost:3000](http://localhost:3000/).

## Local development

   When using [local development](https://supabase.com/docs/guides/local-development) enviroment, set the env variables to:

   ```
   NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT PUBLISHABLE KEY FROM LOCAL DEV]
   ```
