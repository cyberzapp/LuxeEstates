import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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

const styles = ['Modern Glass Villa', 'Luxury Penthouse', 'Contemporary Estate', 'Suburban Retreat', 'Minimalist Townhouse', 'Lakeside Mansion', 'Historic Tudor', 'Coastal Cottage', 'Mountain Lodge', 'Desert Oasis'];
const cities = ['Malibu, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA', 'Portland, OR', 'Tahoe, NV', 'Miami, FL', 'Aspen, CO', 'Scottsdale, AZ', 'Chicago, IL'];
const images = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1600585154526-990dced4e56d?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800'
];
const featuresList = ['Infinity Pool', 'Smart Home System', 'Wine Cellar', 'Home Theater', 'Ocean View', 'Private Beach Access', 'Rooftop Terrace', 'Concierge', 'Guest House', 'Outdoor Kitchen'];
const statuses = ['For Sale', 'New Listing', 'Pending', 'Recently Sold'];

const generateProperties = (count) => {
    const properties = [];
    for (let i = 0; i < count; i++) {
        const title = styles[Math.floor(Math.random() * styles.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];
        const price = Math.floor(Math.random() * 9000000) + 1000000;
        const beds = Math.floor(Math.random() * 6) + 2;
        const baths = Math.floor(Math.random() * 5) + 2;
        const sqft = Math.floor(Math.random() * 6000) + 1500;
        const yearBuilt = Math.floor(Math.random() * 24) + 2000;
        const image = images[Math.floor(Math.random() * images.length)];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        
        // Pick 3 random features
        const features = [];
        const featuresCopy = [...featuresList];
        for(let j=0; j<3; j++) {
            const idx = Math.floor(Math.random() * featuresCopy.length);
            features.push(featuresCopy[idx]);
            featuresCopy.splice(idx, 1);
        }

        properties.push({
            title: `${title} - Unique Property ${i+1}`,
            address: `${Math.floor(Math.random() * 9999)} Sample St, ${city}`,
            price,
            beds,
            baths,
            sqft,
            yearBuilt,
            description: `This stunning ${title.toLowerCase()} offers an incredible opportunity to own a piece of prime real estate in ${city.split(',')[0]}. Featuring modern amenities, spacious living areas, and beautiful views. Perfect for entertaining or a quiet retreat.`,
            image,
            images: [image, images[Math.floor(Math.random() * images.length)], images[Math.floor(Math.random() * images.length)]],
            features,
            status
        });
    }
    return properties;
};

const runSeed = async () => {
    console.log("Starting seed process...");
    try {
        const properties = generateProperties(40);
        const collectionRef = collection(db, "properties");
        
        let count = 0;
        for (const prop of properties) {
            await addDoc(collectionRef, prop);
            count++;
            if (count % 10 === 0) console.log(`Seeded ${count} properties...`);
        }
        console.log("Successfully seeded 40 properties!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding properties:", error);
        process.exit(1);
    }
};

runSeed();
