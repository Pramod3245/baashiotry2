import { getDatabase, ref, set, get } from "firebase/database";

export const saveLayoutToFirebase = (layout) => {
  const db = getDatabase();
  set(ref(db, "layout/"), layout)
    .then(() => console.log("Layout saved successfully"))
    .catch((error) => console.error("Error saving layout: ", error));
};

export const loadLayoutFromFirebase = async () => {
  const db = getDatabase();
  try {
    const snapshot = await get(ref(db, "layout/"));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No layout data available");
      return null;
    }
  } catch (error) {
    console.error("Error loading layout: ", error);
    return null;
  }
};
