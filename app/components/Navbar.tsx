"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function MindeoNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="relative p-10">
      {/* Gradient background with blur effect */}
      <div className="fixed top-0 left-0 right-0 h-20 bg-gradient-to-r from-[#1a0b2e] to-[#2f1a45] backdrop-blur-sm z-40 p-10" />

      <nav className="fixed top-0 left-0 right-0 z-50 ">
        <div className="container max-w-[1280px] mx-auto px-4">
          <div className="h-20 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <svg
                width="120"
                height="40"
                viewBox="0 0 300 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-auto h-8"
              >
                <path
                  d="M51.5 20C48.5 20 46 22.5 46 25.5C46 28.5 48.5 31 51.5 31C54.5 31 57 28.5 57 25.5C57 22.5 54.5 20 51.5 20Z"
                  fill="white"
                />
                <path
                  d="M30 40L46 25L62 40L46 55L30 40Z"
                  stroke="white"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M80 25H95V80H80V25Z" fill="white" />
                <path d="M110 25H125V80H110V25Z" fill="white" />
                <path d="M140 25H155V80H140V25Z" fill="white" />
                <path
                  d="M170 25H215C223.284 25 230 31.7157 230 40V65C230 73.2843 223.284 80 215 80H170V25Z"
                  fill="white"
                />
                <path
                  d="M245 25H290C298.284 25 305 31.7157 305 40V65C305 73.2843 298.284 80 290 80H245V25Z"
                  fill="white"
                />
                <path d="M185 40H215C215 40 215 65 215 65H185V40Z" fill="black" />
                <path d="M260 40H290C290 40 290 65 290 65H260V40Z" fill="black" />
              </svg>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/formations" className="text-white hover:text-gray-200 text-sm font-medium">
                Nos formations
              </Link>
              <Link href="/experts" className="text-white hover:text-gray-200 text-sm font-medium">
                Nos experts
              </Link>
              <Link href="/contenus-gratuits" className="text-white hover:text-gray-200 text-sm font-medium">
                Nos contenus gratuits
              </Link>
              <Link href="/a-propos" className="text-white hover:text-gray-200 text-sm font-medium">
                À propos
              </Link>
              <Link href="/recrutement" className="text-white hover:text-gray-200 text-sm font-medium">
                Recrutement
              </Link>
            </div>

            {/* Login Button */}
            <div className="hidden md:block">
              <Link
                href="/login"
                 className="bg-white/10 border border-white/30 text-white px-6 py-2 rounded-full cursor-pointer transition duration-300 hover:bg-white/20"
                // className="inline-flex items-center justify-center rounded-full bg-[#2f1a45] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#3a2154] transition-colors"
              >
                Se connecter
              </Link>

            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type="button"
                className="text-white hover:text-gray-200"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-gradient-to-r from-[#1a0b2e] to-[#2f1a45] backdrop-blur-sm md:hidden">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link
                href="/formations"
                className="block text-white hover:text-gray-200 text-sm font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Nos formations
              </Link>
              <Link
                href="/experts"
                className="block text-white hover:text-gray-200 text-sm font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Nos experts
              </Link>
              <Link
                href="/contenus-gratuits"
                className="block text-white hover:text-gray-200 text-sm font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Nos contenus gratuits
              </Link>
              <Link
                href="/a-propos"
                className="block text-white hover:text-gray-200 text-sm font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                À propos
              </Link>
              <Link
                href="/recrutement"
                className="block text-white hover:text-gray-200 text-sm font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Recrutement
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full bg-[#2f1a45] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#3a2154] transition-colors w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                Se connecter
              </Link>


              
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}

