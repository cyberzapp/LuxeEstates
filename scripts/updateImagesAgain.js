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

const realEstateImages = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1600585154526-990dced4e56d?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1502672260266-1c1de2d93688?auto=format&fit=crop&q=80&w=800'
];

const runUpdate = async () => {
    console.log("Fetching existing properties...");
    try {
        const querySnapshot = await getDocs(collection(db, "properties"));
        
        let count = 0;
        for (const document of querySnapshot.docs) {
            // Cycle through the list of 15 high-quality real estate images
            const mainImage = realEstateImages[count % realEstateImages.length];
            const img2 = realEstateImages[(count + 1) % realEstateImages.length];
            const img3 = realEstateImages[(count + 2) % realEstateImages.length];
            
            await updateDoc(doc(db, "properties", document.id), {
                image: mainImage,
                images: [mainImage, img2, img3]
            });
            
            count++;
            if (count % 10 === 0) console.log(`Updated ${count} properties...`);
        }
        
        console.log(`Successfully updated ${count} properties with real estate images!`);
        process.exit(0);
    } catch (error) {
        console.error("Error updating images:", error);
        process.exit(1);
    }
};

runUpdate();
