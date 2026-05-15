import { apiFetch } from "./apiFetch";

export type Accommodation = {
  id: number;
  hotelName: string;
  hotelType: string;
  hotelCity: string;
  hotelLocation: string;
  amenities: string;
  nights: number;
  latitude: number;
  longitude: number;
};

export type AccommodationInput = Omit<Accommodation, "id">;

async function parseJsonOrThrow<T>(response: Response, action: string): Promise<T> {
  if (response.status === 204) return undefined as unknown as T;
  if (!response.ok) {
    let message = `Failed to ${action} (HTTP ${response.status})`;
    try {
      const data = await response.json();
      if (data?.message) message = data.message;
    } catch {
      // ignore
    }
    throw new Error(message);
  }
  return response.json();
}

export async function fetchAccommodations(): Promise<Accommodation[]> {
  const response = await apiFetch(`/admin/accommodations`);
  return parseJsonOrThrow(response, "load accommodations");
}

export async function fetchAccommodation(id: number): Promise<Accommodation> {
  const response = await apiFetch(`/admin/accommodations/${id}`);
  return parseJsonOrThrow(response, "load accommodation");
}

export async function createAccommodation(input: AccommodationInput): Promise<Accommodation> {
  const response = await apiFetch(`/admin/accommodations`, {
    method: "POST",
    body: JSON.stringify(input),
  });
  return parseJsonOrThrow(response, "create accommodation");
}

export async function updateAccommodation(id: number, input: AccommodationInput): Promise<Accommodation> {
  const response = await apiFetch(`/admin/accommodations/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
  return parseJsonOrThrow(response, "save accommodation");
}

export async function deleteAccommodation(id: number): Promise<void> {
  const response = await apiFetch(`/admin/accommodations/${id}`, { method: "DELETE" });
  if (!response.ok && response.status !== 204) {
    let message = `Failed to delete accommodation (HTTP ${response.status})`;
    try {
      const data = await response.json();
      if (data?.message) message = data.message;
    } catch {
      // ignore
    }
    throw new Error(message);
  }
}
