"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface HeroData {
  headline: string;
  subheadline: string;
  backgroundImage: { url: string };
}

export default function HeroSection() {
  const [hero, setHero] = useState<HeroData | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:1338/api/hero-sections?populate=*") // Fetch from Strapi
      .then((response) => {
        if (response.data.data.length > 0) {
          setHero(response.data.data[0].attributes);
        }
      })
      .catch((error) => console.error("Error fetching hero section:", error));
  }, []);

  if (!hero) return <p>Loading...</p>;

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center text-white"
      style={{ backgroundImage: `url(http://localhost:1338${hero?.backgroundImage?.url})` }}
    >
      <div className="text-center">
        <h1 className="text-5xl font-bold">{hero?.headline}</h1>
        <p className="text-lg mt-4">{hero?.subheadline}</p>
        <button className="mt-6 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg">
          Get a Quote
        </button>
      </div>
    </div>
  );
}
