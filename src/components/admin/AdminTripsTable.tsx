import BaseCard from "../ui/BaseCard";
import styles from "./AdminTripsTable.module.css";

/** Row data shown in the admin trips table. */
export type AdminTripRow = {
  id: number;
  title: string;
  city: string;
  country: string;
  lowestPrice: number;
  startDate: string;
  endDate: string;
};

type AdminTripsTableProps = {
  trips: AdminTripRow[];
  onRowClick: (id: number) => void;
};

/** Desktop trips table for the admin trips overview. */
export default function AdminTripsTable({ trips, onRowClick }: AdminTripsTableProps) {
  return (
    <BaseCard as="section" className={styles.tableWrap} aria-label="Trips table">
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Destination</th>
            <th>Start</th>
            <th>End</th>
            <th>From</th>
          </tr>
        </thead>

        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id} className={styles.row} onClick={() => onRowClick(trip.id)}>
              <td>{trip.id}</td>
              <td>{trip.title}</td>
              <td>{trip.city}, {trip.country}</td>
              <td>{trip.startDate}</td>
              <td>{trip.endDate}</td>
              <td>${trip.lowestPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </BaseCard>
  );
}
