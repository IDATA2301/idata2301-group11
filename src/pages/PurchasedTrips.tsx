import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './PurchasedTrips.module.css'
import { useAuth } from '../context/useAuth'
import { apiFetch } from '../services/apiFetch'
import { getTripImageUrl } from '../utils/imageUrls'

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

function formatDate(dateString: string): string {
  if (!dateString) return ""
  return dateString.includes("T") ? dateString.split("T")[0] : dateString
}

/**
 * Renders the user's purchased trips overview.
 */
const PurchasedTrips: React.FC = () => {
  const { authUser } = useAuth()
  const [purchases, setPurchases] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!authUser) {
      setPurchases([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    apiFetch('/orders')
      .then((res) => res.json())
      .then((data: Order[]) => {
        setPurchases(Array.isArray(data) ? data : [])
      })
      .catch((err) => {
        console.error('Failed to fetch orders:', err)
        setError('Failed to load your trips')
      })
      .finally(() => setLoading(false))
  }, [authUser])

  if (loading) return <div className={styles.container}><p>Loading...</p></div>
  if (error) return <div className={styles.container}><p className={styles.empty}>{error}</p></div>

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Purchased Trips</h1>
      {purchases.length === 0 ? (
        <p className={styles.empty}>You haven't purchased any trips yet.</p>
      ) : (
        <ul className={styles.list}>
          {purchases.map((order) => (
            <li key={order.id} className={styles.card}>
              <Link to={`/purchased-trips/${order.id}`} className={styles.cardLink}>
                <img src={getTripImageUrl(order.trip.image_url)} alt={order.trip.title} className={styles.thumb} />

                <div className={styles.cardBody}>
                  <div className={styles.cardHeader}>
                    <h2 className={styles.tripTitle}>{order.trip.title}</h2>
                    <span className={styles.price}>$ {order.total_price}</span>
                  </div>
                  <p className={styles.meta}>{formatDate(order.trip.start_date)} — {order.flight.airline} / {order.accommodation.hotel_name}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default PurchasedTrips
