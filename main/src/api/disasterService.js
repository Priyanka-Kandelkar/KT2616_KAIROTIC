import { supabase } from "./supabaseClient";

export async function fetchActiveDisaster() {
  return supabase
    .from("system_state")
    .select("*")
    .eq("is_active", true)
    .maybeSingle();
}

export async function activateDisaster(type, userId) {
  return supabase.from("system_state").insert({
    active_disaster_type: type,
    activated_by: userId,
    is_active: true,
  });
}

export async function deactivateDisaster() {
  return supabase
    .from("system_state")
    .update({ is_active: false })
    .eq("is_active", true);
}