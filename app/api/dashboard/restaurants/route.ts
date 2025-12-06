import { fetchAllRestaurants } from "@/utils/supabase/restaurant";

export async function GET() {
  try {
    const restaurants = await fetchAllRestaurants();
    return Response.json(restaurants);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch restaurants" },
      { status: 500 }
    );
  }
}
