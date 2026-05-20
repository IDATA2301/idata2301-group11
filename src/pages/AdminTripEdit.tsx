import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../assets/styles/pages/admintripedit.css";
import AddFlightOption from "../components/admin/AddFlightOption";
import AddHotelOption from "../components/admin/AddHotelOption";
import FlightOptionCard from "../components/admin/FlightOptionCard";
import HotelOptionCard from "../components/admin/HotelOptionCard";
import FormField from "../components/forms/FormField";
import TextInput from "../components/forms/TextInput";
import EmptyState from "../components/ui/EmptyState";
import SectionHeader from "../components/ui/SectionHeader";
import {
  createFlightOption,
  createHotelOption,
  deleteAdminTrip,
  deleteFlightOption,
  deleteHotelOption,
  fetchAdminTripDetails,
  fetchFlightOptions,
  fetchHotelOptions,
  updateAdminDestination,
  updateAdminTrip,
  updateFlightOption,
  updateHotelOption,
  uploadAdminImage,
  type AdminTripDetails,
  type FlightOption,
  type FlightOptionInput,
  type HotelOption,
  type HotelOptionInput,
} from "../services/adminTrips";
import { getDestinationImageUrl, getTripImageUrl } from "../utils/imageUrls";
import { camelize, convertImageToWebp } from "../utils/imageConvert";
import { apiFetch } from "../services/apiFetch";

type EditableTripFields = {
  title: string;
  description: string;
  imageUrl: string;
  startDate: string;
  endDate: string;
  keywords: string;
  active: boolean;
};

type EditableDestinationFields = {
  city: string;
  country: string;
  imageUrl: string;
  imageAlt: string;
};

function toDateInputValue(value: string): string {
  if (!value) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}

function toTripFields(trip: AdminTripDetails): EditableTripFields {
  return {
    title: trip.title ?? "",
    description: trip.description ?? "",
    imageUrl: trip.imageUrl ?? "",
    startDate: toDateInputValue(trip.startDate),
    endDate: toDateInputValue(trip.endDate),
    keywords: trip.keywords?.join(", ") ?? "",
    active: trip.active,
  };
}

function toDestinationFields(trip: AdminTripDetails): EditableDestinationFields {
  return {
    city: trip.city ?? "",
    country: trip.country ?? "",
    imageUrl: trip.destinationImageUrl ?? "",
    imageAlt: trip.destinationImageAlt ?? "",
  };
}

