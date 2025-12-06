-- Create restaurants table
create table if not exists restaurants (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  cuisine text not null,
  rating numeric(2, 1) default 0.0,
  reviews integer default 0,
  lat double precision not null,
  lng double precision not null,
  image text,
  address text,
  price text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table restaurants enable row level security;

-- Create policy to allow public read access
create policy "Public restaurants are viewable by everyone"
  on restaurants for select
  using ( true );

-- Seed data
insert into restaurants (name, cuisine, rating, reviews, lat, lng, image, address, price) values
  ('Indian Accent', 'Modern Indian', 4.9, 3420, 28.5921, 77.2383, '/placeholder.jpg', 'The Lodhi, Lodhi Road, New Delhi', '₹₹₹₹'),
  ('Bukhara', 'North Indian', 4.8, 5100, 28.5968, 77.1729, '/placeholder.jpg', 'ITC Maurya, Sardar Patel Marg, New Delhi', '₹₹₹₹'),
  ('Leo''s Pizzeria', 'Italian, Pizza', 4.6, 890, 28.5529, 77.2407, '/placeholder.jpg', 'Vasant Vihar, New Delhi', '₹₹₹'),
  ('Big Chill Cafe', 'Italian, Continental', 4.7, 2100, 28.5584, 77.2029, '/placeholder.jpg', 'Khan Market, New Delhi', '₹₹₹'),
  ('Yeti - The Himalayan Kitchen', 'Tibetan, Nepalese', 4.5, 1200, 28.5463, 77.1903, '/placeholder.jpg', 'Hauz Khas Village, New Delhi', '₹₹'),
  ('Le Bernardin', 'French', 4.9, 5000, 40.7614, -73.9816, '/placeholder.jpg', '155 W 51st St, New York, NY', '$$$$'),
  ('Sukiyabashi Jiro', 'Sushi', 4.8, 2000, 35.6721, 139.7639, '/placeholder.jpg', 'Ginza, Tokyo', '¥¥¥¥'),
  ('Osteria Francescana', 'Italian', 4.9, 3000, 44.6433, 10.9205, '/placeholder.jpg', 'Modena, Italy', '€€€€');
