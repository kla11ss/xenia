-- Create a table for storing appointment requests
create table public.appointments (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  phone text not null,
  service text,
  comment text,
  status text default 'new' check (status in ('new', 'contacted', 'completed', 'cancelled'))
);

-- Set up Row Level Security (RLS)
alter table public.appointments enable row level security;

-- Allow anyone to insert (public form submission)
create policy "Allow public inserts"
  on public.appointments for insert
  with check (true);

-- Only authenticated users (admins) can view/update
create policy "Allow authenticated view"
  on public.appointments for select
  using (auth.role() = 'authenticated');
