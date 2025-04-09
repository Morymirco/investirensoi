"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext"
import { auth } from "@/services/auth"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FaLock } from "react-icons/fa"
import { Toaster, toast } from "sonner"

export default function AdminLogin() {
  const router = useRouter()
  const { user } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  // Rediriger vers le dashboard si déjà connecté
  if (user) {
    router.push("/admin")
    return null
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success("Connexion réussie")
      router.push("/admin")
    } catch (error: any) {
      console.error("Erreur de connexion:", error)
      toast.error(
        error.code === "auth/invalid-credential"
          ? "Email ou mot de passe incorrect"
          : "Erreur lors de la connexion"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0B1C] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#151627] border-gray-800">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="w-16 h-16 bg-[#048B9A]/20 rounded-full flex items-center justify-center mb-4">
            <FaLock className="w-8 h-8 text-[#048B9A]" />
          </div>
          <CardTitle className="text-2xl text-white text-center">
            Espace administrateur
          </CardTitle>
          <CardDescription className="text-gray-400 text-center">
            Connectez-vous pour accéder au tableau de bord
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#1C1D2F] border-gray-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Mot de passe
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-[#1C1D2F] border-gray-700 text-white"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#048B9A] hover:bg-[#037483]"
              disabled={loading}
            >
              {loading ? "Connexion en cours..." : "Se connecter"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Toaster 
        theme="dark" 
        position="top-center"
        expand={true}
        richColors
      />
    </div>
  )
} 