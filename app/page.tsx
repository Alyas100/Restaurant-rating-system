"use client";

import { useState } from "react";

type Restaurant = {
  id: number;
  name: string;
  category: string;
  emoji: string;
  description: string;
  rating: number;
  reviews: number;
  address: string;
};

type Review = {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
};

// Mock Data
const mockRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "Spice Haven",
    category: "Indian",
    emoji: "🍛",
    description:
      "Authentic Indian cuisine with traditional recipes passed down through generations.",
    rating: 4.5,
    reviews: 120,
    address: "123 Main St, Downtown, City 12345",
  },
  {
    id: 2,
    name: "Kimchi House",
    category: "Korean",
    emoji: "🥢",
    description:
      "Modern Korean restaurant featuring bibimbap, bulgogi, and delicious side dishes.",
    rating: 4.8,
    reviews: 98,
    address: "456 Oak Ave, Midtown, City 12345",
  },
  {
    id: 3,
    name: "La Bella Italia",
    category: "Italian",
    emoji: "🍝",
    description:
      "Cozy Italian trattoria with handmade pasta and authentic sauces.",
    rating: 4.6,
    reviews: 156,
    address: "789 Pine Rd, Uptown, City 12345",
  },
  {
    id: 4,
    name: "The Burger Joint",
    category: "Western",
    emoji: "🍔",
    description:
      "Gourmet burgers with premium ingredients and creative toppings.",
    rating: 4.3,
    reviews: 204,
    address: "321 Elm St, Downtown, City 12345",
  },
  {
    id: 5,
    name: "Sakura Sushi",
    category: "Japanese",
    emoji: "🍣",
    description:
      "Fresh sushi bar with skilled chefs and premium fish selection.",
    rating: 4.7,
    reviews: 178,
    address: "654 Maple Dr, Harbor, City 12345",
  },
  {
    id: 6,
    name: "Taco Fiesta",
    category: "Mexican",
    emoji: "🌮",
    description: "Vibrant Mexican restaurant with street tacos and margaritas.",
    rating: 4.4,
    reviews: 142,
    address: "987 Cedar Ln, Arts District, City 12345",
  },
];

export default function HomePage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(mockRestaurants);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRestaurants = restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        background: "#f8f8f6",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem 2rem",
          background: "#fff",
          borderBottom: "1px solid #e0e0dc",
        }}
      >
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#2d7d8f",
            cursor: "pointer",
          }}
        >
          🍽️ FoodReview
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <a
            style={{
              textDecoration: "none",
              color: "#1a1a1a",
              cursor: "pointer",
            }}
          >
            Home
          </a>
          <a
            style={{
              textDecoration: "none",
              color: "#1a1a1a",
              cursor: "pointer",
            }}
          >
            Restaurants
          </a>
          <button
            style={{
              background: "#2d7d8f",
              color: "#fff",
              borderRadius: "6px",
              padding: "0.5rem 1rem",
            }}
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div
        style={{
          textAlign: "center",
          padding: "3rem 2rem",
          background: "linear-gradient(135deg, #f8f8f6 0%, #f0f0ec 100%)",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", color: "#2d7d8f" }}>
          Find Your Next Favorite Restaurant
        </h1>
        <p
          style={{
            color: "#666",
            fontSize: "1.1rem",
            maxWidth: "600px",
            margin: "1rem auto 2rem",
          }}
        >
          Discover amazing restaurants and read authentic reviews from real
          diners
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
            maxWidth: "500px",
            margin: "0 auto",
          }}
        >
          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              padding: "0.8rem",
              borderRadius: "6px",
              border: "1px solid #e0e0dc",
              fontSize: "1rem",
            }}
          />
          <button
            style={{
              background: "#2d7d8f",
              color: "#fff",
              padding: "0.8rem 1.5rem",
              borderRadius: "6px",
            }}
          >
            Search
          </button>
        </div>
      </div>

      {/* Restaurant Grid */}
      <div
        style={{ maxWidth: "1200px", margin: "2rem auto", padding: "0 2rem" }}
      >
        <h2 style={{ marginBottom: "1rem" }}>Featured Restaurants</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {filteredRestaurants.map((r) => (
            <div
              key={r.id}
              style={{
                background: "#fff",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onClick={() => alert(`View details for ${r.name}`)}
            >
              <div
                style={{
                  height: "180px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "3rem",
                  background: "#f8f8f6",
                }}
              >
                {r.emoji}
              </div>
              <div style={{ padding: "1rem" }}>
                <h3 style={{ fontWeight: 600, marginBottom: "0.5rem" }}>
                  {r.name}
                </h3>
                <p style={{ color: "#666", marginBottom: "0.5rem" }}>
                  {r.category}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span style={{ color: "#ffc107" }}>
                    {"⭐".repeat(Math.floor(r.rating))}
                  </span>
                  <span style={{ color: "#666" }}>({r.reviews} reviews)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
