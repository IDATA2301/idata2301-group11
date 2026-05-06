import type { TripCard } from "../types/Trip";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type AdminTripDetails = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  city: string;
  country: string;
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
};

export async function fetchAdminTrips(): Promise<TripCard[]> {
  const response = await fetch(`${API_BASE_URL}/api/trips/search`);
  if (!response.ok) {
    throw new Error(`Failed to load trips (HTTP ${response.status})`);
  }
  return response.json();
}

export async function fetchAdminTripDetails(id: number): Promise<AdminTripDetails> {
  const response = await fetch(`${API_BASE_URL}/api/trips/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to load trip (HTTP ${response.status})`);
  }
  return response.json();
}
