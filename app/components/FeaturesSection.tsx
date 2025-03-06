// components/FeaturesSection.jsx
'use client'
import React from 'react';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      title: "100% Digitale",
      icon: "wifi",
      description: "Nos formations sont 100% en ligne et conçues pour être suivies à votre rythme et depuis chez vous. De plus vos accès sont illimités et valables à vie."
    },
    {
      id: 2,
      title: "Étape par étape",
      icon: "steps",
      description: "Chaque formation offre une marche à suivre étape par étape, développée pour vous donner les stratégies nécessaires afin d'atteindre vos objectifs."
    },
    {
      id: 3,
      title: "Un coaching personnalisé!",
      icon: "user",
      description: "Vous aurez la possibilité d'avoir accès à un accompagnement personnalisé de la part de nos coachs, pour atteindre vos objectifs lors des étapes de votre parcours. Mais n'oubliez pas ; vos résultats dépendent avant tout de vos efforts!"
    }
  ];

  // SVG icons for each feature
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'wifi':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1.41421 8.43431C2.19526 7.65326 3.4616 7.65326 4.24264 8.43431L12 16.1917L19.7574 8.43431C20.5384 7.65326 21.8047 7.65326 22.5858 8.43431C23.3668 9.21536 23.3668 10.4817 22.5858 11.2627L13.4142 20.4343C12.6332 21.2153 11.3668 21.2153 10.5858 20.4343L1.41421 11.2627C0.633165 10.4817 0.633165 9.21536 1.41421 8.43431Z" />
            <path d="M1.41421 3.43431C2.19526 2.65326 3.4616 2.65326 4.24264 3.43431L12 11.1917L19.7574 3.43431C20.5384 2.65326 21.8047 2.65326 22.5858 3.43431C23.3668 4.21536 23.3668 5.48169 22.5858 6.26274L13.4142 15.4343C12.6332 16.2153 11.3668 16.2153 10.5858 15.4343L1.41421 6.26274C0.633165 5.48169 0.633165 4.21536 1.41421 3.43431Z" />
          </svg>
        );
      case 'steps':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V7C17 7.55228 16.5523 8 16 8H8C7.44772 8 7 7.55228 7 7V3Z" />
            <path d="M7 11C7 10.4477 7.44772 10 8 10H16C16.5523 10 17 10.4477 17 11V15C17 15.5523 16.5523 16 16 16H8C7.44772 16 7 15.5523 7 15V11Z" />
            <path d="M7 19C7 18.4477 7.44772 18 8 18H16C16.5523 18 17 18.4477 17 19V21C17 21.5523 16.5523 22 16 22H8C7.44772 22 7 21.5523 7 21V19Z" />
          </svg>
        );
      case 'user':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" />
            <path d="M12 13C8.13401 13 5 16.134 5 20V21H19V20C19 16.134 15.866 13 12 13Z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#000025] text-white py-16 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Accessible et éducatif</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="border border-[#cbcdff] rounded-2xl p-8 flex flex-col items-start  bg-[#070730]"
            >
              <div className="bg-indigo-200 text-indigo-900 p-4 rounded-md mb-6">
                {renderIcon(feature.icon)}
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-indigo-200">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Button at the bottom (optional, add if needed) */}
        <div className="flex justify-center mt-12">
          <a 
            href="#formations" 
            className="bg-indigo-100 text-indigo-900 px-8 py-3 rounded-full font-medium hover:bg-indigo-200 transition duration-300"
          >
            Nos formations
          </a>
        </div>
      </div>

      {/* Logo in top-right corner */}
      <div className="absolute top-8 right-8">
        <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="h-8 w-8 text-indigo-600" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;