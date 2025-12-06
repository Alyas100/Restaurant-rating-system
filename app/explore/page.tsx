"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import RestaurantList from "../components/RestaurantList";
import RestaurantDetailModal from "../components/RestaurantDetailModal";
import SearchBox from "../components/SearchBox";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

// Dynamically import MapComponent to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import("../components/MapComponent"), {
    ssr: false,
    loading: () => (
        <div className="h-full w-full flex items-center justify-center glass-panel rounded-3xl">
            <div className="animate-pulse text-white/50">Loading Map...</div>
        </div>
    ),
});

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

export default function ExplorePage() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [mapCenter, setMapCenter] = useState<[number, number]>([28.6139, 77.2090]); // Default: Delhi
    const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const { data, error } = await supabase
                    .from("restaurants")
                    .select("*");

                if (error) {
                    console.error("Error fetching restaurants:", error.message || error);
                    setRestaurants([]);
                } else if (data) {
                    setRestaurants(data as Restaurant[]);
                }
            } catch (err) {
                console.error("Unexpected error fetching restaurants:", err);
                setRestaurants([]);
            }
        };

        fetchRestaurants();
    }, []);

    const handleLocationSelect = (lat: number, lng: number) => {
        setMapCenter([lat, lng]);
    };

    const handleRestaurantClick = (restaurant: Restaurant) => {
        setSelectedRestaurant(restaurant);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRestaurant(null);
    };

    return (
        <div className="h-screen w-full flex flex-col bg-[#0f0c29] overflow-hidden">
            {/* Dynamic Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            </div>

            {/* Header */}
            <header className="relative z-20 flex flex-col md:flex-row items-center justify-between px-6 py-4 glass-panel border-b border-white/10 rounded-none gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <Link href="/" className="p-2 rounded-full hover:bg-white/10 transition-colors">
                        <ArrowLeft className="w-5 h-5 text-white" />
                    </Link>
                    <h1 className="text-xl font-bold text-white hidden md:block">Explore</h1>
                    <div className="flex-1 md:hidden">
                        <SearchBox onLocationSelect={handleLocationSelect} />
                    </div>
                </div>

                <div className="hidden md:block w-full max-w-md">
                    <SearchBox onLocationSelect={handleLocationSelect} />
                </div>

                <div className="flex items-center gap-2">
                    <div className="px-3 py-1 rounded-full bg-white/10 text-xs text-white/70 whitespace-nowrap">
                        {restaurants.length} Restaurants
                    </div>
                </div>
            </header>

            {/* Main Split View */}
            <main className="relative z-10 flex-1 flex overflow-hidden p-4 gap-4">
                {/* List View (Left Side) */}
                <div className="w-full md:w-[400px] flex flex-col gap-4">
                    <RestaurantList
                        restaurants={restaurants}
                        onRestaurantClick={handleRestaurantClick}
                    />
                </div>

                {/* Map View (Right Side - Hidden on mobile, visible on md+) */}
                <div className="hidden md:block flex-1 rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                    <MapComponent restaurants={restaurants} center={mapCenter} />
                </div>
            </main>

            {/* Restaurant Detail Modal */}
            <RestaurantDetailModal
                restaurant={selectedRestaurant}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    );
}
