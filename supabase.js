// ═══════════════════════════════════════════════════════════════
// SUPABASE CONFIG
// ═══════════════════════════════════════════════════════════════
// SETUP INSTRUCTIONS:
// 1. Go to https://supabase.com → create a free project
// 2. Go to Project Settings → API
// 3. Copy your Project URL and anon/public key
// 4. Paste them below
// 5. Push to GitHub — Vercel will auto-deploy
// ═══════════════════════════════════════════════════════════════

const SUPABASE_URL = 'https://yapshqzfknpssoiklbcr.supabase.co';    // ← paste here
const SUPABASE_ANON_KEY = 'sb_publishable_ZFJLT1q0QehsF9IyhgCWmA_D3SP-nvy';                // ← paste here

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── AUTH STATE LISTENER ──
// Runs on every page — updates nav based on login state
supabase.auth.onAuthStateChange((event, session) => {
  updateNavAuth(session?.user ?? null);
});

function updateNavAuth(user) {
  // If you want to show login/logout in nav, hook into this
  // For now it just tracks state
  window._nexoUser = user;
}

// ── HELPER: get current user ──
async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// ── HELPER: sign out ──
async function signOut() {
  await supabase.auth.signOut();
  window.location.href = 'index.html';
}
