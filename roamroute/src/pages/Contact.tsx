function Contact() {
  return (
    <main>
      <section>
        <h1>Get in Touch</h1>
        <p>We are here to help your journey stay on track</p>
      </section>

      {/* Simple contact form*/ }
      <form>
        <div>
          <label htmlFor = "email">E-mail *</label>
          <input 
            type="email"
            id="email"
            name="email"
            required
          />
        </div>

        <div>
          <label htmlFor = "regarding">Regarding *</label>
          <input 
            type="text"
            id="regarding"
            name="regarding"
            required
          />  
        </div>

        <div>
          <label htmlFor = "message">Message *</label>
          <textarea
            id="message"
            name="message"
            rows = {5}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {/* Contact information */}
      <section>
        <p><b>post@roamroute.org</b></p>
        <p><b>+47 929 90 707</b></p>
        <p><b>C215, NTNU Ålesund</b></p>

        <p>Availabe</p>
        <p>Mon – Fri: 08:00 – 21:00</p>
        <p>Sat – Sun: 11:00 – 18:00</p>
      </section>
    </main>
  );
}

export default Contact;
