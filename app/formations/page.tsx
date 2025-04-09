"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { db } from "@/services/firestore"
import { collection, getDocs, query } from "firebase/firestore"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
  FaGraduationCap,
  FaRegClock,
  FaSearch,
  FaStar,
  FaTimes
} from "react-icons/fa"

// Fix the filters state type definition by adding proper TypeScript interfaces

// At the top of the file, add these interfaces:
interface FilterState {
  categories: string[]
  levels: string[]
  priceRange: [number, number]
  freeOnly: boolean
  durations: string[]
  minRating: number
}

// Définition du type Formation
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
  chapitres: any[]; // Vous pouvez définir une interface plus précise si nécessaire
  cree_le: any; // Timestamp Firestore
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

// Course card component
const CourseCard = ({ course }: { course: Formation }) => {
  const router = useRouter()
  return (
    <motion.div
      onClick={() => router.push(`/formations/${course.id}`)}
      variants={itemVariants}
      className="bg-[#151627] rounded-xl overflow-hidden border border-gray-800 hover:border-[#048B9A] transition-all duration-300 hover:shadow-lg hover:shadow-[#048B9A]/10 flex flex-col h-full"
    >
      <div className="relative h-48">
        <Image src={course.imageUrl || "/placeholder.svg"} alt={course.titre} fill className="object-cover" />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-white line-clamp-2">{course.titre}</h3>
        </div>

        <div className="flex items-center mb-3">
          <div className="flex items-center text-gray-400">
            <FaRegClock className="mr-1" />
            <span className="text-sm">{course.nombreDeCours} cours</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className="border-gray-700 text-gray-300">
            {course.categorie}
          </Badge>
        </div>

        <p className="text-gray-300 mb-4 text-sm line-clamp-2 flex-grow">{course.description}</p>

        <div className="flex flex-wrap gap-3 mb-4 text-sm">
          <div className="flex items-center text-gray-400">
            <FaRegClock className="mr-1" />
            <span>{course.duree}</span>
          </div>
          <div className="flex items-center text-gray-400">
            <FaGraduationCap className="mr-1" />
            <span>{course.niveau}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center">
            <span className="text-xl font-bold text-white">{course.prix.toLocaleString()} GNF</span>
          </div>
          <Button className="bg-[#048B9A] hover:bg-[#037483] text-white">S'inscrire</Button>
        </div>
      </div>
    </motion.div>
  )
}

