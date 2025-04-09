"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { db } from "@/services/firestore"
import { addDoc, collection } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FaPlus, FaTrash } from "react-icons/fa"
import { Toaster, toast } from "sonner"

interface Lecon {
  titre: string
  contenu: string
}

interface Chapitre {
  titre: string
  lecons: Lecon[]
}

interface FormationData {
  titre: string
  description: string
  imageUrl: string
  duree: string
  nombreDeCours: number
  niveau: string
  prix: string
  prixOriginal: string
  format: string
  prochaineSesssion: string
  status: "active" | "draft" | "archived"
  chapitres: Chapitre[]
}

const generateSampleData = (): FormationData => {
  return {
    titre: "Formation Développement Web Fullstack",
    description: "Apprenez à créer des applications web complètes avec les technologies modernes. Cette formation intensive vous permettra de maîtriser le développement frontend et backend.",
    imageUrl: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
    duree: "21 heures",
    nombreDeCours: 15,
    niveau: "Intermédiaire",
    prix: "2 500 000",
    prixOriginal: "3 000 000",
    format: "Présentiel",
    prochaineSesssion: "15-17 Mai 2024",
    status: "draft",
    chapitres: [
      {
        titre: "Introduction au développement web",
        lecons: [
          {
            titre: "Les fondamentaux du web",
            contenu: "Dans cette leçon, nous aborderons les concepts fondamentaux du développement web, notamment le fonctionnement d'Internet, les protocoles HTTP et HTTPS, et l'architecture client-serveur."
          },
          {
            titre: "Environnement de développement",
            contenu: "Configuration de l'environnement de développement, installation des outils nécessaires et bonnes pratiques de développement."
          }
        ]
      },
      {
        titre: "Frontend avec React",
        lecons: [
          {
            titre: "Introduction à React",
            contenu: "Découverte de React, ses concepts fondamentaux, et création de premiers composants."
          },
          {
            titre: "État et props",
            contenu: "Gestion de l'état local et des props dans React, cycle de vie des composants."
          }
        ]
      },
      {
        titre: "Backend avec Node.js",
        lecons: [
          {
            titre: "Création d'une API REST",
            contenu: "Développement d'une API REST avec Express.js, gestion des routes et des middlewares."
          },
          {
            titre: "Base de données MongoDB",
            contenu: "Introduction à MongoDB, modélisation des données et opérations CRUD."
          }
        ]
      }
    ]
  }
}

