import { db } from '../firebase';
import { collection, getDocs, doc, getDoc, addDoc } from 'firebase/firestore';

const COLLECTION_NAME = 'properties';

// Fetch all properties
export const getProperties = async () => {
  try {
    // Add a 5 second timeout so it doesn't hang forever if Firestore isn't enabled in the console
    const querySnapshot = await Promise.race([
      getDocs(collection(db, COLLECTION_NAME)),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Firebase connection timeout")), 5000))
    ]);
    
    const properties = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return properties;
  } catch (error) {
    console.error("Error fetching properties: ", error);
    // Return empty array so the UI stops loading and shows the fallback "No properties" message
    return [];
  }
};

// Fetch a single property by ID
export const getPropertyById = async (id) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await Promise.race([
      getDoc(docRef),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Firebase connection timeout")), 5000))
    ]);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such property!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching property: ", error);
    return null;
  }
};

// One-time script to seed the database with initial data
export const seedProperties = async (properties) => {
  try {
    const collectionRef = collection(db, COLLECTION_NAME);
    for (const property of properties) {
      // Remove 'id' if it exists since Firestore generates one
      const { id, ...dataToSave } = property;
      await addDoc(collectionRef, dataToSave);
    }
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database: ", error);
  }
};
