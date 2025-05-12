import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Image from "next/image";

export default function PartnershipSection() {
  return (
    <section className="py-16 md:py-24 bg-[#020B2D]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="bg-gradient-to-r rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          {/* Background pattern/overlay */}
          <div className="absolute inset-0 opacity-10">
            <Image 
              src="/partenaire.jpg" 
              alt="Background pattern" 
              fill 
              className="object-cover"
              priority
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-6 text-white"
              >
                Pour les cabinets partenaires
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <p className="text-xl text-gray-300 mb-4">
                  Vous êtes un cabinet de formation professionnelle ?
                </p>
                <p className="text-xl text-gray-300 mb-6">
                  Vous voulez proposer une offre en ligne sans investir en logistique ni en production ?
                </p>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-lg text-gray-300 mb-6"
              >
                Investir En Soi vous propose un partenariat gagnant-gagnant :
              </motion.p>
            </div>
            
            <div className="relative">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="absolute -top-20 -right-10 hidden lg:block"
              >
                <div className="relative w-64 h-64">
                  <Image 
                    src="/partnership.png" 
                    alt="Partenariat" 
                    width={250} 
                    height={250}
                    className="object-contain"
                  />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-[#037483] flex-shrink-0 mt-1" />
                  <p className="text-gray-300">Une offre digitale clé-en-main pour vos clients</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-[#037483] flex-shrink-0 mt-1" />
                  <p className="text-gray-300">Une commission attractive sur chaque vente</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-[#037483] flex-shrink-0 mt-1" />
                  <p className="text-gray-300">Aucun coût de production ou de gestion</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-[#037483] flex-shrink-0 mt-1" />
                  <p className="text-gray-300">Une solution simple, rapide et scalable</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <p className="text-lg text-gray-300 mb-6">
                  Rejoignez notre réseau de distributeurs officiels
                </p>
                <Button className="bg-[#037483] hover:bg-[#025E69] text-white px-6 py-2 rounded-md">
                  Devenir partenaire
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 