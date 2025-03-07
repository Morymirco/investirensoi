import { Star } from "lucide-react"

interface Course {
  id: number
  title: string
  price: string
  image: string
  rating: number
  category: string
}

const courses: Course[] = [
  {
    id: 1,
    title: "Devenez un expert en marketing digital",
    price: "150.000 GNF",
    image: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
    rating: 5,
    category: "Marketing",
  },
  {
    id: 2,
    title: "Cours complet de développeur WordPress",
    price: "500.000 GNF",
    image: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
    rating: 5,
    category: "Development",
  },
  {
    id: 3,
    title: "Adobe Premiere Pro : Montage vidéo",
    price: "250.000 GNF",
    image: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
    rating: 5,
    category: "Design",
  },
  {
    id: 4,
    title: "Créez votre site web avec HTML5 et CSS3 2024",
    price: "200.000 GNF",
    image: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
    rating: 5,
    category: "Development",
  },
  {
    id: 5,
    title: "Échange de compétences essentielles Microsoft Office en ligne",
    price: "150.000 GNF",
    image: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
    rating: 5,
    category: "Office",
  },
  {
    id: 6,
    title: "Administration réseau et dépannage",
    price: "300.000 GNF",
    image: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/marketting.jpg",
    rating: 5,
    category: "IT",
  },
  {
    id: 7,
    title: "UI/UX Design pour le Web et le mobile",
    price: "400.000 GNF",
    image: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
    rating: 5,
    category: "Design",
  },
  {
    id: 8,
    title: "DevOps et intégration continue",
    price: "450.000 GNF",
    image: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
    rating: 5,
    category: "Development",
  },
]

export default function FeaturedCourses() {
  return (
    <section className="bg-[#000025] py-20">
      {/* Use max-w classes to limit width and center content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Cours en ligne en vedette</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Les cours les plus demandés sur notre plateformes , les plus sollicites par les apprenants sont ci-dessous :
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white/10 border border-white/30 text-white rounded-2xl overflow-hidden transition-transform hover:scale-[1.02] border"
            >
              <div className="relative">
                <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  {/* <div className="flex gap-2">
                    <img src="/placeholder.svg?height=30&width=100" alt="App Store" className="h-8 w-auto" />
                    <img src="/placeholder.svg?height=30&width=100" alt="Google Play" className="h-8 w-auto" />
                  </div> */}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-[#00b67a] font-semibold text-xl mb-6 line-clamp-2 ">{course.title}</h3>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-purple-500 font-bold">{course.price}</span>
                  <div className="flex items-center">
                    {[...Array(course.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>

                <button className="w-full bg-[#cbcdff] hover:bg-[#50528f] hover:text-white text-indigo-900 font-medium py-2 rounded-full transition-colors text-[14px]">
                  Inscrivez-vous maintenant
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

