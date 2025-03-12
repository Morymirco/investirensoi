import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "./firebaseConfig"; // Assurez-vous d'importer votre configuration Firebase

const storage = getStorage(app);

export const uploadFile = async (file: File, path: string) => {
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("Erreur lors du téléchargement du fichier :", error);
    throw error;
  }
}; 