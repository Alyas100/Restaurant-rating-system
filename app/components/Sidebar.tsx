"use client";

import { clsx } from "clsx";
import { motion } from "framer-motion";
import { LayoutDashboard, Settings, Star, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    name: "Restaurants",
    href: "/dashboard/restaurants",
    icon: UtensilsCrossed,
  },
  { name: "Reviews", href: "/dashboard/reviews", icon: Star },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  const router = useRouter(); // ← Initialize router

  // Function to handle restaurant click
  const handleRestaurantsClick = () => {
    router.push("/restaurants");
  };

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed left-0 top-0 h-screen w-64 glass-sidebar z-50 flex flex-col p-6"
    >
      <div className="mb-10 flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500" />
        <span className="text-xl font-bold tracking-tight text-white">
          GlassAdmin
        </span>
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;

          // SPECIAL CASE for Restaurants button
          if (item.name === "Restaurants") {
            return (
              <button
                key={item.href}
                onClick={handleRestaurantsClick} // ← ADD THIS!
                className={clsx(
                  "relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors w-full text-left",
                  isActive
                    ? "text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 shadow-lg"
                  />
                )}
                <item.icon className="relative z-10 h-5 w-5" />
                <span className="relative z-10">{item.name}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                isActive ? "text-white" : "text-white/60 hover:text-white"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activePill"
                  className="absolute inset-0 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 shadow-lg"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className="relative z-10 h-5 w-5" />
              <span className="relative z-10">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div className="rounded-xl bg-white/5 p-4 border border-white/10">
          <p className="text-xs text-white/50">Logged in as</p>
          <p className="text-sm font-medium text-white">Admin User</p>
        </div>
      </div>
    </motion.aside>
  );
}
