"use client"
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Simuler la récupération des données utilisateur après la connexion
    const fetchUserData = async () => {
      // Remplacez ceci par une requête API réelle pour obtenir les données utilisateur
      const userData = {
        name: "John Doe",
        email: "john.doe@example.com",
      };
      setUser(userData);
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#010128] to-[#a54957] text-white p-8">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Profil de l'utilisateur</h1>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Nom :</h2>
          <p>{user.name}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Email :</h2>
          <p>{user.email}</p>
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600"
          onClick={() => {
            // Logique de déconnexion ou redirection
            console.log("Déconnexion");
          }}
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
} 