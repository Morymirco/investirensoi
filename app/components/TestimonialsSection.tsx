// components/TestimonialsSection.jsx
'use client'
import React, { useEffect, useState } from 'react';
import { db } from "@/services/firestore"
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore"
import { motion } from "framer-motion"
import { StarIcon } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

// Interface pour les avis
interface Avis {
  id: string;
  formationId: string;
  nom: string;
  commentaire: string;
  note: number;
  date: any;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

// Composant étoiles pour la notation
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          size={16}
          className={`${
            star <= rating
              ? 'text-yellow-400 fill-yellow-400'
              : 'text-gray-400'
          }`}
        />
      ))}
    </div>
  )
}

// Composant de chargement
const TestimonialSkeleton = () => (
  <div className="bg-[#070730] p-6 rounded-lg shadow-md">
    <div className="flex items-center mb-4">
      <Skeleton className="h-12 w-12 rounded-full mr-4" />
      <div>
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-3/4" />
  </div>
)

const TestimonialsSection = () => {
  const [avis, setAvis] = useState<Avis[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAvis = async () => {
      try {
        const avisRef = collection(db, "formation_avis")
        const q = query(
          avisRef,
          orderBy("date", "desc"),
          limit(3)
        )
        const querySnapshot = await getDocs(q)
        const avisList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Avis))
        setAvis(avisList)
      } catch (error) {
        console.error("Erreur lors de la récupération des avis:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAvis()
  }, [])

  return (
    <div className="bg-[#070D33] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white">Ce que nos étudiants disent</h2>
          <p className="mt-4 text-xl text-white">
            Des milliers de personnes ont déjà transformé leur vie avec nos formations.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <TestimonialSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {avis.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                className="bg-[#070730] p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-[#00b67a] flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-xl">
                      {testimonial.nom.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">{testimonial.nom}</h3>
                    <StarRating rating={testimonial.note} />
                  </div>
                </div>
                <p className="text-white line-clamp-4">{testimonial.commentaire}</p>
                <p className="text-sm text-gray-400 mt-4">
                  {new Date(testimonial.date?.seconds * 1000).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        <div className="mt-12 text-center">
          <a 
            href="/formations" 
            className="text-white font-medium hover:text-[#00b67a] transition-colors duration-300"
          >
            Voir toutes nos formations →
          </a>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;