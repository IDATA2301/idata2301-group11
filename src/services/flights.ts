import { apiFetch } from "./apiFetch";

/**
 * Provides admin flight API helpers.
 */
export type Flight = {
  id: number;
  airline: string;
  departureCity: string;
  destinationCity: string;
  departureAirport: string;
  destinationAirport: string;
  flightDuration: string;
};

export type FlightInput = Omit<Flight, "id">;

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

export async function fetchFlights(): Promise<Flight[]> {
  const response = await apiFetch(`/admin/flights`);
  return parseJsonOrThrow(response, "load flights");
}

export async function fetchFlight(id: number): Promise<Flight> {
  const response = await apiFetch(`/admin/flights/${id}`);
  return parseJsonOrThrow(response, "load flight");
}

export async function createFlight(input: FlightInput): Promise<Flight> {
  const response = await apiFetch(`/admin/flights`, {
    method: "POST",
    body: JSON.stringify(input),
  });
  return parseJsonOrThrow(response, "create flight");
}

export async function updateFlight(id: number, input: FlightInput): Promise<Flight> {
  const response = await apiFetch(`/admin/flights/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
  return parseJsonOrThrow(response, "save flight");
}

export async function deleteFlight(id: number): Promise<void> {
  const response = await apiFetch(`/admin/flights/${id}`, { method: "DELETE" });
  if (!response.ok && response.status !== 204) {
    let message = `Failed to delete flight (HTTP ${response.status})`;
    try {
      const data = await response.json();
      if (data?.message) message = data.message;
    } catch {
      // ignore
    }
    throw new Error(message);
  }
}