export default function AdminTripEdit() {
  const { id } = useParams();
  const tripId = Number(id);
  const navigate = useNavigate();

  const [trip, setTrip] = useState<AdminTripDetails | null>(null);
  const [tripForm, setTripForm] = useState<EditableTripFields | null>(null);
  const [destinationForm, setDestinationForm] = useState<EditableDestinationFields | null>(null);
  const [flightOptions, setFlightOptions] = useState<FlightOption[]>([]);
  const [hotelOptions, setHotelOptions] = useState<HotelOption[]>([]);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [savingBasics, setSavingBasics] = useState(false);
  const [basicsError, setBasicsError] = useState<string | null>(null);
  const [basicsSuccess, setBasicsSuccess] = useState<string | null>(null);

  const [savingDestination, setSavingDestination] = useState(false);
  const [destinationError, setDestinationError] = useState<string | null>(null);
  const [destinationSuccess, setDestinationSuccess] = useState<string | null>(null);

  const [pendingTripImage, setPendingTripImage] = useState<Blob | null>(null);
  const [pendingTripImageName, setPendingTripImageName] = useState<string>("");
  const [pendingTripImagePreview, setPendingTripImagePreview] = useState<string | null>(null);
  const [previousTripImageUrl, setPreviousTripImageUrl] = useState<string>("");
  const [pendingDestImage, setPendingDestImage] = useState<Blob | null>(null);
  const [pendingDestImageName, setPendingDestImageName] = useState<string>("");
  const [pendingDestImagePreview, setPendingDestImagePreview] = useState<string | null>(null);
  const [previousDestImageUrl, setPreviousDestImageUrl] = useState<string>("");
  const [convertingTripImage, setConvertingTripImage] = useState(false);
  const [convertingDestImage, setConvertingDestImage] = useState(false);

  const [flightBusyId, setFlightBusyId] = useState<number | "new" | null>(null);
  const [hotelBusyId, setHotelBusyId] = useState<number | "new" | null>(null);
  const [showNewFlight, setShowNewFlight] = useState(false);
  const [showNewHotel, setShowNewHotel] = useState(false);
  const [flightLoadError, setFlightLoadError] = useState<string | null>(null);
  const [hotelLoadError, setHotelLoadError] = useState<string | null>(null);

  const tripFileRef = useRef<HTMLInputElement | null>(null);
  const destFileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!Number.isFinite(tripId)) {
      setLoadError(`Invalid trip id: ${id}`);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setFlightLoadError(null);
    setHotelLoadError(null);
    Promise.all([
      fetchAdminTripDetails(tripId),
      fetchFlightOptions(tripId).then(
        (flights) => ({ ok: true as const, flights }),
        (err: unknown) => ({ ok: false as const, error: err instanceof Error ? err.message : "Failed to load flight options" }),
      ),
      fetchHotelOptions(tripId).then(
        (hotels) => ({ ok: true as const, hotels }),
        (err: unknown) => ({ ok: false as const, error: err instanceof Error ? err.message : "Failed to load hotel options" }),
      ),
    ])
      .then(([details, flightResult, hotelResult]) => {
        if (cancelled) return;
        setTrip(details);
        setTripForm(toTripFields(details));
        setDestinationForm(toDestinationFields(details));
        if (flightResult.ok) {
          setFlightOptions(flightResult.flights);
        } else {
          setFlightLoadError(flightResult.error);
        }
        if (hotelResult.ok) {
          setHotelOptions(hotelResult.hotels);
        } else {
          setHotelLoadError(hotelResult.error);
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setLoadError(err instanceof Error ? err.message : "Failed to load trip");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id, tripId]);

  useEffect(() => {
    if (!pendingTripImage) {
      setPendingTripImagePreview(null);
      return;
    }
    const url = URL.createObjectURL(pendingTripImage);
    setPendingTripImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [pendingTripImage]);

  useEffect(() => {
    if (!pendingDestImage) {
      setPendingDestImagePreview(null);
      return;
    }
    const url = URL.createObjectURL(pendingDestImage);
    setPendingDestImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [pendingDestImage]);

  if (loading) {
    return (
      <main className="admin-trip-edit">
        <p>Loading trip...</p>
      </main>
    );
  }

  if (loadError || !trip || !tripForm || !destinationForm) {
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

  function updateTripField<K extends keyof EditableTripFields>(key: K, value: EditableTripFields[K]) {
    setTripForm((prev) => (prev ? { ...prev, [key]: value } : prev));
    if (basicsError) setBasicsError(null);
    if (basicsSuccess) setBasicsSuccess(null);
  }

  async function handleToggleEvent() {
  try {
    const response = await apiFetch(
      `/admin/trips/${tripId}/toggle`,
      {
        method: "PATCH",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to toggle trip visibility");
    }

    setTripForm((prev) =>
      prev
        ? {
          ...prev,
          active: !prev.active,
        }
      : prev
    );
  } catch (err) {
    console.error(err);
  }
}

  function updateDestinationField<K extends keyof EditableDestinationFields>(
    key: K,
    value: EditableDestinationFields[K],
  ) {
    setDestinationForm((prev) => (prev ? { ...prev, [key]: value } : prev));
    if (destinationError) setDestinationError(null);
    if (destinationSuccess) setDestinationSuccess(null);
  }

  async function handleBasicsSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!tripForm) return;

    const title = tripForm.title.trim();
    if (!title) {
      setBasicsError("Title is required.");
      return;
    }

    if (tripForm.startDate && tripForm.endDate && tripForm.startDate > tripForm.endDate) {
      setBasicsError("Start date must be on or before end date.");
      return;
    }

    const keywords = tripForm.keywords
      .split(",")
      .map((keyword) => keyword.trim())
      .filter(Boolean);

    setSavingBasics(true);
    setBasicsError(null);
    setBasicsSuccess(null);

    try {
      let imageUrl = tripForm.imageUrl;
      if (pendingTripImage) {
        const filename = (tripForm.imageUrl || pendingTripImageName).trim();
        imageUrl = await uploadAdminImage(pendingTripImage, "trip", filename);
      }

      const updated = await updateAdminTrip(tripId, {
        title,
        description: tripForm.description,
        imageUrl,
        startDate: tripForm.startDate || undefined,
        endDate: tripForm.endDate || undefined,
        keywords,
      });
      setTrip(updated);
      setTripForm(toTripFields(updated));
      setDestinationForm(toDestinationFields(updated));
      setPendingTripImage(null);
      setPendingTripImageName("");
      setPreviousTripImageUrl("");
      if (tripFileRef.current) tripFileRef.current.value = "";
      setBasicsSuccess("Trip basics updated.");
    } catch (err) {
      setBasicsError(err instanceof Error ? err.message : "Failed to save trip.");
    } finally {
      setSavingBasics(false);
    }
  }

  async function handleDestinationSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!destinationForm) return;
    if (trip?.destinationId == null) {
      setDestinationError("This trip has no linked destination.");
      return;
    }

    setSavingDestination(true);
    setDestinationError(null);
    setDestinationSuccess(null);

    try {
      let imageUrl = destinationForm.imageUrl.trim();
      if (pendingDestImage) {
        const filename = (imageUrl || pendingDestImageName).trim();
        imageUrl = await uploadAdminImage(pendingDestImage, "destination", filename);
      }

      const updated = await updateAdminDestination(trip.destinationId, {
        city: destinationForm.city.trim(),
        country: destinationForm.country.trim(),
        imageUrl,
        imageAlt: destinationForm.imageAlt.trim(),
      });
      setTrip((prev) =>
        prev
          ? {
              ...prev,
              city: updated.city,
              country: updated.country,
              destinationImageUrl: updated.imageUrl,
              destinationImageAlt: updated.imageAlt,
            }
          : prev,
      );
      setDestinationForm({
        city: updated.city ?? "",
        country: updated.country ?? "",
        imageUrl: updated.imageUrl ?? "",
        imageAlt: updated.imageAlt ?? "",
      });
      setPendingDestImage(null);
      setPendingDestImageName("");
      setPreviousDestImageUrl("");
      if (destFileRef.current) destFileRef.current.value = "";
      setDestinationSuccess("Destination updated.");
    } catch (err) {
      setDestinationError(err instanceof Error ? err.message : "Failed to save destination.");
    } finally {
      setSavingDestination(false);
    }
  }

  function suggestedTripFilename(): string {
    const city = trip?.city ?? "";
    const slug = camelize(city) || "trip";
    return `${slug}Trip-${tripId}.webp`;
  }

  function suggestedDestinationFilename(): string {
    const city = destinationForm?.city ?? trip?.city ?? "";
    const slug = camelize(city) || "destination";
    return `${slug}Dest.webp`;
  }

  async function handleTripImagePick(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setConvertingTripImage(true);
    setBasicsError(null);
    setBasicsSuccess(null);
    try {
      const webp = await convertImageToWebp(file);
      const suggested = suggestedTripFilename();
      if (!pendingTripImage) setPreviousTripImageUrl(tripForm?.imageUrl ?? "");
      setPendingTripImage(webp);
      setPendingTripImageName(suggested);
      updateTripField("imageUrl", suggested);
    } catch (err) {
      setBasicsError(err instanceof Error ? err.message : "Failed to process image.");
      if (tripFileRef.current) tripFileRef.current.value = "";
    } finally {
      setConvertingTripImage(false);
    }
  }

  async function handleDestinationImagePick(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setConvertingDestImage(true);
    setDestinationError(null);
    setDestinationSuccess(null);
    try {
      const webp = await convertImageToWebp(file);
      const suggested = suggestedDestinationFilename();
      if (!pendingDestImage) setPreviousDestImageUrl(destinationForm?.imageUrl ?? "");
      setPendingDestImage(webp);
      setPendingDestImageName(suggested);
      updateDestinationField("imageUrl", suggested);
    } catch (err) {
      setDestinationError(err instanceof Error ? err.message : "Failed to process image.");
      if (destFileRef.current) destFileRef.current.value = "";
    } finally {
      setConvertingDestImage(false);
    }
  }

  function clearPendingTripImage() {
    setPendingTripImage(null);
    setPendingTripImageName("");
    updateTripField("imageUrl", previousTripImageUrl);
    setPreviousTripImageUrl("");
    if (tripFileRef.current) tripFileRef.current.value = "";
  }

  function clearPendingDestImage() {
    setPendingDestImage(null);
    setPendingDestImageName("");
    updateDestinationField("imageUrl", previousDestImageUrl);
    setPreviousDestImageUrl("");
    if (destFileRef.current) destFileRef.current.value = "";
  }

  async function handleSaveFlight(optionId: number | "new", input: FlightOptionInput) {
    setFlightBusyId(optionId);
    try {
      if (optionId === "new") {
        const created = await createFlightOption(tripId, input);
        setFlightOptions((prev) => [...prev, created]);
        setShowNewFlight(false);
      } else {
        const updated = await updateFlightOption(tripId, optionId, input);
        setFlightOptions((prev) => prev.map((opt) => (opt.id === optionId ? updated : opt)));
      }
    } finally {
      setFlightBusyId(null);
    }
  }

  async function handleDeleteFlight(optionId: number) {
    if (!window.confirm("Delete this flight option?")) return;
    setFlightBusyId(optionId);
    try {
      await deleteFlightOption(tripId, optionId);
      setFlightOptions((prev) => prev.filter((opt) => opt.id !== optionId));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete flight option.");
    } finally {
      setFlightBusyId(null);
    }
  }

  async function handleSaveHotel(optionId: number | "new", input: HotelOptionInput) {
    setHotelBusyId(optionId);
    try {
      if (optionId === "new") {
        const created = await createHotelOption(tripId, input);
        setHotelOptions((prev) => [...prev, created]);
        setShowNewHotel(false);
      } else {
        const updated = await updateHotelOption(tripId, optionId, input);
        setHotelOptions((prev) => prev.map((opt) => (opt.id === optionId ? updated : opt)));
      }
    } finally {
      setHotelBusyId(null);
    }
  }

  async function handleDeleteHotel(optionId: number) {
    if (!window.confirm("Delete this hotel option?")) return;
    setHotelBusyId(optionId);
    try {
      await deleteHotelOption(tripId, optionId);
      setHotelOptions((prev) => prev.filter((opt) => opt.id !== optionId));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete hotel option.");
    } finally {
      setHotelBusyId(null);
    }
  }

  async function handleDeleteTrip() {
    if (!window.confirm(`Delete "${trip.title}"? This cannot be undone.`)) return;
    try {
      await deleteAdminTrip(tripId);
      navigate("/admin/trips");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete trip.");
    }
  }

  return (
    <main className="admin-trip-edit">
      <SectionHeader
        title="Edit Trip"
        action={
          <div style={{ display: "flex", gap: "var(--space-sm)" }}>
            <button type="button" className="btn btn--danger" onClick={handleDeleteTrip}>
              Delete trip
            </button>
            <Link to="/admin/trips" className="btn btn--ghost">
              Back to trips
            </Link>
          </div>
        }
        className="admin-trip-edit__header"
      />

      <form className="admin-trip-edit__form" onSubmit={handleBasicsSubmit}>
        <section className="admin-trip-edit__group" aria-label="Trip basics">
          <h2 className="admin-trip-edit__group-title">Basics</h2>

          <FormField id="trip-active" label="Visible to users">
            <label className="admin-trip-edit__toggle">
              <input 
                type="checkbox"
                checked={tripForm.active}
                onChange={handleToggleEvent}
              />
              <span className="admin-trip-edit__slider" />
            </label>
          </FormField>

          <FormField id="trip-title" label="Title">
            <TextInput
              id="trip-title"
              type="text"
              value={tripForm.title}
              onChange={(event) => updateTripField("title", event.target.value)}
              disabled={savingBasics}
              required
              maxLength={255}
            />
          </FormField>

          <FormField id="trip-description" label="Description">
            <TextInput
              as="textarea"
              id="trip-description"
              value={tripForm.description}
              onChange={(event) => updateTripField("description", event.target.value)}
              disabled={savingBasics}
              rows={5}
            />
          </FormField>

          <div className="admin-trip-edit__image">
            {pendingTripImagePreview ? (
              <img
                src={pendingTripImagePreview}
                alt="Selected trip image preview"
                className="admin-trip-edit__image-preview"
              />
            ) : tripForm.imageUrl ? (
              <img
                src={getTripImageUrl(tripForm.imageUrl)}
                alt="Current trip preview"
                className="admin-trip-edit__image-preview"
              />
            ) : null}
            <FormField id="trip-image" label="Image filename">
              <TextInput
                id="trip-image"
                type="text"
                value={tripForm.imageUrl}
                onChange={(event) => updateTripField("imageUrl", event.target.value)}
                disabled={savingBasics}
              />
            </FormField>
            <div className="admin-trip-edit__file-row">
              <label className="admin-trip-edit__file">
                <span className="btn btn--ghost">
                  {convertingTripImage
                    ? "Converting..."
                    : pendingTripImage
                      ? "Choose a different image"
                      : "Choose image"}
                </span>
                <input
                  ref={tripFileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleTripImagePick}
                  disabled={savingBasics || convertingTripImage}
                  hidden
                />
              </label>
              {pendingTripImage ? (
                <>
                  <span className="admin-trip-edit__file-name">
                    Ready to upload as {tripForm.imageUrl || pendingTripImageName} ({Math.round(pendingTripImage.size / 1024)} KB)
                  </span>
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={clearPendingTripImage}
                    disabled={savingBasics}
                  >
                    Clear
                  </button>
                </>
              ) : null}
            </div>
          </div>

          <FormField id="trip-keywords" label="Keywords (comma separated)">
            <TextInput
              id="trip-keywords"
              type="text"
              value={tripForm.keywords}
              onChange={(event) => updateTripField("keywords", event.target.value)}
              disabled={savingBasics}
            />
          </FormField>
        </section>

        <section className="admin-trip-edit__group" aria-label="Dates">
          <h2 className="admin-trip-edit__group-title">Dates</h2>

          <div className="admin-trip-edit__row admin-trip-edit__row--two">
            <FormField id="trip-start-date" label="Start date">
              <TextInput
                id="trip-start-date"
                type="date"
                value={tripForm.startDate}
                onChange={(event) => updateTripField("startDate", event.target.value)}
                disabled={savingBasics}
              />
            </FormField>

            <FormField id="trip-end-date" label="End date">
              <TextInput
                id="trip-end-date"
                type="date"
                value={tripForm.endDate}
                onChange={(event) => updateTripField("endDate", event.target.value)}
                disabled={savingBasics}
              />
            </FormField>
          </div>
        </section>

        {basicsError ? (
          <p className="profile__message profile__message--error" role="alert">
            {basicsError}
          </p>
        ) : null}
        {basicsSuccess ? (
          <p className="profile__message profile__message--success">{basicsSuccess}</p>
        ) : null}

        <div className="admin-trip-edit__actions">
          <button type="submit" className="btn" disabled={savingBasics}>
            {savingBasics
              ? pendingTripImage
                ? "Uploading & saving..."
                : "Saving..."
              : "Save trip basics"}
          </button>
        </div>
      </form>

      <form className="admin-trip-edit__form" onSubmit={handleDestinationSubmit}>
        <section className="admin-trip-edit__group" aria-label="Destination">
          <h2 className="admin-trip-edit__group-title">Destination</h2>

          <div className="admin-trip-edit__row admin-trip-edit__row--two">
            <FormField id="dest-city" label="City">
              <TextInput
                id="dest-city"
                type="text"
                value={destinationForm.city}
                onChange={(event) => updateDestinationField("city", event.target.value)}
                disabled={savingDestination}
              />
            </FormField>
            <FormField id="dest-country" label="Country">
              <TextInput
                id="dest-country"
                type="text"
                value={destinationForm.country}
                onChange={(event) => updateDestinationField("country", event.target.value)}
                disabled={savingDestination}
              />
            </FormField>
          </div>

          <FormField id="dest-image-alt" label="Image alt text">
            <TextInput
              id="dest-image-alt"
              type="text"
              value={destinationForm.imageAlt}
              onChange={(event) => updateDestinationField("imageAlt", event.target.value)}
              disabled={savingDestination}
            />
          </FormField>

          <div className="admin-trip-edit__image">
            {pendingDestImagePreview ? (
              <img
                src={pendingDestImagePreview}
                alt={destinationForm.imageAlt || "Selected destination image preview"}
                className="admin-trip-edit__image-preview"
              />
            ) : destinationForm.imageUrl ? (
              <img
                src={getDestinationImageUrl(destinationForm.imageUrl)}
                alt={destinationForm.imageAlt || "Current destination preview"}
                className="admin-trip-edit__image-preview"
              />
            ) : null}
            <FormField id="dest-image" label="Destination image filename">
              <TextInput
                id="dest-image"
                type="text"
                value={destinationForm.imageUrl}
                onChange={(event) => updateDestinationField("imageUrl", event.target.value)}
                disabled={savingDestination}
              />
            </FormField>
            <div className="admin-trip-edit__file-row">
              <label className="admin-trip-edit__file">
                <span className="btn btn--ghost">
                  {convertingDestImage
                    ? "Converting..."
                    : pendingDestImage
                      ? "Choose a different image"
                      : "Choose image"}
                </span>
                <input
                  ref={destFileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleDestinationImagePick}
                  disabled={savingDestination || convertingDestImage}
                  hidden
                />
              </label>
              {pendingDestImage ? (
                <>
                  <span className="admin-trip-edit__file-name">
                    Ready to upload as {destinationForm.imageUrl || pendingDestImageName} ({Math.round(pendingDestImage.size / 1024)} KB)
                  </span>
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={clearPendingDestImage}
                    disabled={savingDestination}
                  >
                    Clear
                  </button>
                </>
              ) : null}
            </div>
          </div>

          {destinationError ? (
            <p className="profile__message profile__message--error" role="alert">
              {destinationError}
            </p>
          ) : null}
          {destinationSuccess ? (
            <p className="profile__message profile__message--success">{destinationSuccess}</p>
          ) : null}

          <div className="admin-trip-edit__actions">
            <button type="submit" className="btn" disabled={savingDestination || trip.destinationId == null}>
              {savingDestination
                ? pendingDestImage
                  ? "Uploading & saving..."
                  : "Saving..."
                : "Save destination"}
            </button>
          </div>
        </section>
      </form>

      <section className="admin-trip-edit__group" aria-label="Flight options">
        <div className="admin-trip-edit__group-header">
          <h2 className="admin-trip-edit__group-title">Flight options</h2>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => setShowNewFlight((prev) => !prev)}
          >
            {showNewFlight ? "Cancel new flight" : "Add flight option"}
          </button>
        </div>

        {flightLoadError ? (
          <p className="profile__message profile__message--error" role="alert">
            {flightLoadError}
          </p>
        ) : null}

        {!flightLoadError && flightOptions.length === 0 && !showNewFlight ? (
          <p>No flight options yet.</p>
        ) : null}

        {flightOptions.map((option) => (
          <FlightOptionCard
            key={option.id}
            option={option}
            busy={flightBusyId === option.id}
            onSave={(input) => handleSaveFlight(option.id, input)}
            onDelete={() => handleDeleteFlight(option.id)}
            onFlightUpdated={(flight) =>
              setFlightOptions((prev) =>
                prev.map((opt) =>
                  opt.flightId === flight.id
                    ? {
                        ...opt,
                        airline: flight.airline,
                        departureCity: flight.departureCity,
                        destinationCity: flight.destinationCity,
                        departureAirport: flight.departureAirport,
                        destinationAirport: flight.destinationAirport,
                        flightDuration: flight.flightDuration,
                      }
                    : opt,
                ),
              )
            }
          />
        ))}

        {showNewFlight ? (
          <AddFlightOption
            busy={flightBusyId === "new"}
            onCreate={(input) => handleSaveFlight("new", input)}
            onCancel={() => setShowNewFlight(false)}
          />
        ) : null}
      </section>

      <section className="admin-trip-edit__group" aria-label="Hotel options">
        <div className="admin-trip-edit__group-header">
          <h2 className="admin-trip-edit__group-title">Hotel options</h2>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => setShowNewHotel((prev) => !prev)}
          >
            {showNewHotel ? "Cancel new hotel" : "Add hotel option"}
          </button>
        </div>

        {hotelLoadError ? (
          <p className="profile__message profile__message--error" role="alert">
            {hotelLoadError}
          </p>
        ) : null}

        {!hotelLoadError && hotelOptions.length === 0 && !showNewHotel ? (
          <p>No hotel options yet.</p>
        ) : null}

        {hotelOptions.map((option) => (
          <HotelOptionCard
            key={option.id}
            option={option}
            busy={hotelBusyId === option.id}
            onSave={(input) => handleSaveHotel(option.id, input)}
            onDelete={() => handleDeleteHotel(option.id)}
            onAccommodationUpdated={(acc) =>
              setHotelOptions((prev) =>
                prev.map((opt) =>
                  opt.accommodationId === acc.id
                    ? {
                        ...opt,
                        hotelName: acc.hotelName,
                        hotelType: acc.hotelType,
                        hotelCity: acc.hotelCity,
                        hotelLocation: acc.hotelLocation,
                        amenities: acc.amenities,
                        nights: acc.nights,
                        latitude: acc.latitude,
                        longitude: acc.longitude,
                      }
                    : opt,
                ),
              )
            }
          />
        ))}

        {showNewHotel ? (
          <AddHotelOption
            busy={hotelBusyId === "new"}
            onCreate={(input) => handleSaveHotel("new", input)}
            onCancel={() => setShowNewHotel(false)}
          />
        ) : null}
      </section>
    </main>
  );
}
