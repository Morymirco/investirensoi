"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/context/AuthContext"
import { db } from "@/services/firestore"
import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FaChartLine, FaEdit, FaEnvelope, FaEye, FaGraduationCap, FaPlus, FaSearch, FaTrash, FaUserTie } from "react-icons/fa"
import { Toaster, toast } from "sonner"

interface Formation {
  id: string
  title: string
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
  nextSession: string
  status: "active" | "draft" | "archived"
  chapitres: Array<{
    titre: string
    lecons: Array<{
      titre: string
      contenu: string
    }>
  }>
}

interface Cabinet {
  id: string
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

export default function AdminDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [formations, setFormations] = useState<Formation[]>([])
  const [cabinets, setCabinets] = useState<Cabinet[]>([])
  const [inscriptions, setInscriptions] = useState<Inscription[]>([])
  const [loading, setLoading] = useState(true)

  // États pour la recherche et les filtres
  const [searchFormation, setSearchFormation] = useState("")
  const [searchCabinet, setSearchCabinet] = useState("")
  const [searchInscription, setSearchInscription] = useState("")
  const [filterFormationStatus, setFilterFormationStatus] = useState("all")
  const [filterCabinetStatus, setFilterCabinetStatus] = useState("all")
  const [filterInscriptionStatus, setFilterInscriptionStatus] = useState("all")
  
  // Fonctions de filtrage
  const filteredFormations = formations.filter(formation => {
    const matchSearch = (formation.title || formation.titre || "")
      .toLowerCase()
      .includes(searchFormation.toLowerCase())
    const matchStatus = filterFormationStatus === "all" || formation.status === filterFormationStatus
    return matchSearch && matchStatus
  })

  const filteredCabinets = cabinets.filter(cabinet => {
    const matchSearch = cabinet.name.toLowerCase().includes(searchCabinet.toLowerCase())
    const matchStatus = filterCabinetStatus === "all" || cabinet.status === filterCabinetStatus
    return matchSearch && matchStatus
  })

