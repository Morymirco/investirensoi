"use client"
import Image from "next/image";
import Sidebar from "../components/Sidebar";
import CourseCard from "../components/CourseCard";
import { Star } from "lucide-react";
import { useState } from "react";
//liste des formations
//https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp
// Définition du type pour une formation
interface Formation {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  date: string;
  level: string;
}

// Liste des formations
const formations: Formation[] = [
  {
    id: 1,
    title: "Formation en Finance",
    price: 100000,
    image: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
    rating: 4,
    category: "Finance",
    date: "2024-02-10",
    level: "Débutant",
  },
  {
    id: 2,
    title: "Formation en Marketing",
    price: 150000,
    image: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
    rating: 5,
    category: "Marketing",
    date: "2024-03-05",
    level: "Intermédiaire",
  },
  {
    id: 3,
    title: "Formation en Développement",
    price: 120000,
    image: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
    rating: 3,
    category: "Développement",
    date: "2024-01-20",
    level: "Intermédiaire",
    },
  {
    id: 4,
    title: "Formation en Développement",
    price: 120000,
    image: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
    rating: 3,
    category: "Développement",
    date: "2024-01-20",
    level: "Intermédiaire",
    },
  {
    id: 5,
    title: "Formation en Développement",
    price: 120000,
    image: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
    rating: 3,
    category: "Développement",
    date: "2024-01-20",
    level: "Intermédiaire",
    },
  {
    id: 6,
    title: "Formation en Développement",
    price: 120000,
    image: "https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/affichedesign.jpg.webp",
    rating: 3,
    category: "Développement",
    date: "2024-01-20",
    level: "Intermédiaire",
  },
];
export default function Formations() {
  const [sortOption, setSortOption] = useState("recent");
 // Fonction de tri
  // Fonction de tri
  const sortedFormations = [...formations].sort((a, b) => {
    if (sortOption === "priceAsc") return a.price - b.price; // Prix croissant
    if (sortOption === "priceDesc") return b.price - a.price; // Prix décroissant
    if (sortOption === "popular") return b.rating - a.rating; // Popularité
    if (sortOption === "recent") return new Date(b.date).getTime() - new Date(a.date).getTime(); // Plus récent
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#010128] to-[#a54957] text-white p-8 ">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-8">
        <Sidebar />

        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-8 text-center">Nos Formations</h1>
          <p className="text-lg mb-8 text-center">
            Découvrez notre large gamme de formations conçues pour vous aider à développer vos compétences dans divers domaines.
          </p>
          
          
      {/* Select pour le tri */}
      <div className="mb-6 flex justify-end">
        <select
          className="border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="recent" className="text-black">Les plus récentes</option>
          <option value="popular" className="text-black">Les plus populaires</option>
          <option value="priceAsc" className="text-black">Prix croissant</option>
          <option value="priceDesc" className="text-black">Prix décroissant</option>
        </select>
      </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
       {sortedFormations.map((formation) => (
        <CourseCard key={formation.id} {...formation} />
       ))}

          </div>
        </div>
      </div>
    </div>
  );
} 