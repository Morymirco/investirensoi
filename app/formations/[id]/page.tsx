"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { db } from "@/services/firestore"
import { collection, doc, getDoc, getDocs, query, where, orderBy, serverTimestamp, addDoc } from "firebase/firestore"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { use, useEffect, useRef, useState } from "react"
import {
  FaCheck,
  FaChevronDown,
  FaChevronUp,
  FaGraduationCap,
  FaLaptop,
  FaRegCalendarAlt,
  FaRegClock,
  FaRegFileAlt
} from "react-icons/fa"
import { Skeleton } from "@/components/ui/skeleton"
import { StarIcon } from "lucide-react"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

// Interface pour le type de formation
interface Formation {
  id: string;
  titre: string;
  description: string;
  categorie: string;
  nombreDeCours: number;
  prix: number;
  imageUrl: string;
  duree: string;
  niveau: string;
  chapitres: any[];
  cree_le?: any;
}

// Interface pour les avis
interface Avis {
  id: string;
  formationId: string;
  nom: string;
  commentaire: string;
  note: number;
  date: any;
}

// Curriculum accordion component
const CurriculumAccordion = ({ chapitres }: { chapitres: any[] }) => {
  const [openModules, setOpenModules] = useState<number[]>([0])

  const toggleModule = (index: number) => {
    if (openModules.includes(index)) {
      setOpenModules(openModules.filter((i) => i !== index))
    } else {
      setOpenModules([...openModules, index])
    }
  }

  return (
    <div className="space-y-4">
      {chapitres.map((chapitre, index) => (
        <div key={index} className="border border-gray-800 rounded-lg overflow-hidden">
          <button
            className="w-full flex justify-between items-center p-4 bg-[#1C1D33] hover:bg-[#23243c] transition-colors text-left"
            onClick={() => toggleModule(index)}
          >
            <div className="flex items-center">
              <span className="text-[#048B9A] font-medium mr-3">Chapitre {index + 1}:</span>
              <span className="text-white font-medium">{chapitre.titre}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 text-sm mr-3">
                {chapitre.lecons?.length || 0} leçons • {chapitre.duree || "N/A"}
              </span>
              {openModules.includes(index) ? (
                <FaChevronUp className="text-gray-400" />
              ) : (
                <FaChevronDown className="text-gray-400" />
              )}
            </div>
          </button>

          <AnimatePresence>
            {openModules.includes(index) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="divide-y divide-gray-800">
                  {(chapitre.lecons || []).map((lecon: any, leconIndex: number) => (
                    <div key={leconIndex} className="p-4 bg-[#151627] flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-7 h-7 flex items-center justify-center mr-3">
                          <FaRegFileAlt className="text-gray-500 w-3 h-3" />
                        </div>
                        <span className="text-gray-300">{lecon.titre}</span>
                      </div>
                      <span className="text-gray-400 text-sm">{lecon.duree || "N/A"}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
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

// Course card component for related courses
const RelatedCourseCard = ({ course }: { course: Formation }) => {
  const router = useRouter()
  
  return (
    <motion.div
      variants={itemVariants}
      className="bg-[#151627] rounded-xl overflow-hidden border border-gray-800 hover:border-[#048B9A] transition-all duration-300 hover:shadow-lg hover:shadow-[#048B9A]/10 cursor-pointer"
      onClick={() => router.push(`/formations/${course.id}`)}
    >
      <div className="relative h-40">
        <Image src={course.imageUrl || "/placeholder.svg"} alt={course.titre} fill className="object-cover" />
      </div>

      <div className="p-4">
        <h3 className="text-white font-medium mb-2 line-clamp-2">{course.titre}</h3>

        <div className="flex items-center text-gray-400 mb-2">
          <FaRegClock className="mr-1 w-3 h-3" />
          <span className="text-sm">{course.duree}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-white font-bold">{course.prix.toLocaleString()} GNF</span>
        </div>
      </div>
    </motion.div>
  )
}

// Skeleton loader pour la page détail
const FormationDetailSkeleton = () => (
  <div className="min-h-screen bg-[#0A0B1C]">
    {/* Header skeleton */}
    <div className="bg-gradient-to-r from-[#1C1D33] to-[#0A0B1C] py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Course info skeleton */}
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

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Skeleton className="h-5 w-40" />
            </div>

            <Skeleton className="h-10 w-48 rounded-md mb-8" />
          </div>

          {/* Course sidebar skeleton */}
          <div className="hidden lg:block lg:w-1/3">
            <div className="bg-[#151627] border border-gray-800 rounded-lg p-5">
              <Skeleton className="h-48 w-full mb-4 rounded-md" />

              <div className="mb-4">
                <Skeleton className="h-8 w-1/2 mb-2" />
              </div>

              <Skeleton className="h-14 w-full rounded-md mb-3" />
              <Skeleton className="h-4 w-full mb-6" />

              <Skeleton className="h-5 w-3/4 mb-4" />
              <div className="space-y-4">
                <div className="flex items-center">
                  <Skeleton className="h-5 w-5 mr-3 rounded-full" />
                  <Skeleton className="h-5 w-1/2" />
                </div>
                <div className="flex items-center">
                  <Skeleton className="h-5 w-5 mr-3 rounded-full" />
                  <Skeleton className="h-5 w-1/2" />
                </div>
                <div className="flex items-center">
                  <Skeleton className="h-5 w-5 mr-3 rounded-full" />
                  <Skeleton className="h-5 w-1/2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Course content skeleton */}
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Skeleton className="h-12 w-full mb-6 rounded-md" />
          
          <div className="bg-[#151627] border border-gray-800 rounded-lg p-6 mb-8">
            <Skeleton className="h-7 w-48 mb-4" />
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-3/4 mb-2" />
          </div>
          
          <div className="bg-[#151627] border border-gray-800 rounded-lg p-6 mb-8">
            <Skeleton className="h-7 w-64 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="flex">
                  <Skeleton className="h-5 w-5 mr-3 rounded-full" />
                  <Skeleton className="h-5 w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar for related courses skeleton */}
        <div className="hidden lg:block">
          <div className="sticky top-8 space-y-6">
            <div className="bg-[#151627] border border-gray-800 rounded-lg p-6">
              <Skeleton className="h-7 w-48 mb-4" />
              
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="bg-[#1C1D33] rounded-xl overflow-hidden border border-gray-800">
                    <Skeleton className="h-40 w-full" />
                    <div className="p-4">
                      <Skeleton className="h-5 w-full mb-2" />
                      <Skeleton className="h-4 w-1/3 mb-2" />
                      <Skeleton className="h-5 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

// Composant étoiles pour la notation
const StarRating = ({ rating, setRating, size = 24, interactive = true }: { 
  rating: number; 
  setRating?: (rating: number) => void;
  size?: number;
  interactive?: boolean;
}) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => interactive && setRating?.(star)}
          className={`${interactive ? 'cursor-pointer' : 'cursor-default'} p-1`}
          disabled={!interactive}
        >
          <StarIcon
            size={size}
            className={`${
              star <= rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-400'
            }`}
          />
        </button>
      ))}
    </div>
  )
}

// Composant pour afficher un avis
const AvisCard = ({ avis }: { avis: Avis }) => (
  <motion.div
    variants={itemVariants}
    className="bg-[#151627] rounded-xl p-6 border border-gray-800"
  >
    <div className="flex justify-between items-start mb-4">
      <div>
        <h4 className="text-white font-medium mb-1">{avis.nom}</h4>
        <p className="text-gray-400 text-sm">
          {new Date(avis.date?.seconds * 1000).toLocaleDateString()}
        </p>
      </div>
      <StarRating rating={avis.note} interactive={false} size={16} />
    </div>
    <p className="text-gray-300">{avis.commentaire}</p>
  </motion.div>
)

// Formulaire d'avis
const AvisForm = ({ formationId, onAvisSubmitted }: { 
  formationId: string;
  onAvisSubmitted: () => void;
}) => {
  const [nom, setNom] = useState("")
  const [commentaire, setCommentaire] = useState("")
  const [note, setNote] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!nom || !commentaire || note === 0) {
      toast.error("Veuillez remplir tous les champs et donner une note")
      return
    }

    try {
      setLoading(true)
      
      await addDoc(collection(db, "formation_avis"), {
        formationId,
        nom,
        commentaire,
        note,
        date: serverTimestamp()
      })

      setNom("")
      setCommentaire("")
      setNote(0)
      onAvisSubmitted()
      toast.success("Merci pour votre avis !")
      
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'avis:", error)
      toast.error("Une erreur s'est produite lors de l'envoi de votre avis")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="nom">Votre nom</Label>
        <Input
          id="nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="bg-[#1C1D33] border-gray-700 text-white"
          placeholder="Entrez votre nom"
          required
        />
      </div>
      
      <div>
        <Label>Note</Label>
        <div className="mt-2">
          <StarRating rating={note} setRating={setNote} />
        </div>
      </div>
      
      <div>
        <Label htmlFor="commentaire">Votre avis</Label>
        <Textarea
          id="commentaire"
          value={commentaire}
          onChange={(e) => setCommentaire(e.target.value)}
          className="bg-[#1C1D33] border-gray-700 text-white"
          placeholder="Partagez votre expérience avec cette formation..."
          required
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-[#048B9A] hover:bg-[#037483] text-white"
        disabled={loading}
      >
        {loading ? (
          <>
            <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            Envoi en cours...
          </>
        ) : (
          "Publier l'avis"
        )}
      </Button>
    </form>
  )
}

// Main component
export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [formation, setFormation] = useState<Formation | null>(null)
  const [relatedFormations, setRelatedFormations] = useState<Formation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const courseContentRef = useRef<HTMLDivElement | null>(null)
  const router = useRouter()
  const [avis, setAvis] = useState<Avis[]>([])
  const [showAvisForm, setShowAvisForm] = useState(false)
  
  // Résoudre la promesse des paramètres
  const resolvedParams = use(params)

  // Récupération des données de la formation
  useEffect(() => {
    const fetchFormation = async () => {
      try {
        setLoading(true)
        const formationRef = doc(db, "formations", resolvedParams.id)
        const formationSnap = await getDoc(formationRef)
        
        if (formationSnap.exists()) {
          const formationData = {
            id: formationSnap.id,
            ...formationSnap.data()
          } as Formation
          
          setFormation(formationData)
          
          // Récupérer les formations similaires (même catégorie)
          const formationsRef = collection(db, "formations")
          const q = query(
            formationsRef, 
            where("categorie", "==", formationData.categorie),
            // Limiter à 4 résultats pour en avoir au moins 3 après filtrage
            // de la formation actuelle
          )
          
          const querySnapshot = await getDocs(q)
          const similarFormations = querySnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() } as Formation))
            .filter(f => f.id !== resolvedParams.id) // Exclure la formation actuelle
            .slice(0, 3) // Limiter à 3 formations similaires
          
          setRelatedFormations(similarFormations)
          console.log(`Trouvé ${similarFormations.length} formations similaires dans la catégorie "${formationData.categorie}"`)
        } else {
          setError("Formation non trouvée")
          console.error("Formation non trouvée")
        }
      } catch (error) {
        setError("Erreur lors de la récupération de la formation")
        console.error("Erreur lors de la récupération de la formation:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFormation()
  }, [resolvedParams.id])

  // Fonction pour récupérer les avis
  const fetchAvis = async (formationId: string) => {
    try {
      const avisRef = collection(db, "formation_avis")
      const q = query(
        avisRef,
        where("formationId", "==", formationId),
        orderBy("date", "desc")
      )
      const querySnapshot = await getDocs(q)
      const avisList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Avis))
      setAvis(avisList)
    } catch (error) {
      console.error("Erreur lors de la récupération des avis:", error)
    }
  }

  useEffect(() => {
    if (resolvedParams.id) {
      fetchAvis(resolvedParams.id)
    }
  }, [resolvedParams.id])

  // Fonction pour faire défiler jusqu'au contenu du cours
  const scrollToCourseContent = () => {
    courseContentRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  if (loading) {
    return <FormationDetailSkeleton />
  }

  if (error || !formation) {
    return (
      <div className="min-h-screen bg-[#0A0B1C] flex flex-col items-center justify-center p-4">
        <div className="text-white text-xl mb-4">{error || "Formation non trouvée"}</div>
        <Button 
          onClick={() => router.push('/formations')}
          className="bg-[#048B9A] hover:bg-[#037483] text-white"
        >
          Retour aux formations
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
            {/* Course info */}
            <div className="lg:w-2/3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-[#048B9A]/20 text-[#048B9A] hover:bg-[#048B9A]/30">
                    {formation.categorie}
                  </Badge>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{formation.titre}</h1>

                <p className="text-gray-300 text-lg mb-6">{formation.description}</p>

                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center bg-[#151627] px-3 py-2 rounded-md">
                    <FaRegClock className="text-gray-400 mr-2" />
                    <span className="text-gray-300">{formation.duree}</span>
                  </div>

                  <div className="flex items-center bg-[#151627] px-3 py-2 rounded-md">
                    <FaGraduationCap className="text-gray-400 mr-2" />
                    <span className="text-gray-300">{formation.niveau}</span>
                  </div>

                  <div className="flex items-center bg-[#151627] px-3 py-2 rounded-md">
                    <FaLaptop className="text-gray-400 mr-2" />
                    <span className="text-gray-300">{formation.nombreDeCours} cours</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center text-gray-300">
                    <FaRegCalendarAlt className="mr-2 text-gray-400" />
                    <span>Mis à jour {formation.cree_le ? new Date(formation.cree_le.seconds * 1000).toLocaleDateString() : 'récemment'}</span>
                  </div>
                </div>

                <div className="flex space-x-4 mb-8">
                  <Button
                    variant="outline"
                    className="border-gray-700 text-[#048B9A] hover:bg-[#151627] hover:text-white"
                    onClick={scrollToCourseContent}
                  >
                    Voir le contenu du cours
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Course sidebar (desktop) */}
            <div className="hidden lg:block lg:w-1/3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-[#151627] border border-gray-800 rounded-lg p-5 sticky top-8"
              >
                <div className="relative aspect-video mb-4">
                  <Image
                    src={formation.imageUrl || "/placeholder.svg"}
                    alt={formation.titre}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-white">{formation.prix.toLocaleString()} GNF</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    className="w-full bg-[#048B9A] hover:bg-[#037483] text-white text-lg py-6"
                    onClick={() => router.push(`/formations/${formation.id}/inscription`)}
                  >
                    Réserver ma place
                  </Button>
                  <p className="text-center text-gray-400 text-sm">
                    Paiement sécurisé • Garantie satisfait ou remboursé
                  </p>
                </div>

                <div className="space-y-4 mt-6">
                  <h3 className="text-white font-medium mb-2">Cette formation inclut :</h3>
                  <div className="flex items-center text-gray-300">
                    <FaRegClock className="text-[#048B9A] mr-3 w-5 h-5" />
                    <span>{formation.duree} de formation</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <FaRegFileAlt className="text-[#048B9A] mr-3 w-5 h-5" />
                    <span>{formation.nombreDeCours} cours</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <FaLaptop className="text-[#048B9A] mr-3 w-5 h-5" />
                    <span>Accès à vie au contenu</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Course content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-[#151627] border border-gray-800 p-1 mb-6 w-full grid grid-cols-2">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-[#048B9A] data-[state=active]:text-white"
                >
                  Aperçu
                </TabsTrigger>
                <TabsTrigger
                  value="curriculum"
                  className="data-[state=active]:bg-[#048B9A] data-[state=active]:text-white"
                >
                  Programme
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <div className="bg-[#151627] border border-gray-800 rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">À propos de ce cours</h2>
                    <p className="text-gray-300 whitespace-pre-line mb-6">{formation.description}</p>
                  </div>

                  <div className="bg-[#151627] border border-gray-800 rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">Ce que vous allez apprendre</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(formation.chapitres || []).map((chapitre, index) => (
                        <div key={index} className="flex">
                          <FaCheck className="text-[#048B9A] mt-1 mr-3 flex-shrink-0" />
                          <span className="text-gray-300">{chapitre.titre}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="curriculum">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  ref={courseContentRef}
                >
                  <div className="bg-[#151627] border border-gray-800 rounded-lg p-6 mb-8">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold text-white">Contenu du cours</h2>
                      <div className="text-gray-300 text-sm">
                        <span>{formation.chapitres?.length || 0} chapitres</span>
                        <span className="mx-2">•</span>
                        <span>{formation.nombreDeCours} cours</span>
                      </div>
                    </div>

                    <CurriculumAccordion chapitres={formation.chapitres || []} />
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>

            {/* Avis section */}
            <div className="bg-[#151627] border border-gray-800 rounded-lg p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-white">Avis des apprenants</h2>
                <Button
                  onClick={() => setShowAvisForm(!showAvisForm)}
                  className="bg-[#048B9A] hover:bg-[#037483] text-white"
                >
                  {showAvisForm ? "Fermer" : "Donner un avis"}
                </Button>
              </div>

              {showAvisForm && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#1C1D33] border border-gray-800 rounded-lg p-6 mb-8"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">Votre avis</h3>
                  <AvisForm 
                    formationId={resolvedParams.id} 
                    onAvisSubmitted={() => {
                      fetchAvis(resolvedParams.id)
                      setShowAvisForm(false)
                    }} 
                  />
                </motion.div>
              )}

              {avis.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 gap-6"
                >
                  {avis.map((avis) => (
                    <AvisCard key={avis.id} avis={avis} />
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">Aucun avis n'a encore été donné pour cette formation.</p>
                  <p className="text-gray-400 mt-2">Soyez le premier à partager votre expérience !</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar for related courses */}
          <div className="hidden lg:block">
            <div className="sticky top-8 space-y-6">
              <div className="bg-[#151627] border border-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-4">Formations similaires</h3>

                <div className="space-y-4">
                  {relatedFormations.length > 0 ? (
                    relatedFormations.map((relatedCourse) => (
                      <RelatedCourseCard key={relatedCourse.id} course={relatedCourse} />
                    ))
                  ) : (
                    <p className="text-gray-400">Aucune formation similaire disponible</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related courses (mobile) */}
        <div className="lg:hidden mt-8">
          <h3 className="text-xl font-medium text-white mb-6">Formations similaires</h3>

          {relatedFormations.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {relatedFormations.map((relatedCourse) => (
                <RelatedCourseCard key={relatedCourse.id} course={relatedCourse} />
              ))}
            </motion.div>
          ) : (
            <p className="text-gray-400 bg-[#151627] p-4 rounded-lg">Aucune formation similaire disponible</p>
          )}
        </div>
      </div>
    </div>
  )
}

