import Image from "next/image";
import CourseSection from "./components/CourseSection";
export default function Formations() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#010128] to-[#a54957] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Nos Formations</h1>
        <p className="text-lg mb-8 text-center">
          Découvrez notre large gamme de formations conçues pour vous aider à développer vos compétences dans divers domaines.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
       <CourseSection />

       


      
        </div>
      </div>
    </div>
  );
} 