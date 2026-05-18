import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TripPayment.module.css";
import { useAuth } from "../../context/useAuth";
import { apiFetch } from "../../services/apiFetch";

interface ComparisonOption {
  id: number;
  provider: string;
  price: number;
  airline?: string;
}

interface TripPaymentProps {
  selectedFlight: ComparisonOption | null;
  selectedHotel: ComparisonOption | null;
  tripId: number;
}

export default function TripPayment({ selectedFlight, selectedHotel, tripId }: TripPaymentProps) {
  const [showCheckmark, setShowCheckmark] = useState(false);
  const navigate = useNavigate();
  const { authUser } = useAuth();

  const isReadyForPayment = selectedFlight !== null && selectedHotel !== null;
  const isLoggedIn = !!authUser;

  const handlePayment = async () => {
    setShowCheckmark(true);

    if (!authUser || !selectedFlight || !selectedHotel) {
      console.error("Missing required data for booking");
      return;
    }

      try {
        await apiFetch("/orders", {
          method: "POST",
          body: JSON.stringify({
            tripId,
            flightPriceId: selectedFlight.id,
            accommodationPriceId: selectedHotel.id,
          })
        });

      setTimeout(() => {
        navigate("/payment-receipt");
      }, 1500);

      console.log("BOOKING DATA:", {
        tripId,
        selectedFlight,
        selectedHotel,
      });

      } catch (err) {
        console.error("Failed to add booking:", err);
      }
    };

  return (
    <section className={styles.paymentSection}>
      {isReadyForPayment && (
        <>
          {!isLoggedIn ? (
            <Link to="/login" className={styles.btn}>
               Log in to continue
            </Link>
        ) : showCheckmark ? (
          <div className={styles.statusWrap}>
            <CheckBadgeIcon className={styles.checkmark} aria-hidden="true" />
            <p className={styles.pendingText}>Payment pending...</p>
          </div>
        ) : (
          <button className={styles.btn} onClick={handlePayment}>
            Proceed to Payment
          </button>
        )}
      </>
      )}
    </section>
  );
}
