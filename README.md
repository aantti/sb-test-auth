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
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=[INSERT SUPABASE ANON KEY]
   ```

   Both values can be found in [your Supabase project's API settings](https://supabase.com/dashboard/project/_?showConnect=true). Select the project, then check "App Frameworks" and find the values for "Next.js" (Note: do not copy & paste the entire snippet as the variable names might differ there.)

4. Initialize the database

   Use [local development](https://supabase.com/docs/guides/local-development) environment to initialize remote managed database:

   ```bash
   npx supabase init
   ```

   ```bash
   npx supabase start
   ```

   ```bash
   npx supabase link
   ```

   ```bash
   npx supabase db push --include-seed
   ```

5. Start the Next.js local development server:

   ```bash
   npm run dev
   ```

   Open [localhost:3000](http://localhost:3000/).

6. How to test access to the database

- Sign up as a new user (via the "Sign Up" button)
- Click on the email confirmation link
- After confirming the new user signup, click on "Sign In" and log in
- On the homescreen you'll be able to click "Add My Data to Table" (the reload the page)
- Compare the "anyone_can_read_table" data with the "only_auth_users_can_read" table
  - The authenticated user can read their own data from the "only_auth_users_can_read" table
  - Other users' data should not be visible
  - There's a row in the "only_auth_users_can_read" table for a non-existing user_id that noone can read

## Local development

   When using [local development](https://supabase.com/docs/guides/local-development) enviroment, set the env variables to:

   ```
   NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=[INSERT PUBLISHABLE KEY FROM LOCAL DEV]
   ```
