import { apiFetch } from "./apiFetch";

/**
 * Provides public destination API helpers.
 */
export type Destination = {
  id: number;
  city: string;
  country: string;
  image_url?: string;
  image_alt?: string;
};

export async function fetchDestinations(): Promise<Destination[]> {
  const response = await apiFetch(`/destinations`);
  if (!response.ok) {
    throw new Error(`Failed to load destinations (HTTP ${response.status})`);
  }
  return response.json();
}
