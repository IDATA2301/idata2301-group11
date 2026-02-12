import barcelonaImg from '../assets/images/barcelona.png';
import athensImg from '../assets/images/athens.png';
import '../assets/styles/pages/home.css';

function Home() {
  const destinations = [
    {id: 1, destination: "Barcelona", image: barcelonaImg},
    {id: 2, destination: "Paris",},
    {id: 3, destination: "Athens"},
    {id: 4, destination: "Tokyo"},
    {id: 5, destination: "Dublin"},
  ];

  const trips = [
    { 
      id: 1,
      title: "Sunshine Escape Bodø-Athens",
      destination: "Athens",
      price:"$910",
      image: athensImg,
    },
    {
      id: 2,
      title: "Spring exlporer trip Oslo-Tokyo",
      destination: "Tokyo",
      price:"$1580",
    },
    {
      id: 3,
      title: "Cultural Escape Throndheim-Dublin",
      destination: "Dublin",
      price:"$854",
    }
  ];

  return (
    <main> 
      {/* Hero section */ }
      <section className="hero">
        <h1 className="hero-title">Dream away at your destination</h1>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Where are you roaming?" 
            />
          <button>Search</button>
        </div>
      </section>

      {/* Popular destinations */ }
      <section className="destinations">
        <h2>Top Destinations</h2>
        <div className="destination-list">
          {destinations.map(dest => (
            <div key={dest.id} className="destination-card">
              <img src={dest.image} alt={dest.destination}/>
              <p>{dest.destination}</p>  
            </div>
            ))}
        </div>
      </section>

      {/* Trip suggestions */ }
      <section className="trips">
        <h2>Unable to decide?</h2>
        <p>let us help you</p>

        <div className="trip-list">
          {trips.map(trip => (
            <div key={trip.id} className="trip-card">
              <img src={trip.image} alt={trip.destination}/>
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
