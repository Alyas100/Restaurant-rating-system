import { createClient } from "./server";

export async function fetchAllRestaurants() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("restaurants").select("*");

  if (error) throw error;
  return data;
}

export async function fetchRestaurantById(id: string | number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}
