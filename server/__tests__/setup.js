// Provide dummy env vars so the supabase client can be constructed in CI
// (where no .env file exists). Real network calls are mocked per-test.
process.env.SUPABASE_URL ||= 'https://test.supabase.co'
process.env.SUPABASE_ANON_KEY ||= 'test-anon-key'
