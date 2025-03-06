"use client"
import Image from "next/image";
import Sidebar from "../components/Sidebar";

export default function Formations() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#010128] to-[#a54957] text-white p-8 ">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-8">
        <Sidebar />

        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-8 text-center">Nos Formations</h1>
          <p className="text-lg mb-8 text-center">
            Découvrez notre large gamme de formations conçues pour vous aider à développer vos compétences dans divers domaines.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Carte de formation 1 */}
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <Image
                src="https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/marketting.jpg"
                alt="Formation 1"
                width={420}
                height={300}
                className="rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">Titre de la Formation 1</h2>
              <p className="text-sm mb-4">
                Description brève de la formation 1. Apprenez les compétences essentielles pour réussir dans ce domaine.
              </p>
              <p className="text-lg font-semibold mb-4">Prix: 199€</p>
              <a
                href="/signup"
                className="bg-blue-500 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600"
              >
                S'inscrire maintenant
              </a>
            </div>

            {/* Carte de formation 2 */}
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <Image
                src="https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/marketting.jpg"
                alt="Formation 2"
                width={420}
                height={300}
                className="rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">Titre de la Formation 2</h2>
              <p className="text-sm mb-4">
                Description brève de la formation 2. Apprenez les compétences essentielles pour réussir dans ce domaine.
              </p>
              <p className="text-lg font-semibold mb-4">Prix: 249€</p>
              <a
                href="/signup"
                className="bg-blue-500 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600"
              >
                S'inscrire maintenant
              </a>
            </div>

            {/* Carte de formation 3 */}
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <Image
                src="https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/marketting.jpg"
                alt="Formation 3"
                width={420}
                height={300}
                className="rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">Titre de la Formation 3</h2>
              <p className="text-sm mb-4">
                Description brève de la formation 3. Apprenez les compétences essentielles pour réussir dans ce domaine.
              </p>
              <p className="text-lg font-semibold mb-4">Prix: 299€</p>
              <a
                href="/signup"
                className="bg-blue-500 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600"
              >
                S'inscrire maintenant
              </a>
            </div>

            {/* Carte de formation 4 */}
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <Image
                src="https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/marketting.jpg"
                alt="Formation 4"
                width={420}
                height={300}
                className="rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">Titre de la Formation 4</h2>
              <p className="text-sm mb-4">
                Description brève de la formation 4. Apprenez les compétences essentielles pour réussir dans ce domaine.
              </p>
              <p className="text-lg font-semibold mb-4">Prix: 349€</p>
              <a
                href="/signup"
                className="bg-blue-500 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600"
              >
                S'inscrire maintenant
              </a>
            </div>

            {/* Carte de formation 5 */}
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <Image
                src="https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/marketting.jpg"
                alt="Formation 5"
                width={420}
                height={300}
                className="rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">Titre de la Formation 5</h2>
              <p className="text-sm mb-4">
                Description brève de la formation 5. Apprenez les compétences essentielles pour réussir dans ce domaine.
              </p>
              <p className="text-lg font-semibold mb-4">Prix: 399€</p>
              <a
                href="/signup"
                className="bg-blue-500 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600"
              >
                S'inscrire maintenant
              </a>
            </div>

            {/* Carte de formation 6 */}
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <Image
                src="https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/marketting.jpg"
                alt="Formation 6"
                width={420}
                height={300}
                className="rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">Titre de la Formation 6</h2>
              <p className="text-sm mb-4">
                Description brève de la formation 6. Apprenez les compétences essentielles pour réussir dans ce domaine.
              </p>
              <p className="text-lg font-semibold mb-4">Prix: 449€</p>
              <a
                href="/signup"
                className="bg-blue-500 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600"
              >
                S'inscrire maintenant
              </a>
            </div>

            {/* Carte de formation 7 */}
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <Image
                src="https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/marketting.jpg"
                alt="Formation 7"
                width={420}
                height={300}
                className="rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">Titre de la Formation 7</h2>
              <p className="text-sm mb-4">
                Description brève de la formation 7. Apprenez les compétences essentielles pour réussir dans ce domaine.
              </p>
              <p className="text-lg font-semibold mb-4">Prix: 499€</p>
              <a
                href="/signup"
                className="bg-blue-500 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600"
              >
                S'inscrire maintenant
              </a>
            </div>

            {/* Carte de formation 8 */}
            <div className="bg-white text-black p-6 rounded-lg shadow-lg">
              <Image
                src="https://dev-geniusclass2.pantheonsite.io/wp-content/uploads/2024/04/marketting.jpg"
                alt="Formation 8"
                width={420}
                height={300}
                className="rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">Titre de la Formation 8</h2>
              <p className="text-sm mb-4">
                Description brève de la formation 8. Apprenez les compétences essentielles pour réussir dans ce domaine.
              </p>
              <p className="text-lg font-semibold mb-4">Prix: 549€</p>
              <a
                href="/signup"
                className="bg-blue-500 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600"
              >
                S'inscrire maintenant
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 