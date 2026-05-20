/**
 * Shared trip card data used across listing views.
 */
export interface TripCard {
  id: number;
  imageUrl: string;
  title: string;
  city: string;
  country: string;
  lowestPrice: number;
  startDate: string;
  endDate: string;
  isFavorite: boolean;
  onRemoveFavorite?: (tripId: number) => void;
};