import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import './App.css';

import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import Contact from './pages/Contact';

import { useEffect } from 'react';
import { seedProperties, getProperties } from './services/propertyService';

const initialData = [
  {
    title: 'Modern Glass Villa',
    address: '123 Ocean View Dr, Malibu, CA',
    price: 4500000,
    beds: 5,
    baths: 6,
    sqft: 5200,
    yearBuilt: 2022,
    description: 'Experience unparalleled luxury in this stunning architectural masterpiece. Featuring floor-to-ceiling glass walls, this modern villa offers breathtaking ocean views from every room. The open-concept living space flows seamlessly into the expansive outdoor entertainment area, complete with an infinity pool and fire pit.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=800'
    ],
    features: ['Infinity Pool', 'Smart Home System', 'Wine Cellar', 'Home Theater', 'Ocean View', 'Private Beach Access'],
    status: 'For Sale'
  },
  {
    title: 'Luxury Penthouse',
    address: '888 Skyline Blvd, New York, NY',
    price: 8200000,
    beds: 3,
    baths: 4,
    sqft: 3100,
    yearBuilt: 2020,
    description: 'Breathtaking penthouse offering panoramic city views.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200'],
    features: ['City Views', 'Rooftop Terrace', 'Concierge'],
    status: 'For Sale'
  },
  {
    title: 'Contemporary Estate',
    address: '45 Hidden Valley Rd, Austin, TX',
    price: 2950000,
    beds: 4,
    baths: 4.5,
    sqft: 4100,
    yearBuilt: 2023,
    description: 'A beautiful contemporary estate nestled in nature.',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200'],
    features: ['Large Lot', 'Outdoor Kitchen', 'Guest House'],
    status: 'New Listing'
  }
];

function App() {
  useEffect(() => {
    // Check if the database has any properties; if not, seed it!
    const checkAndSeedDatabase = async () => {
      const existingProperties = await getProperties();
      if (existingProperties.length === 0) {
        console.log("Database is empty. Seeding initial properties...");
        await seedProperties(initialData);
        // Force a page reload after seeding so components refetch the new data
        window.location.reload();
      }
    };
    
    checkAndSeedDatabase();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
