"use client";

import { motion } from "framer-motion";
import { Search, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

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

interface RestaurantsListProps {
  initialRestaurants: Restaurant[];
}

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

const categories = [
  "All",
  "Indian",
  "Korean",
  "Italian",
  "Western",
  "Japanese",
  "Mexican",
];

export default function RestaurantsList() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [loading, setLoading] = useState(true);

  // Fetch restaurants from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dashboard/restaurants");
        const data = await response.json();
        console.log("API Response:", data);
        setRestaurants(data);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter and sort restaurants
  const filteredRestaurants = (restaurants || [])
    .filter((r) => {
      if (!r) return false; // Skip undefined items
      const matchesSearch =
        r.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || r.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "reviews") return b.reviews - a.reviews;
      return a.name.localeCompare(b.name);
    });

  if (loading) {
    return <div className="text-center py-12 text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="border-b border-slate-800 backdrop-blur-xl bg-slate-950/80 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-4xl font-bold mb-2">All Restaurants</h1>
          <p className="text-slate-400">
            Discover {filteredRestaurants.length} amazing restaurants
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 mb-8"
        >
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search restaurants by name or cuisine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-indigo-500 focus:bg-white/10 focus:outline-none transition-all"
            />
          </div>

          {/* Filters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-indigo-600 text-white"
                        : "bg-white/5 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Sort Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-3">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:border-indigo-500 focus:bg-white/10 focus:outline-none transition-all"
              >
                <option value="rating">Highest Rating</option>
                <option value="reviews">Most Reviews</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-slate-400">
            Showing {filteredRestaurants.length} of {mockRestaurants.length}{" "}
            restaurants
          </p>
        </div>

        {/* Restaurants Grid */}
        {filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/restaurants/${restaurant.id}`}>
                  <div className="group h-full glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-indigo-500/50 transition-all hover:bg-white/10 cursor-pointer">
                    {/* Image Section */}
                    <div className="relative h-40 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-grid-white/5" />
                      <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                        {restaurant.emoji}
                      </span>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                          {restaurant.name}
                        </h3>
                      </div>

                      <p className="text-indigo-400 text-sm font-semibold mb-3">
                        {restaurant.category}
                      </p>

                      <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                        {restaurant.description}
                      </p>

                      {/* Rating & Reviews */}
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <Star
                            size={16}
                            className="text-yellow-400 fill-yellow-400"
                          />
                          <span className="font-bold text-white">
                            {restaurant.rating}
                          </span>
                          <span className="text-slate-400 text-sm">
                            ({restaurant.reviews} reviews)
                          </span>
                        </div>
                      </div>

                      {/* Address */}
                      <p className="text-xs text-slate-400 line-clamp-1">
                        📍 {restaurant.address}
                      </p>
                    </div>

                    {/* Hover Action */}
                    <div className="px-6 pb-6">
                      <motion.div
                        whileHover={{ x: 4 }}
                        className="text-indigo-400 group-hover:text-indigo-300 font-semibold flex items-center gap-2 text-sm"
                      >
                        View Details →
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-2xl text-slate-400 mb-2">No restaurants found</p>
            <p className="text-slate-500">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
