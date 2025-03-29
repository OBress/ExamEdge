# ExamEdge

## Setting Up Google OAuth with Supabase

To enable Google OAuth authentication in this application:

1. Log in to your Supabase dashboard at https://app.supabase.com
2. Navigate to your project
3. Go to Authentication > Providers
4. Find Google in the list of providers and toggle it on
5. Create OAuth credentials in Google Cloud Console:
   - Go to https://console.cloud.google.com/
   - Create a new project or use an existing one
   - Navigate to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Configure the consent screen as needed
   - Set Application type to "Web application"
   - Add an Authorized redirect URI: `https://[YOUR_SUPABASE_PROJECT_REF].supabase.co/auth/v1/callback`
   - Save and copy the generated Client ID and Client Secret
6. Back in Supabase, enter the Client ID and Client Secret in the Google provider settings
7. Add your app domain and subdomain to the authorized domains list
8. For local development, add `localhost` and your local port (e.g., `localhost:3000`) to the authorized domains
9. Click Save

After completing these steps, Google OAuth should be properly configured and ready to use.

## Environment Variables

Make sure your `.env.local` file includes the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

These environment variables are required for the Supabase client to connect to your Supabase project.
