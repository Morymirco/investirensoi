'use client'

import { motion } from "framer-motion"
import Image from "next/image"

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0B1C]"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-32 h-32 mx-auto mb-8"
        >
          <Image
            src="/logo.png"
            alt="Investir En Soi"
            fill
            className="object-contain"
          />
        </motion.div>
        
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, repeat: Infinity }}
          className="h-1 bg-[#048B9A] rounded-full w-48 mx-auto"
        />
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-white text-sm"
        >
          Chargement...
        </motion.p>
      </div>
    </motion.div>
  )
} 