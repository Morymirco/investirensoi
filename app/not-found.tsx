"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Home, Search, ArrowLeft, BookOpen, HelpCircle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0A0B1C] text-white">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#6F3551] via-[#333191] to-[#6C8DFF] opacity-20 z-0"></div>

      {/* Animated particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[#6C8DFF]"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              y: [null, Math.random() * 100 + "%"],
              opacity: [null, Math.random() * 0.5 + 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{
              width: Math.random() * 6 + 2 + "px",
              height: Math.random() * 6 + 2 + "px",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center text-[#6C8DFF] hover:text-white transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Link>
          </div>

          <div className="bg-[#151627]/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-[#333191]/30 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#6F3551] via-[#333191] to-[#6C8DFF] text-transparent bg-clip-text">
                    404
                  </h1>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-6">Page non trouvée</h2>
                  <p className="text-gray-300 mb-8">
                    Oups ! La page que vous recherchez semble avoir disparu ou n'existe pas. Pas d'inquiétude, vous
                    pouvez continuer votre parcours d'apprentissage en explorant nos autres ressources.
                  </p>

                  <div className="space-y-4">
                    <Link
                      href="/"
                      className="inline-flex items-center justify-center w-full md:w-auto rounded-full bg-gradient-to-r from-[#6F3551] to-[#333191] px-8 py-3 text-base font-medium text-white hover:from-[#6F3551] hover:to-[#6C8DFF] transition-all duration-300"
                    >
                      <Home className="mr-2 h-4 w-4" />
                      Retour à l'accueil
                    </Link>

                    <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Link
                        href="/formations"
                        className="flex items-center p-3 rounded-lg bg-[#1C1D33]/50 hover:bg-[#333191]/20 border border-[#333191]/30 transition-colors"
                      >
                        <BookOpen className="h-5 w-5 text-[#6C8DFF] mr-3" />
                        <span>Nos formations</span>
                      </Link>
                      <Link
                        href="/contact"
                        className="flex items-center p-3 rounded-lg bg-[#1C1D33]/50 hover:bg-[#333191]/20 border border-[#333191]/30 transition-colors"
                      >
                        <HelpCircle className="h-5 w-5 text-[#6C8DFF] mr-3" />
                        <span>Besoin d'aide ?</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="order-1 md:order-2 flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="w-64 h-64 md:w-80 md:h-80 relative">
                    <Image
                      src="/placeholder.svg?height=400&width=400"
                      alt="Page non trouvée"
                      width={400}
                      height={400}
                      className="object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#6F3551] via-[#333191] to-[#6C8DFF] opacity-20 rounded-full animate-pulse"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Search box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 max-w-xl mx-auto"
          >
            <div className="bg-[#151627]/80 backdrop-blur-sm rounded-xl p-6 border border-[#333191]/30">
              <h3 className="text-lg font-medium mb-4">Rechercher sur le site</h3>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-4 py-3 bg-[#1C1D33] border border-[#333191]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C8DFF] focus:border-transparent"
                  placeholder="Que souhaitez-vous apprendre aujourd'hui ?"
                />
              </div>
            </div>
          </motion.div>

          {/* Popular pages */}
          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold mb-6">Pages populaires</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {["Formations", "À propos", "Blog", "Contact", "FAQ"].map((page) => (
                <Link
                  key={page}
                  href={`/${page.toLowerCase().replace("à ", "")}`}
                  className="px-6 py-2 rounded-full bg-[#1C1D33]/70 hover:bg-[#333191]/30 border border-[#333191]/30 transition-colors"
                >
                  {page}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 text-center py-6 text-sm text-gray-400 bg-[#0A0B1C]/80 backdrop-blur-sm border-t border-[#333191]/20">
        <p>© {new Date().getFullYear()} Investir en Soi. Tous droits réservés.</p>
      </div>
    </div>
  )
}

