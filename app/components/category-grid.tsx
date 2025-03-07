import { CategoryCard } from "./category-card"
import { Megaphone, Code, Palette, Target, CuboidIcon as Cube, Newspaper, Download } from "lucide-react"

const categories = [
  {
    title: "Digital Marketing",
    courses: 4,
    icon: Megaphone,
    bgColor: "bg-red-50",
    iconColor: "text-red-500",
  },
  {
    title: "Web Development",
    courses: 4,
    icon: Code,
    bgColor: "bg-green-50",
    iconColor: "text-green-500",
  },
  {
    title: "Art & Humanities",
    courses: 1,
    icon: Palette,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    title: "Personal Development",
    courses: 1,
    icon: Target,
    bgColor: "bg-amber-50",
    iconColor: "text-amber-500",
  },
  {
    title: "IT and Software",
    courses: 6,
    icon: Cube,
    bgColor: "bg-green-50",
    iconColor: "text-green-500",
  },
  {
    title: "Social Sciences",
    courses: 2,
    icon: Newspaper,
    bgColor: "bg-purple-50",
    iconColor: "text-purple-500",
  },
  {
    title: "Graphic Design",
    courses: 5,
    icon: Download,
    bgColor: "bg-green-50",
    iconColor: "text-green-500",
  },
]

export function CategoryGrid() {
  return (
    <div className="grid max-w-7xl mx-auto px-4 py-12 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
      {categories.map((category, index) => (
        <CategoryCard
          key={index}
          title={category.title}
          courses={category.courses}
          Icon={category.icon}
          bgColor={category.bgColor}
          iconColor={category.iconColor}
        />
      ))}
    </div>
  )
}

