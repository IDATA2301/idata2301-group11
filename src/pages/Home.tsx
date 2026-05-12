import "../assets/styles/pages/home.css";
import { useEffect, useState } from "react";
import DestinationCard from "../components/home/DestinationCard";
import HeroImage from "../components/home/HeroImage";
import HeroSection from "../components/home/HeroSection";
import TripCard from "../components/home/TripCard";
import { useAuth } from "../context/useAuth";
import { apiFetch } from "../services/apiFetch";
import { fetchDestinations, type Destination } from "../services/destinations";
import { getDestinationImageUrl } from "../utils/imageUrls";

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
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [trips, setTrips] = useState<HomeTrip[]>([]);

  useEffect(() => {
    fetchDestinations()
      .then((all) => {
        const shuffled = [...all].sort(() => Math.random() - 0.5);
        setDestinations(shuffled.slice(0, 5));
      })
      .catch((err) => console.error("Error fetching destinations:", err));
  }, []);


  useEffect(() => {
    apiFetch("/trips/home")
      .then((res) => res.json())
      .then((data: HomeTrip[]) => setTrips(data))
      .catch((err) => console.error("Error fetching trips:", err));
  }, []);

  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const { authUser, setFavoriteCount } = useAuth();

  useEffect(() => {
    if (!authUser) {
      setFavoriteIds([]);
      return;
    }

    apiFetch("/favorites")
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) {
          console.error("Unexpected favorites response:", data);
          return;
        }
        const ids = data.map((fav: any) => fav.trip?.id).filter((id: number | undefined) => id != null);
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
        <div className="home__destinations-header">
          <h2>Top Destinations</h2>
          <a href="#" className="home__destinations-viewall">View all →</a>
        </div>
        <div className="home__destinations-list">
          {destinations.map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest.city}
              image={getDestinationImageUrl(dest.image_url)}
            />
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
