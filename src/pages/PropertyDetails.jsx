import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MapPin, Bed, Bath, Square, Calendar, Check, ArrowLeft } from 'lucide-react';
import { getPropertyById } from '../services/propertyService';
import styles from './PropertyDetails.module.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProperty = async () => {
      // In the seed, I saved the properties without the original id.
      // Firestore generated new IDs, but since we're matching the UI to the DB:
      // Let's check if the property ID exists. If not, it means the ID from the URL is not valid.
      const data = await getPropertyById(id);
      setProperty(data);
      setLoading(false);
    };
    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.detailsPage} style={{textAlign: 'center', paddingTop: '150px'}}>
        <h2>Loading property details...</h2>
      </div>
    );
  }

  if (!property) {
    return (
      <div className={styles.detailsPage} style={{textAlign: 'center', paddingTop: '150px'}}>
        <h2>Property not found.</h2>
        <Link to="/properties" style={{color: 'var(--accent-secondary)'}}>Back to properties</Link>
      </div>
    );
  }

  return (
    <div className={styles.detailsPage}>
      {/* Image Gallery */}
      <div className={styles.gallery}>
        <div className={styles.mainImage}>
          <img src={property.images && property.images.length > 0 ? property.images[0] : property.image} alt={property.title} />
        </div>
        <div className={styles.sideImages}>
          {property.images && property.images.slice(1).map((img, idx) => (
            <div key={idx} className={styles.smallImage}>
              <img src={img} alt={`${property.title} ${idx + 2}`} />
            </div>
          ))}
        </div>
      </div>

      <div className={`container ${styles.contentGrid}`}>
        {/* Left Column: Details */}
        <div className={styles.mainContent}>
          <div className={styles.header}>
            <div className={styles.titleSection}>
              <h1>{property.title}</h1>
              <div className={styles.location}>
                <MapPin size={18} />
                <span>{property.address}</span>
              </div>
            </div>
            <div className={styles.priceSection}>
              <div className={styles.price}>${property.price ? property.price.toLocaleString() : 'N/A'}</div>
            </div>
          </div>

          <div className={styles.keyStats}>
            <div className={styles.stat}>
              <Bed size={24} />
              <div>
                <strong>{property.beds}</strong>
                <span>Beds</span>
              </div>
            </div>
            <div className={styles.stat}>
              <Bath size={24} />
              <div>
                <strong>{property.baths}</strong>
                <span>Baths</span>
              </div>
            </div>
            <div className={styles.stat}>
              <Square size={24} />
              <div>
                <strong>{property.sqft ? property.sqft.toLocaleString() : 'N/A'}</strong>
                <span>Sq Ft</span>
              </div>
            </div>
            <div className={styles.stat}>
              <Calendar size={24} />
              <div>
                <strong>{property.yearBuilt || 'N/A'}</strong>
                <span>Built</span>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2>About this property</h2>
            <p className={styles.description}>{property.description}</p>
          </div>

          <div className={styles.section}>
            <h2>Key Features</h2>
            <div className={styles.featuresList}>
              {property.features && property.features.map((feature, idx) => (
                <div key={idx} className={styles.featureItem}>
                  <Check size={18} className={styles.checkIcon} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className={styles.sidebar}>
          <div className={styles.contactCard}>
            <h3>Interested in this property?</h3>
            <p>Contact our premier agent to schedule a viewing.</p>
            
            <form className={styles.contactForm} onSubmit={(e) => {
              e.preventDefault();
              alert(`Thank you for your interest in ${property.title}. One of our premier agents will contact you shortly to schedule a viewing.`);
              e.target.reset();
            }}>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <input type="tel" placeholder="Your Phone" required />
              <textarea placeholder="Message" rows="4" defaultValue={`I am interested in ${property.title}.`}></textarea>
              <button type="submit" className={styles.submitBtn}>Request Information</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
