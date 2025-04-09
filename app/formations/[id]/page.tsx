"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { db } from "@/services/firestore"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
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

// Main component
export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [formation, setFormation] = useState<Formation | null>(null)
  const [relatedFormations, setRelatedFormations] = useState<Formation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const courseContentRef = useRef<HTMLDivElement | null>(null)
  const router = useRouter()
  
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
            where("categorie", "==", formationData.categorie)
          )
          
          const querySnapshot = await getDocs(q)
          const similarFormations = querySnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() } as Formation))
            .filter(f => f.id !== resolvedParams.id) // Exclure la formation actuelle
            .slice(0, 3) // Limiter à 3 formations similaires
          
          setRelatedFormations(similarFormations)
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

  // Fonction pour faire défiler jusqu'au contenu du cours
  const scrollToCourseContent = () => {
    courseContentRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0B1C] flex items-center justify-center">
        <div className="text-white text-xl">Chargement de la formation...</div>
      </div>
    )
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

