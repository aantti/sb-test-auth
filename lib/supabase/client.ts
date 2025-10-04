import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!,
    {
      global: {
        fetch: (...args) => {
          const [url, options = {}] = args;
          const urlString = url.toString();

          // Log all Supabase requests
          console.log('🔗 Supabase Request:', {
            originalUrl: urlString,
            method: options.method || 'GET',
            service: urlString.includes('/rest/v1/') ? 'PostgREST (Database)' : 
                     urlString.includes('/auth/v1/') ? 'Auth' :
                     urlString.includes('/realtime/v1/') ? 'Realtime' :
                     urlString.includes('/storage/v1/') ? 'Storage' : 'Other'
          });

          // Only replace PostgREST API calls (database queries)
          if (urlString.includes('/rest/v1/') && process.env.NEXT_PUBLIC_POSTGREST_URL) {
            const customUrl = urlString.replace(
              `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`,
              `${process.env.NEXT_PUBLIC_POSTGREST_URL}/`
            );

            console.log('🔄 Redirecting PostgREST to:', customUrl);
            return fetch(customUrl, options);
          }

          // For auth and other calls, use original URL
          console.log('✅ Using original URL for:', urlString.includes('/auth/v1/') ? 'Auth' : 'Other service');
          return fetch(url, options);
        },
      },
    }
  );
}
