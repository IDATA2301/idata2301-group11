import styles from "./TeamMemberCard.module.css";

type TeamMemberCardProps = {
  name: string;
  role: string;
  image: string;
};

export default function TeamMemberCard({ name, role, image }: TeamMemberCardProps) {
  return (
    <article className={styles.teamMember}>
      <img src={image} alt={name} className={styles.avatar} />
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.role}>{role}</p>
    </article>
  );
}
