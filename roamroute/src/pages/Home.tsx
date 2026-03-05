import barcelonaDestImg from "../assets/images/barcelona.png";
import athensImg from "../assets/images/athens.png";
import parisDestImg from "../assets/images/paris.jpg";
import athensDestImg from "../assets/images/athens.jpg";
import tokyoDestImg from "../assets/images/tokyoDest.jpg";
import dublinDestImg from "../assets/images/dublinDest.jpg";
import "../assets/styles/pages/home.css";

function Home() {
  const destinations = [
    { id: 1, destination: "Barcelona", image: barcelonaDestImg },
    { id: 2, destination: "Paris", image: parisDestImg },
    { id: 3, destination: "Athens", image: athensDestImg},
    { id: 4, destination: "Tokyo", image: tokyoDestImg },
    { id: 5, destination: "Dublin", image: dublinDestImg },
  ];

  const trips = [
    {
      id: 1,
      title: "Sunshine Escape Bodø-Athens",
      destination: "Athens",
      price: "$910",
      image: athensImg,
    },
    {
      id: 2,
      title: "Spring exlporer trip Oslo-Tokyo",
      destination: "Tokyo",
      price: "$1580",
    },
    {
      id: 3,
      title: "Cultural Escape Throndheim-Dublin",
      destination: "Dublin",
      price: "$854",
    },
  ];

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
              <img src={trip.image} alt={trip.destination} />
              <h3>{trip.title}</h3>
              <p>{trip.destination}</p>
              <p>{trip.price}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
