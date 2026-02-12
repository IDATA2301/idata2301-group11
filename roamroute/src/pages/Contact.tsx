import '../assets/styles/pages/contact.css';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";

function Contact() {
  return (
    <main className="contact">
      {/* Header Section */}
      <section className="contact__header">
        <h1>Get in Touch</h1>
        <p>We are here to help your journey stay on track</p>
      </section>

      {/* Contact Form */}
      <form className="contact__form">
        <div className="contact__field">
          <label htmlFor="email" className="contact__label">E-mail</label>
          <input 
            type="email"
            id="email"
            className="contact__input"
            placeholder="E-mail"
            name="email"
            required
          />
        </div>

        <div className="contact__field">
          <label htmlFor="regarding" className="contact__label">Regarding</label>
          <input 
            type="text"
            id="regarding"
            className="contact__input"
            placeholder="Regarding"
            name="regarding"
            required
          />  
        </div>

        <div className="contact__field">
          <label htmlFor="message" className="contact__label">Message</label>
          <textarea
            id="message"
            className="contact__textarea"
            placeholder="Message"
            name="message"
            rows={5}
            required
          />
        </div>

        <button type="submit" className="btn contact__submit">Submit form</button>
      </form>

      {/* Contact Information */}
      <section className="contact__info">
        <div className="contact__details">
        <p><EnvelopeIcon className="contact__icon" /><b>post@roamroute.org</b></p>
        <p><PhoneIcon className="contact__icon" /><b>+47 929 90 707</b></p>
        <p><MapPinIcon className="contact__icon" /><b>C215, NTNU Ålesund</b></p>
      </div>

        <div className="contact__hours">
          <h4>Available</h4>
          <p>Mon – Fri: 08:00 – 21:00</p>
          <p>Sat – Sun: 11:00 – 18:00</p>
        </div>
      </section>

    </main>
  );
}

export default Contact;
