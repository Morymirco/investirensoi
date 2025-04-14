'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './LoadingScreen'
import Navbar from './Navbar'
import { AuthProvider } from "@/context/AuthContext"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <Navbar />
            {children}
          </>
        )}
      </AnimatePresence>
    </AuthProvider>
  )
} 