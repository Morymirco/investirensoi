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
import { FaPlus, FaTimes } from "react-icons/fa"
import { Toaster, toast } from "sonner"

interface CabinetData {
  name: string
  category: string
  rating: number
  location: string
  description: string
  specialties: string[]
  experts: number
  availability: string
  image: string
  status: "active" | "pending" | "inactive"
}

const CABINET_NAMES = [
  "Institut Africain de Technologie",
  "Cabinet Conseil Excellence",
  "Centre de Formation Professionnelle",
  "Académie du Digital",
  "Bureau d'Études et Conseils",
  "Centre d'Innovation Numérique"
]

const CATEGORIES = [
  "Technologie",
  "Formation",
  "Conseil",
  "Management",
  "Finance",
  "Marketing Digital"
]

const LOCATIONS = [
  "Conakry, Guinée",
  "Kindia, Guinée",
  "Kankan, Guinée",
  "Labé, Guinée",
  "Mamou, Guinée",
  "N'Zérékoré, Guinée"
]

const SPECIALTIES_LIST = [
  "Développement Web",
  "Cybersécurité",
  "Data Science",
  "Intelligence Artificielle",
  "Cloud Computing",
  "Marketing Digital",
  "Gestion de Projet",
  "Design UX/UI",
  "DevOps",
  "Business Intelligence",
  "Blockchain",
  "Mobile Development"
]

const AVAILABILITY_OPTIONS = [
  "Lun-Ven, 8h-17h",
  "Lun-Sam, 8h-18h",
  "Lun-Dim, 9h-20h",
  "Lun-Ven, 9h-19h",
  "Tous les jours, 8h-20h",
  "Lun-Sam, 7h-19h"
]

const DESCRIPTIONS = [
  "Centre d'excellence spécialisé dans la formation aux métiers du numérique et l'innovation technologique. Notre équipe d'experts accompagne les entreprises et les particuliers dans leur transformation digitale.",
  "Cabinet de conseil leader dans l'accompagnement des entreprises vers leur transformation numérique. Nous proposons des solutions sur mesure et innovantes.",
  "Acteur majeur de la formation professionnelle en Guinée, nous formons les talents de demain aux métiers d'avenir.",
  "Expert en solutions digitales et formation professionnelle, nous accompagnons nos clients dans leurs projets de développement.",
  "Centre de formation et d'innovation dédié à l'excellence et au développement des compétences numériques en Afrique."
]

const IMAGES = [
  "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/cabinet1.jpg",
  "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/cabinet2.jpg",
  "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/cabinet3.jpg",
  "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/cabinet4.jpg"
]

