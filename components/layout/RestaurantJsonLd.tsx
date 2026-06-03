export function RestaurantJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Alas Bravas",
    url: "https://www.alasbravashn.com",
    telephone: "+504 3246-2305",
    image: "https://www.alasbravashn.com/galeria/restaurante-noche.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Playa La Cabaña",
      addressLocality: "San Lorenzo",
      addressRegion: "Valle",
      addressCountry: "HN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 13.4148563,
      longitude: -87.4450208,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "13:00",
        closes: "23:00",
      },
    ],
    servesCuisine: ["Alitas de pollo", "Comida hondureña"],
    priceRange: "L.30–L.320",
    sameAs: ["https://www.instagram.com/alasbravas1709"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
