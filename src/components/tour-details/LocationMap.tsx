import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import styles from "./LocationMap.module.css";

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

/** Props for the destination location map. */
type LocationMapProps = {
  hasValidCoordinates: boolean;
  position: [number, number];
  hotelName: string;
};

/** Map section showing the trip location or a fallback message. */
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
