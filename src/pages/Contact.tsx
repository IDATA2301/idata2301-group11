import '../assets/styles/pages/contact.css';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";
import ContactInfoItem from "../components/contact/ContactInfoItem";
import FormField from "../components/forms/FormField";
import TextInput from "../components/forms/TextInput";

function Contact() {
  return (
    <main className="contact">
      <div className="contact__grid">
        <section className="contact__form-card">
          {/* Header Section */}
          <div className="contact__header">
            <h1>Get in Touch</h1>
            <p>
              Whether you're planning your next adventure or need help with existing bookings, our
              team is here to ensure your journey is seamless.
            </p>
          </div>

          {/* Contact Form */}
          <form className="contact__form">
            <FormField id="email" label="E-mail" className="contact__field" labelClassName="contact__label">
              <TextInput
                type="email"
                id="email"
                className="contact__input"
                placeholder="E-mail"
                name="email"
                required
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
              />
            </FormField>

            <button type="submit" className="btn contact__submit">Submit form</button>
          </form>
        </section>

        {/* Contact Information */}
        <section className="contact__info">
          <div className="contact__details">
            <ContactInfoItem icon={EnvelopeIcon}>post@roamroute.org</ContactInfoItem>
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
