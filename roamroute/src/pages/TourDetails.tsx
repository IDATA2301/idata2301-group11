import "../assets/styles/pages/tourdetails.css";
import {
  PaperAirplaneIcon,
  CurrencyDollarIcon,
  InformationCircleIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";


export default function TourDetails() {
  const { id } = useParams();
  const [trip, setTrip] = useState<any>(null);
  const [selectedFlightId, setSelectedFlightId] = useState<number | null>(null);
  const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/trips/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load trip details (${res.status})`);
        }
        return res.json();
      })
      .then((data) => setTrip(data))
      .catch((err) => {
        console.error("Error fetching trip details:", err);
        setError("Could not load trip details.");
      });
  }, [id]);

  useEffect(() => {
    if (trip) {
      if (trip.flightOptions.length > 0) {
        setSelectedFlightId(trip.flightOptions[0].id);
      }
      if (trip.hotelOptions.length > 0) {
        setSelectedHotelId(trip.hotelOptions[0].id);
      }
    }
  }, [trip]);

  if (error) return <p>{error}</p>;
  if (!trip) return <p>Loading...</p>;

  const latitude = Number(trip.latitude);
  const longitude = Number(trip.longitude);
  const hasValidCoordinates = Number.isFinite(latitude) && Number.isFinite(longitude);
  const position: [number, number] = [latitude, longitude];

  return (
    <main>
      <section className="TourHeader"
      style={{ backgroundImage: `url(/images/${trip.imageUrl})` }}>
        <h1>{trip.title}</h1>
        <p>{trip.startDate} - {trip.endDate}</p>
      </section>

      <nav className="Breadcrumb">
        <p>Home {">"} Trips {">"} {trip.city}, {trip.country}</p>
      </nav>

      <section className="TourTabs">
        <button>Overview</button>
        <button>Accomodation</button>
        <button>Itinerary</button>
      </section>

      <section className="TripOverview">
        <h2>
          <InformationCircleIcon
            className="InfoIcon InfoIcon--info"
            aria-hidden="true"
          />
          Trip Overview
        </h2>
        <div className="TripOverviewContent">
          <p>
            {trip.trip_description}
          </p>
          <div>
            <div className="Keywords">
              {trip.keywords.map((keyword: string, index: number) => (
                <span key={index} className="keyword">
                  {keyword}
                </span>
              ))}
            </div>

            <div className="FlightInfo">
              <PaperAirplaneIcon
                className="InfoIcon InfoIcon--flight"
                aria-hidden="true"
              />
              <p>{trip.departureAirport} -{">"} {trip.arrivalAirport}</p>
              <strong>{trip.flightDuration}</strong>
            </div>

            <div className="BudgetInfo">
              <CurrencyDollarIcon
                className="InfoIcon InfoIcon--budget"
                aria-hidden="true"
              />
              <p>Budget</p>
              <strong>Economy</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="FlightComparison">
        <h2>
          <PaperAirplaneIcon 
          className="InfoIcon InfoIcon--flight" 
          aria-hidden="true" />
          Flight Price Comparison

        </h2>

        {trip.flightOptions.map((flight: any) => (
          <div
            key={flight.id}
            className={`FlightCard ${selectedFlightId === flight.id ? "selected" : ""}`}
          >
            <h3>
              {flight.provider}
              <span className = "FlightCompanyNote">
                Includes taxes & fees
              </span>
            </h3>

            <p>${flight.price}</p>

            <button onClick={() => setSelectedFlightId(flight.id)}>
              {selectedFlightId === flight.id ? "Selected" : "Select"}
            </button>
          </div>
        ))}
      </section>

      <section className="AccommodationSection">

        <h2>
          <HomeIcon className="InfoIcon InfoIcon--home" />
          Accommodation
        </h2>

        <div className="AccommodationCard">

          <h3>{trip.hotelName}</h3>

          <p>{trip.hotelType}</p>

          <p>{trip.hotelLocation}</p>

          <p>{trip.nights} nights</p>

          <p className="Amenities">
            {trip.amenities}
          </p>

        </div>

      </section>

      <section className="HotelComparison">
        <h2>
          Hotel Price Comparison
        </h2>

        {trip.hotelOptions.map((hotel: any) => (
          <div
            key={hotel.id}
            className={`HotelCard ${selectedHotelId === hotel.id ? "selected" : ""}`}
          >
            <h3>
              {hotel.provider}
              <span className = "HotelCompanyNote">
                Includes taxes & fees
              </span>
            </h3>

            <p>${hotel.price}</p>

            <button onClick={() => setSelectedHotelId(hotel.id)}>
              {selectedHotelId === hotel.id ? "Selected" : "Select"}
            </button>
          </div>
        ))}

      </section>

      <section className="LocationSection">
        <h2>Location</h2>
        {hasValidCoordinates ? (
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={true}
            className="Map"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={position}>
              <Popup>{trip.hotelName}</Popup>
            </Marker>
          </MapContainer>
        ) : (
          <p>Location is not available for this trip.</p>
        )}
      </section>    

    </main>
  );
}