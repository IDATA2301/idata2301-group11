/**
 * Describes the admin bookings summary shape.
 */
export type AdminUserBookings = {
  id: number;
  title: string;
  airline: string | null;
  hotelName: string | null;
  totalPrice: number;
  startDate: string;
  endDate: string;
  status: string;
  tripId: number;
  flightId: number | null;
  accommodationId: number | null;
};
