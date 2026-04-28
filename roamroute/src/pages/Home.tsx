import "../assets/styles/pages/home.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DestinationCard from "../components/home/DestinationCard";
import HeroImage from "../components/home/HeroImage";
import HeroSection from "../components/home/HeroSection";
import TripCard from "../components/home/TripCard";
import { useAuth } from "../context/useAuth";

type Destination = {
  id: number;
  destination: string;
  image: string;
};

type HomeTrip = {
  id: number;
  imageUrl: string;
  title: string;
  city: string;
  country: string;
  lowestPrice: number;
  startDate: string;
  endDate: string;
};

function Home() {
  const destinations: Destination[] = [
    { id: 1, destination: "Barcelona", image: "images/barcelona.png" },
    { id: 2, destination: "Paris", image: "images/parisDest.jpg" },
    { id: 3, destination: "Athens", image: "images/athens.jpg" },
    { id: 4, destination: "Tokyo", image: "images/tokyoDest.jpg" },
    { id: 5, destination: "Dublin", image: "images/dublinDest.jpg" },
  ];

  const [trips, setTrips] = useState<HomeTrip[]>([]);


  useEffect(() => {
    fetch("http://localhost:8080/api/trips/home")
      .then((res) => res.json())
      .then((data: HomeTrip[]) => setTrips(data))
      .catch((err) => console.error("Error fetching trips:", err));
  }, []);

  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const { authUser } = useAuth();
  const auth = localStorage.getItem("auth");
  const { setFavoriteCount } = useAuth();

  useEffect(() => {
    if (!authUser || !auth) {
      setFavoriteIds([]);
      return;
    }

    fetch("http://localhost:8080/api/favorites", {
      headers: {
        Authorization: "Basic " + auth
      }
    })
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) {
          console.error("Unexpected favorites response:", data);
          return;
        }
        console.log("FAVORITES:", data);
        const ids = data.map((fav: any) => fav.trip?.id);
        console.log("TRIP ID:", data[0].trip.id);
        setFavoriteIds(ids);
        setFavoriteCount(ids.length);
      })
      .catch(err => console.error("Error fetching favorites:", err));
  }, [authUser]);

  return (
    <main className="home">
      <HeroImage />
      <HeroSection />

      <section className="home__destinations">
        <h2>Top Destinations</h2>
        <div className="home__destinations-list">
          {destinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest.destination} image={dest.image} />
          ))}
        </div>
      </section>

      <section className="home__trips">
        <h2>Unable to decide?</h2>
        <p>Let us help you</p>

        <div className="home__trip-list">
          {trips.map((trip) => (
              <TripCard
                key={trip.id}
                id={trip.id}
                imageUrl={trip.imageUrl}
                title={trip.title}
                city={trip.city}
                country={trip.country}
                lowestPrice={trip.lowestPrice}
                startDate={trip.startDate}
                endDate={trip.endDate}
                isFavorite={favoriteIds.includes(trip.id)}
              />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
