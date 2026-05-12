import { Link } from 'react-router-dom';
import '../assets/styles/components/button.css';

export default function PaymentReceipt() {
  return (
    <main>
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Payment Receipt</h1>
        <p>Your booking has been confirmed! Check your profile to view the trip details.</p>
        <Link
          to="/purchased-trips"
          className="btn btn--accent"
        >
          Go to Purchased Trips
        </Link>
      </div>
    </main>
  );
}
