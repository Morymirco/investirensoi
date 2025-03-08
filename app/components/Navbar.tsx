"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import Image from "next/image"
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
            <Image src="/logo.png" alt="Logo" width={100} height={400} className="w-auto h-10"/>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/formations" className="text-white hover:text-gray-200 text-sm font-medium">
                Nos formations
              </Link>
              {/* <Link href="/experts" className="text-white hover:text-gray-200 text-sm font-medium">
                Nos experts
              </Link> */}
              <Link href="/contact" className="text-white hover:text-gray-200 text-sm font-medium">
                Contact
              </Link>
              <Link href="/a-propos" className="text-white hover:text-gray-200 text-sm font-medium">
                À propos
              </Link>
              <Link href="/cabinets" className="text-white hover:text-gray-200 text-sm font-medium">
               Cabinets
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
              {/* <Link
                href="/experts"
                className="block text-white hover:text-gray-200 text-sm font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Nos experts
              </Link> */}
              <Link
                href="/contact"
                className="block text-white hover:text-gray-200 text-sm font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
                </Link>
              <Link
                href="/apropos"
                className="block text-white hover:text-gray-200 text-sm font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                À propos
              </Link>
              <Link
                href="/cabinets"
                className="block text-white hover:text-gray-200 text-sm font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                  Cabinets
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

