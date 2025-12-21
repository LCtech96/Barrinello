"use client"

import { HeroSection } from "@/components/HeroSection"
import { VerticalImageStack } from "@/components/ui/vertical-image-stack"
import { Navigation } from "@/components/Navigation"
import { Description } from "@/components/Description"
import { Address } from "@/components/Address"
import { Footer } from "@/components/Footer"

// Immagini locali
const coverImage = "/cop.png"
const profileImage = "/profile.png"

// Gallery images
const galleryImages = [
  {
    id: 1,
    src: "/1.png",
    alt: "Foto del ristorante Barinello",
  },
  {
    id: 2,
    src: "/2.png",
    alt: "Foto del ristorante Barinello",
  },
  {
    id: 3,
    src: "/3.png",
    alt: "Foto del ristorante Barinello",
  },
  {
    id: 4,
    src: "/4.png",
    alt: "Foto del ristorante Barinello",
  },
  {
    id: 5,
    src: "/5.png",
    alt: "Foto del ristorante Barinello",
  },
  {
    id: 6,
    src: "/6.png",
    alt: "Foto del ristorante Barinello",
  },
  {
    id: 7,
    src: "/7.png",
    alt: "Foto del ristorante Barinello",
  },
  {
    id: 8,
    src: "/8.png",
    alt: "Foto del ristorante Barinello",
  },
  {
    id: 9,
    src: "/9.png",
    alt: "Foto del ristorante Barinello",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero Section with Cover and Profile */}
      <div className="pt-0 md:pt-16">
        <HeroSection coverImage={coverImage} profileImage={profileImage} />
      </div>

      {/* Gallery Section */}
      <div className="py-12 md:py-24">
        <VerticalImageStack images={galleryImages} />
      </div>

      {/* Description Section */}
      <Description />

      {/* Address Section */}
      <Address />

      {/* Footer */}
      <Footer />
    </main>
  )
}

