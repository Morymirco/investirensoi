import type { LucideIcon } from "lucide-react"

interface CategoryCardProps {
  title: string
  courses: number
  Icon: LucideIcon
  bgColor: string
  iconColor: string
}

export function CategoryCard({ title, courses, Icon, bgColor, iconColor }: CategoryCardProps) {
  return (
    <div className="flex flex-col items-center">
      <div className={`${bgColor} w-24 h-24 rounded-lg flex items-center justify-center mb-3`}>
        <Icon className={`${iconColor} w-10 h-10`} strokeWidth={1.5} />
      </div>
      <h3 className="text-white font-semibold text-center">{title}</h3>
      <p className="text-white text-sm">
        {courses} {courses === 1 ? "Course" : "Courses"}
      </p>
    </div>
  )
}