export default function NewCabinetPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [newSpecialty, setNewSpecialty] = useState("")
  const [cabinetData, setCabinetData] = useState<CabinetData>({
    name: "",
    category: "",
    rating: 0,
    location: "",
    description: "",
    specialties: [],
    experts: 0,
    availability: "",
    image: "",
    status: "pending"
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validation de base
      if (!cabinetData.name || !cabinetData.description || !cabinetData.location) {
        throw new Error("Veuillez remplir tous les champs obligatoires")
      }

      // Validation de la note
      if (cabinetData.rating < 0 || cabinetData.rating > 5) {
        throw new Error("La note doit être comprise entre 0 et 5")
      }

      // Validation du nombre d'experts
      if (cabinetData.experts < 0) {
        throw new Error("Le nombre d'experts doit être positif")
      }

      // Ajouter le cabinet à Firestore
      const docRef = await addDoc(collection(db, "cabinets"), cabinetData)

      toast.success("Cabinet ajouté avec succès")
      router.push("/admin")
    } catch (error) {
      console.error("Erreur lors de la création du cabinet:", error)
      toast.error(error instanceof Error ? error.message : "Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  const addSpecialty = () => {
    if (newSpecialty.trim() && !cabinetData.specialties.includes(newSpecialty.trim())) {
      setCabinetData({
        ...cabinetData,
        specialties: [...cabinetData.specialties, newSpecialty.trim()]
      })
      setNewSpecialty("")
    }
  }

  const removeSpecialty = (index: number) => {
    setCabinetData({
      ...cabinetData,
      specialties: cabinetData.specialties.filter((_, i) => i !== index)
    })
  }

  const getRandomItem = <T,>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)]
  }

  const getRandomSpecialties = (): string[] => {
    const numberOfSpecialties = Math.floor(Math.random() * 4) + 2 // 2 à 5 spécialités
    const specialties = new Set<string>()
    
    while (specialties.size < numberOfSpecialties) {
      specialties.add(getRandomItem(SPECIALTIES_LIST))
    }
    
    return Array.from(specialties)
  }

  const generateRandomData = (): CabinetData => {
    return {
      name: getRandomItem(CABINET_NAMES),
      category: getRandomItem(CATEGORIES),
      rating: Number((Math.random() * 2 + 3).toFixed(1)), // Note entre 3.0 et 5.0
      location: getRandomItem(LOCATIONS),
      description: getRandomItem(DESCRIPTIONS),
      specialties: getRandomSpecialties(),
      experts: Math.floor(Math.random() * 15) + 5, // 5 à 20 experts
      availability: getRandomItem(AVAILABILITY_OPTIONS),
      image: getRandomItem(IMAGES),
      status: "pending"
    }
  }

  const fillRandomData = () => {
    setCabinetData(generateRandomData())
  }

  const generateSampleData = (): CabinetData => {
    return {
      name: "Institut Africain de Technologie",
      category: "Technologie",
      rating: 4.8,
      location: "Conakry, Guinée",
      description: "Centre d'excellence spécialisé dans la formation aux métiers du numérique et de l'innovation technologique. Notre équipe d'experts accompagne les entreprises et les particuliers dans leur transformation digitale.",
      specialties: ["Développement Web", "Cybersécurité", "Data Science", "Intelligence Artificielle", "Cloud Computing"],
      experts: 12,
      availability: "Lun-Sam, 8h-18h",
      image: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/cabinet.jpg",
      status: "pending"
    }
  }

  const fillSampleData = () => {
    setCabinetData(generateSampleData())
  }

  return (
    <div className="min-h-screen bg-[#0A0B1C] py-8">
      <div className="container mx-auto px-4">
        <Card className="bg-[#151627] border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-white">Nouveau cabinet</CardTitle>
                <CardDescription className="text-gray-400">
                  Ajoutez un nouveau cabinet partenaire
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="border-[#048B9A] text-[#048B9A] hover:bg-[#048B9A] hover:text-white"
                  onClick={fillRandomData}
                >
                  Générer aléatoirement
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-[#048B9A] text-[#048B9A] hover:bg-[#048B9A] hover:text-white"
                  onClick={fillSampleData}
                >
                  Remplir avec exemple
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Nom du cabinet</Label>
                  <Input
                    id="name"
                    value={cabinetData.name}
                    onChange={(e) => setCabinetData({ ...cabinetData, name: e.target.value })}
                    className="bg-[#1A1F3D] border-gray-700 text-white"
                    placeholder="ex: Institut Africain de Technologie"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-white">Catégorie</Label>
                  <Input
                    id="category"
                    value={cabinetData.category}
                    onChange={(e) => setCabinetData({ ...cabinetData, category: e.target.value })}
                    className="bg-[#1A1F3D] border-gray-700 text-white"
                    placeholder="ex: Technologie"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rating" className="text-white">Note (0-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={cabinetData.rating}
                    onChange={(e) => setCabinetData({ ...cabinetData, rating: parseFloat(e.target.value) })}
                    className="bg-[#1A1F3D] border-gray-700 text-white"
                    placeholder="ex: 4.5"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-white">Localisation</Label>
                  <Input
                    id="location"
                    value={cabinetData.location}
                    onChange={(e) => setCabinetData({ ...cabinetData, location: e.target.value })}
                    className="bg-[#1A1F3D] border-gray-700 text-white"
                    placeholder="ex: Conakry, Guinée"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experts" className="text-white">Nombre d'experts</Label>
                  <Input
                    id="experts"
                    type="number"
                    min="0"
                    value={cabinetData.experts}
                    onChange={(e) => setCabinetData({ ...cabinetData, experts: parseInt(e.target.value) })}
                    className="bg-[#1A1F3D] border-gray-700 text-white"
                    placeholder="ex: 12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability" className="text-white">Disponibilité</Label>
                  <Input
                    id="availability"
                    value={cabinetData.availability}
                    onChange={(e) => setCabinetData({ ...cabinetData, availability: e.target.value })}
                    className="bg-[#1A1F3D] border-gray-700 text-white"
                    placeholder="ex: Lun-Sam"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image" className="text-white">URL de l'image</Label>
                  <Input
                    id="image"
                    value={cabinetData.image}
                    onChange={(e) => setCabinetData({ ...cabinetData, image: e.target.value })}
                    className="bg-[#1A1F3D] border-gray-700 text-white"
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className="text-white">Statut</Label>
                  <Select 
                    value={cabinetData.status}
                    onValueChange={(value: "active" | "pending" | "inactive") => 
                      setCabinetData({ ...cabinetData, status: value })}
                  >
                    <SelectTrigger className="bg-[#1A1F3D] border-gray-700 text-white">
                      <SelectValue placeholder="Sélectionnez un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="inactive">Inactif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="description" className="text-white">Description</Label>
                  <Textarea
                    id="description"
                    value={cabinetData.description}
                    onChange={(e) => setCabinetData({ ...cabinetData, description: e.target.value })}
                    className="bg-[#1A1F3D] border-gray-700 text-white min-h-[100px]"
                    placeholder="Description détaillée du cabinet..."
                    required
                  />
                </div>

                <div className="md:col-span-2 space-y-4">
                  <Label className="text-white">Spécialités</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newSpecialty}
                      onChange={(e) => setNewSpecialty(e.target.value)}
                      className="bg-[#1A1F3D] border-gray-700 text-white flex-1"
                      placeholder="Ajouter une spécialité..."
                    />
                    <Button
                      type="button"
                      onClick={addSpecialty}
                      variant="outline"
                      className="border-[#048B9A] text-[#048B9A] hover:bg-[#048B9A] hover:text-white"
                    >
                      <FaPlus className="mr-2" /> Ajouter
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cabinetData.specialties.map((specialty, index) => (
                      <div
                        key={index}
                        className="bg-[#1A1F3D] text-white px-3 py-1 rounded-full flex items-center gap-2"
                      >
                        {specialty}
                        <button
                          type="button"
                          onClick={() => removeSpecialty(index)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <FaTimes className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
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
                  {loading ? "Création en cours..." : "Créer le cabinet"}
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