import "../assets/styles/pages/tourdetails.css";
import {
  SunIcon,
  PaperAirplaneIcon,
  CurrencyDollarIcon,
  InformationCircleIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";

export default function TourDetails() {
  return (
    <main>
      <section className="TourHeader">
        <h1> Barcelona, Spain</h1>
        <p>Feb 13 - Feb 20, 2026</p>
      </section>

      <nav className="Breadcrumb">
        <p>Home {">"} Trips {">"} Barcelona</p>
      </nav>

      <section className="TourTabs">
        <button>Overview</button>
        <button>Accomodation</button>
        <button>Itinerary</button>
      </section>

      <section className="TripOverview">
        <h2>
          <InformationCircleIcon
            className="InfoIcon InfoIcon--info"
            aria-hidden="true"
          />
          Trip Overview
        </h2>
        <div className="TripOverviewContent">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          </p>
          <div>
            <div className="WeatherInfo">
              <SunIcon className="InfoIcon InfoIcon--sun" aria-hidden="true" />
              <p>Weather</p>
              <strong>18 C</strong>
            </div>

            <div className="FlightInfo">
              <PaperAirplaneIcon
                className="InfoIcon InfoIcon--flight"
                aria-hidden="true"
              />
              <p>Flight</p>
              <strong>5-7h</strong>
            </div>

            <div className="BudgetInfo">
              <CurrencyDollarIcon
                className="InfoIcon InfoIcon--budget"
                aria-hidden="true"
              />
              <p>Budget</p>
              <strong>Economy</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="FlightComparison">
        <h2>
          <PaperAirplaneIcon 
          className="InfoIcon InfoIcon--flight" 
          aria-hidden="true" />
          Flight Price Comparison

        </h2>

        <div className="Skyscanner">
          <h3>
            Skyscanner
            <span className="FlightCompanyNote">Includes taxes & fees</span>
          </h3>
          <p>€150</p>
          <button>Selected</button>
        </div>

        <div className="Expedia">
          <h3>
            Expedia
            <span className="FlightCompanyNote">Includes taxes & fees</span>
          </h3>
          <p>€175</p>
          <button>Select</button>
        </div>

        <div className="Momondo">
          <h3>
            Momondo
            <span className="FlightCompanyNote">Includes taxes & fees</span>
          </h3>
          <p>€160</p>
          <button>Select</button>
        </div>
      </section>

      <section className="HotelComparison">
        <h2>
          <HomeIcon className="InfoIcon InfoIcon--home" aria-hidden="true" />
          Hotel Price Comparison
        </h2>

        <div className="Booking">
          <h3>
            Booking.com
            <span className="HotelCompanyNote">Includes taxes & fees</span>
          </h3>
          <p>€620</p>
          <button>Selected</button>
        </div>

        <div className="Hotels">
          <h3>
            Hotels.com
            <span className="HotelCompanyNote">Includes taxes & fees</span>
          </h3>
          <p>€645</p>
          <button>Select</button>
        </div>
      </section>

      <section className="LocationSection">
        <h2>Location</h2>
        <div>
          <p>Map goes here</p>
        </div>
      </section>    

    </main>
  );
}