import { Home, Share2, Mail, MessageCircle, Link } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <Home size={24} className={styles.logoIcon} />
            <span>LuxeEstates</span>
          </div>
          <p className={styles.description}>
            The industry standard for finding exceptional properties. We redefine the real estate experience for the modern buyer.
          </p>
          <div className={styles.socials}>
            <a href="#" aria-label="Share"><Share2 size={20} /></a>
            <a href="#" aria-label="Mail"><Mail size={20} /></a>
            <a href="#" aria-label="Message"><MessageCircle size={20} /></a>
            <a href="#" aria-label="Website"><Link size={20} /></a>
          </div>
        </div>

        <div className={styles.linksColumn}>
          <h3>Company</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>

        <div className={styles.linksColumn}>
          <h3>Resources</h3>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Agent Directory</a></li>
            <li><a href="#">Market Updates</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        <div className={styles.newsletter}>
          <h3>Subscribe to Newsletter</h3>
          <p>Get the latest premium listings delivered to your inbox.</p>
          <form className={styles.form} onSubmit={(e) => {
            e.preventDefault();
            alert('Thank you for subscribing! You will start receiving our premium listings soon.');
            e.target.reset();
          }}>
            <input type="email" placeholder="Email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      
      <div className={styles.bottomBar}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} LuxeEstates. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
