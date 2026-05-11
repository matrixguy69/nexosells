-- ═══════════════════════════════════════════════════════
-- NEXO SELLS — SUPABASE DATABASE SETUP
-- Paste this entire file into Supabase SQL Editor and Run
-- ═══════════════════════════════════════════════════════

-- ORDERS
create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  customer_name text not null,
  customer_email text,
  customer_phone text not null,
  city text not null,
  address text not null,
  items jsonb not null,
  subtotal numeric not null,
  shipping numeric not null,
  total numeric not null,
  payment_method text not null,
  payment_status text default 'pending',
  order_status text default 'pending',
  tracking_number text,
  promo_code text,
  discount numeric default 0,
  notes text
);

-- PROFILES
create table if not exists profiles (
  id uuid references auth.users primary key,
  full_name text,
  phone text,
  city text,
  address text,
  created_at timestamp with time zone default now()
);

-- REVIEWS
create table if not exists reviews (
  id uuid default gen_random_uuid() primary key,
  product_id integer not null,
  order_id uuid,
  customer_name text not null,
  customer_email text,
  rating integer check (rating >= 1 and rating <= 5),
  comment text,
  approved boolean default false,
  created_at timestamp with time zone default now()
);

-- PROMO CODES
create table if not exists promo_codes (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  code text unique not null,
  discount_type text check (discount_type in ('percent', 'fixed')),
  discount_value numeric not null,
  min_order numeric default 0,
  max_uses integer default 100,
  uses_count integer default 0,
  active boolean default true,
  expires_at timestamp with time zone
);

-- FUNCTION to safely increment promo use count
create or replace function increment_promo_use(code_id uuid)
returns void as $$
  update promo_codes set uses_count = uses_count + 1 where id = code_id;
$$ language sql;

-- ROW LEVEL SECURITY
alter table orders enable row level security;
alter table profiles enable row level security;
alter table reviews enable row level security;
alter table promo_codes enable row level security;

-- ORDER POLICIES
drop policy if exists "Anyone can insert orders" on orders;
drop policy if exists "Users see own orders" on orders;
drop policy if exists "Service role full access orders" on orders;
create policy "Anyone can insert orders" on orders for insert with check (true);
create policy "Users see own orders" on orders for select using (customer_email = auth.jwt() ->> 'email');

-- PROFILE POLICIES
drop policy if exists "Profiles viewable by owner" on profiles;
drop policy if exists "Profiles editable by owner" on profiles;
create policy "Profiles viewable by owner" on profiles for select using (auth.uid() = id);
create policy "Profiles editable by owner" on profiles for all using (auth.uid() = id);

-- REVIEW POLICIES
drop policy if exists "Anyone can insert reviews" on reviews;
drop policy if exists "Approved reviews are public" on reviews;
create policy "Anyone can insert reviews" on reviews for insert with check (true);
create policy "Approved reviews are public" on reviews for select using (approved = true);

-- PROMO POLICIES
drop policy if exists "Anyone can read active promos" on promo_codes;
create policy "Anyone can read active promos" on promo_codes for select using (active = true);

-- SEED: example promo code to test with
insert into promo_codes (code, discount_type, discount_value, min_order, max_uses)
values ('NEXO10', 'percent', 10, 1000, 500)
on conflict (code) do nothing;

-- Done! Your database is ready.
