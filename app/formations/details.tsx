import Image from "next/image";

export default function FormationDetail() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#010128] to-[#a54957] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Détails de la Formation</h1>
        
        <div className="bg-white text-black p-6 rounded-lg shadow-lg">
          <Image
            src="https://via.assets.so/game.png?id=1&q=95&w=360&h=360&fit=fill"
            alt="Détail de la Formation"
            width={360}
            height={360}
            className="rounded-lg mb-4"
          />
          <h2 className="text-3xl font-bold mb-4">Titre de la Formation</h2>
          <p className="text-lg mb-4">
            Description complète de la formation. Cette formation vous permettra d'acquérir les compétences nécessaires pour exceller dans ce domaine. Vous apprendrez à travers des modules interactifs et des exercices pratiques.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>Module 1: Introduction</li>
            <li>Module 2: Concepts avancés</li>
            <li>Module 3: Applications pratiques</li>
            <li>Module 4: Évaluation finale</li>
          </ul>
          <a
            href="/signup"
            className="bg-blue-500 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-600"
          >
            Inscrivez-vous maintenant
          </a>
        </div>
      </div>
    </div>
  );
} 