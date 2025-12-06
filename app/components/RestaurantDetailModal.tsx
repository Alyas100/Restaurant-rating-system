"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Star, MapPin, Clock, DollarSign, Utensils, Users, TrendingUp } from "lucide-react";

interface Restaurant {
    id: string;
    name: string;
    cuisine: string;
    rating: number;
    reviews: number;
    lat: number;
    lng: number;
    image: string;
    address: string;
    price: string;
    // Future fields to add
    phone?: string;
    website?: string;
    hours?: string;
    description?: string;
}

interface RestaurantDetailModalProps {
    restaurant: Restaurant | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function RestaurantDetailModal({
    restaurant,
    isOpen,
    onClose,
}: RestaurantDetailModalProps) {
    if (!restaurant) return null;

    // Calculate metrics (mock data for now - these can be added to the database later)
    const avgCostPerPerson = restaurant.price === "₹₹₹₹" ? "₹2,500+" :
        restaurant.price === "₹₹₹" ? "₹1,000-2,500" :
            restaurant.price === "₹₹" ? "₹500-1,000" : "₹200-500";

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-lg"
                    >
                        <div className="glass-panel rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
                            {/* Header Image/Gradient */}
                            <div className="h-40 relative bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-pink-500/30">
                                <div className="absolute inset-0 flex items-center justify-center text-6xl">
                                    🍽️
                                </div>
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
                                >
                                    <X className="w-5 h-5 text-white" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-6">
                                {/* Title & Rating */}
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">{restaurant.name}</h2>
                                        <p className="text-white/60">{restaurant.cuisine}</p>
                                    </div>
                                    <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-xl">
                                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        <span className="text-xl font-bold text-white">{restaurant.rating}</span>
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="glass-panel rounded-xl p-4 bg-white/5">
                                        <div className="flex items-center gap-2 text-white/50 mb-1">
                                            <Users className="w-4 h-4" />
                                            <span className="text-xs uppercase tracking-wide">Reviews</span>
                                        </div>
                                        <p className="text-2xl font-bold text-white">{restaurant.reviews.toLocaleString()}</p>
                                    </div>
                                    <div className="glass-panel rounded-xl p-4 bg-white/5">
                                        <div className="flex items-center gap-2 text-white/50 mb-1">
                                            <DollarSign className="w-4 h-4" />
                                            <span className="text-xs uppercase tracking-wide">Avg Cost</span>
                                        </div>
                                        <p className="text-lg font-bold text-white">{avgCostPerPerson}</p>
                                    </div>
                                    <div className="glass-panel rounded-xl p-4 bg-white/5">
                                        <div className="flex items-center gap-2 text-white/50 mb-1">
                                            <TrendingUp className="w-4 h-4" />
                                            <span className="text-xs uppercase tracking-wide">Price Level</span>
                                        </div>
                                        <p className="text-2xl font-bold text-white">{restaurant.price}</p>
                                    </div>
                                    <div className="glass-panel rounded-xl p-4 bg-white/5">
                                        <div className="flex items-center gap-2 text-white/50 mb-1">
                                            <Clock className="w-4 h-4" />
                                            <span className="text-xs uppercase tracking-wide">Status</span>
                                        </div>
                                        <p className="text-lg font-bold text-green-400">Open Now</p>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex items-start gap-3 text-white/70">
                                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                    <p>{restaurant.address}</p>
                                </div>

                                {/* Future: Menu Section Placeholder */}
                                <div className="glass-panel rounded-xl p-4 bg-white/5 border-dashed border-white/20">
                                    <div className="flex items-center gap-2 text-white/50 mb-2">
                                        <Utensils className="w-4 h-4" />
                                        <span className="text-sm font-medium">Menu</span>
                                    </div>
                                    <p className="text-white/40 text-sm italic">Menu data coming soon...</p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all">
                                        View Reviews
                                    </button>
                                    <button className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-all">
                                        Get Directions
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
