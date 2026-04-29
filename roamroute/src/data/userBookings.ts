export interface Booking {
  order_id: string;
  user_id: number;
  trip_name: string;
  flight: string;
  hotel: string;
  airline?: string;
  hotelName?: string;
  nights?: number;
  imageUrl?: string;
  date: string;
  price: number;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
}

export const userBookings: Booking[] = [];
try {
  if (typeof localStorage !== "undefined") {
    const stored = localStorage.getItem("userBookings");
    if (stored) {
      const parsed = JSON.parse(stored) as Booking[];
      if (Array.isArray(parsed)) {
        userBookings.length = 0;
        parsed.forEach((b) => userBookings.push(b));
      }
    }
  }
} catch (err) {
  // ignore storage errors
}

export function addBooking(booking: Booking) {
  userBookings.push(booking);
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("userBookings", JSON.stringify(userBookings));
    }
  } catch (err) {
    // ignore storage errors
  }
}

export function removeBooking(order_id: string) {
  const idx = userBookings.findIndex((b) => b.order_id === order_id);
  if (idx !== -1) userBookings.splice(idx, 1);
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("userBookings", JSON.stringify(userBookings));
    }
  } catch (err) {
    // ignore storage errors
  }
}
