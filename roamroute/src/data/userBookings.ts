export interface Booking {
  order_id: string;
  user_id: number;
  trip_name: string;
  flight: string;
  hotel: string;
  date: string;
  price: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

export const userBookings: Booking[] = [
  {
    order_id: "ORD-001",
    user_id: 1,
    trip_name: "Barcelona Summer Escape",
    flight: "SK456",
    hotel: "Hotel Barcelona",
    price: 450,
    date: "2026-06-15",
    status: "confirmed",
  },
  {
    order_id: "ORD-002",
    user_id: 1,
    trip_name: "Paris City Tour",
    flight: "BA789",
    hotel: "Hotel Paris",
    price: 520,
    date: "2026-07-10",
    status: "pending",
  },
  {
    order_id: "ORD-003",
    user_id: 2,
    trip_name: "Tokyo Adventure",
    flight: "NH101",
    hotel: "Hotel Tokyo",
    price: 680,
    date: "2026-08-20",
    status: "completed",
  },
  {
    order_id: "ORD-004",
    user_id: 2,
    trip_name: "Dublin Heritage Tour",
    flight: "EI456",
    hotel: "Hotel Dublin",
    price: 380,
    date: "2026-09-05",
    status: "confirmed",
  },
];
