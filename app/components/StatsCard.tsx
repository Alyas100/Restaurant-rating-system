"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
}

export default function StatsCard({ title, value, icon: Icon, trend, trendUp }: StatsCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="glass-panel rounded-2xl p-6 relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon className="w-24 h-24" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-lg bg-white/10">
                        <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-sm font-medium text-white/70">{title}</h3>
                </div>

                <div className="text-4xl font-bold text-white mb-2">
                    <CountUp end={value} duration={2.5} separator="," />
                </div>

                {trend && (
                    <div className={`text-xs font-medium ${trendUp ? "text-emerald-400" : "text-rose-400"}`}>
                        {trend}
                    </div>
                )}
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </motion.div>
    );
}
