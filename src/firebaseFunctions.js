import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase"; // Ensure Firebase is initialized correctly
import { connectFirestoreEmulator } from "firebase/firestore";

connectFirestoreEmulator(db, 'localhost', 8080);

export const saveLayoutToFirebase = async (layoutName, layout) => {
  if (!layout || layout.length === 0) {
    throw new Error("Layout is empty or undefined");
  }

  if (!layoutName) {
    throw new Error("Layout name is required.");
  }

  try {
    const layoutDocRef = doc(db, "layouts", layoutName.trim());
    await setDoc(layoutDocRef, { layout });
    console.log("Layout saved successfully!");
  } catch (error) {
    console.error("Error saving layout:", error);
    throw error;
  }
};

// Load layout from Firebase using document ID
export const loadLayoutFromFirebase = async (layoutName) => {
  if (!layoutName) {
    throw new Error("Layout name is required.");
  }

  try {
    const layoutDocRef = doc(db, "layouts", layoutName.trim());
    const docSnapshot = await getDoc(layoutDocRef);

    if (!docSnapshot.exists()) {
      console.log("No layout found with that name.");
      return null;
    }

    const loadedLayout = docSnapshot.data().layout;
    return loadedLayout;
  } catch (error) {
    console.error("Error loading layout:", error);
    throw error;
  }
};
