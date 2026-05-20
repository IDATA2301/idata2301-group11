import type { TripCard } from "../types/Trip";
import { apiFetch } from "./apiFetch";

/**
 * Provides admin trip and trip-option API helpers.
 */
export type AdminTripDetails = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  destinationId: number | null;
  city: string;
  country: string;
  destinationImageUrl: string | null;
  destinationImageAlt: string | null;
  startDate: string;
  endDate: string;
  flightDuration: string;
  departureAirport: string;
  arrivalAirport: string;
  keywords: string[];
  hotelName: string;
  hotelType: string;
  hotelLocation: string;
  amenities: string;
  nights: number;
  latitude: number;
  longitude: number;
  active: boolean;
};

export type FlightOption = {
  id: number;
  provider: string;
  price: number;
  flightId: number | null;
  airline: string;
  departureCity: string;
  destinationCity: string;
  departureAirport: string;
  destinationAirport: string;
  flightDuration: string;
};

export type HotelOption = {
  id: number;
  provider: string;
  price: number;
  accommodationId: number | null;
  hotelName: string;
  hotelType: string;
  hotelCity: string;
  hotelLocation: string;
  amenities: string;
  nights: number;
  latitude: number;
  longitude: number;
};

export type FlightOptionInput = {
  flightId?: number;
  provider?: string;
  price?: number;
};

export type HotelOptionInput = {
  accommodationId?: number;
  provider?: string;
  price?: number;
};

export type DestinationUpdateInput = {
  city?: string;
  country?: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type DestinationDetails = {
  id: number;
  city: string;
  country: string;
  imageUrl: string | null;
  imageAlt: string | null;
};

export async function fetchAdminTrips(): Promise<TripCard[]> {
  const response = await apiFetch(`/admin/trips`);
  if (!response.ok) {
    throw new Error(`Failed to load trips (HTTP ${response.status})`);
  }
  return response.json();
}

export async function fetchAdminTripDetails(id: number): Promise<AdminTripDetails> {
  const response = await apiFetch(`/trips/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to load trip (HTTP ${response.status})`);
  }
  return response.json();
}

export type CreateTripRequest = {
  title: string;
  description?: string;
  imageUrl?: string;
  startDate?: string;
  endDate?: string;
  keywords?: string[];
  destinationId?: number;
};

export async function createAdminTrip(payload: CreateTripRequest): Promise<AdminTripDetails> {
  const response = await apiFetch("/admin/trips", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = `Failed to create trip (HTTP ${response.status})`;
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

export type UpdateAdminTripRequest = {
  title?: string;
  description?: string;
  imageUrl?: string;
  startDate?: string;
  endDate?: string;
  keywords?: string[];
};

export async function deleteAdminTrip(id: number): Promise<void> {
  const response = await apiFetch(`/admin/trips/${id}`, { method: "DELETE" });
  if (!response.ok && response.status !== 204) {
    let message = `Failed to delete trip (HTTP ${response.status})`;
    try {
      const data = await response.json();
      if (data?.message) message = data.message;
    } catch {
      // ignore
    }
    throw new Error(message);
  }
}

export async function updateAdminTrip(
  id: number,
  payload: UpdateAdminTripRequest,
): Promise<AdminTripDetails> {
  const response = await apiFetch(`/admin/trips/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  if (response.status === 404) {
    throw new Error("Trip not found.");
  }

  if (!response.ok) {
    throw new Error(`Failed to save trip (HTTP ${response.status})`);
  }

  return response.json();
}

export async function updateAdminDestination(
  destinationId: number,
  payload: DestinationUpdateInput,
): Promise<DestinationDetails> {
  const response = await apiFetch(`/admin/destinations/${destinationId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Failed to save destination (HTTP ${response.status})`);
  }
  return response.json();
}

async function readJson<T>(response: Response, action: string): Promise<T> {
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

export async function fetchFlightOptions(tripId: number): Promise<FlightOption[]> {
  const response = await apiFetch(`/admin/trips/${tripId}/flight-options`);
  return readJson(response, "load flight options");
}

export async function createFlightOption(
  tripId: number,
  payload: FlightOptionInput,
): Promise<FlightOption> {
  const response = await apiFetch(`/admin/trips/${tripId}/flight-options`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return readJson(response, "create flight option");
}

export async function updateFlightOption(
  tripId: number,
  tripPriceId: number,
  payload: FlightOptionInput,
): Promise<FlightOption> {
  const response = await apiFetch(`/admin/trips/${tripId}/flight-options/${tripPriceId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return readJson(response, "save flight option");
}

export async function deleteFlightOption(tripId: number, tripPriceId: number): Promise<void> {
  const response = await apiFetch(`/admin/trips/${tripId}/flight-options/${tripPriceId}`, {
    method: "DELETE",
  });
  if (!response.ok && response.status !== 204) {
    let message = `Failed to delete flight option (HTTP ${response.status})`;
    try {
      const data = await response.json();
      if (data?.message) message = data.message;
    } catch {
      // ignore
    }
    throw new Error(message);
  }
}

export async function fetchHotelOptions(tripId: number): Promise<HotelOption[]> {
  const response = await apiFetch(`/admin/trips/${tripId}/hotel-options`);
  return readJson(response, "load hotel options");
}

export async function createHotelOption(
  tripId: number,
  payload: HotelOptionInput,
): Promise<HotelOption> {
  const response = await apiFetch(`/admin/trips/${tripId}/hotel-options`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return readJson(response, "create hotel option");
}

export async function updateHotelOption(
  tripId: number,
  tripPriceId: number,
  payload: HotelOptionInput,
): Promise<HotelOption> {
  const response = await apiFetch(`/admin/trips/${tripId}/hotel-options/${tripPriceId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return readJson(response, "save hotel option");
}

export async function deleteHotelOption(tripId: number, tripPriceId: number): Promise<void> {
  const response = await apiFetch(`/admin/trips/${tripId}/hotel-options/${tripPriceId}`, {
    method: "DELETE",
  });
  if (!response.ok && response.status !== 204) {
    let message = `Failed to delete hotel option (HTTP ${response.status})`;
    try {
      const data = await response.json();
      if (data?.message) message = data.message;
    } catch {
      // ignore
    }
    throw new Error(message);
  }
}

type UploadKind = "trip" | "destination";

export async function uploadAdminImage(
  blob: Blob,
  kind: UploadKind,
  filename?: string,
): Promise<string> {
  const formData = new FormData();
  const uploadName = filename && filename.trim() ? filename.trim() : "upload.webp";
  formData.append("file", blob, uploadName);
  if (filename && filename.trim()) {
    formData.append("filename", filename.trim());
  }

  const path = kind === "trip" ? "/admin/uploads/trip-image" : "/admin/uploads/destination-image";
  const response = await apiFetch(path, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to upload image (HTTP ${response.status})`);
  }

  const data = (await response.json()) as { filename?: string };
  if (!data.filename) {
    throw new Error("Upload succeeded but server returned no filename.");
  }
  return data.filename;
}
