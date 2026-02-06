function About() {
  const services = [
    {
      id: 1,
      title: "Real-Time Prices",
      description: "Live market data ensures you never overpay for a set"
    },
    {
      id: 2,
      title: "Dynamic Schedules",
      description: "Live updates on transport schedules to keep your trip on track"
    },
    {
      id: 3,
      title: "Route Options",
      description: "Multiple route options to choose from, tailored to your preferences"
    }
  ];

  const team = [
    {
      id: 1,
      name: "Dennis Løvold",
      role: "Chief Executive Officer",
      image: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      name: "Sebastian Nesvik",
      role: "Chief Financial Officer",
      image: "https://via.placeholder.com/150"  
    }
  ];


  return (
    <main>
      {/*Hero section*/ }
      <section>
        <p>The RoamRoute standard</p>
        <h1>Elevating travel planning to new heights</h1>
      </section>

      {/* Intro box */ }
      <section>
        <div>
          <h2>Our Services</h2>
          <p>
            Whether you're seeking hidden gems in distant countries,
            reuniting with loved ones, or attending important events,
            every plan made with RoamRoute is backed by reliability
            and convenience.
          </p>
        </div>
      </section>

      {/* Services */ }
      <section>
        <h2>From Spontaneous Escapes to International itineraries</h2>
        <p>RoamRoute provides the precision tools needed for any journey</p>

        <div>
          {services.map(service => (
            <div key={service.id}>
            <p>{service.title}</p>
        </div>
      ))}
      </div>
      </section>

      {/* Team section */ }
      <section>
        <h2>Meet the Team</h2>

        <div>
          {team.map(member => (
            <div key={member.id}>
              <img src={member.image} alt={member.name}/>
              <p>{member.name}</p>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default About;
