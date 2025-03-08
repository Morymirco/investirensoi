"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import React, { useRef, useState } from "react"
import {
    FaAward,
    FaCertificate,
    FaCheck,
    FaChevronDown,
    FaChevronUp,
    FaGraduationCap,
    FaLaptop,
    FaPlay,
    FaRegBookmark,
    FaRegCalendarAlt,
    FaRegClock,
    FaRegFileAlt,
    FaRegLightbulb,
    FaRegQuestionCircle,
    FaRegStar,
    FaShare,
    FaStar,
    FaStarHalfAlt,
    FaUser,
    FaUserGraduate,
} from "react-icons/fa"

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className="text-yellow-400 w-4 h-4" />
      ))}
      {hasHalfStar && <FaStarHalfAlt className="text-yellow-400 w-4 h-4" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="text-yellow-400 w-4 h-4" />
      ))}
    </div>
  )
}

// Curriculum accordion component
const CurriculumAccordion = ({ modules }: { modules: Array<{ title: string; duration: string; lessons: Array<{ title: string; duration: string; type: string; isPreview: boolean }> }> }) => {
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
      {modules.map((module, index) => (
        <div key={index} className="border border-gray-800 rounded-lg overflow-hidden">
          <button
            className="w-full flex justify-between items-center p-4 bg-[#1C1D33] hover:bg-[#23243c] transition-colors text-left"
            onClick={() => toggleModule(index)}
          >
            <div className="flex items-center">
              <span className="text-[#048B9A] font-medium mr-3">Module {index + 1}:</span>
              <span className="text-white font-medium">{module.title}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 text-sm mr-3">
                {module.lessons.length} leçons • {module.duration}
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
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div key={lessonIndex} className="p-4 bg-[#151627] flex justify-between items-center">
                      <div className="flex items-center">
                        {lesson.isPreview ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-[#048B9A] hover:text-[#037483] hover:bg-[#048B9A]/10 p-1 mr-3"
                          >
                            <FaPlay className="w-3 h-3" />
                          </Button>
                        ) : (
                          <div className="w-7 h-7 flex items-center justify-center mr-3">
                            {lesson.type === "video" ? (
                              <FaPlay className="text-gray-500 w-3 h-3" />
                            ) : (
                              <FaRegFileAlt className="text-gray-500 w-3 h-3" />
                            )}
                          </div>
                        )}
                        <span className="text-gray-300">{lesson.title}</span>
                        {lesson.isPreview && (
                          <Badge className="ml-3 bg-[#048B9A]/20 text-[#048B9A] hover:bg-[#048B9A]/30">Aperçu</Badge>
                        )}
                      </div>
                      <span className="text-gray-400 text-sm">{lesson.duration}</span>
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

// Review component
const Review = ({ review }: { review: { avatar: string; name: string; rating: number; date: string; comment: string } }) => (
  <div className="border border-gray-800 rounded-lg p-5 bg-[#151627]">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={review.avatar} alt={review.name} />
          <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="text-white font-medium">{review.name}</h4>
          <div className="flex items-center">
            <StarRating rating={review.rating} />
            <span className="text-gray-400 text-sm ml-2">{review.date}</span>
          </div>
        </div>
      </div>
    </div>
    <p className="text-gray-300">{review.comment}</p>
  </div>
)

// FAQ component
const FAQ = ({ faqs }: { faqs: Array<{ question: string; answer: string }> }) => {
  const [openFaqs, setOpenFaqs] = useState<number[]>([0])

  const toggleFaq = (index: number) => {
    if (openFaqs.includes(index)) {
      setOpenFaqs(openFaqs.filter((i) => i !== index))
    } else {
      setOpenFaqs([...openFaqs, index])
    }
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="border border-gray-800 rounded-lg overflow-hidden">
          <button
            className="w-full flex justify-between items-center p-4 bg-[#1C1D33] hover:bg-[#23243c] transition-colors text-left"
            onClick={() => toggleFaq(index)}
          >
            <span className="text-white font-medium">{faq.question}</span>
            {openFaqs.includes(index) ? (
              <FaChevronUp className="text-gray-400" />
            ) : (
              <FaChevronDown className="text-gray-400" />
            )}
          </button>

          <AnimatePresence>
            {openFaqs.includes(index) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-4 bg-[#151627]">
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

// Video modal component
const VideoModal = ({ isOpen, onClose, videoSrc }: { isOpen: boolean; onClose: () => void; videoSrc: string }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-4xl bg-[#151627] rounded-lg overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="aspect-video relative">
            <iframe src={videoSrc} className="absolute inset-0 w-full h-full" allowFullScreen title="Course preview" />
          </div>
          <button
            className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            onClick={onClose}
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)

// Course card component for related courses
const RelatedCourseCard = ({ course }: { course: any }) => (
  <motion.div
    variants={itemVariants}
    className="bg-[#151627] rounded-xl overflow-hidden border border-gray-800 hover:border-[#048B9A] transition-all duration-300 hover:shadow-lg hover:shadow-[#048B9A]/10"
  >
    <div className="relative h-40">
      <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
      {course.discount > 0 && (
        <div className="absolute top-3 right-3">
          <Badge className="bg-red-500 text-white hover:bg-red-600">-{course.discount}%</Badge>
        </div>
      )}
    </div>

    <div className="p-4">
      <h3 className="text-white font-medium mb-2 line-clamp-2">{course.title}</h3>

      <div className="flex items-center mb-2">
        <StarRating rating={course.rating} />
        <span className="text-gray-400 text-sm ml-2">({course.reviewCount})</span>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-lg font-bold text-white">{course.price} €</span>
          {course.originalPrice && (
            <span className="text-gray-400 line-through ml-2 text-sm">{course.originalPrice} €</span>
          )}
        </div>
      </div>
    </div>
  </motion.div>
)

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
export default function CourseDetailPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const courseContentRef = useRef<HTMLDivElement | null>(null)

  // Sample course data
  const course = {
    id: 1,
    title: "Développement Web Fullstack avec React et Node.js",
    description:
      "Apprenez à créer des applications web complètes avec les technologies modernes React et Node.js. Ce cours couvre tout ce dont vous avez besoin pour devenir un développeur fullstack compétent, de la création d'interfaces utilisateur réactives avec React à la construction d'API robustes avec Node.js et Express.",
    longDescription:
      "Ce cours complet de développement web fullstack vous guidera à travers toutes les étapes nécessaires pour créer des applications web modernes et performantes. Vous commencerez par les bases du développement frontend avec HTML, CSS et JavaScript, puis vous plongerez dans React pour créer des interfaces utilisateur dynamiques et réactives.\n\nEnsuite, vous apprendrez à construire des API RESTful avec Node.js et Express, à travailler avec des bases de données MongoDB, et à connecter votre frontend à votre backend. Vous découvrirez également comment déployer vos applications, mettre en place l'authentification des utilisateurs, et bien plus encore.\n\nQue vous soyez débutant ou que vous ayez déjà de l'expérience en développement web, ce cours vous fournira les compétences et les connaissances nécessaires pour créer des applications web complètes et professionnelles.",
    instructor: {
      name: "Mory koulibaly",
      title: "Développeuse Senior & Formatrice",
      bio: "Marie est développeuse fullstack avec plus de 10 ans d'expérience dans l'industrie. Elle a travaillé pour plusieurs startups et grandes entreprises, et a contribué à de nombreux projets open source. Elle est passionnée par l'enseignement et aide les développeurs à améliorer leurs compétences depuis 5 ans.",
      avatar: "/placeholder.svg?height=100&width=100",
      courses: 12,
      students: 45000,
      rating: 4.8,
    },
    rating: 4.8,
    reviewCount: 1245,
    students: 12500,
    price: 89.99,
    originalPrice: 129.99,
    discount: 30,
    duration: "42h total",
    level: "Intermédiaire",
    format: "En ligne",
    lastUpdated: "Avril 2025",
    language: "Français",
    categories: ["Développement Web", "JavaScript", "React", "Node.js"],
    isBestseller: true,
    image: "/placeholder.svg",
    previewVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    whatYouWillLearn: [
      "Créer des interfaces utilisateur modernes avec React et des API RESTful avec Node.js",
      "Maîtriser JavaScript ES6+ et comprendre les concepts avancés comme les promesses et async/await",
      "Travailler avec des bases de données MongoDB et comprendre les principes de conception NoSQL",
      "Mettre en place l'authentification et l'autorisation des utilisateurs avec JWT",
      "Déployer des applications fullstack sur des plateformes cloud comme Vercel et Heroku",
      "Utiliser des outils modernes comme Webpack, Git, et les tests automatisés",
      "Créer des applications web réactives et adaptées aux mobiles avec des frameworks CSS modernes",
      "Comprendre les principes de conception d'API et les meilleures pratiques de développement web",
    ],
    requirements: [
      "Connaissances de base en HTML, CSS et JavaScript",
      "Compréhension des concepts de programmation fondamentaux",
      "Un ordinateur avec accès à Internet",
      "Aucune expérience préalable avec React ou Node.js n'est nécessaire",
    ],
    includes: [
      { icon: FaRegClock, text: "42 heures de vidéo à la demande" },
      { icon: FaRegFileAlt, text: "85 articles et ressources téléchargeables" },
      { icon: FaRegLightbulb, text: "120 exercices pratiques" },
      { icon: FaCertificate, text: "Certificat d'achèvement" },
      { icon: FaLaptop, text: "Accès à vie au contenu" },
      { icon: FaRegQuestionCircle, text: "Support instructeur" },
    ],
    modules: [
      {
        title: "Introduction au développement web fullstack",
        duration: "3h 45min",
        lessons: [
          { title: "Bienvenue au cours", duration: "5:22", type: "video", isPreview: true },
          {
            title: "Configuration de l'environnement de développement",
            duration: "15:47",
            type: "video",
            isPreview: true,
          },
          { title: "Vue d'ensemble des technologies web modernes", duration: "12:33", type: "video", isPreview: false },
          { title: "Comprendre l'architecture client-serveur", duration: "18:21", type: "video", isPreview: false },
          { title: "Quiz: Concepts fondamentaux", duration: "10:00", type: "quiz", isPreview: false },
        ],
      },
      {
        title: "Fondamentaux de JavaScript moderne (ES6+)",
        duration: "5h 20min",
        lessons: [
          { title: "Variables, types et structures de données", duration: "22:15", type: "video", isPreview: false },
          { title: "Fonctions et portée en JavaScript", duration: "18:42", type: "video", isPreview: false },
          { title: "Arrow functions et this", duration: "15:33", type: "video", isPreview: false },
          { title: "Promesses et async/await", duration: "25:18", type: "video", isPreview: false },
          { title: "Destructuration et spread operator", duration: "14:27", type: "video", isPreview: false },
          {
            title: "Exercice pratique: Manipulation de données",
            duration: "30:00",
            type: "exercise",
            isPreview: false,
          },
        ],
      },
      {
        title: "React - Les fondamentaux",
        duration: "6h 15min",
        lessons: [
          { title: "Introduction à React et JSX", duration: "20:15", type: "video", isPreview: false },
          { title: "Composants et props", duration: "18:42", type: "video", isPreview: false },
          { title: "État et cycle de vie", duration: "22:33", type: "video", isPreview: false },
          { title: "Gestion des événements", duration: "15:18", type: "video", isPreview: false },
          { title: "Listes et clés", duration: "14:27", type: "video", isPreview: false },
          { title: "Projet: Créer une application Todo", duration: "45:00", type: "project", isPreview: false },
        ],
      },
      {
        title: "Node.js et Express",
        duration: "5h 50min",
        lessons: [
          { title: "Introduction à Node.js", duration: "18:15", type: "video", isPreview: false },
          { title: "Création d'un serveur avec Express", duration: "22:42", type: "video", isPreview: false },
          { title: "Routage et middleware", duration: "20:33", type: "video", isPreview: false },
          { title: "Gestion des erreurs", duration: "15:18", type: "video", isPreview: false },
          { title: "API RESTful avec Express", duration: "24:27", type: "video", isPreview: false },
          {
            title: "Projet: Créer une API pour l'application Todo",
            duration: "50:00",
            type: "project",
            isPreview: false,
          },
        ],
      },
    ],
    reviews: [
      {
        name: "Thomas Martin",
        avatar: "/placeholder.svg?height=50&width=50",
        rating: 5,
        date: "15 mars 2025",
        comment:
          "Ce cours est incroyable ! J'ai essayé plusieurs cours de développement web, mais celui-ci est de loin le meilleur. Les explications sont claires, les projets sont pertinents et le support de l'instructeur est excellent. Je me sens maintenant confiant pour créer mes propres applications fullstack.",
      },
      {
        name: "Sophie Leclerc",
        avatar: "/placeholder.svg?height=50&width=50",
        rating: 4.5,
        date: "2 février 2025",
        comment:
          "Très bon cours avec beaucoup de contenu pratique. J'ai particulièrement apprécié les sections sur React et l'authentification. Quelques parties sur Node.js auraient pu être plus détaillées, mais dans l'ensemble, c'est un excellent cours pour quiconque veut apprendre le développement fullstack.",
      },
      {
        name: "Alexandre Dubois",
        avatar: "/placeholder.svg?height=50&width=50",
        rating: 5,
        date: "20 janvier 2025",
        comment:
          "Marie est une excellente formatrice qui explique des concepts complexes de manière simple et compréhensible. Les projets pratiques m'ont vraiment aidé à consolider mes connaissances. Je recommande vivement ce cours à tous ceux qui veulent devenir développeur fullstack.",
      },
    ],
    faqs: [
      {
        question: "Ce cours est-il adapté aux débutants ?",
        answer:
          "Oui, ce cours est conçu pour être accessible aux débutants ayant des connaissances de base en HTML, CSS et JavaScript. Nous commençons par les fondamentaux et progressons vers des concepts plus avancés, ce qui permet à chacun d'apprendre à son rythme.",
      },
      {
        question: "Combien de temps faut-il pour terminer ce cours ?",
        answer:
          "Le cours contient environ 42 heures de contenu vidéo, mais le temps nécessaire pour le terminer dépend de votre rythme d'apprentissage et du temps que vous consacrez aux exercices pratiques. En moyenne, les étudiants terminent le cours en 2 à 3 mois en y consacrant quelques heures par semaine.",
      },
      {
        question: "Les projets présentés dans ce cours peuvent-ils être utilisés dans mon portfolio ?",
        answer:
          "Absolument ! Les projets que vous développerez dans ce cours sont conçus pour être impressionnants et démontrer vos compétences. Nous vous encourageons à les personnaliser et à les inclure dans votre portfolio pour montrer vos capacités aux employeurs potentiels.",
      },
      {
        question: "Y a-t-il un support disponible si je rencontre des difficultés ?",
        answer:
          "Oui, vous pouvez poser des questions dans la section commentaires de chaque leçon, et l'instructeur ou l'équipe de support vous répondra généralement dans les 24-48 heures. De plus, il y a une communauté active d'étudiants qui s'entraident.",
      },
      {
        question: "Les technologies enseignées dans ce cours sont-elles à jour ?",
        answer:
          "Oui, ce cours est régulièrement mis à jour pour refléter les dernières versions de React, Node.js et autres technologies. La dernière mise à jour majeure a été effectuée en avril 2025, et nous continuons à ajouter du contenu et à actualiser les leçons existantes.",
      },
    ],
    relatedCourses: [
      {
        id: 2,
        title: "React Avancé: Hooks, Context API et Redux",
        rating: 4.7,
        reviewCount: 856,
        price: 69.99,
        originalPrice: 99.99,
        discount: 30,
        image: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
      },
      {
        id: 3,
        title: "Node.js: API RESTful et Microservices",
        rating: 4.9,
        reviewCount: 1023,
        price: 74.99,
        originalPrice: 109.99,
        discount: 30,
        image: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
      },
      {
        id: 4,
        title: "MongoDB pour développeurs JavaScript",
        rating: 4.6,
        reviewCount: 742,
        price: 59.99,
        originalPrice: 79.99,
        discount: 25,
        image: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
      },
    ],
  }

  // Scroll to course content
  const scrollToCourseContent = () => {
    courseContentRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Rating distribution data
  const ratingDistribution = [
    { stars: 5, percentage: 78 },
    { stars: 4, percentage: 15 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 1 },
  ]

  return (
    <div className="min-h-screen bg-[#0A0B1C]">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-[#1C1D33] to-[#0A0B1C] py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex text-sm">
              <Link href="/formations" className="text-gray-400 hover:text-white">
                Formations
              </Link>
              <span className="mx-2 text-gray-600">/</span>
              <Link href="/formations?category=Développement+Web" className="text-gray-400 hover:text-white">
                Développement Web
              </Link>
              <span className="mx-2 text-gray-600">/</span>
              <span className="text-gray-300">React & Node.js</span>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course info */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{course.title}</h1>

                <p className="text-gray-300 text-lg mb-6">{course.description}</p>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center">
                    <StarRating rating={course.rating} />
                    <span className="text-white ml-2">{course.rating}</span>
                    <span className="text-gray-400 ml-1">({course.reviewCount} avis)</span>
                  </div>

                  <div className="flex items-center text-gray-300">
                    <FaUser className="mr-2 text-gray-400" />
                    <span>{course.students} étudiants</span>
                  </div>

                  <div className="flex items-center text-gray-300">
                    <FaRegCalendarAlt className="mr-2 text-gray-400" />
                    <span>Mis à jour {course.lastUpdated}</span>
                  </div>
                </div>

                <div className="flex items-center mb-6">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                    <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="text-gray-300">Créé par </span>
                    <Link href="#instructor" className="text-[#048B9A] hover:text-[#037483]">
                      {course.instructor.name}
                    </Link>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center bg-[#151627] px-3 py-2 rounded-md">
                    <FaRegClock className="text-gray-400 mr-2" />
                    <span className="text-gray-300">{course.duration}</span>
                  </div>

                  <div className="flex items-center bg-[#151627] px-3 py-2 rounded-md">
                    <FaGraduationCap className="text-gray-400 mr-2" />
                    <span className="text-gray-300">{course.level}</span>
                  </div>

                  <div className="flex items-center bg-[#151627] px-3 py-2 rounded-md">
                    <FaLaptop className="text-gray-400 mr-2" />
                    <span className="text-gray-300">{course.format}</span>
                  </div>

                  <div className="flex items-center bg-[#151627] px-3 py-2 rounded-md">
                    <FaGlobeAmericas className="text-gray-400 mr-2" />
                    <span className="text-gray-300">{course.language}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {course.categories.map((category, index) => (
                    <Badge key={index} className="bg-[#048B9A]/20 text-[#048B9A] hover:bg-[#048B9A]/30">
                      {category}
                    </Badge>
                  ))}
                </div>

                <div className="lg:hidden">
                  <div className="bg-[#151627] border border-gray-800 rounded-lg p-5 mb-6">
                    <div className="relative aspect-video mb-4">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        fill
                        className="object-cover rounded-md"
                      />
                      <button
                        className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-colors"
                        onClick={() => setIsVideoModalOpen(true)}
                      >
                        <div className="w-16 h-16 rounded-full bg-[#048B9A]/80 flex items-center justify-center">
                          <FaPlay className="text-white w-6 h-6 ml-1" />
                        </div>
                      </button>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-bold text-white">{course.price} €</span>
                        <span className="text-gray-400 line-through">{course.originalPrice} €</span>
                      </div>
                      <div className="flex items-center text-gray-300 mb-4">
                        <span className="text-red-500 font-medium">{course.discount}% de réduction</span>
                        <span className="mx-2">•</span>
                        <span>Plus que 2 jours</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button className="w-full bg-[#048B9A] hover:bg-[#037483] text-white text-lg py-6">
                        S'inscrire
                      </Button>
                      <Button variant="outline" className="w-full border-gray-700 text-[#048B9A] hover:bg-[#151627] hover:text-white">
                        Essayer gratuitement
                      </Button>
                    </div>

                    <p className="text-center text-gray-400 text-sm mt-4">Garantie de remboursement de 30 jours</p>
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
                  <Button
                    variant="outline"
                    className="border-gray-700 text-[#048B9A] hover:bg-[#151627] hover:text-white"
                    onClick={() => setIsVideoModalOpen(true)}
                  >
                    <FaPlay className="mr-2" /> Aperçu du cours
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Course sidebar (desktop) */}
            <div className="hidden lg:block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-[#151627] border border-gray-800 rounded-lg p-5 sticky top-8"
              >
                <div className="relative aspect-video mb-4">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    fill
                    className="object-cover rounded-md"
                  />
                  <button
                    className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-colors"
                    onClick={() => setIsVideoModalOpen(true)}
                  >
                    <div className="w-16 h-16 rounded-full bg-[#048B9A]/80 flex items-center justify-center">
                      <FaPlay className="text-white w-6 h-6 ml-1" />
                    </div>
                  </button>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-white">{course.price} €</span>
                    <span className="text-gray-400 line-through">{course.originalPrice} €</span>
                  </div>
                  <div className="flex items-center text-gray-300 mb-4">
                    <span className="text-red-500 font-medium">{course.discount}% de réduction</span>
                    <span className="mx-2">•</span>
                    <span>Plus que 2 jours</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-[#048B9A] hover:bg-[#037483] text-white text-lg py-6">S'inscrire</Button>
                  <Button variant="outline" className="w-full border-gray-700 text-[#048B9A] hover:bg-[#151627] hover:text-white">
                    Essayer gratuitement
                  </Button>
                </div>

                <p className="text-center text-gray-400 text-sm mt-4 mb-6">Garantie de remboursement de 30 jours</p>

                <div className="space-y-4">
                  <h3 className="text-white font-medium mb-2">Ce cours inclut :</h3>
                  {course.includes.map((item, index) => (
                    <div key={index} className="flex items-center text-gray-300">
                      {React.isValidElement(item.icon) ? (
                        item.icon
                      ) : typeof item.icon === "function" ? (
                        React.createElement(item.icon, { className: "text-gray-400 mr-3 w-5 h-5" })
                      ) : (
                        <FaRegFileAlt className="text-gray-400 mr-3 w-5 h-5" />
                      )}
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>

                <Separator className="my-6 bg-gray-800" />

                <div className="flex justify-between">
                  <Button variant="ghost" className="text-[#048B9A] hover:text-[#037483] hover:bg-[#048B9A]/10">
                    <FaShare className="mr-2" /> Partager
                  </Button>
                  <Button variant="ghost" className="text-[#048B9A] hover:text-[#037483] hover:bg-[#048B9A]/10">
                    <FaRegBookmark className="mr-2" /> Sauvegarder
                  </Button>
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
              <TabsList className="bg-[#151627] border border-gray-800 p-1 mb-6 w-full grid grid-cols-5">
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
                <TabsTrigger
                  value="instructor"
                  className="data-[state=active]:bg-[#048B9A] data-[state=active]:text-white"
                >
                  Formateur
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="data-[state=active]:bg-[#048B9A] data-[state=active]:text-white"
                >
                  Avis
                </TabsTrigger>
                <TabsTrigger value="faq" className="data-[state=active]:bg-[#048B9A] data-[state=active]:text-white">
                  FAQ
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <div className="bg-[#151627] border border-gray-800 rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">À propos de ce cours</h2>
                    <p className="text-gray-300 whitespace-pre-line mb-6">{course.longDescription}</p>
                  </div>

                  <div className="bg-[#151627] border border-gray-800 rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">Ce que vous allez apprendre</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {course.whatYouWillLearn.map((item, index) => (
                        <div key={index} className="flex">
                          <FaCheck className="text-[#048B9A] mt-1 mr-3 flex-shrink-0" />
                          <span className="text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#151627] border border-gray-800 rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">Prérequis</h2>
                    <ul className="space-y-2">
                      {course.requirements.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-[#048B9A] mr-3">•</span>
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
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
                        <span>{course.modules.length} modules</span>
                        <span className="mx-2">•</span>
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    <CurriculumAccordion modules={course.modules} />
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="instructor" id="instructor">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <div className="bg-[#151627] border border-gray-800 rounded-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row md:items-start gap-6 mb-6">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                        <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div>
                        <h2 className="text-xl font-semibold text-white mb-1">{course.instructor.name}</h2>
                        <p className="text-[#048B9A] mb-3">{course.instructor.title}</p>

                        <div className="flex flex-wrap gap-6 mb-4">
                          <div className="flex items-center text-gray-300">
                            <FaStar className="text-yellow-400 mr-2" />
                            <span>{course.instructor.rating} Note moyenne</span>
                          </div>
                          <div className="flex items-center text-gray-300">
                            <FaAward className="text-gray-400 mr-2" />
                            <span>{course.instructor.courses} cours</span>
                          </div>
                          <div className="flex items-center text-gray-300">
                            <FaUserGraduate className="text-gray-400 mr-2" />
                            <span>{course.instructor.students.toLocaleString()} étudiants</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-6 bg-gray-800" />

                    <h3 className="text-lg font-medium text-white mb-3">À propos du formateur</h3>
                    <p className="text-gray-300 mb-6">{course.instructor.bio}</p>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="reviews">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <div className="bg-[#151627] border border-gray-800 rounded-lg p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-8 mb-8">
                      <div className="md:w-1/3 flex flex-col items-center justify-center">
                        <div className="text-5xl font-bold text-white mb-2">{course.rating}</div>
                        <div className="flex mb-2">
                          <StarRating rating={course.rating} />
                        </div>
                        <div className="text-gray-400 text-sm">Note du cours</div>
                      </div>

                      <div className="md:w-2/3">
                        {ratingDistribution.map((item) => (
                          <div key={item.stars} className="flex items-center mb-2">
                            <div className="flex items-center w-20">
                              <span className="text-gray-300 mr-1">{item.stars}</span>
                              <FaStar className="text-yellow-400 w-3 h-3" />
                            </div>
                            <div className="flex-1 mx-3">
                              <Progress value={item.percentage} className="h-2 bg-gray-700" />
                            </div>
                            <div className="w-10 text-right text-gray-400 text-sm">{item.percentage}%</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator className="my-6 bg-gray-800" />

                    <h3 className="text-lg font-medium text-white mb-6">Avis des étudiants</h3>

                    <div className="space-y-6">
                      {course.reviews.map((review, index) => (
                        <Review key={index} review={review} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="faq">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <div className="bg-[#151627] border border-gray-800 rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold text-white mb-6">Questions fréquentes</h2>

                    <FAQ faqs={course.faqs} />
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
                  {course.relatedCourses.map((relatedCourse) => (
                    <RelatedCourseCard key={relatedCourse.id} course={relatedCourse} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related courses (mobile) */}
        <div className="lg:hidden mt-8">
          <h3 className="text-xl font-medium text-white mb-6">Formations similaires</h3>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {course.relatedCourses.map((relatedCourse) => (
              <RelatedCourseCard key={relatedCourse.id} course={relatedCourse} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Video modal */}
      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} videoSrc={course.previewVideo} />
    </div>
  )
}

// Missing FaTimes and FaGlobeAmericas components
const FaTimes = ({ className }: { className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" className={className} fill="currentColor">
    <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
  </svg>
)

const FaGlobeAmericas = ({ className }: { className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className={className} fill="currentColor">
    <path d="M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm82.29 357.6c-3.9 3.88-7.99 7.95-11.31 11.28-2.99 3-5.1 6.7-6.17 10.71-1.51 5.66-2.73 11.38-4.77 16.87l-17.39 46.85c-13.76 3-28 4.69-42.65 4.69v-27.38c1.69-12.62-7.64-36.26-22.63-51.25-6-6-9.37-14.14-9.37-22.63v-32.01c0-11.64-6.27-22.34-16.46-27.97-14.37-7.95-34.81-19.06-48.81-26.11-11.48-5.78-22.1-13.14-31.65-21.75l-.8-.72a114.792 114.792 0 01-18.06-20.74c-9.38-13.77-24.66-36.42-34.59-51.14 20.47-45.5 57.36-82.04 103.2-101.89l24.01 12.01C203.48 89.74 216 82.01 216 70.11v-11.3c7.99-1.29 16.12-2.11 24.39-2.42l28.3 28.3c6.25 6.25 6.25 16.38 0 22.63L264 112l-10.34 10.34c-3.12 3.12-3.12 8.19 0 11.31l4.69 4.69c3.12 3.12 3.12 8.19 0 11.31l-8 8a8.008 8.008 0 01-5.66 2.34h-8.99c-2.08 0-4.08.81-5.58 2.27l-9.92 9.65a8.008 8.008 0 00-1.58 9.31l15.59 31.19c2.66 5.32-1.21 11.58-7.15 11.58h-5.64c-1.93 0-3.79-.7-5.24-1.96l-9.28-8.06a16.017 16.017 0 00-15.55-3.1l-31.17 10.39a11.95 11.95 0 00-8.17 11.34c0 4.53 2.56 8.66 6.61 10.69l11.08 5.54c9.41 4.71 19.79 7.16 30.31 7.16s22.59 27.29 32 32h66.75c8.49 0 16.62 3.37 22.63 9.37l13.69 13.69a30.503 30.503 0 018.93 21.57 46.536 46.536 0 01-13.72 32.98zM417 274.25c-5.79-1.45-10.84-5-14.15-9.97l-17.98-26.97a23.97 23.97 0 010-26.62l19.59-29.38c2.32-3.47 5.5-6.29 9.24-8.15l12.98-6.49C440.2 193.59 448 223.87 448 256c0 8.67-.74 17.16-1.82 25.54L417 274.25z" />
  </svg>
)

