"use client";

import { motion } from "framer-motion";
import { ChevronLeft, Globe, MapPin, Phone } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
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

// Mock Data - Same as main page
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

// Mock Reviews
const mockReviews: Review[] = [
  {
    id: 1,
    author: "Sarah Johnson",
    rating: 5,
    text: "Amazing experience! The food was absolutely delicious and the service was impeccable. Highly recommend!",
    date: "2024-01-15",
  },
  {
    id: 2,
    author: "Michael Chen",
    rating: 4,
    text: "Great restaurant with wonderful atmosphere. Food quality is consistent and prices are fair.",
    date: "2024-01-10",
  },
  {
    id: 3,
    author: "Emma Davis",
    rating: 5,
    text: "Best dining experience in the city! Staff was very attentive and the ambiance was perfect for our celebration.",
    date: "2024-01-05",
  },
  {
    id: 4,
    author: "James Wilson",
    rating: 4,
    text: "Really good food but a bit pricey. Still worth a visit for special occasions.",
    date: "2023-12-28",
  },
];

export default function RestaurantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const restaurantId = Number(params.id);

  const [newReview, setNewReview] = useState({
    author: "",
    rating: 5,
    text: "",
  });
  const [reviews, setReviews] = useState<Review[]>(mockReviews);

  // Find restaurant
  const restaurant = mockRestaurants.find((r) => r.id === restaurantId);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-6">
            Restaurant Not Found
          </h1>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleAddReview = () => {
    if (!newReview.author.trim() || !newReview.text.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const review: Review = {
      id: reviews.length + 1,
      author: newReview.author,
      rating: newReview.rating,
      text: newReview.text,
      date: new Date().toISOString().split("T")[0],
    };

    setReviews([review, ...reviews]);
    setNewReview({ author: "", rating: 5, text: "" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header with Back Button */}
      <div className="border-b border-slate-800 backdrop-blur-xl bg-slate-950/80 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
          <motion.button
            whileHover={{ x: -4 }}
            onClick={() => router.back()}
            className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <ChevronLeft size={20} />
            Back
          </motion.button>
          <h1 className="text-2xl font-bold">Restaurant Details</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Restaurant Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-panel rounded-3xl overflow-hidden mb-8 border border-white/10"
        >
          {/* Image Section */}
          <div className="h-80 flex justify-center items-center text-9xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/5" />
            <span className="relative z-10">{restaurant.emoji}</span>
          </div>

          {/* Info Section */}
          <div className="p-8 bg-gradient-to-b from-slate-900/50 to-slate-950">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
                <p className="text-indigo-400 text-lg font-semibold">
                  {restaurant.category} Cuisine
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 text-3xl font-bold mb-2">
                  <span className="text-yellow-400">⭐</span>
                  {restaurant.rating}
                </div>
                <p className="text-slate-400">{restaurant.reviews} reviews</p>
              </div>
            </div>

            <p className="text-slate-300 text-lg leading-relaxed mb-8">
              {restaurant.description}
            </p>

            {/* Contact Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ x: 4 }}
                className="flex gap-4 items-start p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <MapPin className="text-indigo-400 flex-shrink-0" size={24} />
                <div>
                  <p className="text-slate-400 text-sm">Address</p>
                  <p className="font-semibold text-white">
                    {restaurant.address}
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 4 }}
                className="flex gap-4 items-start p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Phone className="text-indigo-400 flex-shrink-0" size={24} />
                <div>
                  <p className="text-slate-400 text-sm">Phone</p>
                  <p className="font-semibold text-white">(555) 123-4567</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 4 }}
                className="flex gap-4 items-start p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Globe className="text-indigo-400 flex-shrink-0" size={24} />
                <div>
                  <p className="text-slate-400 text-sm">Website</p>
                  <p className="font-semibold text-white cursor-pointer hover:text-indigo-400">
                    www.restaurant.com
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Reviews Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Review Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-panel rounded-3xl p-8 border border-white/10"
          >
            <h2 className="text-2xl font-bold mb-6">Share Your Review</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={newReview.author}
                  onChange={(e) =>
                    setNewReview({ ...newReview, author: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-indigo-500 focus:bg-white/10 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Rating
                </label>
                <select
                  value={newReview.rating}
                  onChange={(e) =>
                    setNewReview({
                      ...newReview,
                      rating: Number(e.target.value),
                    })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-indigo-500 focus:bg-white/10 focus:outline-none transition-all"
                >
                  <option value={5}>5 - Excellent</option>
                  <option value={4}>4 - Very Good</option>
                  <option value={3}>3 - Good</option>
                  <option value={2}>2 - Fair</option>
                  <option value={1}>1 - Poor</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Your Review
                </label>
                <textarea
                  placeholder="Share your dining experience..."
                  value={newReview.text}
                  onChange={(e) =>
                    setNewReview({ ...newReview, text: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-indigo-500 focus:bg-white/10 focus:outline-none transition-all resize-none min-h-[120px]"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddReview}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-indigo-500/50"
              >
                Post Review
              </motion.button>
            </div>
          </motion.div>

          {/* Reviews List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6">
              Reviews ({reviews.length})
            </h2>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-panel rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold text-white">
                        {review.author}
                      </p>
                      <p className="text-xs text-slate-400">{review.date}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < review.rating
                              ? "text-yellow-400"
                              : "text-slate-600"
                          }
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {review.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
