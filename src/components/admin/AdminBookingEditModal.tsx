import { useEffect, useState } from "react";
import type { AdminUserBookings } from "../../types/AdminUserBookings";
import { fetchAdminTrips } from "../../services/adminTrips";
import { fetchFlights, type Flight } from "../../services/flights";
import { fetchAccommodations, type Accommodation } from "../../services/accommodations";
import { apiFetch } from "../../services/apiFetch";
import Modal from "../ui/Modal";

type Props = {
  booking: AdminUserBookings;
  onClose: () => void;
  onSaved: (updated: AdminUserBookings) => void;
};

type TripOption = { id: number; title: string };

const STATUSES = ["CONFIRMED", "PENDING", "CANCELLED"] as const;

/** Modal for editing a booking's trip, flight, accommodation, status and price. */
export default function AdminBookingEditModal({ booking, onClose, onSaved }: Props) {
  const [trips, setTrips] = useState<TripOption[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);

  const [tripId, setTripId] = useState(booking.tripId);
  const [flightId, setFlightId] = useState<number | "">(booking.flightId ?? "");
  const [accommodationId, setAccommodationId] = useState<number | "">(booking.accommodationId ?? "");
  const [status, setStatus] = useState(booking.status);
  const [totalPrice, setTotalPrice] = useState(booking.totalPrice);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([fetchAdminTrips(), fetchFlights(), fetchAccommodations()])
      .then(([t, f, a]) => {
        setTrips(t.map((tr) => ({ id: tr.id, title: tr.title })));
        setFlights(f);
        setAccommodations(a);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      const res = await apiFetch(`/admin/orders/${booking.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripId,
          flightId: flightId !== "" ? flightId : null,
          accommodationId: accommodationId !== "" ? accommodationId : null,
          status,
          totalPrice,
        }),
      });
      if (!res.ok) throw new Error(`Failed to update booking (HTTP ${res.status})`);
      const updated: AdminUserBookings = await res.json();
      onSaved(updated);
      onClose();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      open
      title={`Edit booking #${booking.id}`}
      onClose={onClose}
      size="lg"
      footer={
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "var(--space-sm)" }}>
          <button type="button" className="btn btn--ghost" onClick={onClose} disabled={saving}>
            Cancel
          </button>
          <button type="button" className="btn btn--primary" onClick={handleSave} disabled={saving || loading}>
            Save
          </button>
        </div>
      }
    >
      {loading ? (
        <p>Loading options...</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
          <label style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
            <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>Trip</span>
            <select value={tripId} onChange={(e) => setTripId(Number(e.target.value))}>
              {trips.map((t) => (
                <option key={t.id} value={t.id}>{t.title}</option>
              ))}
            </select>
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
            <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>Flight</span>
            <select value={flightId} onChange={(e) => setFlightId(e.target.value !== "" ? Number(e.target.value) : "")}>
              <option value="">— None —</option>
              {flights.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.airline} · {f.departureCity} → {f.destinationCity}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
            <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>Accommodation</span>
            <select value={accommodationId} onChange={(e) => setAccommodationId(e.target.value !== "" ? Number(e.target.value) : "")}>
              <option value="">— None —</option>
              {accommodations.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.hotelName} · {a.hotelCity}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
            <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>Status</span>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
            <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>Total price ($)</span>
            <input
              type="number"
              min={0}
              step={0.01}
              value={totalPrice}
              onChange={(e) => setTotalPrice(Number(e.target.value))}
            />
          </label>
        </div>
      )}
    </Modal>
  );
}
