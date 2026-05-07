import type { AdminUserBookings } from "../../types/AdminUserBookings";
import BaseCard from "../ui/BaseCard";
import StatusBadge from "../ui/StatusBadge";
import styles from "./AdminBookingCard.module.css";

type AdminBookingCardProps = {
  booking: AdminUserBookings;
};

function formatDate(date: string) {
  return date.split("T")[0]; // Simple YYYY-MM-DD format
}

export default function AdminBookingCard({ booking }: AdminBookingCardProps) {
  return (
    <BaseCard className={styles.card}>
      <p>
        <strong>Order ID:</strong> {booking.id}
      </p>
      <p>
        <strong>Trip Name:</strong> {booking.title}
      </p>
      <p>
        <strong>Flight:</strong> {booking.airline}
      </p>
      <p>
        <strong>Hotel:</strong> {booking.hotelName}
      </p>
      <p>
        <strong>Price:</strong> ${booking.totalPrice}
      </p>
      <p>
        <strong>Date:</strong> {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
      </p>
      <p>
        <strong>Status:</strong> <StatusBadge status={booking.status} />
      </p>
    </BaseCard>
  );
}
