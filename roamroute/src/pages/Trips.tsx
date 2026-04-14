import { useSearchParams } from "react-router-dom";

export default function Trips() {

  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");

  return (
    <div>
      <h1>Showing results for: {q}</h1>
    </div>
  )
}