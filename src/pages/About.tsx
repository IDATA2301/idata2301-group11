import { Helmet } from "react-helmet-async";
import {
  SparklesIcon,
  CurrencyDollarIcon,
  ClockIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";
import "../assets/styles/pages/about.css";
import ServiceCard from "../components/about/ServiceCard";
import TeamMemberCard from "../components/about/TeamMemberCard";

/** About page highlighting platform benefits and the team. */
function About() {
  const services = [
    {
      id: 1,
      title: "Real-time prices",
      description:
        "Live market data so you never overpay. Fares update the moment carriers do.",
      icon: CurrencyDollarIcon,
    },
    {
      id: 2,
      title: "Dynamic schedules",
      description:
        "Continuous updates on transport schedules keep your itinerary accurate end-to-end.",
      icon: ClockIcon,
    },
    {
      id: 3,
      title: "Flexible routing",
      description:
        "Multiple route options tailored to your preferences, by price, speed, or comfort.",
      icon: ArrowsRightLeftIcon,
    },
  ];

  const team = [
    {
      id: 1,
      name: "Dennis Løvold",
      role: "Chief Executive Officer",
      image: "images/TeamMember.png",
    },
    {
      id: 2,
      name: "Sebastian Nesvik",
      role: "Chief Financial Officer",
      image: "images/TeamMember.png",
    },
    {
      id: 3,
      name: "Jonas Framnes",
      role: "Chief Technology Officer",
      image: "images/TeamMember.png",
    },
  ];

  return (
    <main className="about">
      <Helmet>
        <title>About Us — RoamRoute</title>
        <meta name="description" content="Learn about RoamRoute's mission to make travel planning effortless. Meet the team behind the platform and discover what drives us." />
        <link rel="preload" as="image" href="/images/fly.webp" fetchPriority="high" />
      </Helmet>
      <div className="about__hero-bg" aria-hidden="true">
        <img src="/images/fly.webp" alt="Airplane flying between two tall glass skyscrapers viewed from below against a pale blue sky" fetchPriority="high" className="about__hero-bg-img" />
      </div>
      <section className="about__hero" aria-labelledby="about-hero-title">
        <span className="about__eyebrow">The RoamRoute standard</span>
        <h1 id="about-hero-title" className="about__hero-title">
          Elevating travel planning to new heights
        </h1>
        <p className="about__hero-subtitle">
          A modern platform built for travellers who expect accuracy,
          clarity, and choice from the first search to the last leg.
        </p>
      </section>

      <section className="about__mission" aria-labelledby="about-mission-title">
        <aside className="about__mission-aside">
          <span className="about__mission-icon" aria-hidden="true">
            <SparklesIcon width={32} height={32} />
          </span>
          <p className="about__mission-eyebrow">Our mission</p>
          <h2 id="about-mission-title" className="about__mission-heading">
            Travel, made effortless.
          </h2>
        </aside>
        <div className="about__mission-body">
          <p className="about__mission-statement">
            Whether you're seeking hidden gems in distant countries, reuniting
            with loved ones, or attending important events, every plan made
            with RoamRoute is backed by{" "}
            <strong>reliability and convenience</strong>.
          </p>
          <p className="about__mission-meta">
            Built by travellers, for travellers.
          </p>
        </div>
      </section>

      <section className="about__services" aria-labelledby="about-services-title">
        <header className="about__section-header">
          <p className="about__section-eyebrow">What we do</p>
          <h2 id="about-services-title">
            From spontaneous escapes to international itineraries
          </h2>
          <p className="about__section-lead">
            RoamRoute provides the precision tools needed for any journey,
            whether it's a weekend getaway or a global expedition.
          </p>
        </header>

        <div className="about__services-grid">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </section>

      <section className="about__team" aria-labelledby="about-team-title">
        <div className="about__team-inner">
          <header className="about__section-header about__section-header--centered">
            <p className="about__section-eyebrow">Meet the team</p>
            <h2 id="about-team-title">The people behind RoamRoute</h2>
            <p className="about__section-lead">
              A small team with a shared belief that travel planning should
              feel effortless.
            </p>
          </header>

          <div className="about__team-grid">
            {team.map((member) => (
              <TeamMemberCard
                key={member.id}
                name={member.name}
                role={member.role}
                image={member.image}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
