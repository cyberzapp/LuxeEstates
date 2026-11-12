import { MapPin, Bed, Bath, Square } from 'lucide-react';
import styles from './PropertyCard.module.css';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={property.image} alt={property.title} className={styles.image} />
        <div className={styles.priceTag}>${property.price.toLocaleString()}</div>
        <div className={styles.statusTag}>{property.status}</div>
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{property.title}</h3>
        
        <div className={styles.location}>
          <MapPin size={16} />
          <span>{property.address}</span>
        </div>
        
        <div className={styles.features}>
          <div className={styles.feature}>
            <Bed size={18} />
            <span>{property.beds} Beds</span>
          </div>
          <div className={styles.feature}>
            <Bath size={18} />
            <span>{property.baths} Baths</span>
          </div>
          <div className={styles.feature}>
            <Square size={18} />
            <span>{property.sqft} sqft</span>
          </div>
        </div>
        
        <Link to={`/property/${property.id}`} className={styles.viewBtn}>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
