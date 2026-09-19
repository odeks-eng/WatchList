# WatchList

A private, shared watchlist for tracking TV series and movies together — search via TMDB, tick episodes as watched, and see updates live on both phones.

## Setup

### 1. Supabase (database, auth, realtime)

1. Create a project at [supabase.com](https://supabase.com) (free tier).
2. In **Project Settings → API**, copy the **Project URL** and the **anon public** key.
3. In **Authentication → Providers → Email**, turn **off** "Allow new users to sign up." Login only works for accounts created manually in step 4 — this is what keeps the app private to the two of us.
4. In **Authentication → Users**, click **Add user → Create new user** for each of our emails. Check "Auto Confirm User" so no password/confirmation step is needed — we only ever sign in via the emailed magic link.

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in the Supabase values from step 1:

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
TMDB_API_KEY=
```

(`TMDB_API_KEY` gets filled in a later step.)

### 3. Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/login`. Enter one of the emails created in step 1 and check that inbox for the sign-in link.

## Deploy

Deploy steps land in a later step of this build — see task list / conversation for progress.
