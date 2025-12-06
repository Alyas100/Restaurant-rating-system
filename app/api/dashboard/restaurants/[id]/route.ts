// GET single / PUT update / DELETE
import { fetchRestaurantById } from "@/utils/supabase/restaurant";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const restaurantId = params.id;

    if (!restaurantId) {
      return Response.json(
        { error: "Restaurant ID is required" },
        { status: 400 }
      );
    }

    const restaurant = await fetchRestaurantById(restaurantId);

    if (!restaurant) {
      return Response.json({ error: "Restaurant not found" }, { status: 404 });
    }

    return Response.json(restaurant);
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return Response.json(
      { error: "Failed to fetch restaurant" },
      { status: 500 }
    );
  }
}