export default function NewFormationPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formationData, setFormationData] = useState<FormationData>({
    titre: "",
    description: "",
    imageUrl: "",
    duree: "",
    nombreDeCours: 0,
    niveau: "Débutant",
    prix: "",
    prixOriginal: "",
    format: "Présentiel",
    prochaineSesssion: "",
    status: "draft",
    chapitres: [
      {
        titre: "",
        lecons: [{ titre: "", contenu: "" }]
      }
    ]
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validation de base
      if (!formationData.titre || !formationData.description) {
        throw new Error("Veuillez remplir tous les champs obligatoires")
      }

      // Ajouter la formation à Firestore
      const docRef = await addDoc(collection(db, "formations"), formationData)

      toast.success("Formation créée avec succès")
      router.push("/admin")
    } catch (error) {
      console.error("Erreur lors de la création de la formation:", error)
      toast.error(error instanceof Error ? error.message : "Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  const addChapitre = () => {
    setFormationData({
      ...formationData,
      chapitres: [...formationData.chapitres, { titre: "", lecons: [{ titre: "", contenu: "" }] }]
    })
  }

  const addLecon = (chapitreIndex: number) => {
    const newChapitres = [...formationData.chapitres]
    newChapitres[chapitreIndex].lecons.push({ titre: "", contenu: "" })
    setFormationData({ ...formationData, chapitres: newChapitres })
  }

  const removeChapitre = (index: number) => {
    const newChapitres = formationData.chapitres.filter((_, i) => i !== index)
    setFormationData({ ...formationData, chapitres: newChapitres })
  }

  const removeLecon = (chapitreIndex: number, leconIndex: number) => {
    const newChapitres = [...formationData.chapitres]
    newChapitres[chapitreIndex].lecons = newChapitres[chapitreIndex].lecons.filter((_, i) => i !== leconIndex)
    setFormationData({ ...formationData, chapitres: newChapitres })
  }

  const updateChapitreTitle = (index: number, titre: string) => {
    const newChapitres = [...formationData.chapitres]
    newChapitres[index].titre = titre
    setFormationData({ ...formationData, chapitres: newChapitres })
  }

  const updateLecon = (chapitreIndex: number, leconIndex: number, field: keyof Lecon, value: string) => {
    const newChapitres = [...formationData.chapitres]
    newChapitres[chapitreIndex].lecons[leconIndex][field] = value
    setFormationData({ ...formationData, chapitres: newChapitres })
  }

  const fillSampleData = () => {
    setFormationData(generateSampleData())
  }

  return (
    <div className="min-h-screen bg-[#0A0B1C] py-8">
      <div className="container mx-auto px-4">
        <Card className="bg-[#151627] border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-white">Nouvelle formation</CardTitle>
                <CardDescription className="text-gray-400">
                  Créez une nouvelle formation en remplissant les informations ci-dessous
                </CardDescription>
              </div>
              <Button
                type="button"
                variant="outline"
                className="border-[#048B9A] text-[#048B9A] hover:bg-[#048B9A] hover:text-white"
                onClick={fillSampleData}
              >
                Remplir avec exemple
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Informations générales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="titre" className="text-white">Titre de la formation</Label>
                  <Input
                    id="titre"
                    value={formationData.titre}
                    onChange={(e) => setFormationData({ ...formationData, titre: e.target.value })}
                    className="bg-[#1A1F3D] border-gray-700 text-white"
                    placeholder="ex: Flutter pour débutants"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl" className="text-white">URL de l'image</Label>
                  <Input
                    id="imageUrl"
                    value={formationData.imageUrl}
                    onChange={(e) => setFormationData({ ...formationData, imageUrl: e.target.value })}
                    className="bg-[#1A1F3D] border-gray-700 text-white"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duree" className="text-white">Durée</Label>
                  <Input
                    id="duree"
                    value={formationData.duree}
                    onChange={(e) => setFormationData({ ...formationData, duree: e.target.value })}
                    className="bg-[#1A1F3D] border-gray-700 text-white"
                    placeholder="ex: 21 heures"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="niveau" className="text-white">Niveau</Label>
                  <Select 
                    value={formationData.niveau}
                    onValueChange={(value) => setFormationData({ ...formationData, niveau: value })}
                  >
                    <SelectTrigger className="bg-[#1A1F3D] border-gray-700 text-white">
                      <SelectValue placeholder="Sélectionnez un niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Débutant">Débutant</SelectItem>
                      <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                      <SelectItem value="Avancé">Avancé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prix" className="text-white">Prix (GNF)</Label>
                  <Input
                    id="prix"
                    value={formationData.prix}
                    onChange={(e) => setFormationData({ ...formationData, prix: e.target.value })}
                    className="bg-[#1A1F3D] border-gray-700 text-white"
                    placeholder="ex: 2 500 000"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prixOriginal" className="text-white">Prix original (GNF)</Label>
                  <Input
                    id="prixOriginal"
                    value={formationData.prixOriginal}
                    onChange={(e) => setFormationData({ ...formationData, prixOriginal: e.target.value })}
                    className="bg-[#1A1F3D] border-gray-700 text-white"
                    placeholder="ex: 3 000 000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="format" className="text-white">Format</Label>
                  <Select 
                    value={formationData.format}
                    onValueChange={(value) => setFormationData({ ...formationData, format: value })}
                  >
                    <SelectTrigger className="bg-[#1A1F3D] border-gray-700 text-white">
                      <SelectValue placeholder="Sélectionnez un format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Présentiel">Présentiel</SelectItem>
                      <SelectItem value="En ligne">En ligne</SelectItem>
                      <SelectItem value="Hybride">Hybride</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prochaineSesssion" className="text-white">Prochaine session</Label>
                  <Input
                    id="prochaineSesssion"
                    value={formationData.prochaineSesssion}
                    onChange={(e) => setFormationData({ ...formationData, prochaineSesssion: e.target.value })}
                    className="bg-[#1A1F3D] border-gray-700 text-white"
                    placeholder="ex: 15-17 Mai 2024"
                    required
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="description" className="text-white">Description</Label>
                  <Textarea
                    id="description"
                    value={formationData.description}
                    onChange={(e) => setFormationData({ ...formationData, description: e.target.value })}
                    className="bg-[#1A1F3D] border-gray-700 text-white min-h-[100px]"
                    placeholder="Description détaillée de la formation..."
                    required
                  />
                </div>
              </div>

              {/* Chapitres et leçons */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">Chapitres et leçons</h3>
                  <Button
                    type="button"
                    onClick={addChapitre}
                    variant="outline"
                    className="border-[#048B9A] text-[#048B9A] hover:bg-[#048B9A] hover:text-white"
                  >
                    <FaPlus className="mr-2" /> Ajouter un chapitre
                  </Button>
                </div>

                {formationData.chapitres.map((chapitre, chapitreIndex) => (
                  <Card key={chapitreIndex} className="bg-[#1A1F3D] border-gray-700">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 mr-4">
                          <Input
                            value={chapitre.titre}
                            onChange={(e) => updateChapitreTitle(chapitreIndex, e.target.value)}
                            className="bg-[#151627] border-gray-600 text-white"
                            placeholder="Titre du chapitre"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            onClick={() => addLecon(chapitreIndex)}
                            variant="outline"
                            size="sm"
                            className="border-[#048B9A] text-[#048B9A] hover:bg-[#048B9A] hover:text-white"
                          >
                            <FaPlus className="mr-2" /> Ajouter une leçon
                          </Button>
                          <Button
                            type="button"
                            onClick={() => removeChapitre(chapitreIndex)}
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-600"
                          >
                            <FaTrash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {chapitre.lecons.map((lecon, leconIndex) => (
                        <div key={leconIndex} className="space-y-2 bg-[#151627] p-4 rounded-lg">
                          <div className="flex items-start gap-4">
                            <div className="flex-1 space-y-2">
                              <Input
                                value={lecon.titre}
                                onChange={(e) => updateLecon(chapitreIndex, leconIndex, "titre", e.target.value)}
                                className="bg-[#1A1F3D] border-gray-600 text-white"
                                placeholder="Titre de la leçon"
                              />
                              <Textarea
                                value={lecon.contenu}
                                onChange={(e) => updateLecon(chapitreIndex, leconIndex, "contenu", e.target.value)}
                                className="bg-[#1A1F3D] border-gray-600 text-white"
                                placeholder="Contenu de la leçon..."
                              />
                            </div>
                            <Button
                              type="button"
                              onClick={() => removeLecon(chapitreIndex, leconIndex)}
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-600"
                            >
                              <FaTrash className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-700 text-white hover:bg-gray-800"
                  onClick={() => router.back()}
                >
                  Annuler
                </Button>
                <Button 
                  type="submit"
                  className="bg-[#048B9A] hover:bg-[#037483] text-white"
                  disabled={loading}
                >
                  {loading ? "Création en cours..." : "Créer la formation"}
                </Button>
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