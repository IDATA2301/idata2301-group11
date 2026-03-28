import '../assets/styles/pages/contact.css';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";

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
        </section>

        {/* Contact Information */}
        <section className="contact__info">
          <div className="contact__details">
            <p className="contact__detail-item"><EnvelopeIcon className="contact__icon" /><b>post@roamroute.org</b></p>
            <p className="contact__detail-item"><PhoneIcon className="contact__icon" /><b>+47 929 90 707</b></p>
            <p className="contact__detail-item"><MapPinIcon className="contact__icon" /><b>C215, NTNU Ålesund</b></p>
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
