import "../assets/styles/pages/profile.css";
import { Navigate } from "react-router-dom";
import { useEffect, useState, type SyntheticEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { updateUsername } from "../services/auth";

export default function Profile() {
  const { authUser, updateAuthUser } = useAuth();
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!authUser) return;
    setUserName(authUser.userName);
  }, [authUser]);

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  const trimmedUserName = userName.trim();
  const hasUsernameChanges = userName.trim() !== authUser.userName.trim();
  const isValidUsernameLength = trimmedUserName.length >= 6;
  const isWithinMaxLength = trimmedUserName.length <= 20;
  const hasNoWhitespace = !/\s/.test(trimmedUserName);
  const canSubmit = hasUsernameChanges && isValidUsernameLength && isWithinMaxLength && hasNoWhitespace && !loading;

  async function handleUpdateUsername(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!authUser) return;

    const trimmedName = trimmedUserName;

    if (!trimmedName) {
      setError("Username is required.");
      return;
    }

    if (trimmedName.length < 6) {
      setError("Username must be at least 6 characters.");
      return;
    }

    if (trimmedName.length > 20) {
      setError("Username cannot be longer than 20 characters.");
      return;
    }

    if (/\s/.test(trimmedName)) {
      setError("Username cannot contain spaces.");
      return;
    }

    try {
      setLoading(true);
      const updatedUser = await updateUsername({ id: authUser.id, userName: trimmedName });
      updateAuthUser(updatedUser);
      setSuccess("Profile updated successfully.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not update profile. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
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
              <dt>Username</dt>
              <dd>
                <form className="profile__form" onSubmit={handleUpdateUsername}>
                  <input
                    id="profile-username"
                    className="profile__input"
                    type="text"
                    value={userName}
                    onChange={(event) => {
                      setUserName(event.target.value);
                      if (error) setError("");
                      if (success) setSuccess("");
                    }}
                    aria-label="Username"
                    autoComplete="username"
                    minLength={6}
                    maxLength={20}
                    pattern={"^\\S+$"}
                    disabled={loading}
                  />
                  <button className="btn profile__save-btn" type="submit" disabled={!canSubmit}>
                    {loading ? "Updating..." : hasUsernameChanges ? "Update username" : "Save"}
                  </button>
                </form>
                {error ? <p className="profile__message profile__message--error" role="alert">{error}</p> : null}
                {success ? <p className="profile__message profile__message--success">{success}</p> : null}
              </dd>
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
