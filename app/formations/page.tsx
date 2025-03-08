"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
  FaGraduationCap,
  FaLaptop,
  FaRegClock,
  FaSearch,
  FaStar,
  FaTimes,
  FaUser,
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
const CourseCard = ({ course }: { course: any }) => {
  const router = useRouter()
  return (
    <motion.div
      onClick={() => router.push(`/formations/${course.id}`)}
      variants={itemVariants}
      className="bg-[#151627] rounded-xl overflow-hidden border border-gray-800 hover:border-[#048B9A] transition-all duration-300 hover:shadow-lg hover:shadow-[#048B9A]/10"
    >
      <div className="relative h-48">
        <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
        {course.isBestseller && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-amber-500 text-white hover:bg-amber-600">Bestseller</Badge>
          </div>
        )}
        {course.discount > 0 && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-red-500 text-white hover:bg-red-600">-{course.discount}%</Badge>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-white line-clamp-2">{course.title}</h3>
        </div>

        <div className="flex items-center mb-3">
          <div className="flex items-center mr-3">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="text-white">{course.rating}</span>
            <span className="text-gray-400 ml-1">({course.reviewCount})</span>
          </div>
          <div className="flex items-center text-gray-400">
            <FaUser className="mr-1" />
            <span className="text-sm">{course.students} étudiants</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {course.categories.map((category: string, index: number) => (
            <Badge key={index} variant="outline" className="border-gray-700 text-gray-300">
              {category}
            </Badge>
          ))}
        </div>

        <p className="text-gray-300 mb-4 text-sm line-clamp-2">{course.description}</p>

        <div className="flex flex-wrap gap-3 mb-4 text-sm">
          <div className="flex items-center text-gray-400">
            <FaRegClock className="mr-1" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center text-gray-400">
            <FaGraduationCap className="mr-1" />
            <span>{course.level}</span>
          </div>
          <div className="flex items-center text-gray-400">
            <FaLaptop className="mr-1" />
            <span>{course.format}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold text-white">{course.price} €</span>
            {course.originalPrice && <span className="text-gray-400 line-through ml-2">{course.originalPrice} €</span>}
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
}: {
  isOpen: boolean
  onClose: () => void
  filters: FilterState
  setFilters: (filters: FilterState) => void
  applyFilters: () => void
  clearFilters: () => void
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
        className={`fixed lg:sticky top-0 left-0 h-screen lg:h-auto overflow-y-auto w-[280px] bg-[#151627] border-r border-gray-800 p-5 z-50 lg:z-0 ${isOpen ? "block" : "hidden lg:block"}`}
        variants={sidebarVariants}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
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
              {["Développement Web", "Business", "Design", "Marketing", "Langues", "Informatique"].map((category) => (
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
                    className="border-gray-700 data-[state=checked]:bg-[#048B9A] data-[state=checked]:border-[#048B9A]"
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
              {["Débutant", "Intermédiaire", "Avancé", "Tous niveaux"].map((level) => (
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
                    className="border-gray-700 data-[state=checked]:bg-[#048B9A] data-[state=checked]:border-[#048B9A]"
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
                max={500}
                step={10}
                onValueChange={(value) => {
                  setFilters({
                    ...filters,
                    priceRange: [0, value[0]],
                  })
                }}
                className="mt-6"
              />
              <div className="flex justify-between text-sm text-gray-400">
                <span>0 €</span>
                <span>Max: {filters.priceRange[1]} €</span>
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
                  className="border-gray-700 data-[state=checked]:bg-[#048B9A] data-[state=checked]:border-[#048B9A]"
                />
                <Label htmlFor="free-courses" className="ml-2 text-gray-300 text-sm">
                  Cours gratuits uniquement
                </Label>
              </div>
            </div>
          </div>

          <Separator className="bg-gray-800" />

          {/* Duration */}
          <div>
            <h3 className="text-white font-medium mb-3">Durée</h3>
            <div className="space-y-2">
              {[
                { label: "Moins de 3 heures", value: "short" },
                { label: "3-6 heures", value: "medium" },
                { label: "6-12 heures", value: "long" },
                { label: "Plus de 12 heures", value: "very-long" },
              ].map((duration) => (
                <div key={duration.value} className="flex items-center">
                  <Checkbox
                    id={`duration-${duration.value}`}
                    checked={filters.durations.includes(duration.value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilters({
                          ...filters,
                          durations: [...filters.durations, duration.value],
                        })
                      } else {
                        setFilters({
                          ...filters,
                          durations: filters.durations.filter((d: string) => d !== duration.value),
                        })
                      }
                    }}
                    className="border-gray-700 data-[state=checked]:bg-[#048B9A] data-[state=checked]:border-[#048B9A]"
                  />
                  <Label htmlFor={`duration-${duration.value}`} className="ml-2 text-gray-300 text-sm">
                    {duration.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-gray-800" />

          {/* Rating */}
          <div>
            <h3 className="text-white font-medium mb-3">Évaluation</h3>
            <div className="space-y-2">
              {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                <div key={rating} className="flex items-center">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={filters.minRating === rating}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFilters({
                          ...filters,
                          minRating: rating,
                        })
                      } else if (filters.minRating === rating) {
                        setFilters({
                          ...filters,
                          minRating: 0,
                        })
                      }
                    }}
                    className="border-gray-700 data-[state=checked]:bg-[#048B9A] data-[state=checked]:border-[#048B9A]"
                  />
                  <Label htmlFor={`rating-${rating}`} className="ml-2 text-gray-300 text-sm flex items-center">
                    {rating}+ <FaStar className="text-yellow-400 ml-1" />
                  </Label>
                </div>
              ))}
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

  // Sample data for courses
  const courses = [
    {
      id: 1,
      title: "Développement Web Fullstack avec React et Node.js",
      description: "Apprenez à créer des applications web complètes avec les technologies modernes React et Node.js.",
      instructor: "Marie Dupont",
      rating: 4.8,
      reviewCount: 1245,
      students: 12500,
      price: 89.99,
      originalPrice: 129.99,
      discount: 30,
      duration: "42h total",
      level: "Intermédiaire",
      format: "En ligne",
      categories: ["Développement Web", "JavaScript"],
      isBestseller: true,
      image: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
    },
    {
      id: 2,
      title: "UX/UI Design: Créez des interfaces utilisateur exceptionnelles",
      description:
        "Maîtrisez les principes du design d'interface et de l'expérience utilisateur pour créer des produits numériques attrayants.",
      instructor: "Thomas Martin",
      rating: 4.7,
      reviewCount: 856,
      students: 8900,
      price: 69.99,
      originalPrice: 99.99,
      discount: 30,
      duration: "28h total",
      level: "Tous niveaux",
      format: "En ligne",
      categories: ["Design", "UX/UI"],
      isBestseller: false,
      image: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
    },
    {
      id: 3,
      title: "Marketing Digital: Stratégies avancées pour 2025",
      description:
        "Découvrez les dernières stratégies de marketing digital pour développer votre présence en ligne et augmenter vos conversions.",
      instructor: "Sophie Leclerc",
      rating: 4.9,
      reviewCount: 1023,
      students: 15600,
      price: 94.99,
      originalPrice: 149.99,
      discount: 35,
      duration: "36h total",
      level: "Avancé",
      format: "En ligne",
      categories: ["Marketing", "Business"],
      isBestseller: true,
      image: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
    },
    {
      id: 4,
      title: "Python pour la Data Science et le Machine Learning",
      description:
        "Maîtrisez Python et ses bibliothèques pour l'analyse de données, la visualisation et les algorithmes de machine learning.",
      instructor: "Alexandre Dubois",
      rating: 4.8,
      reviewCount: 1578,
      students: 18900,
      price: 84.99,
      originalPrice: 119.99,
      discount: 25,
      duration: "48h total",
      level: "Intermédiaire",
      format: "En ligne",
      categories: ["Informatique", "Data Science"],
      isBestseller: true,
      image: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
    },
    {
      id: 5,
      title: "Anglais des affaires: Communiquez avec confiance",
      description:
        "Améliorez votre anglais professionnel pour exceller dans un environnement de travail international.",
      instructor: "Emma Wilson",
      rating: 4.6,
      reviewCount: 742,
      students: 6800,
      price: 59.99,
      originalPrice: 79.99,
      discount: 25,
      duration: "24h total",
      level: "Débutant",
      format: "En ligne",
      categories: ["Langues", "Business"],
      isBestseller: false,
      image: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
    },
    {
      id: 6,
      title: "Photographie professionnelle: De débutant à expert",
      description: "Apprenez les techniques de photographie professionnelle, de la composition à la post-production.",
      instructor: "Lucas Moreau",
      rating: 4.7,
      reviewCount: 925,
      students: 7400,
      price: 74.99,
      originalPrice: 99.99,
      discount: 25,
      duration: "32h total",
      level: "Tous niveaux",
      format: "En ligne",
      categories: ["Design", "Photographie"],
      isBestseller: false,
      image: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
    },
    {
      id: 7,
      title: "Introduction à la Blockchain et aux Cryptomonnaies",
      description: "Comprendre les fondamentaux de la technologie blockchain et son impact sur l'économie mondiale.",
      instructor: "Nicolas Petit",
      rating: 4.5,
      reviewCount: 612,
      students: 5200,
      price: 64.99,
      originalPrice: 89.99,
      discount: 25,
      duration: "18h total",
      level: "Débutant",
      format: "En ligne",
      categories: ["Business", "Technologie"],
      isBestseller: false,
      image: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
    },
    {
      id: 8,
      title: "Gestion de projet agile avec Scrum et Kanban",
      description:
        "Maîtrisez les méthodologies agiles pour gérer efficacement vos projets et augmenter la productivité de votre équipe.",
      instructor: "Claire Dubois",
      rating: 4.8,
      reviewCount: 845,
      students: 9300,
      price: 79.99,
      originalPrice: 109.99,
      discount: 25,
      duration: "26h total",
      level: "Intermédiaire",
      format: "En ligne",
      categories: ["Business", "Management"],
      isBestseller: true,
      image: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
    },
    {
      id: 9,
      title: "Développement d'applications mobiles avec Flutter",
      description: "Créez des applications mobiles multiplateformes avec Flutter et Dart pour iOS et Android.",
      instructor: "Julien Leroy",
      rating: 4.7,
      reviewCount: 732,
      students: 6100,
      price: 89.99,
      originalPrice: 129.99,
      discount: 30,
      duration: "38h total",
      level: "Intermédiaire",
      format: "En ligne",
      categories: ["Développement Web", "Mobile"],
      isBestseller: false,
      image: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
    },
  ]

  // Filter and sort courses
  const filterCourses = () => {
    return courses
      .filter((course) => {
        // Search term filter
        const matchesSearch =
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase())

        // Category filter
        const matchesCategory =
          appliedFilters.categories.length === 0 ||
          course.categories.some((cat: string) => appliedFilters.categories.includes(cat))

        // Level filter
        const matchesLevel = appliedFilters.levels.length === 0 || appliedFilters.levels.includes(course.level)

        // Price filter
        const matchesPrice =
          course.price >= appliedFilters.priceRange[0] && course.price <= appliedFilters.priceRange[1]

        // Free courses filter
        const matchesFree = !appliedFilters.freeOnly || course.price === 0

        // Rating filter
        const matchesRating = course.rating >= appliedFilters.minRating

        // Duration filter (simplified for demo)
        const matchesDuration = appliedFilters.durations.length === 0 || true

        return (
          matchesSearch &&
          matchesCategory &&
          matchesLevel &&
          matchesPrice &&
          matchesFree &&
          matchesRating &&
          matchesDuration
        )
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "popular":
            return b.students - a.students
          case "rating":
            return b.rating - a.rating
          case "newest":
            return b.id - a.id
          case "price-low":
            return a.price - b.price
          case "price-high":
            return b.price - a.price
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
            {currentCourses.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
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

