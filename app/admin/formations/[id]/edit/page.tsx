"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { db } from "@/services/firestore"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useEffect, useState, use } from "react"
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

export default function EditFormationPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
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
    chapitres: []
  })

  const resolvedParams = use(params)

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        const formationDoc = await getDoc(doc(db, "formations", resolvedParams.id))
        if (formationDoc.exists()) {
          setFormationData(formationDoc.data() as FormationData)
        } else {
          toast.error("Formation non trouvée")
          router.push("/admin")
        }
      } catch (error) {
        console.error("Erreur lors du chargement de la formation:", error)
        toast.error("Erreur lors du chargement de la formation")
      } finally {
        setLoading(false)
      }
    }

    fetchFormation()
  }, [resolvedParams.id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      // Validation de base
      if (!formationData.titre || !formationData.description) {
        throw new Error("Veuillez remplir tous les champs obligatoires")
      }

      // Mise à jour de la formation dans Firestore
      await updateDoc(doc(db, "formations", resolvedParams.id), formationData)

      toast.success("Formation mise à jour avec succès")
      router.push("/admin")
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la formation:", error)
      toast.error(error instanceof Error ? error.message : "Une erreur est survenue")
    } finally {
      setSaving(false)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0B1C] py-8">
        <div className="container mx-auto px-4">
          <Card className="bg-[#151627] border-gray-800">
            <CardContent className="p-8">
              <p className="text-white text-center">Chargement...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0B1C] py-8">
      <div className="container mx-auto px-4">
        <Card className="bg-[#151627] border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-white">Modifier la formation</CardTitle>
                <CardDescription className="text-gray-400">
                  Modifiez les informations de la formation
                </CardDescription>
              </div>
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

                <div className="space-y-2">
                  <Label htmlFor="status" className="text-white">Statut</Label>
                  <Select 
                    value={formationData.status}
                    onValueChange={(value: "active" | "draft" | "archived") => 
                      setFormationData({ ...formationData, status: value })}
                  >
                    <SelectTrigger className="bg-[#1A1F3D] border-gray-700 text-white">
                      <SelectValue placeholder="Sélectionnez un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Brouillon</SelectItem>
                      <SelectItem value="archived">Archivée</SelectItem>
                    </SelectContent>
                  </Select>
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
                  disabled={saving}
                >
                  {saving ? "Enregistrement..." : "Enregistrer les modifications"}
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