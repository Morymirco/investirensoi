"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { CheckCircle2, Clock, Mail, MapPin, Phone, Send } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "information", // valeur par défaut
    message: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, subject: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation basique
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Veuillez remplir tous les champs obligatoires")
      return
    }

    try {
      setLoading(true)
      
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || "Une erreur s'est produite lors de l'envoi du message")
      }

      // Réinitialiser le formulaire et afficher le message de succès
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "information",
        message: ""
      })
      setFormSubmitted(true)
      toast.success("Votre message a été envoyé avec succès !")
      
    } catch (error: any) {
      console.error("Erreur lors de l'envoi du message:", error)
      toast.error(error.message || "Une erreur s'est produite lors de l'envoi du message")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormSubmitted(false)
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
              <a href="tel:+224620353404" className="text-[#037483] hover:underline font-medium">
                (+224) 620 35 34 04
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
              <a href="mailto:contact@investirensoi.com" className="text-[#037483] hover:underline font-medium">
                contact@investirensoi.com
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
              <address className="text-[#037483] not-italic">Yattaya, Conakry, République de Guinée</address>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-4">Nos réseaux sociaux</h3>
            <p className="text-gray-300 mb-6">Suivez-nous sur les réseaux sociaux pour rester informé de nos actualités et nouvelles formations.</p>
            
            <div className="flex justify-center space-x-6">
              {/* Placeholder pour les icônes de réseaux sociaux - à remplacer avec les liens réels */}
              <a href="#" className="text-[#037483] hover:text-[#025E69] transition-colors">
                <div className="w-12 h-12 bg-[#151627] rounded-full flex items-center justify-center border border-gray-800 hover:border-[#037483]">
                  {/* Icône Facebook */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </div>
              </a>
              
              <a href="#" className="text-[#037483] hover:text-[#025E69] transition-colors">
                <div className="w-12 h-12 bg-[#151627] rounded-full flex items-center justify-center border border-gray-800 hover:border-[#037483]">
                  {/* Icône LinkedIn */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </div>
              </a>
              
              <a href="#" className="text-[#037483] hover:text-[#025E69] transition-colors">
                <div className="w-12 h-12 bg-[#151627] rounded-full flex items-center justify-center border border-gray-800 hover:border-[#037483]">
                  {/* Icône Instagram */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
              </a>
            </div>
            
            <p className="text-gray-400 mt-4">Investir En Soi – Pro</p>
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
                    onClick={resetForm}
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
                        value={formData.name}
                        onChange={handleChange}
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
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-[#1C1D33] border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone (optionnel)</Label>
                      <Input
                        id="phone"
                        placeholder="Votre numéro de téléphone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-[#1C1D33] border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Sujet</Label>
                      <Select value={formData.subject} onValueChange={handleSelectChange}>
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Comment pouvons-nous vous aider ?"
                      rows={6}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-[#1C1D33] border-gray-700 text-white placeholder:text-gray-500 resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-[#037483] hover:bg-[#025E69] text-white"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" /> Envoyer le message
                      </>
                    )}
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
                Notre équipe de support technique est disponible par email à contact@investirensoi.com ou par téléphone
                au (+224) 620 35 34 04 du lundi au vendredi de 9h à 18h.
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

 
    </div>
  )
}

