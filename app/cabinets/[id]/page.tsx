"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
    FaBuilding,
    FaEnvelope,
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaMapMarkerAlt,
    FaPhone,
    FaTwitter,
    FaWhatsapp
} from "react-icons/fa"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

// Main component
export default function CabinetDetailPage() {
  // Sample cabinet data
  const cabinet = {
    id: 1,
    name: "Cabinet Investir En Soi",
    slogan: "Votre partenaire pour le développement professionnel",
    description: "Cabinet de conseil et de formation spécialisé dans le développement des compétences professionnelles et personnelles. Nous accompagnons les entreprises et les particuliers dans leur croissance.",
    longDescription: `Notre cabinet de conseil et de formation est dédié à l'excellence et à l'innovation dans le développement professionnel. Avec une équipe d'experts chevronnés, nous proposons des solutions personnalisées pour répondre aux besoins spécifiques de nos clients.

    Nous croyons en l'importance de l'apprentissage continu et du développement personnel pour atteindre l'excellence professionnelle. Notre approche combine théorie et pratique, permettant à nos clients d'acquérir des compétences concrètes et applicables immédiatement.
    
    Notre mission est de transformer le potentiel en performance, en fournissant des outils et des méthodologies éprouvés pour le développement professionnel.`,
    image: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
    logo: "/placeholder.svg",
    location: {
      address: "Rue KA 028, Nongo",
      city: "Conakry",
      country: "Guinée",
      coordinates: {
        lat: 9.641185,
        lng: -13.578659
      }
    },
    contact: {
      phone: "+224 621 00 00 00",
      whatsapp: "+224 621 00 00 00",
      email: "contact@investirensoi.com",
      website: "www.investirensoi.com"
    },
    socialMedia: {
      facebook: "https://facebook.com/investirensoi",
      twitter: "https://twitter.com/investirensoi",
      linkedin: "https://linkedin.com/company/investirensoi",
      instagram: "https://instagram.com/investirensoi"
    },
    horaires: [
      { jour: "Lundi", heures: "08:00 - 17:00" },
      { jour: "Mardi", heures: "08:00 - 17:00" },
      { jour: "Mercredi", heures: "08:00 - 17:00" },
      { jour: "Jeudi", heures: "08:00 - 17:00" },
      { jour: "Vendredi", heures: "08:00 - 17:00" },
      { jour: "Samedi", heures: "09:00 - 13:00" },
      { jour: "Dimanche", heures: "Fermé" }
    ],
    specialites: [
      "Formation professionnelle",
      "Conseil en entreprise",
      "Coaching individuel",
      "Développement personnel",
      "Management et leadership",
      "Communication professionnelle"
    ],
    certifications: [
      "ISO 9001:2015",
      "Centre de formation agréé",
      "Membre de la Chambre de Commerce"
    ],
    stats: {
      anneesExperience: 10,
      clientsServis: 500,
      formationsRealisees: 200,
      satisfactionClient: 98
    },
    gallery: [
      {
        id: 1,
        url: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
        title: "Formation en groupe"
      },
      {
        id: 2,
        url: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
        title: "Séance de coaching"
      },
      {
        id: 3,
        url: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
        title: "Atelier pratique"
      },
      {
        id: 4,
        url: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
        title: "Conférence"
      }
    ],
  }

  return (
    <div className="min-h-screen bg-[#0A0B1C]">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-[#1C1D33] to-[#0A0B1C] py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex text-sm">
              <Link href="/cabinets" className="text-gray-400 hover:text-white">
                Cabinets
              </Link>
              <span className="mx-2 text-gray-600">/</span>
              <span className="text-gray-300">{cabinet.name}</span>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cabinet info */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="flex items-center mb-6">
                  <Avatar className="h-20 w-20 mr-4">
                    <AvatarImage src={cabinet.logo} alt={cabinet.name} />
                    <AvatarFallback>{cabinet.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">{cabinet.name}</h1>
                    <p className="text-[#048B9A] text-lg">{cabinet.slogan}</p>
                  </div>
                </div>

                <p className="text-gray-300 text-lg mb-6">{cabinet.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div className="bg-[#151627] p-4 rounded-lg">
                    <div className="flex items-center text-gray-300">
                      <FaMapMarkerAlt className="mr-2 text-[#048B9A]" />
                      <div>
                        <p className="text-sm">Adresse</p>
                        <p className="font-medium">{cabinet.location.address}</p>
                        <p className="text-sm">{cabinet.location.city}, {cabinet.location.country}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#151627] p-4 rounded-lg">
                    <div className="flex items-center text-gray-300">
                      <FaPhone className="mr-2 text-[#048B9A]" />
                      <div>
                        <p className="text-sm">Téléphone</p>
                        <p className="font-medium">{cabinet.contact.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#151627] p-4 rounded-lg">
                    <div className="flex items-center text-gray-300">
                      <FaEnvelope className="mr-2 text-[#048B9A]" />
                      <div>
                        <p className="text-sm">Email</p>
                        <p className="font-medium">{cabinet.contact.email}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {cabinet.specialites.map((specialite, index) => (
                    <Badge key={index} className="bg-[#048B9A]/20 text-[#048B9A] hover:bg-[#048B9A]/30">
                      {specialite}
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-4 mb-8">
                  <Button
                    className="bg-[#048B9A] hover:bg-[#037483] text-white"
                    onClick={() => window.location.href = `mailto:${cabinet.contact.email}`}
                  >
                    <FaEnvelope className="mr-2" /> Contacter par email
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-700 text-[#048B9A] hover:bg-[#151627] hover:text-white"
                    onClick={() => window.location.href = `https://wa.me/${cabinet.contact.whatsapp.replace(/\+/g, '').replace(/\s/g, '')}`}
                  >
                    <FaWhatsapp className="mr-2" /> WhatsApp
                  </Button>
                </div>

                <div className="bg-[#151627] rounded-lg overflow-hidden mb-8">
                  <h3 className="text-white font-medium p-4 border-b border-gray-800">Notre localisation</h3>
                  <div className="aspect-video relative">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3897.4711018096623!2d-13.581847399999999!3d9.641185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMzgnMjguMyJOIDEzwrAzNCc0My4yIlc!5e0!3m2!1sfr!2sgn!4v1650000000000!5m2!1sfr!2sgn"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0"
                    />
                  </div>
                  <div className="p-4 border-t border-gray-800">
                    <div className="flex items-center text-gray-300">
                      <FaMapMarkerAlt className="mr-2 text-[#048B9A]" />
                      <div>
                        <p>{cabinet.location.address}</p>
                        <p className="text-sm text-gray-400">{cabinet.location.city}, {cabinet.location.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Cabinet sidebar */}
            <div className="hidden lg:block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-[#151627] border border-gray-800 rounded-lg p-5 sticky top-8"
              >
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-medium mb-4">Horaires d'ouverture</h3>
                    <div className="space-y-2">
                      {cabinet.horaires.map((horaire, index) => (
                        <div key={index} className="flex justify-between text-gray-300">
                          <span>{horaire.jour}</span>
                          <span>{horaire.heures}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-gray-800" />

                  <div>
                    <h3 className="text-white font-medium mb-4">Réseaux sociaux</h3>
                    <div className="flex space-x-4">
                      <a
                        href={cabinet.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#048B9A] hover:text-[#037483]"
                      >
                        <FaFacebook size={24} />
                      </a>
                      <a
                        href={cabinet.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#048B9A] hover:text-[#037483]"
                      >
                        <FaTwitter size={24} />
                      </a>
                      <a
                        href={cabinet.socialMedia.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#048B9A] hover:text-[#037483]"
                      >
                        <FaLinkedin size={24} />
                      </a>
                      <a
                        href={cabinet.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#048B9A] hover:text-[#037483]"
                      >
                        <FaInstagram size={24} />
                      </a>
                    </div>
                  </div>

                  <Separator className="bg-gray-800" />

                  <div>
                    <h3 className="text-white font-medium mb-4">Certifications</h3>
                    <div className="space-y-2">
                      {cabinet.certifications.map((certification, index) => (
                        <div key={index} className="flex items-center text-gray-300">
                          <FaBuilding className="mr-2 text-[#048B9A]" />
                          <span>{certification}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-gray-800" />

                  <div>
                    <h3 className="text-white font-medium mb-4">Galerie</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {cabinet.gallery.map((image) => (
                        <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden group">
                          <Image
                            src={image.url}
                            alt={image.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <p className="text-white text-sm text-center px-2">{image.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="bg-[#151627] border border-gray-800 p-1 mb-6 w-full grid grid-cols-2">
                <TabsTrigger
                  value="about"
                  className="data-[state=active]:bg-[#048B9A] data-[state=active]:text-white"
                >
                  À propos
                </TabsTrigger>
                <TabsTrigger
                  value="stats"
                  className="data-[state=active]:bg-[#048B9A] data-[state=active]:text-white"
                >
                  Statistiques
                </TabsTrigger>
              </TabsList>

              <TabsContent value="about">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <div className="bg-[#151627] border border-gray-800 rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">À propos de nous</h2>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 whitespace-pre-line">{cabinet.longDescription}</p>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="stats">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <div className="bg-[#151627] border border-gray-800 rounded-lg p-6 mb-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[#048B9A] mb-2">
                          {cabinet.stats.anneesExperience}+
                        </div>
                        <div className="text-gray-300">Années d'expérience</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[#048B9A] mb-2">
                          {cabinet.stats.clientsServis}+
                        </div>
                        <div className="text-gray-300">Clients satisfaits</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[#048B9A] mb-2">
                          {cabinet.stats.formationsRealisees}+
                        </div>
                        <div className="text-gray-300">Formations réalisées</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-[#048B9A] mb-2">
                          {cabinet.stats.satisfactionClient}%
                        </div>
                        <div className="text-gray-300">Taux de satisfaction</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Mobile sidebar */}
          <div className="lg:hidden">
            <div className="bg-[#151627] border border-gray-800 rounded-lg p-5 mb-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-medium mb-4">Horaires d'ouverture</h3>
                  <div className="space-y-2">
                    {cabinet.horaires.map((horaire, index) => (
                      <div key={index} className="flex justify-between text-gray-300">
                        <span>{horaire.jour}</span>
                        <span>{horaire.heures}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="bg-gray-800" />

                <div>
                  <h3 className="text-white font-medium mb-4">Réseaux sociaux</h3>
                  <div className="flex space-x-4">
                    <a
                      href={cabinet.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#048B9A] hover:text-[#037483]"
                    >
                      <FaFacebook size={24} />
                    </a>
                    <a
                      href={cabinet.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#048B9A] hover:text-[#037483]"
                    >
                      <FaTwitter size={24} />
                    </a>
                    <a
                      href={cabinet.socialMedia.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#048B9A] hover:text-[#037483]"
                    >
                      <FaLinkedin size={24} />
                    </a>
                    <a
                      href={cabinet.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#048B9A] hover:text-[#037483]"
                    >
                      <FaInstagram size={24} />
                    </a>
                  </div>
                </div>

                <Separator className="bg-gray-800" />

                <div>
                  <h3 className="text-white font-medium mb-4">Certifications</h3>
                  <div className="space-y-2">
                    {cabinet.certifications.map((certification, index) => (
                      <div key={index} className="flex items-center text-gray-300">
                        <FaBuilding className="mr-2 text-[#048B9A]" />
                        <span>{certification}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 