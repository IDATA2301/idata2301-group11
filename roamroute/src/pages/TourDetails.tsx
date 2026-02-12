export default function TourDetails() {
  return (
    <main>
      <section>
        <h1> Barcelona, Spain</h1>
        <p>Feb 13 - Feb 20, 2026</p>
      </section>

      <nav>
        <p>Home {">"} Trips {">"} Barcelona</p>
      </nav>

      <section>
        <button>Overview</button>
        <button>Accomodation</button>
        <button>Itinerary</button>
      </section>

      <section>
        <h2> Trip Overview</h2>
        <p>
          A family friendly economy trip from Ålesund to Barcelona,
          idela for a warm winter escape
        </p>
        <div>
          <div>
            <p>Weather</p>
            <strong>18 C</strong>
          </div>

          <div>
            <p>Flight</p>
            <strong>5-7h</strong>
          </div>

          <div>
            <p>Budget</p>
            <strong>Economy</strong>
          </div>
        </div>
      </section>

      <section>
        <h2>Flight Comparison</h2>

        <div>
          <h3>Skyscanner</h3>
          <p>150 USD</p>
          <button>Selected</button>
        </div>

        <div>
          <h3>Expedia</h3>
          <p>175 USD</p>
          <button>Select</button>
        </div>

        <div>
          <h3>Momondo</h3>
          <p>160 USD</p>
          <button>Select</button>
        </div>
      </section>

      <section>
        <h2>Hotel Price Comparison</h2>

        <div>
          <h3>Booking.com</h3>
          <p>620 USD</p>
          <button>Selected</button>
        </div>

        <div>
          <h3>Hotels.com</h3>
          <p>645 USD</p>
          <button>Select</button>
        </div>
      </section>

      <section>
        <h2>Location</h2>
        <div>
          <p>Map goes here</p>
        </div>
      </section>    

    </main>
  );
}