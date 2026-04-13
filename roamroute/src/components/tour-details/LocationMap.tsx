import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import styles from "./LocationMap.module.css";

type LocationMapProps = {
  hasValidCoordinates: boolean;
  position: [number, number];
  hotelName: string;
};

export default function LocationMap({ hasValidCoordinates, position, hotelName }: LocationMapProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Location</h2>
      {hasValidCoordinates ? (
        <MapContainer center={position} zoom={13} scrollWheelZoom={true} className={styles.map}>
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={position}>
            <Popup>{hotelName}</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Location is not available for this trip.</p>
      )}
    </section>
  );
}
