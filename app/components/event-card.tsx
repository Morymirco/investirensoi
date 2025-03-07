"use client"
import Image from "next/image"
import { Calendar, MapPin } from "lucide-react"

interface EventCardProps {
  title: string
  date: string
  location: string
  image: string
}

export function EventCard({ title, date, location, image }: EventCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex ">
      <div className="w-1/3 min-w-[120px] max-w-[150px] relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={150}
          height={150}
          className="object-cover h-full w-full"
        />
      </div>

      <div className="p-4 flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-[#1a1a4b] mb-2">{title}</h3>

        <div className="flex flex-col sm:flex-row sm:gap-4">
          <div className="flex items-center text-gray-600 mb-1 sm:mb-0">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-sm">{date}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-sm">{location}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

