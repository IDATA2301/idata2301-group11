import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../assets/styles/pages/admintripedit.css";
import FormField from "../components/forms/FormField";
import TextInput from "../components/forms/TextInput";
import EmptyState from "../components/ui/EmptyState";
import SectionHeader from "../components/ui/SectionHeader";
import { fetchAdminTripDetails, type AdminTripDetails } from "../services/adminTrips";

function toDateInputValue(value: string): string {
  if (!value) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

export default function AdminTripEdit() {
  const { id } = useParams();
  const tripId = Number(id);
  const [trip, setTrip] = useState<AdminTripDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!Number.isFinite(tripId)) {
      setError(`Invalid trip id: ${id}`);
      setLoading(false);
      return;
    }

    fetchAdminTripDetails(tripId)
      .then((data) => setTrip(data))
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load trip"))
      .finally(() => setLoading(false));
  }, [id, tripId]);

  if (loading) {
    return (
      <main className="admin-trip-edit">
        <p>Loading trip...</p>
      </main>
    );
  }

  if (error || !trip) {
    return (
      <main className="admin-trip-edit">
        <EmptyState
          title="Trip Not Found"
          message={error ?? `Could not find a trip with id ${id}.`}
          action={
            <Link to="/admin/trips" className="btn btn--ghost">
              Back to trips
            </Link>
          }
        />
      </main>
    );
  }

  return (
    <main className="admin-trip-edit">
      <SectionHeader
        title="Edit Trip"
        action={
          <Link to="/admin/trips" className="btn btn--ghost">
            Back to trips
          </Link>
        }
        className="admin-trip-edit__header"
      />

      <form className="admin-trip-edit__form" onSubmit={(event) => event.preventDefault()}>
        <section className="admin-trip-edit__group" aria-label="Trip basics">
          <h2 className="admin-trip-edit__group-title">Basics</h2>

          <FormField id="trip-title" label="Title">
            <TextInput id="trip-title" type="text" value={trip.title} disabled readOnly />
          </FormField>

          <FormField id="trip-description" label="Description">
            <TextInput
              as="textarea"
              id="trip-description"
              value={trip.description}
              disabled
              readOnly
              rows={5}
            />
          </FormField>

          <FormField id="trip-image" label="Image filename">
            <TextInput id="trip-image" type="text" value={trip.imageUrl} disabled readOnly />
          </FormField>

          <FormField id="trip-keywords" label="Keywords">
            <TextInput
              id="trip-keywords"
              type="text"
              value={trip.keywords?.join(", ") ?? ""}
              disabled
              readOnly
            />
          </FormField>
        </section>

        <section className="admin-trip-edit__group" aria-label="Location">
          <h2 className="admin-trip-edit__group-title">Location</h2>

          <div className="admin-trip-edit__row admin-trip-edit__row--two">
            <FormField id="trip-city" label="City">
              <TextInput id="trip-city" type="text" value={trip.city} disabled readOnly />
            </FormField>

            <FormField id="trip-country" label="Country">
              <TextInput id="trip-country" type="text" value={trip.country} disabled readOnly />
            </FormField>
          </div>

          <div className="admin-trip-edit__row admin-trip-edit__row--two">
            <FormField id="trip-latitude" label="Latitude">
              <TextInput
                id="trip-latitude"
                type="number"
                value={trip.latitude}
                disabled
                readOnly
                step="0.000001"
              />
            </FormField>

            <FormField id="trip-longitude" label="Longitude">
              <TextInput
                id="trip-longitude"
                type="number"
                value={trip.longitude}
                disabled
                readOnly
                step="0.000001"
              />
            </FormField>
          </div>
        </section>

        <section className="admin-trip-edit__group" aria-label="Dates">
          <h2 className="admin-trip-edit__group-title">Dates</h2>

          <div className="admin-trip-edit__row admin-trip-edit__row--two">
            <FormField id="trip-start-date" label="Start date">
              <TextInput
                id="trip-start-date"
                type="date"
                value={toDateInputValue(trip.startDate)}
                disabled
                readOnly
              />
            </FormField>

            <FormField id="trip-end-date" label="End date">
              <TextInput
                id="trip-end-date"
                type="date"
                value={toDateInputValue(trip.endDate)}
                disabled
                readOnly
              />
            </FormField>
          </div>
        </section>

        <section className="admin-trip-edit__group" aria-label="Flight">
          <h2 className="admin-trip-edit__group-title">Flight</h2>

          <div className="admin-trip-edit__row admin-trip-edit__row--three">
            <FormField id="trip-departure" label="Departure airport">
              <TextInput
                id="trip-departure"
                type="text"
                value={trip.departureAirport}
                disabled
                readOnly
              />
            </FormField>

            <FormField id="trip-arrival" label="Arrival airport">
              <TextInput
                id="trip-arrival"
                type="text"
                value={trip.arrivalAirport}
                disabled
                readOnly
              />
            </FormField>

            <FormField id="trip-flight-duration" label="Flight duration">
              <TextInput
                id="trip-flight-duration"
                type="text"
                value={trip.flightDuration}
                disabled
                readOnly
              />
            </FormField>
          </div>
        </section>

        <section className="admin-trip-edit__group" aria-label="Hotel">
          <h2 className="admin-trip-edit__group-title">Hotel</h2>

          <div className="admin-trip-edit__row admin-trip-edit__row--two">
            <FormField id="trip-hotel-name" label="Hotel name">
              <TextInput id="trip-hotel-name" type="text" value={trip.hotelName} disabled readOnly />
            </FormField>

            <FormField id="trip-hotel-type" label="Hotel type">
              <TextInput id="trip-hotel-type" type="text" value={trip.hotelType} disabled readOnly />
            </FormField>
          </div>

          <FormField id="trip-hotel-location" label="Hotel location">
            <TextInput
              id="trip-hotel-location"
              type="text"
              value={trip.hotelLocation}
              disabled
              readOnly
            />
          </FormField>

          <div className="admin-trip-edit__row admin-trip-edit__row--two">
            <FormField id="trip-nights" label="Nights">
              <TextInput id="trip-nights" type="number" value={trip.nights} disabled readOnly />
            </FormField>

            <FormField id="trip-amenities" label="Amenities">
              <TextInput
                id="trip-amenities"
                type="text"
                value={trip.amenities}
                disabled
                readOnly
              />
            </FormField>
          </div>
        </section>

        <div className="admin-trip-edit__actions">
          <button type="submit" className="btn" disabled>
            Save changes
          </button>
        </div>
      </form>
    </main>
  );
}
