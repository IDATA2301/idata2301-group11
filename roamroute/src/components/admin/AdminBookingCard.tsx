import type { Booking } from "../../data/userBookings";
import BaseCard from "../ui/BaseCard";
import StatusBadge from "../ui/StatusBadge";
import styles from "./AdminBookingCard.module.css";

type AdminBookingCardProps = {
  booking: Booking;
};

export default function AdminBookingCard({ booking }: AdminBookingCardProps) {
  return (
    <BaseCard className={styles.card}>
      <p>
        <strong>Order ID:</strong> {booking.order_id}
      </p>
      <p>
        <strong>Trip Name:</strong> {booking.trip_name}
      </p>
      <p>
        <strong>Flight:</strong> {booking.flight}
      </p>
      <p>
        <strong>Hotel:</strong> {booking.hotel}
      </p>
      <p>
        <strong>Price:</strong> ${booking.price}
      </p>
      <p>
        <strong>Date:</strong> {booking.date}
      </p>
      <p>
        <strong>Status:</strong> <StatusBadge status={booking.status} />
      </p>
    </BaseCard>
  );
}
