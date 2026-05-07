import { useEffect, useState, type SyntheticEvent } from "react";
import { Link, useParams } from "react-router-dom";
import "../assets/styles/pages/admintripedit.css";
import FormField from "../components/forms/FormField";
import TextInput from "../components/forms/TextInput";
import EmptyState from "../components/ui/EmptyState";
import SectionHeader from "../components/ui/SectionHeader";
import {
  fetchAdminTripDetails,
  updateAdminTrip,
  type AdminTripDetails,
} from "../services/adminTrips";

type EditableFields = {
  title: string;
  description: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  keywords: string;
};

function toDateInputValue(value: string): string {
  if (!value) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function toEditable(trip: AdminTripDetails): EditableFields {
  return {
    title: trip.title ?? "",
    description: trip.description ?? "",
    imageUrl: trip.imageUrl ?? "",
    startDate: toDateInputValue(trip.startDate),
    endDate: toDateInputValue(trip.endDate),
    keywords: trip.keywords?.join(", ") ?? "",
  };
}

export default function AdminTripEdit() {
  const { id } = useParams();
  const tripId = Number(id);
  const [trip, setTrip] = useState<AdminTripDetails | null>(null);
  const [form, setForm] = useState<EditableFields | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!Number.isFinite(tripId)) {
      setLoadError(`Invalid trip id: ${id}`);
      setLoading(false);
      return;
    }

    fetchAdminTripDetails(tripId)
      .then((data) => {
        setTrip(data);
        setForm(toEditable(data));
      })
      .catch((err) => setLoadError(err instanceof Error ? err.message : "Failed to load trip"))
      .finally(() => setLoading(false));
  }, [id, tripId]);

  if (loading) {
    return (
      <main className="admin-trip-edit">
        <p>Loading trip...</p>
      </main>
    );
  }

  if (loadError || !trip || !form) {
    return (
      <main className="admin-trip-edit">
        <EmptyState
          title="Trip Not Found"
          message={loadError ?? `Could not find a trip with id ${id}.`}
          action={
            <Link to="/admin/trips" className="btn btn--ghost">
              Back to trips
            </Link>
          }
        />
      </main>
    );
  }

  function updateField<K extends keyof EditableFields>(key: K, value: EditableFields[K]) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
    if (saveError) setSaveError(null);
    if (success) setSuccess(null);
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form) return;

    const title = form.title.trim();
    if (!title) {
      setSaveError("Title is required.");
      return;
    }

    if (form.startDate && form.endDate && form.startDate > form.endDate) {
      setSaveError("Start date must be on or before end date.");
      return;
    }

    const keywords = form.keywords
      .split(",")
      .map((keyword) => keyword.trim())
      .filter(Boolean);

    setSaving(true);
    setSaveError(null);
    setSuccess(null);

    try {
      const updated = await updateAdminTrip(tripId, {
        title,
        description: form.description,
        imageUrl: form.imageUrl,
        startDate: form.startDate || undefined,
        endDate: form.endDate || undefined,
        keywords,
      });
      setTrip(updated);
      setForm(toEditable(updated));
      setSuccess("Trip updated.");
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Failed to save trip.");
    } finally {
      setSaving(false);
    }
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

      <form className="admin-trip-edit__form" onSubmit={handleSubmit}>
        <section className="admin-trip-edit__group" aria-label="Trip basics">
          <h2 className="admin-trip-edit__group-title">Basics</h2>

          <FormField id="trip-title" label="Title">
            <TextInput
              id="trip-title"
              type="text"
              value={form.title}
              onChange={(event) => updateField("title", event.target.value)}
              disabled={saving}
              required
              maxLength={255}
            />
          </FormField>

          <FormField id="trip-description" label="Description">
            <TextInput
              as="textarea"
              id="trip-description"
              value={form.description}
              onChange={(event) => updateField("description", event.target.value)}
              disabled={saving}
              rows={5}
            />
          </FormField>

          <FormField id="trip-image" label="Image filename">
            <TextInput
              id="trip-image"
              type="text"
              value={form.imageUrl}
              onChange={(event) => updateField("imageUrl", event.target.value)}
              disabled={saving}
            />
          </FormField>

          <FormField id="trip-keywords" label="Keywords (comma separated)">
            <TextInput
              id="trip-keywords"
              type="text"
              value={form.keywords}
              onChange={(event) => updateField("keywords", event.target.value)}
              disabled={saving}
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
                value={form.startDate}
                onChange={(event) => updateField("startDate", event.target.value)}
                disabled={saving}
              />
            </FormField>

            <FormField id="trip-end-date" label="End date">
              <TextInput
                id="trip-end-date"
                type="date"
                value={form.endDate}
                onChange={(event) => updateField("endDate", event.target.value)}
                disabled={saving}
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

        {saveError ? (
          <p className="profile__message profile__message--error" role="alert">
            {saveError}
          </p>
        ) : null}
        {success ? <p className="profile__message profile__message--success">{success}</p> : null}

        <div className="admin-trip-edit__actions">
          <button type="submit" className="btn" disabled={saving}>
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </main>
  );
}
