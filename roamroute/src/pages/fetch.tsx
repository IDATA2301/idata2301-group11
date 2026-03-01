import { useEffect, useState } from "react";

function Fetch() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await fetch("http://localhost:8080/api/trips")
        .then((response) => response.json())
        .then((json) => setData(json));
    }
    fetchData();
  }, []);
  console.log(data);
  return (
    <div>
      <h1>Fetch</h1>
      <div>
        {data.map((item, index) => (
          <div key={index}>
            <p>{item.trip_description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Fetch;