import './styling/Contact.css';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";

function Contact() {
  return (
    <main className="contact-page">
      {/* Header Section */}
      <section className="contact-header">
        <h1 className="contact-title">Get in Touch</h1>
        <p className="contact-subtitle">We are here to help your journey stay on track</p>
      </section>

      {/* Contact Form */}
      <form className="contact-form">
        <div className="form-field">
          <label htmlFor="email" className="form-label">E-mail</label>
          <input 
            type="email"
            id="email"
            className="form-input"
            placeholder="E-mail"
            name="email"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="regarding" className="form-label">Regarding</label>
          <input 
            type="text"
            id="regarding"
            className="form-input"
            placeholder="Regarding"
            name="regarding"
            required
          />  
        </div>

        <div className="form-field">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea
            id="message"
            className="form-textarea"
            placeholder="Message"
            name="message"
            rows={5}
            required
          />
        </div>

        <button type="submit" className="form-submit">Submit form</button>
      </form>

      {/* Contact Information */}
      <section className="contact-info">
        <div className="contact-details">
        <p><EnvelopeIcon className="icon" /><b>post@roamroute.org</b></p>
        <p><PhoneIcon className="icon" /><b>+47 929 90 707</b></p>
        <p><MapPinIcon className="icon" /><b>C215, NTNU Ålesund</b></p>
      </div>

        <div className="contact-hours">
          <p className="hours-title">Available</p>
          <p>Mon – Fri: 08:00 – 21:00</p>
          <p>Sat – Sun: 11:00 – 18:00</p>
        </div>
      </section>
    </main>
  );
}

export default Contact;
