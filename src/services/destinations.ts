import { apiFetch } from "./apiFetch";

export type Destination = {
  id: number;
  city: string;
  country: string;
};

export async function fetchDestinations(): Promise<Destination[]> {
  const response = await apiFetch(`/destinations`);
  if (!response.ok) {
    throw new Error(`Failed to load destinations (HTTP ${response.status})`);
  }
  return response.json();
}
