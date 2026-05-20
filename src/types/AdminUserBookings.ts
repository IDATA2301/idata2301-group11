/**
 * Describes the admin bookings summary shape.
 */
export type AdminUserBookings = {
  id: string;
  title: string;
  airline: string;
  hotelName: string;
  totalPrice: number;
  startDate: string;
  endDate: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
};
