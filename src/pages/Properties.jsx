import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import { getProperties } from '../services/propertyService';
import styles from './Properties.module.css';

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      const data = await getProperties();
      setProperties(data);
      setLoading(false);
    };
    fetchProperties();
  }, []);

  const filteredProperties = properties.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.propertiesPage}>
      <div className={`container ${styles.pageHeader}`}>
        <h1 className={styles.pageTitle}>Find Your Property</h1>
        <p className={styles.pageSubtitle}>Browse our exclusive collection of premium real estate.</p>
      </div>

      <div className={`container ${styles.filterSection}`}>
        <div className={styles.searchBox}>
          <Search size={20} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search by location or property name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className={styles.filterBtn} onClick={() => alert('Filter dialog opened. Advanced filters will be implemented in the next phase.')}>
          <Filter size={20} />
          <span>Filters</span>
        </button>
      </div>

      <div className={`container ${styles.propertyGrid}`}>
        {loading ? (
          <div className={styles.noResults}>
            <h3>Loading properties...</h3>
          </div>
        ) : filteredProperties.length > 0 ? (
          filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <div className={styles.noResults}>
            <h3>No properties found matching your criteria.</h3>
            <p>Try adjusting your search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;
