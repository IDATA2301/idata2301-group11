import type { TripCard } from "../types/Trip";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchAdminTrips(): Promise<TripCard[]> {
  const response = await fetch(`${API_BASE_URL}/api/trips/search`);
  if (!response.ok) {
    throw new Error(`Failed to load trips (HTTP ${response.status})`);
  }
  return response.json();
}
