"use client"

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const CourseSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [isMobile, setIsMobile] = useState(false);

  const courses = [
    {
      id: 1,
      title: "L'Investissement Immobilier",
      image: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
      description: "Une formation introductive au milieu de l'investissement immobilier. Découvrez les étapes à suivre pour construire votre propre patrimoine en partant de zéro."
    },
    {
      id: 2,
      title: "Le Business et l'IA",
      image: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
      description: "Découvrez les étapes pour lancer votre propre business (freelance agence ou start-up) grâce au pouvoir de l'intelligence artificielle."
    },
    {
      id: 3,
      title: "Le E-Commerce 2.0",
      image: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
      description: "Découvrez l'E-Commerce 2.0, les bases du business en ligne et comment lancer votre propre boutique en quelques jours grâce à cette série de vidéos introductives complètement gratuites."
    },
    {
      id: 4,
      title: "Le Business Model",
      image: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
      description: "Découvrez les étapes pour lancer votre propre business (freelance agence ou start-up) grâce au pouvoir de l'intelligence artificielle."
    }
  ];

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

  const totalSlides = courses.length;
  const maxIndex = Math.max(0, totalSlides - cardsToShow);

  const nextSlide = () => {
    setActiveIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="py-16 bg-[#070D33]">
      <div className="container max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-white mb-2">Toujours hésitant ?</p>
          <h2 className="text-4xl font-bold mb-6 text-white">
            Découvrez nos contenus <span className="text-indigo-500">gratuits</span>
          </h2>
          <p className="max-w-3xl mx-auto text-white leading-relaxed">
            Nos mini formations gratuites vous aideront à développer des fondations solides dans les domaines du
            développement personnel, du business en ligne, de l'entrepreneuriat et de l'investissement.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mt-12">
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
              {courses.map((course) => (
                <div 
                  key={course.id} 
                  className={`flex-shrink-0 p-2 ${
                    isMobile ? 'w-full' : cardsToShow === 2 ? 'w-1/2' : 'w-1/3'
                  } rounded-xl`}
                  style={{ 
                    flexBasis: isMobile ? '100%' : cardsToShow === 2 ? '50%' : '28.333%' 
                  }}
                >
                  <div className="bg-white/10 border border-white/30 text-white rounded-xl overflow-hidden shadow-lg h-full flex flex-col transition-all duration-300 hover:shadow-xl">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={course.image}
                        alt={course.title}
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
                      <h3 className="text-xl font-bold mb-3 text-[#00b67a]">{course.title}</h3>
                      <p className="text-white mb-6 flex-grow">{course.description}</p>
                      <button className="mt-auto w-full bg-[#cbcdff] hover:bg-[#50528f] hover:text-white text-indigo-900 font-medium py-2.5 px-4 rounded-full transition-colors duration-300">
                        Voir la formation gratuite
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
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
        </div>
      </div>
    </section>
  );
};

export default CourseSection;