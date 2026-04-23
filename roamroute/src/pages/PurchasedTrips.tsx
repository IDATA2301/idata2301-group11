import React, { useEffect, useState } from 'react'
import styles from './PurchasedTrips.module.css'
import { useAuth } from '../context/useAuth'
import type { Booking } from '../data/userBookings'
import { userBookings } from '../data/userBookings'

const PurchasedTrips: React.FC = () => {
  const { authUser } = useAuth()
  const [purchases, setPurchases] = useState<Booking[]>([])

  useEffect(() => {
    if (!authUser) {
      setPurchases([])
      return
    }

    const my = userBookings.filter((b) => b.user_id === authUser.id)
    setPurchases(my)
  }, [authUser])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Purchased Trips</h1>
      {purchases.length === 0 ? (
        <p className={styles.empty}>You haven't purchased any trips yet.</p>
      ) : (
        <ul className={styles.list}>
          {purchases.map((trip) => (
            <li key={trip.order_id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h2 className={styles.tripTitle}>{trip.trip_name}</h2>
                <span className={styles.price}>kr {trip.price}</span>
              </div>
              <p className={styles.meta}>{trip.date} — {trip.flight} / {trip.hotel}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default PurchasedTrips
