import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TripSearchForm.module.css";
import { fetchDestinations, type Destination } from "../../services/destinations";
import type { TripCard as TripCardProps } from "../../types/Trip";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const LIVE_RESULTS_LIMIT = 5;
const DEBOUNCE_MS = 250;

export type SearchFormValues = {
  q: string;
  minPrice: string;
  maxPrice: string;
  destinationId: string;
};

type Props = {
  initialValues?: Partial<SearchFormValues>;
  onSubmit: (values: SearchFormValues) => void;
  showLiveResults?: boolean;
  liveSubmit?: boolean;
  submitLabel?: string;
};

export default function TripSearchForm({
  initialValues = {},
  onSubmit,
  showLiveResults = false,
  liveSubmit = false,
  submitLabel = "Search",
}: Props) {
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const onSubmitRef = useRef(onSubmit);

  const [q, setQ] = useState(initialValues.q ?? "");
  const [minPrice, setMinPrice] = useState(initialValues.minPrice ?? "");
  const [maxPrice, setMaxPrice] = useState(initialValues.maxPrice ?? "");
  const [destinationId, setDestinationId] = useState(initialValues.destinationId ?? "");

  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [liveResults, setLiveResults] = useState<TripCardProps[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    onSubmitRef.current = onSubmit;
  }, [onSubmit]);

  useEffect(() => {
    fetchDestinations()
      .then(setDestinations)
      .catch((err) => console.error("Could not load destinations:", err));
  }, []);

  // Live submit — debounced auto-submit on field changes (skip initial render)
  useEffect(() => {
    if (!liveSubmit) return;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const handle = window.setTimeout(() => {
      onSubmitRef.current({
        q: q.trim(),
        minPrice: minPrice.trim(),
        maxPrice: maxPrice.trim(),
        destinationId,
      });
    }, DEBOUNCE_MS);
    return () => window.clearTimeout(handle);
  }, [q, minPrice, maxPrice, destinationId, liveSubmit]);

  // Live search effect — debounced fetch when q/filters change
  useEffect(() => {
    if (!showLiveResults) return;
    if (q.trim().length < 1 && !minPrice && !maxPrice && !destinationId) {
      setLiveResults([]);
      return;
    }

    const handle = window.setTimeout(() => {
      const params = new URLSearchParams();
      if (q.trim()) params.set("q", q.trim());
      if (minPrice.trim()) params.set("minPrice", minPrice.trim());
      if (maxPrice.trim()) params.set("maxPrice", maxPrice.trim());
      if (destinationId) params.set("destinationId", destinationId);

      fetch(`${API_BASE_URL}/api/trips/search?${params.toString()}`)
        .then((res) => (res.ok ? res.json() : []))
        .then((data: TripCardProps[]) => {
          setLiveResults(Array.isArray(data) ? data.slice(0, LIVE_RESULTS_LIMIT) : []);
          setDropdownOpen(true);
        })
        .catch((err) => console.error("Live search failed:", err));
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(handle);
  }, [q, minPrice, maxPrice, destinationId, showLiveResults]);

  // Click-outside to close dropdown
  useEffect(() => {
    if (!showLiveResults) return;
    function handler(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showLiveResults]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDropdownOpen(false);
    onSubmit({ q: q.trim(), minPrice: minPrice.trim(), maxPrice: maxPrice.trim(), destinationId });
  }

  const showDropdown = showLiveResults && dropdownOpen && (q.trim().length >= 1 || minPrice || maxPrice || destinationId);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <form className={styles.search} onSubmit={handleSubmit}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Where are you roaming?"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setDropdownOpen(true)}
        />
        <select
          className={styles.searchInput}
          value={destinationId}
          onChange={(e) => setDestinationId(e.target.value)}
          aria-label="Destination"
        >
          <option value="">Any destination</option>
          {destinations.map((d) => (
            <option key={d.id} value={d.id}>{d.city}, {d.country}</option>
          ))}
        </select>
        <input
          className={styles.searchInput}
          type="number"
          min={0}
          step={1}
          placeholder="Min $"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          aria-label="Minimum price"
        />
        <input
          className={styles.searchInput}
          type="number"
          min={0}
          step={1}
          placeholder="Max $"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          aria-label="Maximum price"
        />
        <button className={`btn btn--accent ${styles.searchButton}`} type="submit">
          {submitLabel}
        </button>
      </form>

      {showDropdown && (
        <div className={styles.dropdown} role="listbox">
          {liveResults.length === 0 ? (
            <div className={styles.dropdownEmpty}>No matches yet…</div>
          ) : (
            liveResults.map((trip) => (
              <button
                key={trip.id}
                type="button"
                className={styles.dropdownItem}
                onClick={() => {
                  setDropdownOpen(false);
                  navigate(`/tour/${trip.id}`);
                }}
              >
                {trip.imageUrl && (
                  <img src={`/images/${trip.imageUrl}`} alt="" className={styles.dropdownThumb} />
                )}
                <div className={styles.dropdownText}>
                  <span className={styles.dropdownTitle}>{trip.title}</span>
                  <span className={styles.dropdownMeta}>
                    {trip.city}, {trip.country} · From ${trip.lowestPrice}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
