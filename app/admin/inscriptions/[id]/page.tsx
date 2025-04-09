"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { db } from "@/services/firestore"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { FaArrowLeft, FaEnvelope, FaTimes } from "react-icons/fa"
import { Toaster, toast } from "sonner"

interface Inscription {
  id: string
  formationId: string
  userId: string | null
  status: string
  createdAt: any
  updatedAt: any
  nom: string
  prenom: string
  email: string
  telephone: string
  entreprise: string
  fonction: string
  pays: string
  message: string
}

interface Formation {
  id: string
  title: string
  titre: string
}

export default function InscriptionDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [inscription, setInscription] = useState<Inscription | null>(null)
  const [formation, setFormation] = useState<Formation | null>(null)
  const [loading, setLoading] = useState(true)
  const [emailContent, setEmailContent] = useState({
    subject: "",
    message: ""
  })
  const [showEmailDialog, setShowEmailDialog] = useState(false)

  useEffect(() => {
    if (searchParams) {
      const action = searchParams.get("action")
      if (action === "email") {
        setShowEmailDialog(true)
      }
    }
  }, [searchParams])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const inscriptionDoc = await getDoc(doc(db, "inscriptions", params.id))
        if (inscriptionDoc.exists()) {
          const inscriptionData = { id: inscriptionDoc.id, ...inscriptionDoc.data() } as Inscription
          setInscription(inscriptionData)

          // Charger les détails de la formation
          const formationDoc = await getDoc(doc(db, "formations", inscriptionData.formationId))
          if (formationDoc.exists()) {
            setFormation({ id: formationDoc.id, ...formationDoc.data() } as Formation)
          }
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error)
        toast.error("Erreur lors du chargement des données")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  const handleStatusChange = async (newStatus: string) => {
    if (!inscription) return

    try {
      await updateDoc(doc(db, "inscriptions", inscription.id), {
        status: newStatus,
        updatedAt: new Date()
      })

      setInscription(prev => prev ? { ...prev, status: newStatus } : null)
      toast.success("Statut mis à jour avec succès")
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error)
      toast.error("Erreur lors de la mise à jour du statut")
    }
  }

  const handleSendEmail = async () => {
    if (!inscription) return

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: inscription.email,
          subject: emailContent.subject,
          message: emailContent.message
        }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || "Erreur lors de l'envoi de l'email")
      }

      toast.success("Email envoyé avec succès")
      setShowEmailDialog(false)
      setEmailContent({ subject: "", message: "" })

      // Mettre à jour le statut de l'inscription
      await updateDoc(doc(db, "inscriptions", inscription.id), {
        lastEmailSent: new Date(),
        updatedAt: new Date()
      })

    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error)
      toast.error("Erreur lors de l'envoi de l'email")
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/20 text-green-500"
      case "pending":
        return "bg-yellow-500/20 text-yellow-500"
      case "rejected":
        return "bg-red-500/20 text-red-500"
      default:
        return "bg-gray-500/20 text-gray-500"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0B1C] p-8">
        <div className="container mx-auto">
          <p className="text-white">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!inscription) {
    return (
      <div className="min-h-screen bg-[#0A0B1C] p-8">
        <div className="container mx-auto">
          <p className="text-white">Inscription non trouvée</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0B1C] p-8">
      <div className="container mx-auto">
        <Button
          variant="ghost"
          className="text-white mb-6"
          onClick={() => router.back()}
        >
          <FaArrowLeft className="mr-2" /> Retour
        </Button>

        <div className="grid gap-6">
          <Card className="bg-[#151627] border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-white">
                    Détails de l'inscription
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {formation?.title || formation?.titre || "Formation inconnue"}
                  </CardDescription>
                </div>
                <Badge className={getStatusBadgeColor(inscription.status)}>
                  {inscription.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Informations personnelles */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Informations personnelles</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-400">Nom complet</Label>
                    <p className="text-white">{`${inscription.prenom} ${inscription.nom}`}</p>
                  </div>
                  <div>
                    <Label className="text-gray-400">Email</Label>
                    <p className="text-white">{inscription.email}</p>
                  </div>
                  <div>
                    <Label className="text-gray-400">Téléphone</Label>
                    <p className="text-white">{inscription.telephone}</p>
                  </div>
                  <div>
                    <Label className="text-gray-400">Pays</Label>
                    <p className="text-white">{inscription.pays}</p>
                  </div>
                </div>
              </div>

              {/* Informations professionnelles */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Informations professionnelles</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-400">Entreprise</Label>
                    <p className="text-white">{inscription.entreprise}</p>
                  </div>
                  <div>
                    <Label className="text-gray-400">Fonction</Label>
                    <p className="text-white">{inscription.fonction}</p>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Message</h3>
                <p className="text-white whitespace-pre-wrap">{inscription.message}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-4">
                <Button 
                  className="bg-[#048B9A] hover:bg-[#037483]"
                  onClick={() => setShowEmailDialog(true)}
                >
                  <FaEnvelope className="mr-2" /> Répondre par email
                </Button>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="border-green-500 text-green-500 hover:bg-green-500/20"
                    onClick={() => handleStatusChange("approved")}
                    disabled={inscription.status === "approved"}
                  >
                    Approuver
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-500/20"
                    onClick={() => handleStatusChange("rejected")}
                    disabled={inscription.status === "rejected"}
                  >
                    Rejeter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal d'email */}
      {showEmailDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#151627] border border-gray-800 rounded-lg w-full max-w-md p-6 relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
              onClick={() => setShowEmailDialog(false)}
            >
              <FaTimes />
            </Button>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-2">Envoyer un email</h2>
              <p className="text-gray-400">
                Envoyez une réponse à {inscription?.email}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="subject" className="text-white">Sujet</Label>
                <Input
                  id="subject"
                  value={emailContent.subject}
                  onChange={(e) => setEmailContent(prev => ({ ...prev, subject: e.target.value }))}
                  className="bg-[#1C1D2F] border-gray-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-white">Message</Label>
                <Textarea
                  id="message"
                  value={emailContent.message}
                  onChange={(e) => setEmailContent(prev => ({ ...prev, message: e.target.value }))}
                  className="bg-[#1C1D2F] border-gray-700 text-white min-h-[200px]"
                />
              </div>
              <Button
                onClick={handleSendEmail}
                className="w-full bg-[#048B9A] hover:bg-[#037483]"
              >
                Envoyer
              </Button>
            </div>
          </div>
        </div>
      )}

      <Toaster 
        theme="dark" 
        position="top-center"
        expand={true}
        richColors
      />
    </div>
  )
} 