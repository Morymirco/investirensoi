"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { FaStar, FaSearch, FaFilter, FaMapMarkerAlt, FaUserGraduate, FaCalendarAlt } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

// Cabinet card component
const CabinetCard = ({ cabinet }: { cabinet: any }) => (
  <motion.div
    variants={itemVariants}
    className="bg-[#151627] rounded-xl overflow-hidden border border-gray-800 hover:border-[#048B9A] transition-all duration-300 hover:shadow-lg hover:shadow-[#048B9A]/10"
  >
    <div className="relative h-48">
      <Image src={cabinet.image || "/placeholder.svg"} alt={cabinet.name} fill className="object-cover" />
      <div className="absolute top-3 right-3">
        <Badge className="bg-[#048B9A] text-white hover:bg-[#037483]">{cabinet.category}</Badge>
      </div>
    </div>

    <div className="p-5">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-white">{cabinet.name}</h3>
        <div className="flex items-center">
          <FaStar className="text-yellow-400 mr-1" />
          <span className="text-white">{cabinet.rating}</span>
        </div>
      </div>

      <div className="flex items-center text-gray-400 mb-3">
        <FaMapMarkerAlt className="mr-2" />
        <span className="text-sm">{cabinet.location}</span>
      </div>

      <p className="text-gray-300 mb-4 line-clamp-2">{cabinet.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {cabinet.specialties.map((specialty: string, index: number) => (
          <Badge key={index} variant="outline" className="border-gray-700 text-gray-300">
            {specialty}
          </Badge>
        ))}
      </div>

      <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
        <div className="flex items-center">
          <FaUserGraduate className="mr-1" />
          <span>{cabinet.experts} experts</span>
        </div>
        <div className="flex items-center">
          <FaCalendarAlt className="mr-1" />
          <span>{cabinet.availability}</span>
        </div>
      </div>

      <Button className="w-full bg-[#048B9A] hover:bg-[#037483] text-white">Voir les détails</Button>
    </div>
  </motion.div>
)

export default function CabinetsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Sample data for cabinets
  const cabinets = [
    {
      id: 1,
      name: "Institut Africain de Technologie",
      category: "Technologie",
      rating: 4.8,
      location: "Dakar, Sénégal",
      description:
        "Centre d'excellence spécialisé dans la formation aux métiers du numérique et de l'innovation technologique.",
      specialties: ["Développement Web", "Cybersécurité", "Data Science"],
      experts: 12,
      availability: "Lun-Sam",
      image: "/html.jpg",
    },
    {
      id: 2,
      name: "Académie des Leaders Africains",
      category: "Business",
      rating: 4.7,
      location: "Abidjan, Côte d'Ivoire",
      description:
        "Formation en leadership, entrepreneuriat et gestion d'entreprise adaptée au contexte africain.",
      specialties: ["Entrepreneuriat", "Gestion de projet", "Marketing digital"],
      experts: 10,
      availability: "7j/7",
      image: "/html.jpg",
    },
    {
      id: 3,
      name: "Centre de Formation Linguistique Afrique",
      category: "Langues",
      rating: 4.9,
      location: "Casablanca, Maroc",
      description:
        "Institut spécialisé dans l'enseignement des langues avec des méthodes immersives adaptées aux besoins professionnels.",
      specialties: ["Français", "Anglais", "Arabe"],
      experts: 20,
      availability: "Lun-Ven",
      image: "/html.jpg",
    },
    {
      id: 4,
      name: "École des Arts et Culture",
      category: "Art",
      rating: 4.6,
      location: "Lagos, Nigeria",
      description:
        "Centre dédié à l'expression artistique et au développement des talents créatifs dans divers domaines artistiques.",
      specialties: ["Peinture", "Cinéma", "Musique"],
      experts: 8,
      availability: "Mer-Dim",
      image: "/html.jpg",
    },
    {
      id: 5,
      name: "Académie Africaine de Santé et Bien-être",
      category: "Santé",
      rating: 4.8,
      location: "Nairobi, Kenya",
      description:
        "Établissement spécialisé dans la formation aux pratiques de santé, de nutrition et de bien-être en Afrique.",
      specialties: ["Médecine traditionnelle", "Nutrition", "Yoga"],
      experts: 15,
      availability: "7j/7",
      image: "/html.jpg",
    },
    {
      id: 6,
      name: "Centre Africain d'Excellence Académique",
      category: "Éducation",
      rating: 4.7,
      location: "Accra, Ghana",
      description:
        "Institution dédiée à l'accompagnement scolaire et universitaire avec des programmes adaptés aux réalités africaines.",
      specialties: ["Mathématiques", "Physique", "Sciences sociales"],
      experts: 18,
      availability: "Lun-Sam",
      image: "/html.jpg",
    },
  ];
  

  // Filter cabinets based on search term and category
  const filteredCabinets = cabinets.filter((cabinet) => {
    const matchesSearch =
      cabinet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cabinet.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || cabinet.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Get unique categories
  const categories = ["all", ...new Set(cabinets.map((cabinet) => cabinet.category))]

  return (
    <div className="min-h-screen bg-[#0A0B1C]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1C1D33] to-[#0A0B1C] py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Nos Cabinets d&apos;Experts</h1>
            <p className="text-gray-300 text-lg mb-8">
              Découvrez notre réseau de cabinets spécialisés pour vous accompagner dans votre parcours
              d&apos;apprentissage et de développement personnel.
            </p>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Rechercher un cabinet..."
                  className="pl-10 bg-[#1C1D33] border-gray-700 text-white placeholder:text-gray-500 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button className="bg-[#048B9A] hover:bg-[#037483] text-white">
                <FaFilter className="mr-2" /> Filtrer
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="bg-[#151627] border border-gray-800 p-1 text-white">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => setSelectedCategory(category)}
                className="data-[state=active]:bg-[#048B9A] data-[state=active]:text-white"
              >
                {category === "all" ? "Tous" : category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCabinets.length > 0 ? (
            filteredCabinets.map((cabinet) => <CabinetCard key={cabinet.id} cabinet={cabinet} />)
          ) : (
            <motion.div variants={itemVariants} className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">Aucun cabinet ne correspond à votre recherche.</p>
            </motion.div>
          )}
        </motion.div>

        {filteredCabinets.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-12"
          >
            <Button variant="outline" className="border-gray-700 text-[#048B9A] hover:bg-[#151627] hover:text-white">
              Voir plus de cabinets
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

