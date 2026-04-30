import "../assets/styles/pages/profile.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState, type SyntheticEvent } from "react";
import { ArrowRightOnRectangleIcon, MapIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../context/useAuth";
import { userBookings } from "../data/userBookings";
import { updateUsername } from "../services/auth";
import FormField from "../components/forms/FormField";
import TextInput from "../components/forms/TextInput";

export default function Profile() {
  const navigate = useNavigate();
  const { authUser, updateAuthUser, signOut } = useAuth();
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);

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
  const locationText = [authUser.address ?? authUser.user_address, authUser.country ?? authUser.user_country]
    .filter(Boolean)
    .join(", ") || "Location not set";

  const purchasesCount = authUser ? userBookings.filter((b) => b.user_id === authUser.id).length : 0;

  const displayName = authUser.fullName ?? authUser.userName;
  const nameParts = displayName.trim().split(/\s+/).filter(Boolean);
  const initials = (nameParts.length >= 2
    ? nameParts[0][0] + nameParts[nameParts.length - 1][0]
    : (nameParts[0] ?? "").slice(0, 2)
  ).toUpperCase();

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
      <section className="profile__card">
        <div className="profile__identity">
          <div className="profile__avatar-wrap">
            <div className="profile__avatar" aria-hidden="true">
              {initials}
            </div>
            <span className="profile__badge" aria-hidden="true">✓</span>
          </div>

          <div className="profile__intro">
            <h1>{displayName}</h1>
            <p>{authUser.email}</p>
            <p className="profile__location">
              <MapPinIcon className="profile__location-icon" aria-hidden="true" />
              <span>{locationText}</span>
            </p>
          </div>
        </div>

        <div className="profile__stats" aria-label="Profile statistics">
          <article className="profile__stat">
            <strong>{purchasesCount}</strong>
            <span>PURCHASED TRIPS</span>
          </article>
        </div>

        {isEditing && (
          <form className="profile__edit" onSubmit={handleUpdateUsername}>
            <FormField id="profile-username" label="Username" labelClassName="profile__edit-label">
              <TextInput
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
            </FormField>

            <div className="profile__edit-actions">
              <button type="submit" className="profile__btn profile__btn--primary" disabled={!canSubmit}>
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                className="profile__btn profile__btn--ghost"
                onClick={() => {
                  setIsEditing(false);
                  setUserName(authUser.userName);
                  setError("");
                  setSuccess("");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {error ? <p className="profile__message profile__message--error" role="alert">{error}</p> : null}
        {success ? <p className="profile__message profile__message--success">{success}</p> : null}

        <div className="profile__actions">
          {!isEditing && (
            <button
              type="button"
              className="profile__btn profile__btn--primary"
              onClick={() => {
                setIsEditing(true);
                setError("");
                setSuccess("");
              }}
            >
              Edit Username
            </button>
          )}

          <button
            type="button"
            className="profile__btn profile__btn--primary profile__btn--icon"
            onClick={() => navigate("/")}
          >
            <MapIcon className="profile__btn-icon" aria-hidden="true" />
            <span>Continue Exploring</span>
          </button>

          <button
            type="button"
            className="profile__btn profile__btn--ghost"
            onClick={() => navigate("/purchased-trips")}
          >
            Purchased Trips
          </button>

          <button
            type="button"
            className="profile__btn profile__btn--ghost profile__btn--icon"
            onClick={() => {
              signOut();
              navigate("/login");
            }}
          >
            <ArrowRightOnRectangleIcon className="profile__btn-icon" aria-hidden="true" />
            <span>Sign Out</span>
          </button>
        </div>
      </section>
    </main>
  );
}
