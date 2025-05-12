"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Users, Trophy, BookOpen, Calendar, Mail, Phone, MapPin } from "lucide-react"

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-[#0A0B1C] text-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#1C1D33] to-[#0A0B1C] py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                À Propos de <span className="text-[#037483]">Investir en Soi</span>
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                Découvrez notre histoire, notre mission et les valeurs qui nous animent pour vous accompagner vers la
                réussite.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-[#037483] hover:bg-[#025E69] text-white">Nos formations</Button>
                <Button variant="outline" className="border-[#037483] text-[#037483] hover:bg-[#037483]/10">
                  Nous contacter
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-[400px] rounded-xl overflow-hidden"
            >
              <Image src="/equipe.jpg" alt="Notre équipe" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B1C] to-transparent opacity-60"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Notre Histoire</h2>
            <p className="text-gray-300 text-lg">
              Fondée en octobre 2024 en République de Guinée, Investir En Soi est le fruit d'une vision simple mais audacieuse : rendre la formation professionnelle en Afrique, accessible à tous, et à tout moment.
              Avec Investir En Soi, l'apprentissage devient un levier universel pour transformer des ambitions professionnelles en réussites concrètes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="space-y-6">
                <div className="bg-[#151627] p-6 rounded-xl border border-gray-800">
                  <h3 className="text-xl font-semibold mb-3">Pourquoi choisir nos programmes ?</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Flexibilité : Apprenez à votre rythme, où que vous soyez.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Qualité : Contenus conçus par nombreux experts francophones.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Pratique : Des exercices concrets et des études de cas pour une application immédiate en entreprise.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Accompagnement : Une communauté et des ressources pour vous soutenir tout au long de votre parcours.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#151627] p-6 rounded-xl border border-gray-800">
                  <p className="text-gray-300">
                    Avec nos partenaires (consultants, cabinets, institutions), nous bâtissons un écosystème d'apprentissage africain, pratique, inclusif et ambitieux.
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2 relative h-[500px] rounded-xl overflow-hidden">
              <Image src="/equipe.jpg" alt="Notre évolution" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B1C] to-transparent opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Mission */}
      <section className="py-16 md:py-24 bg-[#151627]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Notre Mission</h2>
            <p className="text-gray-300 text-lg">
              Notre mission est de démocratiser l'expertise en Afrique à travers le numérique, en fournissant des solutions de formation plus flexibles, adaptées aux besoins et aux réalités du marché Africains.
              Conçues par une équipe d'experts francophones reconnus, nos formations de qualité supérieure sont pensées pour vous offrir une méthode d'apprentissage pratique et efficace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1C1D33] p-8 rounded-xl border border-gray-800 hover:border-[#037483] transition-all duration-300">
              <div className="w-14 h-14 bg-[#037483]/20 rounded-full flex items-center justify-center mb-6">
                <Users className="text-[#037483] h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Accessibilité</h3>
              <p className="text-gray-300">
                Rendre l'éducation de qualité accessible à tous, indépendamment de la situation géographique ou
                financière.
              </p>
            </div>

            <div className="bg-[#1C1D33] p-8 rounded-xl border border-gray-800 hover:border-[#037483] transition-all duration-300">
              <div className="w-14 h-14 bg-[#037483]/20 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="text-[#037483] h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Excellence</h3>
              <p className="text-gray-300">
                Proposer des contenus pédagogiques de haute qualité, créés par des experts reconnus dans leur domaine.
              </p>
            </div>

            <div className="bg-[#1C1D33] p-8 rounded-xl border border-gray-800 hover:border-[#037483] transition-all duration-300">
              <div className="w-14 h-14 bg-[#037483]/20 rounded-full flex items-center justify-center mb-6">
                <Trophy className="text-[#037483] h-7 w-7" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-gray-300">
                Utiliser les technologies les plus avancées pour créer des expériences d'apprentissage engageantes et
                efficaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Promesse - Nouvelle section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Notre Promesse</h2>
            <p className="text-gray-300 text-xl mb-8">
              Apprenez à votre rythme. Avec les meilleurs. Depuis là où vous êtes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-[#151627] p-6 rounded-xl border border-gray-800 hover:border-[#037483] transition-all duration-300">
              <div className="flex items-start">
                <div className="bg-[#037483]/20 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#037483]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-300">Formations 100 % en ligne – accessibles 24h/24</p>
              </div>
            </div>
            
            <div className="bg-[#151627] p-6 rounded-xl border border-gray-800 hover:border-[#037483] transition-all duration-300">
              <div className="flex items-start">
                <div className="bg-[#037483]/20 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#037483]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-300">Contenus concrets, applicables dès demain</p>
              </div>
            </div>
            
            <div className="bg-[#151627] p-6 rounded-xl border border-gray-800 hover:border-[#037483] transition-all duration-300">
              <div className="flex items-start">
                <div className="bg-[#037483]/20 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#037483]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-300">Experts praticiens reconnus dans toute l'Afrique</p>
              </div>
            </div>
            
            <div className="bg-[#151627] p-6 rounded-xl border border-gray-800 hover:border-[#037483] transition-all duration-300">
              <div className="flex items-start">
                <div className="bg-[#037483]/20 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#037483]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-300">Certificats professionnels valorisables sur le marché</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notre Équipe - Section commentée */}
      {/*
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Notre Équipe</h2>
            <p className="text-gray-300 text-lg">
              Découvrez les personnes passionnées qui travaillent chaque jour pour vous offrir la meilleure expérience
              d'apprentissage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((member) => (
              <div
                key={member}
                className="bg-[#151627] rounded-xl overflow-hidden border border-gray-800 hover:border-[#037483] transition-all duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={`/mory.jpg`}
                    alt={`Membre de l'équipe ${member}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">Mory</h3>
                  <p className="text-[#037483] mb-4">CEO</p>
                  <p className="text-gray-300 text-sm mb-4">
                    je suis un developpeur full stack et je suis passionné par la creation de valeur pour les entreprises et les particuliers.
                  </p>
                  <div className="flex space-x-3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Nos Chiffres - Section commentée */}
      {/*
      <section className="py-16 md:py-24 bg-[#151627]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Nos Chiffres</h2>
            <p className="text-gray-300 text-lg">
              Quelques statistiques qui témoignent de notre impact et de notre croissance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#1C1D33] p-8 rounded-xl border border-gray-800 text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#037483] mb-2">+250k</div>
              <p className="text-gray-300">Apprenants satisfaits</p>
            </div>

            <div className="bg-[#1C1D33] p-8 rounded-xl border border-gray-800 text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#037483] mb-2">+500</div>
              <p className="text-gray-300">Formations disponibles</p>
            </div>

            <div className="bg-[#1C1D33] p-8 rounded-xl border border-gray-800 text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#037483] mb-2">+100</div>
              <p className="text-gray-300">Experts formateurs</p>
            </div>

            <div className="bg-[#1C1D33] p-8 rounded-xl border border-gray-800 text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#037483] mb-2">4.8/5</div>
              <p className="text-gray-300">Note moyenne</p>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-r from-[#1C1D33] to-[#151627] rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à investir dans votre avenir ?</h2>
              <p className="text-gray-300 text-lg mb-8">
                Rejoignez notre communauté d'apprenants et commencez votre parcours vers la réussite dès aujourd'hui.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-[#037483] hover:bg-[#025E69] text-white">Découvrir nos formations</Button>
                <Button variant="outline" className="border-[#037483] text-[#037483] hover:bg-[#037483]/10">
                  Nous contacter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-[#0A0B1C] border-t border-gray-800 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">INVESTIR EN SOI</h3>
              <p className="text-gray-400 mb-4">L'école 2.0 qui vous accompagne vers vos objectifs.</p>
              <div className="flex space-x-4">{/* Social media icons would go here */}</div>
            // </div>

          //   <div>
          //     <h3 className="text-lg font-semibold mb-4">Services</h3>
          //     <ul className="space-y-2">
          //       <li>
          //         <Link href="#" className="text-gray-400 hover:text-[#037483]">
          //           Formations en ligne
          //         </Link>
          //       </li>
          //       <li>
          //         <Link href="#" className="text-gray-400 hover:text-[#037483]">
          //           Coaching personnalisé
          //         </Link>
          //       </li>
          //       <li>
          //         <Link href="#" className="text-gray-400 hover:text-[#037483]">
          //           Webinaires gratuits
          //         </Link>
          //       </li>
          //       <li>
          //         <Link href="#" className="text-gray-400 hover:text-[#037483]">
          //           Ressources
          //         </Link>
          //       </li>
          //     </ul>
          //   </div>

          //   <div>
          //     <h3 className="text-lg font-semibold mb-4">Entreprise</h3>
          //     <ul className="space-y-2">
          //       <li>
          //         <Link href="#" className="text-gray-400 hover:text-[#037483]">
          //           À propos
          //         </Link>
          //       </li>
          //       <li>
          //         <Link href="#" className="text-gray-400 hover:text-[#037483]">
          //           Carrières
          //         </Link>
          //       </li>
          //       <li>
          //         <Link href="#" className="text-gray-400 hover:text-[#037483]">
          //           Blog
          //         </Link>
          //       </li>
          //       <li>
          //         <Link href="#" className="text-gray-400 hover:text-[#037483]">
          //           Contact
          //         </Link>
          //       </li>
          //     </ul>
          //   </div>

          //   <div>
          //     <h3 className="text-lg font-semibold mb-4">Nous contacter</h3>
          //     <ul className="space-y-3">
          //       <li className="flex items-start">
          //         <MapPin className="h-5 w-5 text-[#037483] mr-2 mt-0.5" />
          //         <span className="text-gray-400">123 Avenue de l'Innovation, 75000 Paris</span>
          //       </li>
          //       <li className="flex items-center">
          //         <Mail className="h-5 w-5 text-[#037483] mr-2" />
          //         <span className="text-gray-400">contact@investirensoi.fr</span>
          //       </li>
          //       <li className="flex items-center">
          //         <Phone className="h-5 w-5 text-[#037483] mr-2" />
          //         <span className="text-gray-400">+33 1 23 45 67 89</span>
          //       </li>
          //     </ul>
          //   </div>
          // </div>

          // <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          //   <p>© {new Date().getFullYear()} Investir en Soi. Tous droits réservés.</p>
          // </div>
        // </div>
      // </footer> */}
    // </div>
  )
}

