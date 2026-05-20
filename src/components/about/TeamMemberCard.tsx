import styles from "./TeamMemberCard.module.css";

/** Props for rendering one team member profile card. */
type TeamMemberCardProps = {
  name: string;
  role: string;
  image: string;
};

/** Presentational card used for team member listings on the About page. */
export default function TeamMemberCard({ name, role, image }: TeamMemberCardProps) {
  return (
    <article className={styles.teamMember}>
      <img src={image} alt={name} className={styles.avatar} />
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.role}>{role}</p>
    </article>
  );
}
