import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TripPayment.module.css";
import { addBooking } from "../../data/userBookings";
import { useAuth } from "../../context/useAuth";

interface ComparisonOption {
  id: number;
  provider: string;
  price: number;
  airline?: string;
}

interface TripPaymentProps {
  selectedFlight: ComparisonOption | null;
  selectedHotel: ComparisonOption | null;
  tripTitle: string;
  tripDate: string;
  tripImageUrl?: string | null;
  hotelName?: string | null;
  nights?: number | null;
  tripAirline?: string | null;
}

export default function TripPayment({ selectedFlight, selectedHotel, tripTitle, tripDate, tripImageUrl, hotelName, nights, tripAirline }: TripPaymentProps) {
  const [showCheckmark, setShowCheckmark] = useState(false);
  const navigate = useNavigate();
  const { authUser } = useAuth();

  const isReadyForPayment = selectedFlight !== null && selectedHotel !== null;

  const handlePayment = () => {
    setShowCheckmark(true);

    if (authUser && selectedFlight && selectedHotel) {
      const orderId = `ORD-${Date.now().toString().slice(-6)}`;
      const booking = {
        order_id: orderId,
        user_id: authUser.id,
        trip_name: tripTitle,
      flight: (selectedFlight as ComparisonOption).provider,
      airline: (selectedFlight as ComparisonOption).airline || tripAirline || undefined,
        hotel: selectedHotel.provider,
        hotelName: hotelName || undefined,
        nights: typeof nights === "number" ? nights : undefined,
        imageUrl: tripImageUrl,
        price: selectedFlight.price + selectedHotel.price,
        date: tripDate,
        status: "Confirmed" as const,
      };

      try {
        addBooking(booking as any);
      } catch (err) {
        // ignore for simulation
        console.error("Failed to add booking:", err);
      }
    }

    setTimeout(() => {
      navigate("/payment-receipt");
    }, 1500);
  };

  return (
    <section className={styles.paymentSection}>
      {isReadyForPayment && (
        <>
          {showCheckmark && (
            <div className={styles.statusWrap}>
              <CheckBadgeIcon className={styles.checkmark} aria-hidden="true" />
              <p className={styles.pendingText}>Payment pending...</p>
            </div>
          )}
          {!showCheckmark && (
            <button className={styles.btn} onClick={handlePayment}>
              Proceed to Payment
            </button>
          )}
        </>
      )}
    </section>
  );
}
