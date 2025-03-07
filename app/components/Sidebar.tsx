'use client'
import { useState } from "react";

export default function Sidebar() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["Business", "Investissement", "Développement personnel"];

  return (
    
    <aside className="bg-white/10 border border-white/30 text-white bg-opacity-80 backdrop-blur-md  p-6 rounded-lg shadow-lg w-full sm:w-64 h-full sm:h-auto sm:max-h-[80vh] mt-4 sm:mt-32">
      <h2 className="text-xl font-bold mb-4">Filtrer par</h2>

      {/* Barre de recherche */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Catégorie</h3>
        <ul>
          {categories.map((category) => (
            <li key={category} className="mb-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={() => setSelectedCategory(category)}
                  className="mr-2"
                />
                {category}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Prix</h3>
        <input
          type="range"
          min="0"
          max="1000"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          className="w-full"
        />
        <div className="flex justify-between text-sm mt-2">
          <span>0€</span>
          <span>{priceRange[1]}€</span>
        </div>
      </div>
    </aside>
  );
} 