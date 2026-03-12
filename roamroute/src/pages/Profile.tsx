import "../assets/styles/pages/profile.css";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { authUser } = useAuth();

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="profile">
      <section className="profile__hero">
        <div className="profile__avatar" aria-hidden="true">
          {authUser.userName.slice(0, 2).toUpperCase()}
        </div>
        <div className="profile__intro">
          <h1>My Profile</h1>
          <p>Manage your personal details and travel preferences.</p>
        </div>
      </section>

      <section className="profile__content">
        <article className="profile__card">
          <h2>Account details</h2>
          <dl className="profile__list">
            <div className="profile__item">
              <dt>Name</dt>
              <dd>{authUser.userName}</dd>
            </div>
            <div className="profile__item">
              <dt>Email</dt>
              <dd>{authUser.email}</dd>
            </div>
            <div className="profile__item">
              <dt>Role</dt>
              <dd>{authUser.role}</dd>
            </div>
          </dl>
        </article>

        <article className="profile__card">
          <h2>Travel preferences</h2>
          <ul className="profile__tags">
            <li>City Trips</li>
            <li>Beach</li>
            <li>Weekend Getaways</li>
          </ul>
        </article>
      </section>
    </main>
  );
}
