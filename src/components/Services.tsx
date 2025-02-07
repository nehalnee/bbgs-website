"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Service {
  id: number;
  attributes: {
    Title: string;
    description?: any;
    image?: {
      data?: { attributes: { url: string } }[];
    };
  };
}

export default function Services() {
  const [services, setServices] = useState<Service[] | null>(null); // Change to `null` initially
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    axios
      .get("http://localhost:1338/api/services?populate=*")
      .then((response) => {
        setServices(response.data.data);
      })
      .catch((error) => console.error("Error fetching services:", error))
      .finally(() => setLoading(false)); // Stop loading after request finishes
  }, []);

  if (loading) return <p className="text-center text-white">Loading services...</p>; // Show loading message
  if (!services || services.length === 0) return <p className="text-center text-white">No services available.</p>; // Handle empty response

  return (
    <section className="py-16 bg-gray-800">
      <h2 className="text-3xl font-bold text-center text-white">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 max-w-6xl mx-auto">
        {services.map((service) => {
          const imageUrl =
            (service.attributes.image?.data?.length ?? 0) > 0
              ? `http://localhost:1338${service.attributes.image!.data![0].attributes.url}`
              : "/placeholder.jpg";

          const descriptionText =
            service.attributes.description?.[0]?.children?.map((child: any) => child.text).join(" ") || "No description available.";

          return (
            <div key={service.id} className="bg-gray-900 p-6 rounded-lg shadow-lg">
              <img
                src={imageUrl}
                alt={service.attributes.Title}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-xl font-semibold mt-4">{service.attributes.Title}</h3>
              <p className="text-gray-400">{descriptionText}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
