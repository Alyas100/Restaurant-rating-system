"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Trash2, MoreHorizontal, Star } from "lucide-react";

interface Restaurant {
    id: string;
    name: string;
    cuisine: string;
    rating: number;
    reviews: number;
    status: "Active" | "Pending" | "Closed";
}

const MOCK_DATA: Restaurant[] = [
    { id: "1", name: "The Glass Onion", cuisine: "Modern European", rating: 4.8, reviews: 124, status: "Active" },
    { id: "2", name: "Neon Noodle Bar", cuisine: "Asian Fusion", rating: 4.5, reviews: 89, status: "Active" },
    { id: "3", name: "Cyber Cafe", cuisine: "Coffee & Snacks", rating: 4.2, reviews: 56, status: "Pending" },
    { id: "4", name: "Retro Diner", cuisine: "American", rating: 3.9, reviews: 210, status: "Closed" },
    { id: "5", name: "Sushi Void", cuisine: "Japanese", rating: 4.9, reviews: 342, status: "Active" },
];

export default function RecentRestaurantsTable() {
    const [restaurants, setRestaurants] = useState(MOCK_DATA);

    const handleDelete = (id: string) => {
        setRestaurants((prev) => prev.filter((r) => r.id !== id));
    };

    return (
        <div className="glass-panel rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white">Recent Restaurants</h3>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/10 text-white/60 text-sm">
                            <th className="p-4 font-medium">Name</th>
                            <th className="p-4 font-medium">Cuisine</th>
                            <th className="p-4 font-medium">Rating</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        <AnimatePresence>
                            {restaurants.map((restaurant) => (
                                <motion.tr
                                    key={restaurant.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="group border-b border-white/5 hover:bg-white/5 transition-colors"
                                >
                                    <td className="p-4">
                                        <div className="font-medium text-white">{restaurant.name}</div>
                                        <div className="text-xs text-white/40">{restaurant.reviews} reviews</div>
                                    </td>
                                    <td className="p-4 text-white/80">{restaurant.cuisine}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-1 text-white/80">
                                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                            {restaurant.rating}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${restaurant.status === "Active"
                                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                    : restaurant.status === "Pending"
                                                        ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                                        : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                                                }`}
                                        >
                                            {restaurant.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(restaurant.id)}
                                                className="p-2 rounded-lg hover:bg-rose-500/20 text-white/60 hover:text-rose-400 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