// Filter sidebar component
const FilterSidebar = ({
  isOpen,
  onClose,
  filters,
  setFilters,
  applyFilters,
  clearFilters,
  categories,
  niveaux,
}: {
  isOpen: boolean
  onClose: () => void
  filters: FilterState
  setFilters: (filters: FilterState) => void
  applyFilters: () => void
  clearFilters: () => void
  categories: string[]
  niveaux: string[]
}) => {
  const sidebarVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className={`fixed lg:relative top-0 left-0 h-screen lg:h-auto overflow-y-auto w-[280px] bg-[#151627] border-r border-gray-800 p-5 z-50 ${
          isOpen ? "block" : "hidden lg:block"
        }`}
        variants={sidebarVariants}
        initial="hidden"
        animate={isOpen ? "visible" : "visible"} // Always visible on desktop
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">Filtres</h2>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
            <FaTimes />
          </button>
        </div>

        <div className="space-y-6">
          {/* Categories */}
          <div>
            <h3 className="text-white font-medium mb-3">Catégories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilters({
                          ...filters,
                          categories: [...filters.categories, category],
                        })
                      } else {
                        setFilters({
                          ...filters,
                          categories: filters.categories.filter((c: string) => c !== category),
                        })
                      }
                    }}
                    className="border-gray-700 data-[state=checked]:bg-[#048B9A] data-[state=checked]:border-[#000000]"
                  />
                  <Label htmlFor={`category-${category}`} className="ml-2 text-gray-300 text-sm">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-gray-800" />

          {/* Level */}
          <div>
            <h3 className="text-white font-medium mb-3">Niveau</h3>
            <div className="space-y-2">
              {niveaux.map((level) => (
                <div key={level} className="flex items-center">
                  <Checkbox
                    id={`level-${level}`}
                    checked={filters.levels.includes(level)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilters({
                          ...filters,
                          levels: [...filters.levels, level],
                        })
                      } else {
                        setFilters({
                          ...filters,
                          levels: filters.levels.filter((l: string) => l !== level),
                        })
                      }
                    }}
                    className="border-gray-700 data-[state=checked]:bg-[#048B9A] data-[state=checked]:border-[#000000]"
                  />
                  <Label htmlFor={`level-${level}`} className="ml-2 text-gray-300 text-sm">
                    {level}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-gray-800" />

          {/* Price Range */}
          <div>
            <h3 className="text-white font-medium mb-3">Prix</h3>
            <div className="space-y-4">
              <Slider
                defaultValue={[filters.priceRange[1]]}
                max={5000000}
                step={100000}
                onValueChange={(value) => {
                  setFilters({
                    ...filters,
                    priceRange: [0, value[0]],
                  })
                }}
                className="mt-6"
              />
              <div className="flex justify-between text-sm text-gray-400">
                <span>0 GNF</span>
                <span>Max: {filters.priceRange[1].toLocaleString()} GNF</span>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="free-courses"
                  checked={filters.freeOnly}
                  onCheckedChange={(checked) => {
                    setFilters({
                      ...filters,
                      freeOnly: !!checked,
                    })
                  }}
                  className="border-gray-700 data-[state=checked]:bg-[#048B9A] data-[state=checked]:border-[#000000]"
                />
                <Label htmlFor="free-courses" className="ml-2 text-gray-300 text-sm">
                  Cours gratuits uniquement
                </Label>
              </div>
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <Button onClick={applyFilters} className="w-full bg-[#048B9A] hover:bg-[#037483] text-white">
              Appliquer les filtres
            </Button>
            <Button
              onClick={clearFilters}
              variant="outline"
              className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Réinitialiser
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default function FormationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  // Then update the useState calls to use the proper type:
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    levels: [],
    priceRange: [0, 300],
    freeOnly: false,
    durations: [],
    minRating: 0,
  })

  const [appliedFilters, setAppliedFilters] = useState<FilterState>({
    categories: [],
    levels: [],
    priceRange: [0, 300],
    freeOnly: false,
    durations: [],
    minRating: 0,
  })

  // État pour stocker les formations récupérées de Firestore
  const [formations, setFormations] = useState<Formation[]>([])
  const [loading, setLoading] = useState(true)

  // Récupération des formations depuis Firestore
  useEffect(() => {
    const fetchFormations = async () => {
      try {
        setLoading(true)
        const formationsRef = collection(db, "formations")
        
        // Récupérer les formations sans tri spécifique
        const formationsQuery = query(formationsRef)
        const querySnapshot = await getDocs(formationsQuery)
        
        // Afficher les données brutes pour chaque document
        console.log("=== DONNÉES BRUTES DES FORMATIONS ===");
        querySnapshot.docs.forEach((doc, index) => {
          console.log(`Formation ${index + 1} (ID: ${doc.id}):`, doc.data());
        });
        
        const formationsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Formation[]

        console.log("=== TABLEAU COMPLET DES FORMATIONS ===");
        console.log(formationsData);
        
        // Afficher la structure du premier document pour référence
        if (formationsData.length > 0) {
          console.log("=== STRUCTURE DU PREMIER DOCUMENT ===");
          console.log("Clés disponibles:", Object.keys(formationsData[0]));
          console.log("Exemple de formation:", formationsData[0]);
        }
        
        setFormations(formationsData)
      } catch (error) {
        console.error("Erreur lors de la récupération des formations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFormations()
  }, [])

  // Filter and sort courses
  const filterCourses = () => {
    if (loading) return []
    
    return formations
      .filter((course) => {
        // Search term filter
        const matchesSearch =
          course.titre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description?.toLowerCase().includes(searchTerm.toLowerCase())

        // Category filter
        const matchesCategory =
          appliedFilters.categories.length === 0 ||
          appliedFilters.categories.includes(course.categorie)

        // Level filter
        const matchesLevel = appliedFilters.levels.length === 0 || appliedFilters.levels.includes(course.niveau)

        // Price filter
        const matchesPrice =
          course.prix >= appliedFilters.priceRange[0] && course.prix <= appliedFilters.priceRange[1]

        // Free courses filter
        const matchesFree = !appliedFilters.freeOnly || course.prix === 0

        // Duration filter (simplified for demo)
        const matchesDuration = appliedFilters.durations.length === 0 || true

        return (
          matchesSearch &&
          matchesCategory &&
          matchesLevel &&
          matchesPrice &&
          matchesFree &&
          matchesDuration
        )
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "popular":
            return (b.nombreDeCours || 0) - (a.nombreDeCours || 0)
          case "newest":
            // Utiliser cree_le si disponible, sinon l'ID
            if (a.cree_le && b.cree_le) {
              return b.cree_le.seconds - a.cree_le.seconds
            }
            return b.id.localeCompare(a.id)
          case "price-low":
            return (a.prix || 0) - (b.prix || 0)
          case "price-high":
            return (b.prix || 0) - (a.prix || 0)
          default:
            return 0
        }
      })
  }

  const filteredCourses = filterCourses()

  // Pagination
  const coursesPerPage = 6
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage)
  const currentCourses = filteredCourses.slice((currentPage - 1) * coursesPerPage, currentPage * coursesPerPage)

  // Apply filters
  const applyFilters = () => {
    setAppliedFilters({ ...filters })
    setCurrentPage(1)
    setSidebarOpen(false)
  }

  // Clear filters
  const clearFilters = () => {
    const resetFilters: FilterState = {
      categories: [],
      levels: [],
      priceRange: [0, 300],
      freeOnly: false,
      durations: [],
      minRating: 0,
    }
    setFilters(resetFilters)
    setAppliedFilters(resetFilters)
    setCurrentPage(1)
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Récupérer les catégories et niveaux uniques
  const uniqueCategories = [...new Set(formations.map(formation => formation.categorie))] as string[];
  const uniqueNiveaux = [...new Set(formations.map(formation => formation.niveau))] as string[];

  return (
    <div className="min-h-screen bg-[#0A0B1C]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1C1D33] to-[#0A0B1C] py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Nos Formations</h1>
            <p className="text-gray-300 text-lg mb-8">
              Découvrez notre catalogue de formations pour développer vos compétences et atteindre vos objectifs
              professionnels.
            </p>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Rechercher une formation..."
                  className="pl-10 bg-[#1C1D33] border-gray-700 text-white placeholder:text-gray-500 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button
                className="lg:hidden bg-[#048B9A] hover:bg-[#037483] text-white"
                onClick={() => setSidebarOpen(true)}
              >
                <FaFilter className="mr-2" /> Filtres
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <FilterSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            filters={filters}
            setFilters={setFilters}
            applyFilters={applyFilters}
            clearFilters={clearFilters}
            categories={uniqueCategories}
            niveaux={uniqueNiveaux}
          />

          {/* Course listings */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-300">{filteredCourses.length} formations trouvées</p>
              </div>

              <div className="flex items-center">
                <span className="text-gray-300 mr-2">Trier par:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px] bg-[#1C1D33] border-gray-700 text-white">
                    <SelectValue placeholder="Popularité" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1C1D33] border-gray-700 text-white">
                    <SelectItem value="popular">Popularité</SelectItem>
                    <SelectItem value="rating">Meilleures notes</SelectItem>
                    <SelectItem value="newest">Plus récents</SelectItem>
                    <SelectItem value="price-low">Prix croissant</SelectItem>
                    <SelectItem value="price-high">Prix décroissant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Applied filters */}
            {(appliedFilters.categories.length > 0 ||
              appliedFilters.levels.length > 0 ||
              appliedFilters.minRating > 0 ||
              appliedFilters.freeOnly) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {appliedFilters.categories.map((category) => (
                  <Badge
                    key={`filter-${category}`}
                    className="bg-[#1C1D33] text-white border border-gray-700 flex items-center gap-1 px-3 py-1"
                  >
                    {category}
                    <button
                      onClick={() => {
                        setFilters({
                          ...filters,
                          categories: filters.categories.filter((c) => c !== category),
                        })
                        setAppliedFilters({
                          ...appliedFilters,
                          categories: appliedFilters.categories.filter((c) => c !== category),
                        })
                      }}
                      className="text-gray-400 hover:text-white"
                    >
                      <FaTimes size={12} />
                    </button>
                  </Badge>
                ))}

                {appliedFilters.levels.map((level) => (
                  <Badge
                    key={`filter-${level}`}
                    className="bg-[#1C1D33] text-white border border-gray-700 flex items-center gap-1 px-3 py-1"
                  >
                    {level}
                    <button
                      onClick={() => {
                        setFilters({
                          ...filters,
                          levels: filters.levels.filter((l) => l !== level),
                        })
                        setAppliedFilters({
                          ...appliedFilters,
                          levels: appliedFilters.levels.filter((l) => l !== level),
                        })
                      }}
                      className="text-gray-400 hover:text-white"
                    >
                      <FaTimes size={12} />
                    </button>
                  </Badge>
                ))}

                {appliedFilters.minRating > 0 && (
                  <Badge className="bg-[#1C1D33] text-white border border-gray-700 flex items-center gap-1 px-3 py-1">
                    {appliedFilters.minRating}+ <FaStar className="text-yellow-400" />
                    <button
                      onClick={() => {
                        setFilters({
                          ...filters,
                          minRating: 0,
                        })
                        setAppliedFilters({
                          ...appliedFilters,
                          minRating: 0,
                        })
                      }}
                      className="text-gray-400 hover:text-white ml-1"
                    >
                      <FaTimes size={12} />
                    </button>
                  </Badge>
                )}

                {appliedFilters.freeOnly && (
                  <Badge className="bg-[#1C1D33] text-white border border-gray-700 flex items-center gap-1 px-3 py-1">
                    Gratuit uniquement
                    <button
                      onClick={() => {
                        setFilters({
                          ...filters,
                          freeOnly: false,
                        })
                        setAppliedFilters({
                          ...appliedFilters,
                          freeOnly: false,
                        })
                      }}
                      className="text-gray-400 hover:text-white ml-1"
                    >
                      <FaTimes size={12} />
                    </button>
                  </Badge>
                )}

                <Button
                  variant="link"
                  onClick={clearFilters}
                  className="text-[#048B9A] hover:text-[#037483] p-0 h-auto"
                >
                  Effacer tous les filtres
                </Button>
              </div>
            )}

            {/* Courses grid */}
            {loading ? (
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="text-center py-12 bg-[#151627] rounded-lg"
              >
                <p className="text-gray-400 text-lg mb-4">Chargement des formations...</p>
              </motion.div>
            ) : currentCourses.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr"
              >
                {currentCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="text-center py-12 bg-[#151627] rounded-lg"
              >
                <p className="text-gray-400 text-lg mb-4">Aucune formation ne correspond à votre recherche.</p>
                <Button onClick={clearFilters} className="bg-[#048B9A] hover:bg-[#037483] text-white">
                  Réinitialiser les filtres
                </Button>
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="border-gray-700 text-[#048B9A] hover:bg-[#151627] hover:text-white"
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <FaChevronLeft className="mr-2" /> Précédent
                  </Button>

                  <div className="flex items-center gap-2 mx-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={page === currentPage ? "default" : "outline"}
                        className={
                          page === currentPage
                            ? "bg-[#048B9A] text-white hover:bg-[#037483]"
                            : "border-gray-700 text-[#048B9A] hover:bg-[#151627] hover:text-white"
                        }
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    className="border-gray-700 text-[#048B9A] hover:bg-[#151627] hover:text-white"
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Suivant <FaChevronRight className="ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

