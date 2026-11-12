import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDcGR3GFMsFLzvxv2YoJepy0H6AUUMHQwg",
    authDomain: "memory-2b328.firebaseapp.com",
    projectId: "memory-2b328",
    storageBucket: "memory-2b328.firebasestorage.app",
    messagingSenderId: "570254755150",
    appId: "1:570254755150:web:cb87583e3f8bac2e18ca1f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const runUpdate = async () => {
    console.log("Fetching existing properties...");
    try {
        const querySnapshot = await getDocs(collection(db, "properties"));
        
        let count = 0;
        for (const document of querySnapshot.docs) {
            count++;
            // loremflickr and unsplash source are currently down or unreliable.
            // Using picsum.photos for guaranteed distinct, high-quality placeholders.
            const mainImage = `https://picsum.photos/seed/prop${count}/800/600`;
            const img2 = `https://picsum.photos/seed/prop${count}b/800/600`;
            const img3 = `https://picsum.photos/seed/prop${count}c/800/600`;
            
            await updateDoc(doc(db, "properties", document.id), {
                image: mainImage,
                images: [mainImage, img2, img3]
            });
            
            if (count % 10 === 0) console.log(`Updated ${count} properties...`);
        }
        
        console.log(`Successfully updated ${count} properties with distinct images!`);
        process.exit(0);
    } catch (error) {
        console.error("Error updating images:", error);
        process.exit(1);
    }
};

runUpdate();
