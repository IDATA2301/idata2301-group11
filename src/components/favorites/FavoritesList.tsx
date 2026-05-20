import FavoriteCard, { type FavoriteItem } from "./FavoriteCard";
import styles from "./FavoritesList.module.css";
import { getTripImageUrl } from "../../utils/imageUrls";

/** Props for the favorites list wrapper. */
type FavoritesListProps = {
  favorites: unknown[];
};

/** Safely coerce a string-like value into a trimmed string. */
function asString(value: unknown): string {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

/** Safely coerce a number-like value into a finite number. */
function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

/** Normalize an arbitrary favorite payload into the UI card shape. */
function normalizeFavorite(favorite: unknown, index: number): FavoriteItem | null {
  if (!favorite || typeof favorite !== "object") {
    return null;
  }

  const item = favorite as Record<string, unknown>;
  const idCandidate = item.id ?? item.tripId ?? item.order_id ?? item.trip_id ?? `favorite-${index}`;
  const id = String(idCandidate);

  const title =
    asString(item.title) ||
    asString(item.trip_name) ||
    asString(item.destination) ||
    asString(item.city);

  if (!title) {
    return null;
  }

  const subtitleParts = [asString(item.city), asString(item.country)].filter(Boolean);
  const subtitle = subtitleParts.join(", ") || asString(item.subtitle) || asString(item.hotel) || "Saved item";

  const date = asString(item.date) || asString(item.startDate) || asString(item.start_date);
  const meta = date ? `Date: ${date}` : "Details unavailable";

  const priceValue = asNumber(item.price) ?? asNumber(item.lowestPrice) ?? asNumber(item.lowest_price);
  const priceLabel = priceValue !== null ? `$${priceValue}` : asString(item.priceLabel);

  const imageCandidate = asString(item.imageUrl) || asString(item.image_url) || asString(item.image);
  const imageUrl = imageCandidate ? getTripImageUrl(imageCandidate) : undefined;

  return { id, title, subtitle, meta, priceLabel, imageUrl };
}

/** Render the favorites list using normalized card items. */
export default function FavoritesList({ favorites }: FavoritesListProps) {
  const favoriteItems = favorites
    .map((favorite, index) => normalizeFavorite(favorite, index))
    .filter((item): item is FavoriteItem => Boolean(item));

  return (
    <section className={styles.list} aria-label="Favorite bookings">
      {favoriteItems.map((item, index) => {
        return <FavoriteCard key={item.id || `favorite-${index}`} item={item} />;
      })}
    </section>
  );
}
