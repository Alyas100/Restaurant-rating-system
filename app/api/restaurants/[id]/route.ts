import { fetchRestaurantById } from "@/utils/supabase/restaurant";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: restaurantId } = await params;

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
