"use client"

import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"

export default function MindeoHero() {
  return (
    <section className="relative w-full overflow-hidden ">
      {/* Gradient background */}
      <div className="absolute  inset-0 bg-gradient-to-r from-[#773449] via-[#313093] to-[#773449] z-0"></div>

      <div className="container max-w-[1280px] relative z-10 mx-auto px-4 py-4 md:py-4 lg:py-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
          {/* Left content */}
          <div className="text-white space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              L&apos;école 2.0 qui vous accompagne vers vos objectifs
            </h1>

            <div className="flex items-center space-x-2">
              <span className="font-medium">Excellent</span>
              <span className="font-medium">4.6 sur 5</span>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-current text-[#00b67a] stroke-[#00b67a]" />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Capture%20d%E2%80%99%C3%A9cran%202025-03-05%20122247-kV60gsRM7R22Qmld2oCXcDFoYD3bWc.png"
                  alt="Trustpilot"
                  width={80}
                  height={20}
                  className="h-5 ml-1"
                />
              </div>
            </div>

            <p className="text-lg md:text-xl opacity-90 max-w-lg">
              Mindeo est l&apos;école en ligne qui vous permet d&apos;acquérir les compétences nécessaires dans les
              domaines du business, de l&apos;investissement et du développement personnel.
            </p>

            <div>
              <Link
                href="#formations"
                className="inline-flex items-center justify-center rounded-full bg-[#6c8dff] px-8 py-3 text-base font-medium text-white hover:bg-[#5a7eff] transition-colors"
              >
                Explorer les formations
              </Link>
            </div>
          </div>

          {/* Right content - Logo */}
          <div className="flex justify-center md:justify-end h-[550px]">
            <Image src="/hero.jpg" alt="Mindeo" width={500} height={200} className="rounded-lg object-cover" />
          </div>
        </div>
      </div>

      {/* Chat bubble in bottom right */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-[#ff5a5f] text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-[#ff4146] transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
      </div>
    </section>
  )
}

