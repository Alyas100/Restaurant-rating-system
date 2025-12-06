import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const foursquareApiKey = process.env.FOURSQUARE_API_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

interface Restaurant {
  name: string;
  category: string;
  emoji: string;
  description: string;
  rating: number;
  reviews: number;
  address: string;
  lat?: number;
  lng?: number;
}

// Map Foursquare categories to emojis
const categoryEmojis: { [key: string]: string } = {
  italian: "🍝",
  indian: "🍛",
  japanese: "🍣",
  korean: "🥢",
  mexican: "🌮",
  burger: "🍔",
  pizza: "🍕",
  chinese: "🥡",
  thai: "🍜",
  french: "🥐",
  american: "🍔",
  seafood: "🦞",
  vegetarian: "🥗",
  vegan: "🌱",
};

function getEmoji(category: string): string {
  const lowerCategory = category.toLowerCase();
  for (const [key, emoji] of Object.entries(categoryEmojis)) {
    if (lowerCategory.includes(key)) {
      return emoji;
    }
  }
  return "🍽️"; // Default emoji
}

async function fetchRestaurantsFromFoursquare(
  city: string,
  limit: number = 20
): Promise<Restaurant[]> {
  try {
    console.log(`🔍 Fetching restaurants from ${city}...`);

    // Foursquare Places API endpoint
    const foursquareUrl = `https://places-api.foursquare.com/places/search?categories=13065,13032,13377&near=${encodeURIComponent(
      city
    )}&limit=${limit}`;

    const response = await fetch(foursquareUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${foursquareApiKey}`,
        "X-Places-Api-Version": "2025-06-17",
      },
    });

    if (!response.ok) {
      throw new Error(`Foursquare API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`✅ Found ${data.results?.length || 0} restaurants`);

    if (!data.results || data.results.length === 0) {
      console.warn(`⚠️ No restaurants found in ${city}`);
      return [];
    }

    // Transform Foursquare data to our format
    const restaurants: Restaurant[] = data.results.map(
      (place: any, index: number) => {
        const category = place.categories?.[0]?.name || "Restaurant";
        const emoji = getEmoji(category);
        const rating = place.rating || 4.0;
        const lat = place.location?.latitude;
        const lng = place.location?.longitude;
        const address =
          place.location?.formatted_address ||
          `${place.location?.address || ""}, ${city}`;

        return {
          name: place.name,
          category,
          emoji,
          description: `Popular ${category.toLowerCase()} spot in ${city}. Discover great food and ambiance.`,
          rating: typeof rating === "string" ? parseFloat(rating) : rating,
          reviews: Math.floor(Math.random() * 200) + 20, // Mock review count
          address,
          lat,
          lng,
        };
      }
    );

    return restaurants;
  } catch (error) {
    console.error("❌ Error fetching from Foursquare:", error);
    throw error;
  }
}

async function seedRestaurants() {
  try {
    console.log("🌱 Starting restaurant seeding...\n");

    // Fetch restaurants from multiple cities
    const cities = ["New York", "San Francisco", "Los Angeles"];
    let allRestaurants: Restaurant[] = [];

    for (const city of cities) {
      const restaurants = await fetchRestaurantsFromFoursquare(city, 10);
      allRestaurants = [...allRestaurants, ...restaurants];
      console.log(`✅ Added ${restaurants.length} restaurants from ${city}\n`);

      // Add delay to respect API rate limits
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    // Remove duplicates by name
    const uniqueRestaurants = Array.from(
      new Map(allRestaurants.map((r) => [r.name, r])).values()
    );

    console.log(`\n📊 Total unique restaurants: ${uniqueRestaurants.length}`);
    console.log("💾 Inserting into Supabase...\n");

    // Insert into Supabase
    const { data, error } = await supabase
      .from("restaurants")
      .insert(uniqueRestaurants);

    if (error) {
      console.error("❌ Error inserting into Supabase:", error);
      return;
    }

    console.log("\n🎉 Seeding complete!");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seedRestaurants();
