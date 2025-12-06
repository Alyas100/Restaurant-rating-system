"use client";

import { motion } from "framer-motion";
import { Star, MapPin, Clock } from "lucide-react";

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
}

interface RestaurantListProps {
    restaurants: Restaurant[];
    onRestaurantClick?: (restaurant: Restaurant) => void;
}

export default function RestaurantList({ restaurants, onRestaurantClick }: RestaurantListProps) {
    return (
        <div className="space-y-4 h-full overflow-y-auto pr-2 custom-scrollbar">
            {restaurants.map((restaurant, index) => (
                <motion.div
                    key={restaurant.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => onRestaurantClick?.(restaurant)}
                    className="glass-panel p-4 rounded-2xl hover:bg-white/15 transition-colors cursor-pointer group"
                >
                    <div className="flex gap-4">
                        <div className="w-24 h-24 rounded-xl bg-white/10 flex-shrink-0 overflow-hidden relative">
                            {/* Placeholder for image if we had real ones, using gradient for now */}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 flex items-center justify-center text-2xl">🍽️</div>
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg text-white truncate">{restaurant.name}</h3>
                                    <p className="text-sm text-white/60">{restaurant.cuisine} • {restaurant.price}</p>
                                </div>
                                <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg backdrop-blur-md">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm font-bold text-white">{restaurant.rating}</span>
                                </div>
                            </div>

                            <div className="mt-3 flex items-center gap-4 text-xs text-white/50">
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    <span className="truncate max-w-[150px]">{restaurant.address}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    <span>Open Now</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
