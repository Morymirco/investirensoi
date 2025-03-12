"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/context/AuthContext"
import { db } from "@/services/firestore"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { use, useState } from "react"
import { Toaster, toast } from 'sonner'

export default function InscriptionPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const resolvedParams = use(params)

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: user?.email || "",
    telephone: "",
    pays: "Guinée",
    entreprise: "",
    fonction: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/send-inscription-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formationId: resolvedParams.id,
          ...formData
        }),
      })

      const data = await response.json()
      console.log('API Response:', { status: response.status, data })

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'envoi de la demande')
      }

      try {
        const inscriptionData = {
          ...formData,
          formationId: resolvedParams.id,
          userId: user?.uid || null,
          status: 'pending', // pending, confirmed, cancelled
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        }

        const docRef = await addDoc(collection(db, "inscriptions"), inscriptionData)
        console.log("Inscription sauvegardée avec l'ID:", docRef.id)
      } catch (firestoreError) {
        console.error("Erreur Firestore:", firestoreError)
        // On continue même si l'enregistrement Firestore échoue
        // L'email a déjà été envoyé
      }

      toast.success('Inscription réussie !', {
        description: 'Nous avons bien reçu votre demande d\'inscription. Nous vous contacterons prochainement.'
      })

      router.push(`/formations/${resolvedParams.id}/confirmation`)
    } catch (error) {
      console.error('Submission error:', error)
      toast.error('Erreur', {
        description: error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0B1C] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-[#151627] border-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl text-white">Demande d'inscription à la formation</CardTitle>
            <CardDescription className="text-gray-400">
              Remplissez le formulaire ci-dessous pour vous inscrire à la formation présentielle. 
              Notre équipe vous contactera pour finaliser votre inscription.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nom" className="text-white">Nom</Label>
                  <Input
                    id="nom"
                    placeholder="Votre nom"
                    className="bg-[#1A1F3D] border-gray-700 text-white placeholder:text-gray-500"
                    value={formData.nom}
                    onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prenom" className="text-white">Prénom</Label>
                  <Input
                    id="prenom"
                    placeholder="Votre prénom"
                    className="bg-[#1A1F3D] border-gray-700 text-white placeholder:text-gray-500"
                    value={formData.prenom}
                    onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    className="bg-[#1A1F3D] border-gray-700 text-white placeholder:text-gray-500"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telephone" className="text-white">Téléphone</Label>
                  <Input
                    id="telephone"
                    type="tel"
                    placeholder="Votre numéro de téléphone"
                    className="bg-[#1A1F3D] border-gray-700 text-white placeholder:text-gray-500"
                    value={formData.telephone}
                    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="entreprise" className="text-white">Entreprise (optionnel)</Label>
                  <Input
                    id="entreprise"
                    placeholder="Nom de votre entreprise"
                    className="bg-[#1A1F3D] border-gray-700 text-white placeholder:text-gray-500"
                    value={formData.entreprise}
                    onChange={(e) => setFormData({ ...formData, entreprise: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fonction" className="text-white">Fonction (optionnel)</Label>
                  <Input
                    id="fonction"
                    placeholder="Votre fonction"
                    className="bg-[#1A1F3D] border-gray-700 text-white placeholder:text-gray-500"
                    value={formData.fonction}
                    onChange={(e) => setFormData({ ...formData, fonction: e.target.value })}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="message" className="text-white">Message (optionnel)</Label>
                  <Textarea
                    id="message"
                    placeholder="Avez-vous des questions ou des besoins particuliers ?"
                    className="bg-[#1A1F3D] border-gray-700 text-white placeholder:text-gray-500 min-h-[100px]"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
              </div>

              <div className="pt-6">
                <Button 
                  type="submit" 
                  className="w-full bg-[#048B9A] hover:bg-[#037483] text-white text-lg py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande d'inscription"}
                </Button>
                <p className="text-gray-400 text-sm text-center mt-4">
                  Notre équipe vous contactera dans les plus brefs délais pour confirmer votre inscription
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <Toaster 
        theme="dark" 
        position="top-center"
        expand={true}
        richColors
      />
    </div>
  )
} 