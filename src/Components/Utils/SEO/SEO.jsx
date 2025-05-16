import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords,
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  twitterCard,
  twitterTitle,
  twitterDescription,
  twitterImage,
  schemaMarkup,
  canonicalUrl
}) => {
  const defaultTitle = "Salón Xanadu - Belleza y Estética en Las Tunas, Cuba";
  const defaultDescription = "Salón de belleza y estética en Las Tunas, Cuba. Especialistas en tratamientos faciales, cuidado corporal y de la piel. Reserva tu cita hoy.";
  const defaultKeywords = "salón de belleza Las Tunas, estética facial Cuba, cuidado corporal, tratamientos de piel, spa Las Tunas, belleza Cuba";

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Salón Xanadu",
    "image": "https://tudominio.com/logo.jpg",
    "description": defaultDescription,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Tu dirección",
      "addressLocality": "Las Tunas",
      "addressRegion": "Las Tunas",
      "postalCode": "Tu código postal",
      "addressCountry": "CU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "Tu latitud",
      "longitude": "Tu longitud"
    },
    "url": "https://tudominio.com",
    "telephone": "Tu teléfono",
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.facebook.com/tu-pagina",
      "https://www.instagram.com/tu-cuenta"
    ]
  };

  return (
    <Helmet>
      {/* Meta tags básicos */}
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Spanish" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Salón Xanadu" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl || "https://tudominio.com"} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle || title || defaultTitle} />
      <meta property="og:description" content={ogDescription || description || defaultDescription} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      <meta property="og:locale" content="es_ES" />
      <meta property="og:site_name" content="Salón Xanadu" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard || "summary_large_image"} />
      <meta name="twitter:title" content={twitterTitle || title || defaultTitle} />
      <meta name="twitter:description" content={twitterDescription || description || defaultDescription} />
      {twitterImage && <meta name="twitter:image" content={twitterImage} />}
      <meta name="twitter:site" content="@tu-cuenta-twitter" />

      {/* Schema.org markup */}
      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup || defaultSchema)}
      </script>
    </Helmet>
  );
};

export default SEO; 