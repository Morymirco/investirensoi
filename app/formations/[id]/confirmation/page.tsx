"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-[#0A0B1C] py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-[#151627] border-gray-800">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl md:text-3xl text-white">Demande d'inscription envoyée !</CardTitle>
            <CardDescription className="text-gray-400 mt-4">
              Nous avons bien reçu votre demande d'inscription. Notre équipe va l'examiner et vous contactera très prochainement.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-[#1A1F3D] p-4 rounded-lg">
                <p className="text-gray-300 text-center">
                  Un email de confirmation a été envoyé à votre adresse email. 
                  Si vous ne le recevez pas dans les prochaines minutes, vérifiez votre dossier spam.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-white text-lg font-medium text-center">Prochaines étapes</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-[#048B9A] mr-2">1.</span>
                    Notre équipe examinera votre demande
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#048B9A] mr-2">2.</span>
                    Vous recevrez un appel ou un email pour confirmer les détails
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#048B9A] mr-2">3.</span>
                    Nous vous enverrons toutes les informations pratiques pour la formation
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Link href="/formations" className="flex-1">
                  <Button variant="outline" className="w-full border-gray-700 text-[#048B9A] hover:bg-[#151627] hover:text-white">
                    Voir d'autres formations
                  </Button>
                </Link>
                <Link href="/" className="flex-1">
                  <Button className="w-full bg-[#048B9A] hover:bg-[#037483] text-white">
                    Retour à l'accueil
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 