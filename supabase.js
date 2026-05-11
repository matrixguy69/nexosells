// ═══════════════════════════════════════════════════════════
// SUPABASE CONFIG
// 1. Go to supabase.com → your project → Settings → API
// 2. Paste your Project URL and anon key below
// ═══════════════════════════════════════════════════════════
const SUPABASE_URL = 'https://yapshqzfknpssoiklbcr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhcHNocXpma25wc3NvaWtsYmNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2NjU4ODksImV4cCI6MjA5MzI0MTg4OX0.NJqEwVGKCEUiRwdvByugulCd5IQ3vC40FuyiU2MjCH0';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── AUTH ──
async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

async function signOut() {
  await supabase.auth.signOut();
  window.location.href = 'index.html';
}

// ── NAV AUTH — runs after DOM is ready ──
function updateNavAuth(user) {
  const loginLinks = document.querySelectorAll('.nav-login-link');
  const accountLinks = document.querySelectorAll('.nav-account-link');
  const userNames = document.querySelectorAll('.nav-user-name');

  if (user) {
    loginLinks.forEach(el => el.style.display = 'none');
    accountLinks.forEach(el => el.style.display = 'flex');
    const name = user.user_metadata?.full_name?.split(' ')[0] || user.email?.split('@')[0] || 'Account';
    userNames.forEach(el => el.textContent = name);
  } else {
    loginLinks.forEach(el => el.style.display = 'flex');
    accountLinks.forEach(el => el.style.display = 'none');
  }
}

// Run nav update on every page after DOM loads
document.addEventListener('DOMContentLoaded', async () => {
  const user = await getCurrentUser();
  updateNavAuth(user);

  // Also listen for auth changes (e.g. after Google redirect)
  supabase.auth.onAuthStateChange((event, session) => {
    updateNavAuth(session?.user ?? null);
    // If just logged in via Google redirect, go home
    if (event === 'SIGNED_IN' && window.location.pathname.includes('login')) {
      window.location.href = 'index.html';
    }
  });
});

// ── ORDERS ──
async function saveOrder(orderData) {
  const { data, error } = await supabase.from('orders').insert([orderData]).select().single();
  return { data, error };
}

async function getMyOrders(email) {
  const { data, error } = await supabase.from('orders').select('*')
    .eq('customer_email', email)
    .order('created_at', { ascending: false });
  return { data, error };
}

// ── REVIEWS ──
async function submitReview(reviewData) {
  const { data, error } = await supabase.from('reviews')
    .insert([{ ...reviewData, approved: false }]).select().single();
  return { data, error };
}

async function getProductReviews(productId) {
  const { data, error } = await supabase.from('reviews').select('*')
    .eq('product_id', productId).eq('approved', true)
    .order('created_at', { ascending: false });
  return { data, error };
}

// ── PROMO CODES ──
async function validatePromo(code, orderTotal) {
  const { data, error } = await supabase.from('promo_codes').select('*')
    .eq('code', code.toUpperCase()).eq('active', true).single();
  if (error || !data) return { valid: false, message: 'Invalid promo code.' };
  if (data.expires_at && new Date(data.expires_at) < new Date())
    return { valid: false, message: 'This code has expired.' };
  if (data.uses_count >= data.max_uses)
    return { valid: false, message: 'This code has been fully used.' };
  if (orderTotal < data.min_order)
    return { valid: false, message: `Minimum order PKR ${data.min_order.toLocaleString()} required.` };
  const discount = data.discount_type === 'percent'
    ? Math.round(orderTotal * data.discount_value / 100)
    : data.discount_value;
  return { valid: true, discount, code: data };
}

// ── PROFILES ──
async function getProfile(userId) {
  const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
  return data;
}

async function upsertProfile(userId, profileData) {
  const { data, error } = await supabase.from('profiles')
    .upsert({ id: userId, ...profileData }).select().single();
  return { data, error };
}

// ── RECENTLY VIEWED ──
function trackView(productId) {
  let viewed = JSON.parse(localStorage.getItem('nexo_viewed') || '[]');
  viewed = [productId, ...viewed.filter(id => id !== productId)].slice(0, 8);
  localStorage.setItem('nexo_viewed', JSON.stringify(viewed));
}

function getRecentlyViewed() {
  return JSON.parse(localStorage.getItem('nexo_viewed') || '[]');
}
