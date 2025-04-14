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
    FaWhatsapp,
    FaBook,
    FaCalendarAlt,
    FaStar,
    FaUserGraduate,
    FaUsers,
    FaRegClock,
    FaGraduationCap
} from "react-icons/fa"
import { db } from "@/services/firestore"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { use, useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

// Interface pour le type de cabinet
interface Cabinet {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  location: any;
  experts: number;
  availability: string;
  specialties: string[];
  image: string;
  status?: string;
  contact?: {
    email?: string;
    phone?: string;
    website?: string;
  };
  team?: any[];
  services?: any[];
}

// Interface pour le type de formation en cabinet
interface CabinetFormation {
  id: string;
  cabinetId: string;
  titre: string;
  description: string;
  prix: number;
  duree: string;
  niveau: string;
  nombreDeCours?: number;
  dateDebut?: any;
  dateFin?: any;
  places?: number;
  imageUrl?: string;
  categorie?: string;
}

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

// Expert card component
const ExpertCard = ({ expert }: { expert: any }) => (
  <motion.div
    variants={itemVariants}
    className="bg-[#151627] rounded-xl overflow-hidden border border-gray-800 hover:border-[#048B9A] transition-all duration-300"
  >
    <div className="relative h-48">
      <Image src={expert.image || "/placeholder.svg"} alt={expert.name} fill className="object-cover" />
    </div>
    <div className="p-4">
      <h3 className="text-white font-medium mb-1">{expert.name}</h3>
      <p className="text-[#048B9A] text-sm mb-2">{expert.role}</p>
      <p className="text-gray-400 text-sm line-clamp-3">{expert.bio}</p>
    </div>
  </motion.div>
)

// Service card component
const ServiceCard = ({ service }: { service: any }) => (
  <motion.div
    variants={itemVariants}
    className="bg-[#151627] rounded-xl overflow-hidden border border-gray-800 p-5 hover:border-[#048B9A] transition-all duration-300"
  >
    <h3 className="text-white font-medium mb-2">{service.name}</h3>
    <p className="text-gray-400 text-sm mb-3">{service.description}</p>
    <div className="flex justify-between items-center">
      <span className="text-[#048B9A] font-medium">{service.price ? `${service.price.toLocaleString()} GNF` : 'Sur demande'}</span>
      <Badge variant="outline" className="border-gray-700 text-gray-300">
        {service.duration || 'Variable'}
      </Badge>
    </div>
  </motion.div>
)

// Formation card component
const FormationCard = ({ formation }: { formation: CabinetFormation }) => {
  const router = useRouter();
  
  return (
    <motion.div
      variants={itemVariants}
      onClick={() => router.push(`/formations/${formation.id}`)}
      className="bg-[#151627] rounded-xl overflow-hidden border border-gray-800 hover:border-[#048B9A] transition-all duration-300 hover:shadow-lg hover:shadow-[#048B9A]/10 flex flex-col h-full cursor-pointer"
    >
      <div className="relative h-48">
        <Image 
          src={formation.imageUrl|| "/placeholder.svg"} 
          alt={formation.titre} 
          fill 
          className="object-cover" 
        />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-white line-clamp-2">{formation.titre}</h3>
        </div>

        <div className="flex items-center mb-3">
          <div className="flex items-center text-gray-400">
            <FaRegClock className="mr-1" />
            <span className="text-sm">{formation.nombreDeCours || 0} cours</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className="border-gray-700 text-gray-300">
            {formation.categorie || "Non catégorisé"}
          </Badge>
        </div>

        <p className="text-gray-300 mb-4 text-sm line-clamp-2 flex-grow">{formation.description}</p>

        <div className="flex flex-wrap gap-3 mb-4 text-sm">
          <div className="flex items-center text-gray-400">
            <FaRegClock className="mr-1" />
            <span>{formation.duree}</span>
          </div>
          <div className="flex items-center text-gray-400">
            <FaGraduationCap className="mr-1" />
            <span>{formation.niveau}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center">
            <span className="text-xl font-bold text-white">{formation.prix.toLocaleString()} GNF</span>
          </div>
          <Button 
            className="bg-[#048B9A] hover:bg-[#037483] text-white"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/formations/${formation.id}/inscription`);
            }}
          >
            S'inscrire
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// Skeleton loader pour la page détail
const CabinetDetailSkeleton = () => (
  <div className="min-h-screen bg-[#0A0B1C]">
    {/* Header skeleton */}
    <div className="bg-gradient-to-r from-[#1C1D33] to-[#0A0B1C] py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cabinet info skeleton */}
          <div className="lg:w-2/3">
            <div className="flex flex-wrap gap-2 mb-4">
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>

            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-5/6 mb-6" />

            <div className="flex flex-wrap gap-3 mb-6">
              <Skeleton className="h-10 w-32 rounded-md" />
              <Skeleton className="h-10 w-32 rounded-md" />
              <Skeleton className="h-10 w-32 rounded-md" />
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
          </div>

          {/* Cabinet image skeleton */}
          <div className="lg:w-1/3">
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>

    {/* Content skeleton */}
    <div className="container mx-auto px-4 py-12">
      <Skeleton className="h-12 w-full mb-6 rounded-md" />
      
      <div className="bg-[#151627] border border-gray-800 rounded-lg p-6 mb-8">
        <Skeleton className="h-7 w-48 mb-4" />
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-3/4 mb-2" />
      </div>
      
      <Skeleton className="h-7 w-48 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-[#151627] rounded-xl overflow-hidden border border-gray-800">
            <Skeleton className="h-48 w-full" />
            <div className="p-4">
              <Skeleton className="h-5 w-1/2 mb-1" />
              <Skeleton className="h-4 w-1/3 mb-2" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
      
      <Skeleton className="h-7 w-48 mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-[#151627] rounded-xl overflow-hidden border border-gray-800 p-5">
            <Skeleton className="h-6 w-1/2 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-3" />
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-1/4" />
              <Skeleton className="h-6 w-1/5 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

// Main component
export default function CabinetDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [cabinet, setCabinet] = useState<Cabinet | null>(null)
  const [formations, setFormations] = useState<CabinetFormation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("about")
  const router = useRouter()
  
  // Résoudre la promesse des paramètres
  const resolvedParams = use(params)

  // Récupération des données du cabinet et des formations
  useEffect(() => {
    const fetchCabinetData = async () => {
      try {
        setLoading(true)
        const cabinetRef = doc(db, "cabinets", resolvedParams.id)
        const cabinetSnap = await getDoc(cabinetRef)
        
        if (cabinetSnap.exists()) {
          const cabinetData = {
            id: cabinetSnap.id,
            ...cabinetSnap.data()
          } as Cabinet
          
          setCabinet(cabinetData)
          console.log("Cabinet récupéré:", cabinetData)
          
          // Récupérer les formations du cabinet
          const formationsRef = collection(db, "cabinet_formations")
          const q = query(formationsRef, where("cabinetId", "==", resolvedParams.id))
          const formationsSnap = await getDocs(q)
          
          const formationsList = formationsSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          } as CabinetFormation))
          
          setFormations(formationsList)
          console.log("Formations récupérées:", formationsList.length)
        } else {
          setError("Cabinet non trouvé")
          console.error("Cabinet non trouvé")
        }
      } catch (error) {
        setError("Erreur lors de la récupération des données")
        console.error("Erreur lors de la récupération des données:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCabinetData()
  }, [resolvedParams.id])

  // Formater l'emplacement
  const formatLocation = (location: any) => {
    if (!location) return "Emplacement non spécifié";
    
    if (typeof location === 'string') return location;
    
    if (typeof location === 'object') {
      return location.city || location.address || "Emplacement non spécifié";
    }
    
    return "Emplacement non spécifié";
  }

  if (loading) {
    return <CabinetDetailSkeleton />
  }

  if (error || !cabinet) {
    return (
      <div className="min-h-screen bg-[#0A0B1C] flex flex-col items-center justify-center p-4">
        <div className="text-white text-xl mb-4">{error || "Cabinet non trouvé"}</div>
        <Button 
          onClick={() => router.push('/cabinets')}
          className="bg-[#048B9A] hover:bg-[#037483] text-white"
        >
          Retour aux cabinets
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0B1C]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1C1D33] to-[#0A0B1C] py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cabinet info */}
            <div className="lg:w-2/3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-[#048B9A] text-white hover:bg-[#037483]">
                    {cabinet.category}
                  </Badge>
                  {cabinet.status && (
                    <Badge className={`${cabinet.status === 'active' ? 'bg-green-600' : 'bg-yellow-600'} text-white`}>
                      {cabinet.status === 'active' ? 'Actif' : 'En attente'}
                    </Badge>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{cabinet.name}</h1>

                <p className="text-gray-300 text-lg mb-6">{cabinet.description}</p>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center text-gray-300">
                    <FaMapMarkerAlt className="mr-2 text-gray-400" />
                    <span>{formatLocation(cabinet.location)}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-300">
                    <FaUserGraduate className="mr-2 text-gray-400" />
                    <span>{cabinet.experts} experts</span>
                  </div>
                  
                  <div className="flex items-center text-gray-300">
                    <FaCalendarAlt className="mr-2 text-gray-400" />
                    <span>{cabinet.availability}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-300">
                    <FaStar className="mr-2 text-yellow-400" />
                    <span>{cabinet.rating}/5</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {cabinet.specialties && cabinet.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline" className="border-gray-700 text-gray-300">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Cabinet image */}
            <div className="lg:w-1/3">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="rounded-lg overflow-hidden"
              >
                <Image
                  src={cabinet.image || "/placeholder.svg"}
                  alt={cabinet.name}
                  width={500}
                  height={300}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="about" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-[#151627] border border-gray-800 p-1 mb-6 w-full grid grid-cols-4">
            <TabsTrigger
              value="about"
              className="data-[state=active]:bg-[#048B9A] data-[state=active]:text-white"
            >
              À propos
            </TabsTrigger>
            <TabsTrigger
              value="team"
              className="data-[state=active]:bg-[#048B9A] data-[state=active]:text-white"
            >
              Équipe
            </TabsTrigger>
            <TabsTrigger
              value="services"
              className="data-[state=active]:bg-[#048B9A] data-[state=active]:text-white"
            >
              Services
            </TabsTrigger>
            <TabsTrigger
              value="formations"
              className="data-[state=active]:bg-[#048B9A] data-[state=active]:text-white"
            >
              Formations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-[#151627] border border-gray-800 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">À propos de ce cabinet</h2>
                <p className="text-gray-300 whitespace-pre-line mb-6">{cabinet.description}</p>
                
                {cabinet.contact && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-white mb-3">Informations de contact</h3>
                    <div className="space-y-3">
                      {cabinet.contact.email && (
                        <div className="flex items-center text-gray-300">
                          <FaEnvelope className="text-[#048B9A] mr-3 w-5 h-5" />
                          <span>{cabinet.contact.email}</span>
                        </div>
                      )}
                      {cabinet.contact.phone && (
                        <div className="flex items-center text-gray-300">
                          <FaPhone className="text-[#048B9A] mr-3 w-5 h-5" />
                          <span>{cabinet.contact.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="team">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold text-white mb-6">Notre équipe d'experts</h2>
              
              {cabinet.team && cabinet.team.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {cabinet.team.map((expert, index) => (
                    <ExpertCard key={index} expert={expert} />
                  ))}
                </motion.div>
              ) : (
                <div className="bg-[#151627] border border-gray-800 rounded-lg p-6 text-center">
                  <FaUsers className="mx-auto text-gray-600 mb-3 w-12 h-12" />
                  <p className="text-gray-400">Aucune information sur l'équipe n'est disponible pour le moment.</p>
                </div>
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="services">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold text-white mb-6">Nos services</h2>
              
              {cabinet.services && cabinet.services.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {cabinet.services.map((service, index) => (
                    <ServiceCard key={index} service={service} />
                  ))}
                </motion.div>
              ) : (
                <div className="bg-[#151627] border border-gray-800 rounded-lg p-6 text-center">
                  <p className="text-gray-400">Aucune information sur les services n'est disponible pour le moment.</p>
                </div>
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="formations">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold text-white mb-6">Nos formations</h2>
              
              {formations.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {formations.map((formation) => (
                    <FormationCard key={formation.id} formation={formation} />
                  ))}
                </motion.div>
              ) : (
                <div className="bg-[#151627] border border-gray-800 rounded-lg p-6 text-center">
                  <FaBook className="mx-auto text-gray-600 mb-3 w-12 h-12" />
                  <p className="text-gray-400">Aucune formation n'est proposée par ce cabinet pour le moment.</p>
                </div>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 