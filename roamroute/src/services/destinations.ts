export type Destination = {
  id: number;
  city: string;
  country: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchDestinations(): Promise<Destination[]> {
  const response = await fetch(`${API_BASE_URL}/api/destinations`);
  if (!response.ok) {
    throw new Error(`Failed to load destinations (HTTP ${response.status})`);
  }
  return response.json();
}
