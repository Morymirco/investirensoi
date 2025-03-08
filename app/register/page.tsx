"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { FaGoogle, FaApple } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Add your registration logic here
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#0A0B1C] flex flex-col items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Créer un compte</h1>
          <p className="text-gray-400">Rejoignez notre communauté d&apos;apprenants</p>
        </div>

        <div className="bg-[#151627] rounded-xl p-6 shadow-xl backdrop-blur-sm border border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-300">
                  Prénom
                </Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  className="bg-[#1C1D33] border-gray-700 text-white placeholder:text-gray-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-gray-300">
                  Nom
                </Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  className="bg-[#1C1D33] border-gray-700 text-white placeholder:text-gray-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="exemple@email.com"
                className="bg-[#1C1D33] border-gray-700 text-white placeholder:text-gray-500"
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
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-300">
                Confirmer le mot de passe
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="bg-[#1C1D33] border-gray-700 text-white placeholder:text-gray-500"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                className="rounded bg-[#1C1D33] border-gray-700 text-[#048B9A]"
                required
              />
              <Label htmlFor="terms" className="text-sm text-gray-300">
                J&apos;accepte les{" "}
                <Link href="/terms" className="text-[#048B9A] hover:text-[#037483]">
                  conditions d&apos;utilisation
                </Link>
              </Label>
            </div>

            <Button type="submit" className="w-full bg-[#048B9A] hover:bg-[#037483] text-white" disabled={isLoading}>
              {isLoading ? "Création du compte..." : "Créer un compte"}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <Separator className="bg-gray-700" />
              <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#151627] px-2 text-gray-400 text-sm">
                Ou s&apos;inscrire avec
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
          Déjà un compte ?{" "}
          <Link href="/login" className="text-[#048B9A] hover:text-[#037483]">
            Se connecter
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

