"use client";

import { motion } from "framer-motion";
import StatsCard from "../components/StatsCard";
import RecentRestaurantsTable from "../components/RecentRestaurantsTable";
import { Store, MessageSquare, Star } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Welcome Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold text-white mb-2">
                    Good afternoon, Admin <span className="inline-block animate-wave">👋</span>
                </h1>
                <p className="text-white/60">Here's what's happening with your platform today.</p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="Total Restaurants"
                    value={1248}
                    icon={Store}
                    trend="+12% from last month"
                    trendUp={true}
                />
                <StatsCard
                    title="Total Reviews"
                    value={8543}
                    icon={MessageSquare}
                    trend="+5% from last month"
                    trendUp={true}
                />
                <StatsCard
                    title="Average Rating"
                    value={4.6}
                    icon={Star}
                    trend="-0.1% from last month"
                    trendUp={false}
                />
            </div>

            {/* Main Content Area */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <RecentRestaurantsTable />
            </motion.div>
        </div>
    );
}
