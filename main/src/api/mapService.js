import { supabase } from "./supabaseClient";

export async function fetchDangerZones() {
  const { data, error } = await supabase
    .from("danger_zones")
    .select("*")
    .eq("is_active", true);

  if (error) throw error;
  return data;
}
