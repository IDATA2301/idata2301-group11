import styles from "./FavoriteCard.module.css";

export type FavoriteItem = {
  id: string;
  title: string;
  subtitle: string;
  meta: string;
  priceLabel: string;
  imageUrl?: string;
};

type FavoriteCardProps = {
  item: FavoriteItem;
};

export default function FavoriteCard({ item }: FavoriteCardProps) {
  return (
    <article className={styles.card}>
      {item.imageUrl ? <img src={item.imageUrl} alt={item.title} className={styles.image} /> : null}

      <div className={styles.content}>
        <h2 className={styles.title}>{item.title}</h2>
        <p className={styles.subtitle}>{item.subtitle}</p>

        <div className={styles.metaRow}>
          <p className={styles.meta}>{item.meta}</p>
          <p className={styles.price}>{item.priceLabel}</p>
        </div>
      </div>
    </article>
  );
}
