"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setFormSubmitted(true)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#0A0B1C] text-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#1C1D33] to-[#0A0B1C] py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Contactez <span className="text-[#037483]">Nous</span>
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Notre équipe est à votre disposition pour répondre à toutes vos questions et vous accompagner dans votre
              parcours d'apprentissage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 md:py-16 -mt-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#151627] rounded-xl p-6 border border-gray-800 hover:border-[#037483] transition-all duration-300"
            >
              <div className="w-12 h-12 bg-[#037483]/20 rounded-full flex items-center justify-center mb-4">
                <Phone className="text-[#037483] h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Téléphone</h3>
              <p className="text-gray-300 mb-4">Nous sommes disponibles du lundi au vendredi de 9h à 18h.</p>
              <a href="tel:+33123456789" className="text-[#037483] hover:underline font-medium">
                +33 1 23 45 67 89
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#151627] rounded-xl p-6 border border-gray-800 hover:border-[#037483] transition-all duration-300"
            >
              <div className="w-12 h-12 bg-[#037483]/20 rounded-full flex items-center justify-center mb-4">
                <Mail className="text-[#037483] h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-300 mb-4">Nous répondons généralement dans un délai de 24 heures.</p>
              <a href="mailto:contact@investirensoi.fr" className="text-[#037483] hover:underline font-medium">
                contact@investirensoi.fr
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#151627] rounded-xl p-6 border border-gray-800 hover:border-[#037483] transition-all duration-300"
            >
              <div className="w-12 h-12 bg-[#037483]/20 rounded-full flex items-center justify-center mb-4">
                <MapPin className="text-[#037483] h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Adresse</h3>
              <p className="text-gray-300 mb-4">Venez nous rencontrer dans nos locaux.</p>
              <address className="text-[#037483] not-italic">123 Avenue de l'Innovation, 75000 Paris</address>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-[#151627] rounded-xl p-8 border border-gray-800"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Envoyez-nous un message</h2>

              {formSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-[#037483]/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="text-[#037483] h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Message envoyé !</h3>
                  <p className="text-gray-300 mb-6">
                    Merci de nous avoir contactés. Notre équipe vous répondra dans les plus brefs délais.
                  </p>
                  <Button
                    onClick={() => setFormSubmitted(false)}
                    className="bg-[#037483] hover:bg-[#025E69] text-white"
                  >
                    Envoyer un autre message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet</Label>
                      <Input
                        id="name"
                        placeholder="Votre nom"
                        required
                        className="bg-[#1C1D33] border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        required
                        className="bg-[#1C1D33] border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Sujet</Label>
                    <Select>
                      <SelectTrigger className="bg-[#1C1D33] border-gray-700 text-white">
                        <SelectValue placeholder="Sélectionnez un sujet" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1C1D33] border-gray-700 text-white">
                        <SelectItem value="information">Demande d'information</SelectItem>
                        <SelectItem value="support">Support technique</SelectItem>
                        <SelectItem value="partnership">Partenariat</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Comment pouvons-nous vous aider ?"
                      rows={6}
                      required
                      className="bg-[#1C1D33] border-gray-700 text-white placeholder:text-gray-500 resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-[#037483] hover:bg-[#025E69] text-white">
                    <Send className="mr-2 h-4 w-4" /> Envoyer le message
                  </Button>
                </form>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="bg-[#151627] rounded-xl overflow-hidden h-[400px] border border-gray-800">
                {/* This would be replaced with an actual map component */}
                <div className="relative h-full w-full bg-[#1C1D33]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-400">Carte interactive</p>
                  </div>
                  <Image
                    src="/placeholder.svg?height=800&width=800"
                    alt="Carte"
                    fill
                    className="object-cover opacity-50"
                  />
                </div>
              </div>

              <div className="bg-[#151627] rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold mb-4">Heures d'ouverture</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-[#037483] mr-2" />
                      <span className="text-gray-300">Lundi - Vendredi</span>
                    </div>
                    <span className="text-white">9h - 18h</span>
                  </li>
                  <li className="flex justify-between">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-[#037483] mr-2" />
                      <span className="text-gray-300">Samedi</span>
                    </div>
                    <span className="text-white">10h - 15h</span>
                  </li>
                  <li className="flex justify-between">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-[#037483] mr-2" />
                      <span className="text-gray-300">Dimanche</span>
                    </div>
                    <span className="text-white">Fermé</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-[#151627]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Questions fréquentes</h2>
            <p className="text-gray-300 text-lg">
              Vous avez des questions ? Consultez notre FAQ pour trouver rapidement des réponses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-[#1C1D33] p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-3">Comment puis-je m'inscrire à une formation ?</h3>
              <p className="text-gray-300">
                Vous pouvez vous inscrire directement sur notre site en choisissant la formation qui vous intéresse et
                en cliquant sur le bouton "S'inscrire". Suivez ensuite les instructions pour finaliser votre
                inscription.
              </p>
            </div>

            <div className="bg-[#1C1D33] p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-3">Quels sont les modes de paiement acceptés ?</h3>
              <p className="text-gray-300">
                Nous acceptons les paiements par carte bancaire (Visa, Mastercard), PayPal, et virement bancaire. Nous
                proposons également des facilités de paiement en plusieurs fois.
              </p>
            </div>

            <div className="bg-[#1C1D33] p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-3">Puis-je annuler mon inscription ?</h3>
              <p className="text-gray-300">
                Oui, vous pouvez annuler votre inscription dans les 14 jours suivant votre achat et obtenir un
                remboursement complet, conformément à notre politique de satisfaction garantie.
              </p>
            </div>

            <div className="bg-[#1C1D33] p-6 rounded-xl border border-gray-800">
              <h3 className="text-xl font-semibold mb-3">Comment contacter le support technique ?</h3>
              <p className="text-gray-300">
                Notre équipe de support technique est disponible par email à support@investirensoi.fr ou par téléphone
                au +33 1 23 45 67 89 du lundi au vendredi de 9h à 18h.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-[#037483] hover:bg-[#025E69] text-white">Voir toutes les FAQ</Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-r from-[#1C1D33] to-[#151627] rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Restez informé</h2>
              <p className="text-gray-300 text-lg mb-8">
                Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités, conseils et offres spéciales.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Votre adresse email"
                  className="bg-[#0A0B1C]/50 border-gray-700 text-white placeholder:text-gray-500 flex-grow"
                />
                <Button className="bg-[#037483] hover:bg-[#025E69] text-white whitespace-nowrap">S'inscrire</Button>
              </form>
              <p className="text-gray-400 text-sm mt-4">
                En vous inscrivant, vous acceptez notre politique de confidentialité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0B1C] border-t border-gray-800 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">INVESTIR EN SOI</h3>
              <p className="text-gray-400 mb-4">L'école 2.0 qui vous accompagne vers vos objectifs.</p>
              <div className="flex space-x-4">{/* Social media icons would go here */}</div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-[#037483]">
                    Formations en ligne
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-[#037483]">
                    Coaching personnalisé
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-[#037483]">
                    Webinaires gratuits
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-[#037483]">
                    Ressources
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Entreprise</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-[#037483]">
                    À propos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-[#037483]">
                    Carrières
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-[#037483]">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-[#037483]">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Nous contacter</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-[#037483] mr-2 mt-0.5" />
                  <span className="text-gray-400">123 Avenue de l'Innovation, 75000 Paris</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 text-[#037483] mr-2" />
                  <span className="text-gray-400">contact@investirensoi.fr</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 text-[#037483] mr-2" />
                  <span className="text-gray-400">+33 1 23 45 67 89</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Investir en Soi. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

