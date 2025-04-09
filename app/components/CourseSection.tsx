"use client"

import { db } from '@/services/firestore';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

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

const CourseSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [isMobile, setIsMobile] = useState(false);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [showingRecentFormations, setShowingRecentFormations] = useState(false);

  // Récupérer les formations depuis Firestore
  useEffect(() => {
    const fetchFormations = async () => {
      try {
        setLoading(true);
        const formationsRef = collection(db, "formations");
        
        // Récupérer les formations les plus récentes
        const formationsQuery = query(
          formationsRef,
          limit(4)
        );
        
        const querySnapshot = await getDocs(formationsQuery);
        
        const formationsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Formation[];
        
        setFormations(formationsData);
        setShowingRecentFormations(true);
      } catch (error) {
        console.error("Erreur lors de la récupération des formations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFormations();
  }, []);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
        setIsMobile(true);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
        setIsMobile(false);
      } else {
        setCardsToShow(3);
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = formations.length;
  const maxIndex = Math.max(0, totalSlides - cardsToShow);

  const nextSlide = () => {
    setActiveIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Rediriger vers la page de détail de la formation
  const handleCourseClick = (id: string) => {
    router.push(`/formations/${id}`);
  };

  return (
    <section className="py-16 bg-[#070D33]">
      <div className="container max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-white mb-2">Découvrez nos formations</p>
          <h2 className="text-4xl font-bold mb-6 text-white">
            {showingRecentFormations ? (
              <>Nos formations <span className="text-indigo-500">récentes</span></>
            ) : (
              <>Découvrez nos contenus <span className="text-indigo-500">gratuits</span></>
            )}
          </h2>
          <p className="max-w-3xl mx-auto text-white leading-relaxed">
            {showingRecentFormations ? (
              <>Explorez nos dernières formations pour développer vos compétences dans les domaines du business, 
              de l'entrepreneuriat et de l'investissement.</>
            ) : (
              <>Nos mini formations gratuites vous aideront à développer des fondations solides dans les domaines du
              développement personnel, du business en ligne, de l'entrepreneuriat et de l'investissement.</>
            )}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mt-12">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-white">Chargement des formations...</p>
            </div>
          ) : formations.length > 0 ? (
            <div 
              ref={carouselRef}
              className="overflow-hidden px-4"
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(-${activeIndex * (100 / cardsToShow)}%)`,
                  gap: '1rem' 
                }}
              >
                {formations.map((formation) => (
                  <div 
                    key={formation.id} 
                    className={`flex-shrink-0 p-2 ${
                      isMobile ? 'w-full' : cardsToShow === 2 ? 'w-1/2' : 'w-1/3'
                    } rounded-xl`}
                    style={{ 
                      flexBasis: isMobile ? '100%' : cardsToShow === 2 ? '50%' : '28.333%' 
                    }}
                  >
                    <div 
                      className="bg-white/10 border border-white/30 text-white rounded-xl overflow-hidden shadow-lg h-full flex flex-col transition-all duration-300 hover:shadow-xl cursor-pointer"
                      onClick={() => handleCourseClick(formation.id)}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={formation.imageUrl || "/placeholder.svg"}
                          alt={formation.titre}
                          width={400}
                          height={200}
                          className="w-full h-auto object-cover rounded-xl"
                          layout="responsive"
                          objectFit="cover"
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold mb-3 text-[#00b67a]">{formation.titre}</h3>
                        <p className="text-white mb-6 flex-grow">{formation.description}</p>
                        <button className="mt-auto w-full bg-[#cbcdff] hover:bg-[#50528f] hover:text-white text-indigo-900 font-medium py-2.5 px-4 rounded-full transition-colors duration-300">
                          {showingRecentFormations ? "Voir la formation" : "Voir la formation gratuite"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-white">Aucune formation disponible pour le moment.</p>
            </div>
          )}

          {/* Navigation Buttons */}
          {formations.length > cardsToShow && (
            <>
              <button 
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 sm:-ml-5 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors z-10"
                aria-label="Précédent"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 sm:-mr-5 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors z-10"
                aria-label="Suivant"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CourseSection;