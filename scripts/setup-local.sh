#!/usr/bin/env bash
set -euo pipefail

# Quick setup helper for the project — automates local tasks for steps 1-5 in the README.
# Run: bash scripts/setup-local.sh

echo "== Project setup helper: Steps 1-5 from README =="

# 1) Install dependencies
echo "\n1) Installing npm dependencies..."
if command -v npm >/dev/null 2>&1; then
  npm install
else
  echo "npm not found. Please install Node.js and npm: https://nodejs.org/"
  exit 1
fi

# 2) Copy .env.example -> .env if needed
echo "\n2) Ensure .env exists"
if [ -f .env ]; then
  echo ".env already exists — leaving it alone. If you want a fresh copy, remove or back it up first."
else
  if [ -f .env.example ]; then
    cp .env.example .env
    echo "Copied .env.example to .env"
    echo "Please open .env and fill VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY if you want Supabase integration."
  else
    echo ".env.example not found in repo — please create .env manually using the README guidance."
  fi
fi

# 3) Check environment variables (informational)
echo "\n3) Environment variables check (informational):"
if grep -q "VITE_SUPABASE_URL" .env 2>/dev/null || grep -q "VITE_SUPABASE_ANON_KEY" .env 2>/dev/null; then
  echo "Found VITE_SUPABASE_* entries in .env (ensure values are set)."
else
  echo "VITE_SUPABASE_* not set in .env yet. Site will run with local demo data until you set them."
fi

# 4) Supabase migration instructions (cannot run without credentials)
echo "\n4) Supabase setup notes (manual steps you must perform):"
if command -v supabase >/dev/null 2>&1; then
  echo "- Supabase CLI is installed. To link and push migrations, run:
    supabase link
    supabase db push
  Or open supabase/migrations/0001_init.sql in the Supabase SQL Editor and paste the contents."
else
  echo "- Supabase CLI not found. Install from https://supabase.com/docs/guides/cli and then run the commands above, or use the SQL editor in the Supabase dashboard."
fi

echo "Also create a Storage bucket named 'media' in the Supabase dashboard (Project → Storage → Create bucket -> name: media) — the admin Media page expects it."

echo "To create an admin user in Supabase (example SQL to run in SQL editor):\n"
cat <<'SQL'
insert into public.profiles (id, full_name, role)
values ('<user-uuid-from-auth-users>', 'Your Name', 'admin');
SQL

echo "\n5) Database setup summary: The migration file is at supabase/migrations/0001_init.sql. Re-run it on a fresh project by pasting into the SQL editor or using supabase db push."

# 5) Final note — start dev server
echo "\nDone. To start the dev server locally (after installing deps):"
echo "  npm run dev"

echo "If you want, I can add or edit files in the repository (for example add src/pages/admin/AdminSettings.tsx placeholder). Reply 'yes add placeholder' and I'll create it."