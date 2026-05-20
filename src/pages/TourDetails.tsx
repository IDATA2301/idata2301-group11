import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AccommodationSummary from "../components/tour-details/AccommodationSummary";
import Breadcrumb from "../components/tour-details/Breadcrumb";
import LocationMap from "../components/tour-details/LocationMap";
import OptionComparisonCard from "../components/tour-details/OptionComparisonCard";
import Tabs from "../components/tour-details/Tabs";
import TourHeader from "../components/tour-details/TourHeader";
import TripOverview from "../components/tour-details/TripOverview";
import TripPayment from "../components/tour-details/TripPayment";
import { apiFetch } from "../services/apiFetch";
import styles from "./TourDetails.module.css";

type ComparisonOption = {
  id: number;
  provider: string;
  price: number;
  airline: string;
};

type TripDetailsResponse = {
  imageUrl: string;
  title: string;
  startDate: string;
  endDate: string;
  city: string;
  country: string;
  trip_description: string;
  keywords: string[];
  departureAirport: string;
  arrivalAirport: string;
  flightDuration: string;
  flightOptions: ComparisonOption[];
  hotelName: string;
  hotelType: string;
  hotelLocation: string;
  nights: number;
  amenities: string;
  hotelOptions: ComparisonOption[];
  latitude: number | string;
  longitude: number | string;
  airline: string;
};

export default function TourDetails() {
  const { id } = useParams();
  const [trip, setTrip] = useState<TripDetailsResponse | null>(null);
  const [selectedFlightId, setSelectedFlightId] = useState<number | null>(null);
  const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    apiFetch(`/trips/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load trip details (${res.status})`);
        }
        return res.json();
      })
      .then((data: TripDetailsResponse) => {
        setTrip(data);

        if (data.flightOptions.length > 0) {
          setSelectedFlightId(data.flightOptions[0].id);
        }

        if (data.hotelOptions.length > 0) {
          setSelectedHotelId(data.hotelOptions[0].id);
        }
      })
      .catch((err) => {
        console.error("Error fetching trip details:", err);
        setError("Could not load trip details.");
      });
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!trip) return <p>Loading...</p>;

  const latitude = Number(trip.latitude);
  const longitude = Number(trip.longitude);
  const hasValidCoordinates = Number.isFinite(latitude) && Number.isFinite(longitude);
  const position: [number, number] = [latitude, longitude];
  const isMobile = window.innerWidth < 768;

  return (
    <main>
      <TourHeader
        title={trip.title}
        startDate={trip.startDate}
        endDate={trip.endDate}
        imageUrl={trip.imageUrl}
      />

      <Breadcrumb city={trip.city} country={trip.country} />
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      {(!isMobile || activeTab === "overview") && (
        <TripOverview
          description={trip.trip_description}
          keywords={trip.keywords}
          departureAirport={trip.departureAirport}
          arrivalAirport={trip.arrivalAirport}
          flightDuration={trip.flightDuration}
          hotelName={trip.hotelName}
        />
      )}

      {(!isMobile || activeTab === "flights") && (
        <section className={styles.comparisonSection}>
          <h2 className={styles.comparisonTitle}>
            <PaperAirplaneIcon className={styles.flightIcon} aria-hidden="true" />
            Flight Price Comparison
          </h2>

          {trip.flightOptions.map((flight) => (
            <OptionComparisonCard
              key={flight.id}
              provider={flight.provider}
              price={flight.price}
              selected={selectedFlightId === flight.id}
              airline={flight.airline}
              onSelect={() => setSelectedFlightId(flight.id)}
            />
          ))}
        </section>
      )}

      {isMobile || activeTab === "hotels" && (
        <>
          <AccommodationSummary
            hotelName={trip.hotelName}
            hotelType={trip.hotelType}
            hotelLocation={trip.hotelLocation}
            nights={trip.nights}
            amenities={trip.amenities}
          />

         <section className={styles.comparisonSection}>
          <h2 className={styles.comparisonTitle}>Hotel Price Comparison</h2>

          {trip.hotelOptions.map((hotel) => (
            <OptionComparisonCard
              key={hotel.id}
              provider={hotel.provider}
              price={hotel.price}
              selected={selectedHotelId === hotel.id}
              onSelect={() => setSelectedHotelId(hotel.id)}
            />
          ))}
        </section>
        </>
      )}

      {/* find selected flight/hotel objects and pass to payment component */}
      {
        (() => {
          const flight = trip.flightOptions.find((f) => f.id === selectedFlightId) ?? null;
          const hotel = trip.hotelOptions.find((h) => h.id === selectedHotelId) ?? null;
          return (
            <TripPayment
              selectedFlight={flight}
              selectedHotel={hotel}
              tripId={Number(id)}
            />
          );
        })()
      }

      <LocationMap hasValidCoordinates={hasValidCoordinates} position={position} hotelName={trip.hotelName} />
    </main>
  );
}
