"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { FaCalendarAlt, FaFilter, FaMapMarkerAlt, FaSearch, FaStar, FaUserGraduate } from "react-icons/fa"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/services/firestore"
import { Skeleton } from "@/components/ui/skeleton"

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
const CabinetCard = ({ cabinet }: { cabinet: any }) => {
  // Vérifier et formater la localisation si c'est un objet
  const locationDisplay = typeof cabinet.location === 'object' 
    ? (cabinet.location.city || cabinet.location.address || "Emplacement non spécifié")
    : cabinet.location || "Emplacement non spécifié";

  return (
    <motion.div
      variants={itemVariants}
      className="bg-[#151627] rounded-xl overflow-hidden border border-gray-800 hover:border-[#048B9A] transition-all duration-300 hover:shadow-lg hover:shadow-[#048B9A]/10"
    >
      <div className="relative h-48">
        <Image src={cabinet.image || "/placeholder.svg"} alt={cabinet.name} fill className="object-cover" />
        <div className="absolute top-3 right-3">
          <Badge className="bg-[#048B9A] text-white hover:bg-[#037483]">{cabinet.category}</Badge>
        </div>
        {cabinet.status && (
          <div className="absolute top-3 left-3">
            <Badge className={`${cabinet.status === 'active' ? 'bg-green-600' : 'bg-yellow-600'} text-white`}>
              {cabinet.status === 'active' ? 'Actif' : 'En attente'}
            </Badge>
          </div>
        )}
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
          <span className="text-sm">{locationDisplay}</span>
        </div>

        <p className="text-gray-300 mb-4 line-clamp-2">{cabinet.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {cabinet.specialties && cabinet.specialties.map((specialty: string, index: number) => (
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

        <Link href={`/cabinets/${cabinet.id}`} className="block">
          <Button className="w-full bg-[#048B9A] hover:bg-[#037483] text-white">
            Voir les détails
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

// Skeleton loader component for cabinet cards
const CabinetCardSkeleton = () => (
  <div className="bg-[#151627] rounded-xl overflow-hidden border border-gray-800">
    <div className="relative h-48">
      <Skeleton className="h-full w-full" />
    </div>
    <div className="p-5">
      <div className="flex justify-between items-start mb-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-5 w-10" />
      </div>
      
      <div className="flex items-center mb-3">
        <Skeleton className="h-4 w-4 mr-2 rounded-full" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-4" />
      
      <div className="flex gap-2 mb-4">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  </div>
)

export default function CabinetsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [cabinets, setCabinets] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Récupération des cabinets depuis Firebase
  useEffect(() => {
    const fetchCabinets = async () => {
      try {
        setLoading(true)
        const cabinetsCollection = collection(db, "cabinets")
        const cabinetsSnapshot = await getDocs(cabinetsCollection)
        
        if (cabinetsSnapshot.empty) {
          console.log("Aucun cabinet trouvé dans la collection")
          setCabinets([])
        } else {
          const cabinetsList = cabinetsSnapshot.docs.map(doc => {
            const data = doc.data()
            console.log("Cabinet récupéré:", doc.id, data)
            return {
              id: doc.id,
              ...data,
              // Assurez-vous que ces champs existent pour éviter les erreurs
              name: data.name || "Sans nom",
              description: data.description || "Aucune description",
              category: data.category || "Non catégorisé",
              rating: data.rating || 0,
              experts: data.experts || 0,
              availability: data.availability || "Non spécifié",
              specialties: Array.isArray(data.specialties) ? data.specialties : [],
              image: data.image || "/placeholder.svg"
            }
          })
          setCabinets(cabinetsList)
          console.log("Nombre de cabinets récupérés:", cabinetsList.length)
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des cabinets:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCabinets()
  }, [])

  // Filter cabinets based on search term and category
  const filteredCabinets = cabinets.filter((cabinet) => {
    const matchesSearch =
      cabinet.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cabinet.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || cabinet.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Get unique categories
  const categories = ["all", ...new Set(cabinets.map((cabinet) => cabinet.category).filter(Boolean))]

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
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
              <TabsList className="bg-[#151627] border border-gray-800 p-1 text-white inline-flex whitespace-nowrap">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    onClick={() => setSelectedCategory(category)}
                    className="data-[state=active]:bg-[#048B9A] data-[state=active]:text-white flex-shrink-0"
                  >
                    {category === "all" ? "Tous" : category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0A0B1C] pointer-events-none md:hidden" />
          </div>
        </Tabs>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <CabinetCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <>
            {filteredCabinets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCabinets.map((cabinet) => (
                  <CabinetCard key={cabinet.id} cabinet={cabinet} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">Aucun cabinet ne correspond à votre recherche.</p>
              </div>
            )}
          </>
        )}

        {filteredCabinets.length > 0 && !loading && (
          <div className="flex justify-center mt-12">
            <Button variant="outline" className="border-gray-700 text-[#048B9A] hover:bg-[#151627] hover:text-white">
              Voir plus de cabinets
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

