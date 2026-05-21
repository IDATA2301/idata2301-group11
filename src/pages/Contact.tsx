import '../assets/styles/pages/contact.css';
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { EnvelopeIcon, PhoneIcon, MapPinIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import ContactInfoItem from "../components/contact/ContactInfoItem";
import FormField from "../components/forms/FormField";
import TextInput from "../components/forms/TextInput";

type Status = "idle" | "submitting" | "success" | "error";

/** Contact page with inquiry form and direct contact details. */
function Contact() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderEmail: email,
          contactmessage_subject: subject,
          contactmessage_message: message,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="contact">
      <Helmet>
        <title>Contact Us — RoamRoute</title>
        <meta name="description" content="Get in touch with the RoamRoute team. We're here to help with any questions about our travel packages and bookings." />
        <link rel="preload" as="image" href="/images/contactform.webp" fetchpriority="high" />
      </Helmet>
      <div className="contact__hero-bg" aria-hidden="true">
        <img src="/images/contactform.webp" alt="Scenic coastal view of a turquoise bay with rocky green cliffs under a bright blue sky" fetchPriority="high" className="contact__hero-bg-img" />
      </div>
      <section className="contact__hero" aria-labelledby="contact-hero-title">
        <span className="contact__eyebrow">Need a hand?</span>
        <h1 id="contact-hero-title" className="contact__hero-title">
          Let's make your next trip a little easier
        </h1>
        <p className="contact__hero-subtitle">
          Send us a message, and we'll help sort out the details without the travel-planning drama.
        </p>
      </section>

      <div className="contact__grid">
        <section className="contact__form-card">
          <div className="contact__header">
            <h1>Get in Touch</h1>
            <p>
              Whether you're planning your next adventure or need help with existing bookings, our
              team is here to ensure your journey is seamless.
            </p>
          </div>

          {status === "success" ? (
            <div className="contact__success">
              <CheckCircleIcon className="contact__success-icon" aria-hidden="true" />
              <h2>Message sent!</h2>
              <p>Thanks for reaching out. We'll get back to you as soon as possible.</p>
              <button
                className="btn contact__submit"
                onClick={() => { setStatus("idle"); setEmail(""); setSubject(""); setMessage(""); }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit} noValidate>
              <FormField id="email" label="E-mail" className="contact__field" labelClassName="contact__label">
                <TextInput
                  type="email"
                  id="email"
                  className="contact__input"
                  placeholder="E-mail"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormField>

              <FormField id="regarding" label="Regarding" className="contact__field" labelClassName="contact__label">
                <TextInput
                  type="text"
                  id="regarding"
                  className="contact__input"
                  placeholder="Regarding"
                  name="regarding"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </FormField>

              <FormField id="message" label="Message" className="contact__field" labelClassName="contact__label">
                <TextInput
                  as="textarea"
                  id="message"
                  className="contact__textarea"
                  placeholder="Message"
                  name="message"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </FormField>

              {status === "error" && (
                <p className="contact__error" role="alert">
                  Something went wrong. Please try again.
                </p>
              )}

              <button type="submit" className="btn contact__submit" disabled={status === "submitting"}>
                {status === "submitting" ? "Sending…" : "Submit form"}
              </button>
            </form>
          )}
        </section>

        <section className="contact__info">
          <div className="contact__details">
            <ContactInfoItem icon={EnvelopeIcon}>post@ntnuroamroute.tech</ContactInfoItem>
            <ContactInfoItem icon={PhoneIcon}>+47 929 90 707</ContactInfoItem>
            <ContactInfoItem icon={MapPinIcon}>C215, NTNU Ålesund</ContactInfoItem>
          </div>

          <div className="contact__hours contact__hours-box">
            <h4>Available</h4>
            <div className="contact__hours-row">
              <span className="contact__hours-day">Mon – Fri</span>
              <span className="contact__hours-time">08:00 – 21:00</span>
            </div>
            <div className="contact__hours-row">
              <span className="contact__hours-day">Sat – Sun</span>
              <span className="contact__hours-time">11:00 – 18:00</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Contact;
