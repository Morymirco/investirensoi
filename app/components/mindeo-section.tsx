import React from 'react';
import Image from 'next/image';

const MindeoSection = () => {
  return (
    <section className="relative w-full py-16 bg-[#020B2D] text-white overflow-hidden min-h-screen">
      <div className="container max-w-[1280px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center">
        {/* Left column - Text content */}
        <div className="md:w-1/2 z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            Progressez vers votre<br />
            prochain niveau de<br />
            <span className="text-blue-400">succès</span>
          </h2>
          
          <p className="my-8 text-gray-300 max-w-xl">
            Mindeo c'est déjà 4 formations expertes dans leurs domaines:
            Lancez vos business grâce à Business Pro, comprenez les
            rouages de l'investissement immobilier avec Immo Pro ou
            devenez une meilleure version de vous-même grâce à Success
            Pro.
          </p>
          
          {/* Stats section */}
          <div className="flex flex-col md:flex-row justify-between gap-8 mt-12">
            <div className="stat">
              <h3 className="text-4xl font-bold">+30</h3>
              <div className="flex items-center mt-2">
                <div className="w-8 h-px bg-purple-500 mr-2"></div>
                <div>
                  <p className="font-medium">Experts</p>
                  <p className="text-gray-400">à vos côtés</p>
                </div>
              </div>
            </div>
            
            <div className="stat">
              <h3 className="text-4xl font-bold">+200</h3>
              <div className="flex items-center mt-2">
                <div className="w-8 h-px bg-purple-500 mr-2"></div>
                <div>
                  <p className="font-medium">Heures</p>
                  <p className="text-gray-400">de contenus</p>
                </div>
              </div>
            </div>
            
            <div className="stat">
              <h3 className="text-4xl font-bold">+250M€</h3>
              <div className="flex items-center mt-2">
                <div className="w-8 h-px bg-purple-500 mr-2"></div>
                <div>
                  <p className="font-medium">Générés</p>
                  <p className="text-gray-400">par nos élèves</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column - Mobile screenshots */}
        <div className="md:w-1/2 mt-12 md:mt-0 relative">
          <div className="relative h-96 md:h-[500px] w-full">
            {/* Main phone mockup */}
            <div className="absolute right-0 md:right-8 transform rotate-3 shadow-xl rounded-3xl">
              <div className="relative w-64 md:w-80 h-auto overflow-hidden rounded-3xl  border-gray-900">
                <Image 
                  src="/phone.png" 
                  alt="Mindeo app screenshot"
                  width={320}
                  height={650}
                  className="w-full h-auto"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
                />
              </div>
            </div>
            
            {/* Secondary phone mockup */}
            <div className="absolute left-12 md:left-0 top-12 transform -rotate-6 shadow-xl rounded-3xl">
              <div className="relative w-48 md:w-64 h-auto overflow-hidden rounded-3xl border-gray-900">
                <Image 
                  src="/phone.png" 
                  alt="Mindeo pack screenshot"
                  width={250}
                  height={500}
                  className="w-full h-auto"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
                />
              </div>
            </div>
            
            {/* Floating icon 1 - Chart */}
            <div className="absolute right-4 bottom-24 md:bottom-32 p-3 bg-white rounded-lg shadow-lg">
              <div className="w-10 h-10 bg-blue-500 rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            
            {/* Floating icon 2 - Ethereum */}
            <div className="absolute left-8 bottom-8 p-3 bg-blue-100 rounded-full shadow-lg">
              <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 320 512">
                  <path fill="currentColor" d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"/>
                </svg>
              </div>
            </div>
            
            {/* Floating icon 3 - Shopping */}
            <div className="absolute right-36 top-16 p-3 bg-blue-100 rounded-lg shadow-lg">
              <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MindeoSection;
