import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "./firebaseConfig"; // Assurez-vous d'importer votre configuration Firebase

const auth = getAuth(app);
const db = getFirestore(app);

export { auth }; // Exportez auth pour l'utiliser ailleurs

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
    throw error;
  }
};

export const register = async (email: string, password: string, firstName: string, lastName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Enregistrez les informations supplémentaires dans Firestore
    await setDoc(doc(db, "users", user.uid), {
      firstName,
      lastName,
      email,
    });

    return user;
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    throw error;
  }
}; 