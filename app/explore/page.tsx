"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import RestaurantList from "../components/RestaurantList";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Dynamically import MapComponent to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import("../components/MapComponent"), {
    ssr: false,
    loading: () => (
        <div className="h-full w-full flex items-center justify-center glass-panel rounded-3xl">
            <div className="animate-pulse text-white/50">Loading Map...</div>
        </div>
    ),
});

const MOCK_RESTAURANTS = [
    {
        id: "1",
        name: "Indian Accent",
        cuisine: "Modern Indian",
        rating: 4.9,
        reviews: 3420,
        lat: 28.5921,
        lng: 77.2383,
        image: "/placeholder.jpg",
        address: "The Lodhi, Lodhi Road, New Delhi",
        price: "₹₹₹₹",
    },
    {
        id: "2",
        name: "Bukhara",
        cuisine: "North Indian",
        rating: 4.8,
        reviews: 5100,
        lat: 28.5968,
        lng: 77.1729,
        image: "/placeholder.jpg",
        address: "ITC Maurya, Sardar Patel Marg, New Delhi",
        price: "₹₹₹₹",
    },
    {
        id: "3",
        name: "Leo's Pizzeria",
        cuisine: "Italian, Pizza",
        rating: 4.6,
        reviews: 890,
        lat: 28.5529,
        lng: 77.2407,
        image: "/placeholder.jpg",
        address: "Vasant Vihar, New Delhi",
        price: "₹₹₹",
    },
    {
        id: "4",
        name: "Big Chill Cafe",
        cuisine: "Italian, Continental",
        rating: 4.7,
        reviews: 2100,
        lat: 28.5584,
        lng: 77.2029,
        image: "/placeholder.jpg",
        address: "Khan Market, New Delhi",
        price: "₹₹₹",
    },
    {
        id: "5",
        name: "Yeti - The Himalayan Kitchen",
        cuisine: "Tibetan, Nepalese",
        rating: 4.5,
        reviews: 1200,
        lat: 28.5463,
        lng: 77.1903,
        image: "/placeholder.jpg",
        address: "Hauz Khas Village, New Delhi",
        price: "₹₹",
    },
];

export default function ExplorePage() {
    const restaurants = useMemo(() => MOCK_RESTAURANTS, []);

    return (
        <div className="h-screen w-full flex flex-col bg-[#0f0c29] overflow-hidden">
            {/* Dynamic Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            </div>

            {/* Header */}
            <header className="relative z-20 flex items-center justify-between px-6 py-4 glass-panel border-b border-white/10 rounded-none">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 rounded-full hover:bg-white/10 transition-colors">
                        <ArrowLeft className="w-5 h-5 text-white" />
                    </Link>
                    <h1 className="text-xl font-bold text-white">Explore Delhi</h1>
                </div>
                <div className="flex items-center gap-2">
                    <div className="px-3 py-1 rounded-full bg-white/10 text-xs text-white/70">
                        {restaurants.length} Restaurants Found
                    </div>
                </div>
            </header>

            {/* Main Split View */}
            <main className="relative z-10 flex-1 flex overflow-hidden p-4 gap-4">
                {/* List View (Left Side) */}
                <div className="w-full md:w-[400px] flex flex-col gap-4">
                    <RestaurantList restaurants={restaurants} />
                </div>

                {/* Map View (Right Side - Hidden on mobile, visible on md+) */}
                <div className="hidden md:block flex-1 rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                    <MapComponent restaurants={restaurants} />
                </div>
            </main>
        </div>
    );
}
