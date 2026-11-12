import { MapPin, Phone, Mail } from 'lucide-react';
import styles from './Contact.module.css';

const Contact = () => {
  return (
    <div className={styles.contactPage}>
      <div className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Contact Us</h1>
          <p className={styles.subtitle}>Get in touch with our team of luxury real estate experts.</p>
        </div>
      </div>

      <div className={`container ${styles.contactGrid}`}>
        <div className={styles.infoSection}>
          <h2>Let's Talk Real Estate</h2>
          <p className={styles.description}>
            Whether you are looking to buy your dream home or sell a premium property, our experienced agents are here to guide you every step of the way.
          </p>
          
          <div className={styles.infoCards}>
            <div className={styles.card}>
              <div className={styles.iconWrapper}>
                <MapPin size={24} />
              </div>
              <h3>Our Office</h3>
              <p>123 Luxury Lane, Suite 500<br/>Beverly Hills, CA 90210</p>
            </div>
            
            <div className={styles.card}>
              <div className={styles.iconWrapper}>
                <Phone size={24} />
              </div>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567<br/>Mon-Fri, 9am - 6pm PST</p>
            </div>
            
            <div className={styles.card}>
              <div className={styles.iconWrapper}>
                <Mail size={24} />
              </div>
              <h3>Email</h3>
              <p>hello@luxeestates.com<br/>We reply within 24 hours</p>
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <div className={styles.formCard}>
            <h2>Send a Message</h2>
            <form className={styles.form} onSubmit={(e) => {
              e.preventDefault();
              alert('Your message has been sent successfully. A member of our team will get back to you within 24 hours.');
              e.target.reset();
            }}>
              <div className={styles.inputGroup}>
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" required />
              </div>
              
              <div className={styles.inputGroup}>
                <label>Email Address</label>
                <input type="email" placeholder="john@example.com" required />
              </div>
              
              <div className={styles.inputGroup}>
                <label>Phone Number</label>
                <input type="tel" placeholder="+1 (555) 000-0000" />
              </div>
              
              <div className={styles.inputGroup}>
                <label>I am interested in</label>
                <select defaultValue="">
                  <option value="" disabled>Select an option</option>
                  <option value="buy">Buying a property</option>
                  <option value="sell">Selling a property</option>
                  <option value="rent">Renting</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className={styles.inputGroup}>
                <label>Message</label>
                <textarea rows="5" placeholder="How can we help you?" required></textarea>
              </div>
              
              <button type="submit" className={styles.submitBtn}>Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
