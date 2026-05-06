import { Link } from "react-router-dom";
import SectionHeader from "../components/ui/SectionHeader";

export default function AdminTrips() {
  return (
    <main className="admin-users">
      <SectionHeader
        title="Trips"
        action={
          <Link to="/admin" className="btn btn--ghost">
            Back to admin
          </Link>
        }
        className="admin-users__header"
      />
    </main>
  );
}
