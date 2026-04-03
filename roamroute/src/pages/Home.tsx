
import "../assets/styles/pages/home.css";
import { useEffect, useState } from "react";

function Home() {
  const destinations = [
    { id: 1, destination: "Barcelona", image: "images/barcelona.png" },
    { id: 2, destination: "Paris", image: "images/parisDest.jpg" },
    { id: 3, destination: "Athens", image: "images/athens.jpg" },
    { id: 4, destination: "Tokyo", image: "images/tokyoDest.jpg" },
    { id: 5, destination: "Dublin", image: "images/dublinDest.jpg" },
  ];


  const [trips, setTrips] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/trips/home")
    .then(res => res.json())
    .then(data => setTrips(data))
    .catch(err => console.error("Error fetching trips:", err));
    }, []
  );

  return (
    <main className="home">
      <div className="home__hero-img" aria-hidden="true" />
      {/* Hero section */}
      <section className="home__hero">
        <h1 className="home__hero-title">
          Dream away at
          <br />
          your destination.
        </h1>
        <div className="home__search">
          <input className="home__search-input" type="text" placeholder="Where are you roaming?" />
          <button className="btn btn--accent">Search</button>
        </div>
      </section>

      {/* Popular destinations */}
      <section className="home__destinations">
        <h2>Top Destinations</h2>
        <div className="home__destinations-list">
          {destinations.map((dest) => (
            <div key={dest.id} className="home__destination-card">
              <img src={dest.image} alt={dest.destination} />
              <p className ="home__destination-name">{dest.destination}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Trip suggestions */}
      <section className="home__trips">
        <h2>Unable to decide?</h2>
        <p>Let us help you</p>

        <div className="home__trip-list">
          {trips.map((trip) => (
            <div key={trip.id} className="home__trip-card">

            <img 
              src={`/images/${trip.imageUrl}`}
              alt={trip.title}
            />

            <div className="home__trip-overlay">
              <h3>{trip.title}</h3>

              <p className="home__trip-location">
                {trip.city}, {trip.country}
              </p>

              <p className="home__trip-price">
                From ${trip.lowestPrice}
              </p>
            </div>

          </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
