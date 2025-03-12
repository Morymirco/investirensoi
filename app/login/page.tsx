"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { FaGoogle, FaApple } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { login } from "@/services/auth"
import { useAuth } from "@/context/AuthContext"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      // Redirigez l'utilisateur vers la page d'accueil ou une autre page après la connexion
      router.push("/")
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const user = await login(email, password)
      console.log("Utilisateur connecté :", user)
      // La redirection est gérée par useEffect
      
    } catch (error) {
      setError("Erreur lors de la connexion. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0B1C] flex flex-col items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Bienvenue</h1>
          <p className="text-gray-400">Connectez-vous à votre compte</p>
        </div>

        <div className="bg-[#151627] rounded-xl p-6 shadow-xl backdrop-blur-sm border border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="exemple@email.com"
                className="bg-[#1C1D33] border-gray-700 text-white placeholder:text-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                Mot de passe
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-[#1C1D33] border-gray-700 text-white placeholder:text-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="rounded bg-[#1C1D33] border-gray-700 text-[#048B9A]" />
                <span className="text-gray-300">Se souvenir de moi</span>
              </label>
              <Link href="/reset-password" className="text-sm text-[#048B9A] hover:text-[#037483]">
                Mot de passe oublié ?
              </Link>
            </div>

            <Button type="submit" className="w-full bg-[#048B9A] hover:bg-[#037483] text-white" disabled={isLoading}>
              {isLoading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <Separator className="bg-gray-700" />
              <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#151627] px-2 text-gray-400 text-sm">
                Ou continuer avec
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <Button variant="outline" className="bg-[#1C1D33] border-gray-700 text-white hover:bg-[#262842]">
                <FaGoogle className="mr-2" /> Google
              </Button>
              <Button variant="outline" className="bg-[#1C1D33] border-gray-700 text-white hover:bg-[#262842]">
                <FaApple className="mr-2" /> Apple
              </Button>
            </div>
          </div>
        </div>

        <p className="text-center mt-6 text-gray-400">
          Pas encore de compte ?{" "}
          <Link href="/register" className="text-[#048B9A] hover:text-[#037483]">
            S&apos;inscrire
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

