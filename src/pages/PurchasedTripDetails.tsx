import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from "./PurchasedTripDetails.module.css";
import { useAuth } from "../context/useAuth";
import { apiFetch } from "../services/apiFetch";
import { PaperAirplaneIcon, BuildingOffice2Icon } from "@heroicons/react/24/solid";

interface Trip {
  id: number
  title: string
  start_date: string
  end_date: string
  image_url?: string
}

interface Flight {
  id: number
  airline: string
  departure_city: string
  destination_city: string
  flight_duration?: string
}

interface Accommodation {
  id: number
  hotel_name: string
  nights: number
}

interface Order {
  id: number
  trip: Trip
  flight: Flight
  accommodation: Accommodation
  total_price: number
  status: string
  order_date: string
}

function toImageSrc(value?: string) {
  if (!value) return "/images/placeholder.jpg";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (value.startsWith("/")) return value;
  if (value.startsWith("images/")) return `/${value}`;
  return `/images/trip/${value}`;
}

export default function PurchasedTripDetails() {
  const { orderId } = useParams<{ orderId: string }>();
  const { authUser } = useAuth();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) return;
    setLoading(true);
    setError(null);
    apiFetch(`/orders/${orderId}`)
      .then((res) => res.json())
      .then((data: Order) => setBooking(data))
      .catch((err) => {
        console.error("Failed to fetch order:", err);
        setError("Order not found");
      })
      .finally(() => setLoading(false));
  }, [orderId]);

  if (!authUser) return <p>Please log in to view your bookings.</p>;
  if (loading) return <p>Loading...</p>;
  if (error || !booking) {
    return (
      <main className={styles.container}>
        <p>{error || "Booking not found."}</p>
        <Link to="/purchased-trips">Back to purchases</Link>
      </main>
    );
  }

  const handleCancel = () => {
    if (!confirm("Cancel this booking?")) return;
    apiFetch(`/orders/${booking.id}`, { method: "DELETE" })
      .then(() => navigate("/purchased-trips"))
      .catch((err) => {
        console.error("Failed to cancel booking:", err);
        alert("Failed to cancel booking");
      });
  };

  return (
    <main className={styles.container}>
      <div className={styles.topRow}>
        <div className={styles.titleWrap}>
          <h1 className={styles.title}>{booking.trip.title}</h1>
          <p className={styles.order}>Order: {booking.id}</p>
          <p className={styles.priceUnder}>$ {booking.total_price}</p>
        </div>
        <div className={styles.statusWrapTop}>
          <span className={styles.statusBadge}>{(() => {
            const raw = booking.status ? String(booking.status) : "";
            const cap = raw ? raw.charAt(0).toUpperCase() + raw.slice(1) : raw;
            return cap;
          })()}</span>
        </div>
      </div>

      <div className={styles.bigImageWrap}>
        {booking.trip.image_url ? (
          <img src={toImageSrc(booking.trip.image_url)} alt={booking.trip.title} className={styles.bigImage} />
        ) : null}
      </div>

      <section className={styles.boxes}>
        <div className={styles.box}>
          <div className={styles.boxIcon} aria-hidden>
            <PaperAirplaneIcon className={styles.heroIcon} />
          </div>
          <div className={styles.boxBody}>
            <h3 className={styles.boxTitle}>Flight</h3>
            <p className={styles.boxLine}><strong>Carrier:</strong> {booking.flight.airline}</p>
            <p className={styles.boxLine}><strong>Route:</strong> {booking.flight.departure_city} → {booking.flight.destination_city}</p>
          </div>
        </div>

        <div className={styles.box}>
          <div className={styles.boxIcon} aria-hidden>
            <BuildingOffice2Icon className={styles.heroIcon} />
          </div>
          <div className={styles.boxBody}>
            <h3 className={styles.boxTitle}>Accommodation</h3>
            <p className={styles.boxLine}><strong>Hotel:</strong> {booking.accommodation.hotel_name}</p>
            <p className={styles.boxLine}><strong>Nights:</strong> {booking.accommodation.nights}</p>
          </div>
        </div>
      </section>

      <div className={styles.actions}>
        <button className={`${styles.btn} ${styles.ghost}`} onClick={handleCancel}>Cancel booking</button>
      </div>
    </main>
  );
}
