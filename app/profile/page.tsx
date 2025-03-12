"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BookOpen,
  Calendar,
  Clock,
  Crown,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Star,
  Trophy,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  const [progress, setProgress] = useState(68)

  return (
    <div className="min-h-screen bg-[#0A0B1C]">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col fixed left-0 top-0 bottom-0 bg-gradient-to-b from-[#6F3551] via-[#333191] to-[#6F3551] text-white">
          <div className="p-6">
            <h2 className="text-xl font-bold">Investir en Soi</h2>
          </div>

          <div className="px-4 py-6 border-t border-white/10">
            <div className="flex items-center space-x-3 px-2">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/mory.jpg" />
                <AvatarFallback>MK</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Mory Koulibaly</p>
                <p className="text-sm text-white/70">Premium Member</p>
              </div>
            </div>

            <div className="mt-6 px-2">
              <div className="flex justify-between text-sm mb-2">
                <span>Progression globale</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="bg-white/20" />
            </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/profile">
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Tableau de bord
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/courses">
                <BookOpen className="mr-3 h-5 w-5" />
                Mes formations
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/calendar">
                <Calendar className="mr-3 h-5 w-5" />
                Calendrier
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/messages">
                <MessageSquare className="mr-3 h-5 w-5" />
                Messages
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/achievements">
                <Trophy className="mr-3 h-5 w-5" />
                Réalisations
              </Link>
            </Button>
          </nav>

          <div className="p-4 border-t border-white/10">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/dashboard/settings">
                <Settings className="mr-3 h-5 w-5" />
                Paramètres
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start text-red-400">
              <LogOut className="mr-3 h-5 w-5" />
              Déconnexion
            </Button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 lg:ml-64">
          <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Bonjour, John 👋</h1>
              <p className="text-gray-400">Voici un aperçu de votre progression</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-[#1C1D33] border-[#333191]/20">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-white text-sm font-medium">Formations en cours</CardTitle>
                  <BookOpen className="h-4 w-4 text-[#6C8DFF]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">4</div>
                  <p className="text-xs text-gray-400 mt-1">sur 12 formations</p>
                </CardContent>
              </Card>

              <Card className="bg-[#1C1D33] border-[#333191]/20">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-white text-sm font-medium">Temps d'apprentissage</CardTitle>
                  <Clock className="h-4 w-4 text-[#6C8DFF]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">28h</div>
                  <p className="text-xs text-gray-400 mt-1">ce mois-ci</p>
                </CardContent>
              </Card>

              <Card className="bg-[#1C1D33] border-[#333191]/20">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-white text-sm font-medium">Certifications</CardTitle>
                  <GraduationCap className="h-4 w-4 text-[#6C8DFF]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">3</div>
                  <p className="text-xs text-gray-400 mt-1">obtenues</p>
                </CardContent>
              </Card>

              <Card className="bg-[#1C1D33] border-[#333191]/20">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-white text-sm font-medium">Points XP</CardTitle>
                  <Star className="h-4 w-4 text-[#6C8DFF]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">2,850</div>
                  <p className="text-xs text-gray-400 mt-1">Niveau 12</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="progress" className="space-y-6">
              <TabsList className="bg-[#1C1D33] border border-[#333191]/20">
                <TabsTrigger value="progress" className="data-[state=active]:bg-[#333191]">
                  Progression
                </TabsTrigger>
                <TabsTrigger value="achievements" className="data-[state=active]:bg-[#333191]">
                  Réalisations
                </TabsTrigger>
                <TabsTrigger value="calendar" className="data-[state=active]:bg-[#333191]">
                  Calendrier
                </TabsTrigger>
              </TabsList>

              <TabsContent value="progress">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Current Courses */}
                  <Card className="bg-[#1C1D33] border-[#333191]/20">
                    <CardHeader>
                      <CardTitle className="text-white">Formations en cours</CardTitle>
                      <CardDescription>Continuez votre apprentissage</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        {
                          title: "Marketing Digital Avancé",
                          progress: 75,
                          timeLeft: "2h restantes",
                        },
                        {
                          title: "Développement Web Fullstack",
                          progress: 45,
                          timeLeft: "4h restantes",
                        },
                        {
                          title: "Data Science avec Python",
                          progress: 30,
                          timeLeft: "6h restantes",
                        },
                      ].map((course) => (
                        <div key={course.title} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-white">{course.title}</span>
                            <span className="text-[#6C8DFF]">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="bg-white/20" />
                          <p className="text-xs text-gray-400">{course.timeLeft}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Achievements */}
                  <Card className="bg-[#1C1D33] border-[#333191]/20">
                    <CardHeader>
                      <CardTitle className="text-white">Dernières réalisations</CardTitle>
                      <CardDescription>Vos succès récents</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            icon: Crown,
                            title: "Expert en Marketing",
                            description: "Terminé la formation Marketing Digital",
                            date: "Aujourd'hui",
                          },
                          {
                            icon: Star,
                            title: "Premier pas",
                            description: "Complété votre première leçon",
                            date: "Hier",
                          },
                          {
                            icon: Trophy,
                            title: "Assiduité",
                            description: "7 jours consécutifs d'apprentissage",
                            date: "Cette semaine",
                          },
                        ].map((achievement, index) => (
                          <div key={index} className="flex items-start space-x-4">
                            <div className="bg-gradient-to-r from-[#6F3551] to-[#333191] p-2 rounded-lg">
                              <achievement.icon className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-white text-sm font-medium">{achievement.title}</h4>
                              <p className="text-gray-400 text-sm">{achievement.description}</p>
                              <p className="text-[#6C8DFF] text-xs mt-1">{achievement.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="achievements">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <Card key={index} className="bg-[#1C1D33] border-[#333191]/20">
                      <CardHeader>
                        <div className="bg-gradient-to-r from-[#6F3551] to-[#333191] w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                          <Trophy className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-white">Réalisation {index + 1}</CardTitle>
                        <CardDescription>Description de la réalisation</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Progress value={75} className="bg-white/20 mb-2" />
                        <p className="text-sm text-gray-400">3/4 objectifs complétés</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="calendar">
                <Card className="bg-[#1C1D33] border-[#333191]/20">
                  <CardHeader>
                    <CardTitle className="text-white">Planning de la semaine</CardTitle>
                    <CardDescription>Vos prochaines sessions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          title: "Session Live - Marketing Digital",
                          date: "Lundi, 14:00",
                          duration: "1h30",
                        },
                        {
                          title: "Workshop Python",
                          date: "Mercredi, 10:00",
                          duration: "2h",
                        },
                        {
                          title: "Mentorat individuel",
                          date: "Vendredi, 16:00",
                          duration: "1h",
                        },
                      ].map((session, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 rounded-lg bg-[#333191]/10 border border-[#333191]/20"
                        >
                          <div className="flex items-center space-x-4">
                            <Calendar className="h-5 w-5 text-[#6C8DFF]" />
                            <div>
                              <h4 className="text-white text-sm font-medium">{session.title}</h4>
                              <p className="text-gray-400 text-sm">{session.date}</p>
                            </div>
                          </div>
                          <span className="text-[#6C8DFF] text-sm">{session.duration}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

