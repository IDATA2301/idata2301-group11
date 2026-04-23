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
};