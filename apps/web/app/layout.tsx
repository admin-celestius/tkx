import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Takshashila 2026 | Celebrating 10 Years of TK",
  description: "Join the landmark 10-year edition of Chennai Institute of Technology’s premier cultural festival Takshashila, featuring headline events, talent showcases, pro-shows, and immersive experiences.",
  openGraph: {
    title: "Takshashila 2026 — 10 Years of TK",
    description: "Experience the decade celebration of Chennai Institute of Technology’s flagship cultural festival — bigger stages, grander performances, and unforgettable moments.",
    url: "/",
    siteName: "Takshashila 2026",
    images: ["https://nonprotrusively-candylike-megan.ngrok-free.dev/og-img.png"],
    type: "website"
  },
  icons: {
    apple: "/tk26logo.png",
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const festivalSchema = {
    "@context": "https://schema.org",
    "@type": "Festival",
    "name": "Takshashila 2026",
    "alternateName": "Takshashila Cultural Festival 2026",
    "description": "Takshashila 2026 is the flagship cultural festival of Chennai Institute of Technology, celebrating its 10th year with concerts, dance battles, workshops, competitions, and spectacular showcases.",
    "url": "https://your-domain.com",
    "image": [
      "https://your-domain.com/og-takshashila-2026.png"
    ],
    "startDate": "2026-03-20T09:00:00+05:30",
    "endDate": "2026-03-22T23:00:00+05:30",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "keywords": [
      "Takshashila 2026",
      "CIT Cultural Fest",
      "College Fest Chennai",
      "Annual Fest",
      "Takshashila CIT",
      "Cultural Events 2026"
    ],
    "isAccessibleForFree": true,
    "location": {
      "@type": "Place",
      "name": "Chennai Institute of Technology",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kundrathur",
        "addressRegion": "Tamil Nadu",
        "postalCode": "600069",
        "streetAddress": "Sarathy Nagar, Kundrathur Road",
        "addressCountry": "IN"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "Chennai Institute of Technology",
      "url": "https://www.citchennai.edu.in"
    },
    "performer": [
      {
        "@type": "Person",
        "name": "To Be Announced"
      }
    ],
    "subEvent": [
      {
        "@type": "Event",
        "name": "Pro Show – Day 1",
        "startDate": "2026-03-20T18:00:00+05:30",
        "endDate": "2026-03-20T22:00:00+05:30",
        "location": {
          "@type": "Place",
          "name": "Main Stage – CIT"
        }
      },
      {
        "@type": "Event",
        "name": "Dance Showdown 2026",
        "startDate": "2026-03-21T10:00:00+05:30",
        "endDate": "2026-03-21T16:00:00+05:30",
        "location": {
          "@type": "Place",
          "name": "Auditorium – CIT"
        }
      },
      {
        "@type": "Event",
        "name": "Music Band Wars",
        "startDate": "2026-03-22T10:00:00+05:30",
        "endDate": "2026-03-22T17:00:00+05:30",
        "location": {
          "@type": "Place",
          "name": "Main Block Stage – CIT"
        }
      }
    ],
    "maximumAttendeeCapacity": 10000,
    "remainingAttendeeCapacity": 10000,
    "sponsor": [
      {
        "@type": "Organization",
        "name": "To Be Announced"
      }
    ],
    "inLanguage": "en-IN",
    "mainEntityOfPage": "https://your-domain.com"
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(festivalSchema) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
