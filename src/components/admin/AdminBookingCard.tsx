import type { AdminUserBookings } from "../../types/AdminUserBookings";
import BaseCard from "../ui/BaseCard";
import StatusBadge from "../ui/StatusBadge";
import styles from "./AdminBookingCard.module.css";

type AdminBookingCardProps = {
  booking: AdminUserBookings;
  onEdit: (booking: AdminUserBookings) => void;
  onDelete: (id: number) => void;
  deleting: boolean;
};

function formatDate(date: string) {
  return date.split("T")[0];
}

/** Card displaying a user booking summary for admin review. */
export default function AdminBookingCard({ booking, onEdit, onDelete, deleting }: AdminBookingCardProps) {
  return (
    <BaseCard className={styles.card}>
      <p><strong>Order ID:</strong> {booking.id}</p>
      <p><strong>Trip Name:</strong> {booking.title}</p>
      <p><strong>Flight:</strong> {booking.airline}</p>
      <p><strong>Hotel:</strong> {booking.hotelName}</p>
      <p><strong>Price:</strong> ${booking.totalPrice}</p>
      <p><strong>Date:</strong> {formatDate(booking.startDate)} - {formatDate(booking.endDate)}</p>
      <p><strong>Status:</strong> <StatusBadge status={booking.status} /></p>
      <div className={styles.actions}>
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => onEdit(booking)}
          disabled={deleting}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn--danger"
          onClick={() => onDelete(booking.id)}
          disabled={deleting}
        >
          Cancel booking
        </button>
      </div>
    </BaseCard>
  );
}
