// import { useEffect, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import styles from "./PurchasedTripDetails.module.css";
// import { useAuth } from "../context/useAuth";
// import { userBookings, removeBooking } from "../data/userBookings";
// import type { Booking } from "../data/userBookings";
// import { PaperAirplaneIcon, BuildingOffice2Icon } from "@heroicons/react/24/solid";

// function toImageSrc(value?: string) {
//   if (!value) return "/images/placeholder.jpg";
//   if (value.startsWith("http://") || value.startsWith("https://")) return value;
//   if (value.startsWith("/")) return value;
//   if (value.startsWith("images/")) return `/${value}`;
//   return `/images/trip/${value}`;
// }

// export default function PurchasedTripDetails() {
//   const { orderId } = useParams<{ orderId: string }>();
//   const { authUser } = useAuth();
//   const navigate = useNavigate();
//   const [booking, setBooking] = useState<Booking | null>(null);

//   useEffect(() => {
//     if (!orderId) return;
//     const found = userBookings.find((b) => b.order_id === orderId) ?? null;
//     setBooking(found);
//   }, [orderId]);

//   if (!authUser) return <p>Please log in to view your bookings.</p>;

//   if (!booking) {
//     return (
//       <main className={styles.container}>
//         <p>Booking not found.</p>
//         <Link to="/purchased-trips">Back to purchases</Link>
//       </main>
//     );
//   }

//   const handleCancel = () => {
//     if (!confirm("Cancel this booking?")) return;
//     removeBooking(booking.order_id);
//     navigate("/purchased-trips");
//   };

//   return (
//     <main className={styles.container}>
//       <div className={styles.topRow}>
//         <div className={styles.titleWrap}>
//           <h1 className={styles.title}>{booking.trip_name}</h1>
//           <p className={styles.order}>Order: {booking.order_id}</p>
//           <p className={styles.priceUnder}>$ {booking.price}</p>
//         </div>
//         <div className={styles.statusWrapTop}>
//           <span className={styles.statusBadge}>{(() => {
//             const raw = booking.status ? String(booking.status) : "";
//             const cap = raw ? raw.charAt(0).toUpperCase() + raw.slice(1) : raw;
//             return cap;
//           })()}</span>
//         </div>
//       </div>

//       <div className={styles.bigImageWrap}>
//         {booking.imageUrl ? (
//           // eslint-disable-next-line @next/next/no-img-element
//           <img src={toImageSrc(booking.imageUrl)} alt={booking.trip_name} className={styles.bigImage} />
//         ) : null}
//       </div>

//       <section className={styles.boxes}>
//         <div className={styles.box}>
//           <div className={styles.boxIcon} aria-hidden>
//             <PaperAirplaneIcon className={styles.heroIcon} />
//           </div>
//           <div className={styles.boxBody}>
//             <h3 className={styles.boxTitle}>Flight</h3>
//             <p className={styles.boxLine}><strong>Carrier:</strong> {booking.airline || booking.flight}</p>
//             <p className={styles.boxLine}><strong>Departure:</strong> {booking.date}</p>
//           </div>
//         </div>

//         <div className={styles.box}>
//           <div className={styles.boxIcon} aria-hidden>
//             <BuildingOffice2Icon className={styles.heroIcon} />
//           </div>
//           <div className={styles.boxBody}>
//             <h3 className={styles.boxTitle}>Accommodation</h3>
//             <p className={styles.boxLine}><strong>Hotel:</strong> {booking.hotelName || booking.hotel}</p>
//             <p className={styles.boxLine}><strong>Nights:</strong> {booking.nights ?? "—"}</p>
//           </div>
//         </div>
//       </section>

      

//       <div className={styles.actions}>
//         <button className={`${styles.btn} ${styles.ghost}`} onClick={handleCancel}>Cancel booking</button>
//       </div>
//     </main>
//   );
// }
