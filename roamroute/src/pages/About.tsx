import { SparklesIcon, CurrencyDollarIcon, ClockIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import "../assets/styles/pages/about.css";

function About() {
  const services = [
    {
      id: 1,
      title: "Real-Time Prices",
      description: "Live market data ensures you never overpay for a set",
      icon: CurrencyDollarIcon
    },
    {
      id: 2,
      title: "Dynamic Schedules",
      description: "Live updates on transport schedules to keep your trip on track",
      icon: ClockIcon
    },
    {
      id: 3,
      title: "Route Options",
      description: "Multiple route options to choose from, tailored to your preferences",
      icon: ArrowRightIcon
    }
  ];

  const team = [
    {
      id: 1,
      name: "Dennis Løvold",
      role: "Chief Executive Officer",
      image: "images/TeamMember.png"
    },
    {
      id: 2,
      name: "Sebastian Nesvik",
      role: "Chief Financial Officer",
      image: "images/TeamMember.png" 
    },
    {
      id: 3,
      name: "Jonas Framnes",
      role: "Chief Technology Officer",
      image: "images/TeamMember.png"
    }
  ];

  return (
    <main>
      {/*Intro section*/ }
      <section className="Intro">
        <div className="IntroHero">
          <img src="/images/fly.png" alt="Airplane in flight" className="IntroHeroImage" />
          <div className="IntroOverlay">
            <p className="IntroTag">The RoamRoute standard</p>
            <h1 className="IntroTitle">
              Elevating travel planning to new heights
            </h1>
          </div>
        </div>

        <div className="IntroContent">
          <SparklesIcon className="inline-block mr-2" width={32} height={32} color="orange" />
          <p className="IntroDescription">
            Whether you're seeking hidden gems in distant countries,
            reuniting with loved ones, or attending important events,
            every plan made with RoamRoute is backed by reliability
            and convenience.
          </p>
        </div>
      </section>

      {/* Services */ }
      <section className="Services">
        <h2>From Spontaneous Escapes to International itineraries</h2>
        <p>RoamRoute provides the precision tools needed for any journey, whether its a weekend getaway or a global expedition</p>

        <div className="ServicesList">
          {services.map(service => {
            const IconComponent = service.icon;
            return (
              <div key={service.id} className="ServiceItem">
                <IconComponent width={32} height={32} color="var(--color-primary)" />
                <div className="ServiceContent">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Team section */ }
      <section className="Team">
        <div className="TeamContent">
          <h2>Meet the Team</h2>

          <div className="TeamList">
            {team.map(member => (
              <div key={member.id} className="TeamMember">
                <img src={member.image} alt={member.name}/>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
