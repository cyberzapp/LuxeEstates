import { Search } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import { getProperties } from '../services/propertyService';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      const properties = await getProperties();
      // Just take the first 3 as "featured" for now
      setFeaturedProperties(properties.slice(0, 3));
      setLoading(false);
    };
    fetchProperties();
  }, []);

  const handleSearch = () => {
    navigate('/properties');
  };

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <img src="/hero.jpg" alt="Luxury Modern House" />
          <div className={styles.heroOverlay}></div>
        </div>
        
        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.heroTitle}>
            Discover Your<br />Exceptional Home
          </h1>
          <p className={styles.heroSubtitle}>
            The industry standard for premium real estate. Find the perfect property that matches your lifestyle.
          </p>
          
          <div className={`glass-panel ${styles.searchBar}`}>
            <div className={styles.searchInputGroup}>
              <label>Location</label>
              <input type="text" placeholder="City, Neighborhood, or Zip" />
            </div>
            <div className={styles.searchDivider}></div>
            <div className={styles.searchInputGroup}>
              <label>Property Type</label>
              <select defaultValue="">
                <option value="" disabled>Select Type</option>
                <option value="house">House</option>
                <option value="condo">Condo / Apartment</option>
                <option value="villa">Villa</option>
              </select>
            </div>
            <div className={styles.searchDivider}></div>
            <div className={styles.searchInputGroup}>
              <label>Price Range</label>
              <select defaultValue="">
                <option value="" disabled>Any Price</option>
                <option value="1M+">$1,000,000+</option>
                <option value="3M+">$3,000,000+</option>
                <option value="5M+">$5,000,000+</option>
              </select>
            </div>
            <button className={styles.searchBtn} onClick={handleSearch}>
              <Search size={20} />
              <span>Search</span>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className={`container ${styles.featuredSection}`}>
        <div className={styles.sectionHeader}>
          <h2>Featured Properties</h2>
          <Link to="/properties" className={styles.viewAllLink}>View All Properties &rarr;</Link>
        </div>
        
        <div className={styles.propertyGrid}>
          {loading ? (
            <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '2rem'}}>Loading featured properties...</div>
          ) : (
            featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))
          )}
        </div>
      </section>

      {/* Value Proposition */}
      <section className={styles.valueSection}>
        <div className={`container ${styles.valueGrid}`}>
          <div className={styles.valueContent}>
            <h2>Why Choose LuxeEstates</h2>
            <p>We provide an industry-standard, premium experience for buyers and sellers. Our exceptional service ensures you find exactly what you're looking for.</p>
            <ul className={styles.valueList}>
              <li>Curated premium listings</li>
              <li>Expert local agents</li>
              <li>Seamless buying experience</li>
            </ul>
          </div>
          <div className={styles.valueImage}>
            <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800" alt="Modern Interior" className={styles.roundedImage} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