  const filteredInscriptions = inscriptions.filter(inscription => {
    const matchSearch = (
      `${inscription.prenom} ${inscription.nom} ${inscription.email}`
    ).toLowerCase().includes(searchInscription.toLowerCase())
    const matchStatus = filterInscriptionStatus === "all" || inscription.status === filterInscriptionStatus
    return matchSearch && matchStatus
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Charger les formations
        const formationsSnapshot = await getDocs(collection(db, "formations"))
        const formationsData = formationsSnapshot.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            title: data.titre,
            prix: data.prix,
            format: data.format,
            niveau: data.niveau,
            nextSession: data.prochaineSesssion,
            status: data.status,
            ...data
          }
        }) as Formation[]
        setFormations(formationsData)

        // Charger les cabinets
        const cabinetsSnapshot = await getDocs(collection(db, "cabinets"))
        const cabinetsData = cabinetsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Cabinet[]
        setCabinets(cabinetsData)

        // Charger les inscriptions
        const inscriptionsSnapshot = await getDocs(collection(db, "inscriptions"))
        const inscriptionsData = inscriptionsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Inscription[]
        setInscriptions(inscriptionsData)

      } catch (error) {
        console.error("Erreur lors du chargement des données:", error)
        toast.error("Erreur lors du chargement des données")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleStatusChange = async (id: string, newStatus: string, type: "formation" | "cabinet") => {
    try {
      const collectionName = type === "formation" ? "formations" : "cabinets"
      await updateDoc(doc(db, collectionName, id), {
        status: newStatus
      })

      toast.success(`Statut mis à jour avec succès`)

      // Mettre à jour l'état local
      if (type === "formation") {
        setFormations(prev => prev.map(item => 
          item.id === id ? { ...item, status: newStatus as "active" | "draft" | "archived" } : item
        ))
      } else {
        setCabinets(prev => prev.map(item => 
          item.id === id ? { ...item, status: newStatus as "active" | "pending" | "inactive" } : item
        ))
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error)
      toast.error("Erreur lors de la mise à jour du statut")
    }
  }

  const handleDelete = async (id: string, type: "formation" | "cabinet" | "inscription") => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) return

    try {
      const collectionName = type === "formation" ? "formations" : type === "cabinet" ? "cabinets" : "inscriptions"
      await deleteDoc(doc(db, collectionName, id))

      toast.success(`${
        type === "formation" ? "Formation" : 
        type === "cabinet" ? "Cabinet" : 
        "Inscription"
      } supprimé avec succès`)

      // Mettre à jour l'état local
      if (type === "formation") {
        setFormations(prev => prev.filter(item => item.id !== id))
      } else if (type === "cabinet") {
        setCabinets(prev => prev.filter(item => item.id !== id))
      } else {
        setInscriptions(prev => prev.filter(item => item.id !== id))
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error)
      toast.error("Erreur lors de la suppression")
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-500"
      case "draft":
      case "pending":
        return "bg-yellow-500/20 text-yellow-500"
      case "archived":
      case "inactive":
        return "bg-red-500/20 text-red-500"
      default:
        return "bg-gray-500/20 text-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0B1C] py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Tableau de bord administratif</h1>
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.photoURL || undefined} />
              <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-white font-medium">{user?.displayName || user?.email}</p>
              <p className="text-gray-400 text-sm">Administrateur</p>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-[#151627] border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-white text-lg font-medium">Formations</CardTitle>
              <FaGraduationCap className="text-[#048B9A] h-5 w-5" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{formations.length}</div>
              <p className="text-gray-400 text-sm">Total des formations</p>
            </CardContent>
          </Card>

          <Card className="bg-[#151627] border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-white text-lg font-medium">Cabinets</CardTitle>
              <FaUserTie className="text-[#048B9A] h-5 w-5" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{cabinets.length}</div>
              <p className="text-gray-400 text-sm">Total des cabinets</p>
            </CardContent>
          </Card>

          <Card className="bg-[#151627] border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-white text-lg font-medium">Inscriptions</CardTitle>
              <FaChartLine className="text-[#048B9A] h-5 w-5" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{inscriptions.length}</div>
              <p className="text-gray-400 text-sm">Total des inscriptions</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="formations" className="w-full">
          <TabsList className="bg-[#151627] border border-gray-800 p-1 mb-6">
            <TabsTrigger value="formations" className="data-[state=active]:bg-[#048B9A] data-[state=active]:text-white">
              Formations
            </TabsTrigger>
            <TabsTrigger value="cabinets" className="data-[state=active]:bg-[#048B9A] data-[state=active]:text-white">
              Cabinets
            </TabsTrigger>
            <TabsTrigger value="inscriptions" className="data-[state=active]:bg-[#048B9A] data-[state=active]:text-white">
              Inscriptions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="formations">
            <Card className="bg-[#151627] border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white text-xl">Gestion des formations</CardTitle>
                    <CardDescription className="text-gray-400">
                      Gérez toutes vos formations depuis cet espace
                    </CardDescription>
                  </div>
                  <Button 
                    className="bg-[#048B9A] hover:bg-[#037483]"
                    onClick={() => router.push("/admin/formations/new")}
                  >
                    <FaPlus className="mr-2" /> Nouvelle formation
                  </Button>
                </div>
                <div className="mt-4 flex gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Rechercher une formation..."
                        value={searchFormation}
                        onChange={(e) => setSearchFormation(e.target.value)}
                        className="pl-10 bg-[#1C1D2F] border-gray-700 text-white"
                      />
                    </div>
                  </div>
                  <Select
                    value={filterFormationStatus}
                    onValueChange={setFilterFormationStatus}
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="active">Active</option>
                    <option value="draft">Brouillon</option>
                    <option value="archived">Archivée</option>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-gray-800">
                  <div className="w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="border-b border-gray-800">
                        <tr className="border-b border-gray-800">
                          <th className="h-12 px-4 text-left align-middle text-white">Formation</th>
                          <th className="h-12 px-4 text-left align-middle text-white">Prix</th>
                          <th className="h-12 px-4 text-left align-middle text-white">Format</th>
                          <th className="h-12 px-4 text-left align-middle text-white">Niveau</th>
                          <th className="h-12 px-4 text-left align-middle text-white">Prochaine session</th>
                          <th className="h-12 px-4 text-left align-middle text-white">Statut</th>
                          <th className="h-12 px-4 text-left align-middle text-white">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {filteredFormations.map((formation) => (
                          <tr key={formation.id} className="border-b border-gray-800">
                            <td className="p-4 align-middle text-white">{formation.title || formation.titre}</td>
                            <td className="p-4 align-middle text-gray-300">{formation.prix ? `${formation.prix} GNF` : "Non défini"}</td>
                            <td className="p-4 align-middle text-gray-300">{formation.format || "Non défini"}</td>
                            <td className="p-4 align-middle text-gray-300">{formation.niveau || "Non défini"}</td>
                            <td className="p-4 align-middle text-gray-300">{formation.nextSession || formation.prochaineSesssion || "Non défini"}</td>
                            <td className="p-4 align-middle">
                              <Badge className={getStatusBadgeColor(formation.status)}>
                                {formation.status}
                              </Badge>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => router.push(`/formations/${formation.id}`)}
                                  className="text-gray-400 hover:text-white"
                                >
                                  <FaEye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => router.push(`/admin/formations/${formation.id}/edit`)}
                                  className="text-gray-400 hover:text-white"
                                >
                                  <FaEdit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDelete(formation.id, "formation")}
                                  className="text-red-500 hover:text-red-600"
                                >
                                  <FaTrash className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cabinets">
            <Card className="bg-[#151627] border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white text-xl">Gestion des cabinets</CardTitle>
                    <CardDescription className="text-gray-400">
                      Gérez tous vos cabinets partenaires depuis cet espace
                    </CardDescription>
                  </div>
                  <Button 
                    className="bg-[#048B9A] hover:bg-[#037483]"
                    onClick={() => router.push("/admin/cabinets/new")}
                  >
                    <FaPlus className="mr-2" /> Nouveau cabinet
                  </Button>
                </div>
                <div className="mt-4 flex gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Rechercher un cabinet..."
                        value={searchCabinet}
                        onChange={(e) => setSearchCabinet(e.target.value)}
                        className="pl-10 bg-[#1C1D2F] border-gray-700 text-white"
                      />
                    </div>
                  </div>
                  <Select
                    value={filterCabinetStatus}
                    onValueChange={setFilterCabinetStatus}
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="active">Actif</option>
                    <option value="pending">En attente</option>
                    <option value="inactive">Inactif</option>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-gray-800">
                  <div className="w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="border-b border-gray-800">
                        <tr className="border-b border-gray-800">
                          <th className="h-12 px-4 text-left align-middle text-white">Cabinet</th>
                          <th className="h-12 px-4 text-left align-middle text-white">Catégorie</th>
                          <th className="h-12 px-4 text-left align-middle text-white">Note</th>
                          <th className="h-12 px-4 text-left align-middle text-white">Localisation</th>
                          <th className="h-12 px-4 text-left align-middle text-white">Experts</th>
                          <th className="h-12 px-4 text-left align-middle text-white">Disponibilité</th>
                          <th className="h-12 px-4 text-left align-middle text-white">Spécialités</th>
                          <th className="h-12 px-4 text-left align-middle text-white">Statut</th>
                          <th className="h-12 px-4 text-left align-middle text-white">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {filteredCabinets.map((cabinet) => (
                          <tr key={cabinet.id} className="border-b border-gray-800">
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-3">
                                <img
                                  src={cabinet.image}
                                  alt={cabinet.name}
                                  className="h-12 w-12 rounded-lg object-cover"
                                />
                                <div>
                                  <p className="text-white font-medium">{cabinet.name}</p>
                                  <p className="text-gray-400 text-sm line-clamp-1">{cabinet.description}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 align-middle text-gray-300">{cabinet.category}</td>
                            <td className="p-4 align-middle text-gray-300">
                              <div className="flex items-center gap-1">
                                <span className="text-yellow-500">★</span>
                                {cabinet.rating}
                              </div>
                            </td>
                            <td className="p-4 align-middle text-gray-300">{cabinet.location}</td>
                            <td className="p-4 align-middle text-gray-300">{cabinet.experts}</td>
                            <td className="p-4 align-middle text-gray-300">{cabinet.availability}</td>
                            <td className="p-4 align-middle">
                              <div className="flex flex-wrap gap-1">
                                {cabinet.specialties?.map((specialite, index) => (
                                  <Badge key={index} variant="outline" className="text-[#048B9A] border-[#048B9A]">
                                    {specialite}
                                  </Badge>
                                )) || "Aucune spécialité"}
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <Badge className={getStatusBadgeColor(cabinet.status)}>
                                {cabinet.status}
                              </Badge>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => router.push(`/cabinets/${cabinet.id}`)}
                                  className="text-gray-400 hover:text-white"
                                >
                                  <FaEye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => router.push(`/admin/cabinets/${cabinet.id}/edit`)}
                                  className="text-gray-400 hover:text-white"
                                >
                                  <FaEdit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDelete(cabinet.id, "cabinet")}
                                  className="text-red-500 hover:text-red-600"
                                >
                                  <FaTrash className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inscriptions">
            <Card className="bg-[#151627] border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white text-xl">Gestion des inscriptions</CardTitle>
                    <CardDescription className="text-gray-400">
                      Suivez toutes les inscriptions aux formations
                    </CardDescription>
                  </div>
                </div>
                <div className="mt-4 flex gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="Rechercher une inscription..."
                        value={searchInscription}
                        onChange={(e) => setSearchInscription(e.target.value)}
                        className="pl-10 bg-[#1C1D2F] border-gray-700 text-white"
                      />
                    </div>
                  </div>
                  <Select
                    value={filterInscriptionStatus}
                    onValueChange={setFilterInscriptionStatus}
                  >
                    <option value="all">Tous les statuts</option>
                    <option value="pending">En attente</option>
                    <option value="approved">Approuvée</option>
                    <option value="rejected">Rejetée</option>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-gray-800">
                  <div className="w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="border-b border-gray-800">
                        <tr className="border-b border-gray-800">
                          <th className="h-12 px-4 text-left align-middle text-white">Formation</th>
                          <th className="h-12 px-4 text-left align-middle text-white">Utilisateur</th>
                          <th className="h-12 px-4 text-left align-middle text-white">Contact</th>
                          <th className="h-12 px-4 text-left align-middle text-white">Entreprise</th>
                          <th className="h-12 px-4 text-left align-middle text-white">Date</th>
                          <th className="h-12 px-4 text-left align-middle text-white">Statut</th>
                          <th className="h-12 px-4 text-left align-middle text-white">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {filteredInscriptions.map((inscription) => {
                          const formation = formations.find(f => f.id === inscription.formationId)
                          return (
                            <tr key={inscription.id} className="border-b border-gray-800">
                              <td className="p-4 align-middle text-white">
                                {formation ? (formation.title || formation.titre) : "Formation inconnue"}
                              </td>
                              <td className="p-4 align-middle">
                                <div>
                                  <p className="text-white font-medium">{`${inscription.prenom} ${inscription.nom}`}</p>
                                  <p className="text-gray-400 text-sm">{inscription.pays}</p>
                                </div>
                              </td>
                              <td className="p-4 align-middle">
                                <div>
                                  <p className="text-gray-300">{inscription.email}</p>
                                  <p className="text-gray-400 text-sm">{inscription.telephone}</p>
                                </div>
                              </td>
                              <td className="p-4 align-middle">
                                <div>
                                  <p className="text-gray-300">{inscription.entreprise}</p>
                                  <p className="text-gray-400 text-sm">{inscription.fonction}</p>
                                </div>
                              </td>
                              <td className="p-4 align-middle text-gray-300">
                                {new Date(inscription.createdAt).toLocaleDateString('fr-FR', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </td>
                              <td className="p-4 align-middle">
                                <Badge className={getStatusBadgeColor(inscription.status)}>
                                  {inscription.status}
                                </Badge>
                              </td>
                              <td className="p-4 align-middle">
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => router.push(`/admin/inscriptions/${inscription.id}`)}
                                    className="text-gray-400 hover:text-white"
                                    title="Voir les détails"
                                  >
                                    <FaEye className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => router.push(`/admin/inscriptions/${inscription.id}?action=email`)}
                                    className="text-[#048B9A] hover:text-[#037483]"
                                    title="Répondre par email"
                                  >
                                    <FaEnvelope className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDelete(inscription.id, "inscription")}
                                    className="text-red-500 hover:text-red-600"
                                    title="Supprimer"
                                  >
                                    <FaTrash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
