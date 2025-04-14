"use client"

import { Button } from "@/components/ui/button";
import { db } from '@/services/firestore';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { motion } from "framer-motion";
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaGraduationCap, FaRegClock } from "react-icons/fa";

// Interface pour le type de formation
interface Formation {
  id: string;
  titre: string;
  description: string;
  categorie: string;
  nombreDeCours: number;
  prix: number;
  imageUrl: string;
  duree: string;
  niveau: string;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function FeaturedCourses() {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Récupérer les formations depuis Firestore
  useEffect(() => {
    const fetchFormations = async () => {
      try {
        setLoading(true);
        const formationsRef = collection(db, "formations");
        
        // Récupérer les 8 premières formations
        const formationsQuery = query(
          formationsRef,
          limit(8)
        );
        
        const querySnapshot = await getDocs(formationsQuery);
        
        const formationsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Formation[];
        
        setFormations(formationsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des formations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFormations();
  }, []);

  // Rediriger vers la page de détail de la formation
  const handleCourseClick = (id: string) => {
    router.push(`/formations/${id}`);
  };
  


  return (
    <section className="bg-[#000025] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Cours en ligne en vedette</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Les cours les plus demandés sur notre plateforme, les plus sollicités par les apprenants sont ci-dessous :
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-white">Chargement des formations...</p>
          </div>
        ) : formations.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {formations.map((formation) => (
              <motion.div
                key={formation.id}
                variants={itemVariants}
                className="bg-[#151627] rounded-xl overflow-hidden border border-gray-800 hover:border-[#048B9A] transition-all duration-300 hover:shadow-lg hover:shadow-[#048B9A]/10 flex flex-col h-full cursor-pointer"
                onClick={() => handleCourseClick(formation.id)}
              >
                <div className="relative h-48">
                  <Image 
                    src={formation.imageUrl || "/placeholder.svg"} 
                    alt={formation.titre} 
                    fill 
                    className="object-cover" 
                  />
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white line-clamp-2">{formation.titre}</h3>
                  </div>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center text-gray-400">
                      <FaRegClock className="mr-1" />
                      <span className="text-sm">{formation.nombreDeCours} cours</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="bg-[#1C1D33] text-gray-300 px-2 py-1 rounded-md text-xs">
                      {formation.categorie}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-4 text-sm line-clamp-2 flex-grow">{formation.description}</p>

                  <div className="flex flex-wrap gap-3 mb-4 text-sm">
                    <div className="flex items-center text-gray-400">
                      <FaRegClock className="mr-1" />
                      <span>{formation.duree}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <FaGraduationCap className="mr-1" />
                      <span>{formation.niveau}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex items-center">
                      <span className="text-xl font-bold text-white">{formation.prix.toLocaleString()} GNF</span>
                    </div>
                    <Button 
            className="bg-[#048B9A] hover:bg-[#037483] text-white" 
            onClick={(e) => {
              e.stopPropagation(); // Empêche la propagation de l'événement
              router.push(`/formations/${formation.id}/inscription`);
            }}
          >
            Réserver
          </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-white">Aucune formation disponible pour le moment.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Button 
            onClick={() => router.push('/formations')}
            className="bg-[#048B9A] hover:bg-[#037483] text-white px-8 py-6 text-lg rounded-full"
          >
            Voir toutes les formations
          </Button>
        </div>
      </div>
    </section>
  )
}

