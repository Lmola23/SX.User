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
  const defaultTitle = "Salón Xanadu | Tratamientos Faciales y Corporales en Las Tunas, Cuba";
  const defaultDescription = "Salón de belleza y estética en Las Tunas, Cuba. Especialistas en tratamientos faciales, limpieza facial, extensiones de pestañas y micropigmentación. ¡Reserva tu cita hoy y descubre tu mejor versión!";
  const defaultKeywords = "salón de belleza Las Tunas, estética facial Cuba, limpieza facial, extensiones de pestañas, micropigmentación, tratamientos faciales, cuidado corporal, spa Las Tunas, belleza Cuba";

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Salón Xanadu",
    "image": "https://salonxanadu.com/logo.jpg",
    "description": defaultDescription,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ángel Amejeira #29 e/ Juan Gualberto Gómez y Camilo Cienfuegos",
      "addressLocality": "Puerto Padre",
      "addressRegion": "Las Tunas",
      "postalCode": "77210",
      "addressCountry": "CU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "20.950000",
      "longitude": "-77.210000"
    },
    "url": "https://salonxanadu.com",
    "telephone": "55890908",
    "priceRange": "1000-3000",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Cliente Satisfecho"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "reviewBody": "Excelente servicio y atención personalizada"
      }
    ],
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
      "closes": "16:00"
    },
    "sameAs": [
      "https://www.facebook.com/share/1AXXj94qRM/?mibextid=wwXIfr",
      "https://www.instagram.com/salon_xanadu?igsh=enE4dXgwZm1xbGVj&utm_source=qr"
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
      <link rel="canonical" href={canonicalUrl || "https://salonxanadu.com"} />

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
      <meta name="twitter:site" content="@salonxanadu" />

      {/* Schema.org markup */}
      <script type="application/ld+json">
        {JSON.stringify(schemaMarkup || defaultSchema)}
      </script>
    </Helmet>
  );
};

export default SEO; 