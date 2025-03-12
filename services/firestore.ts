import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "./firebaseConfig"; // Assurez-vous d'importer votre configuration Firebase

 export const db = getFirestore(app);

export const getCollectionData = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    throw error;
  }
}; 