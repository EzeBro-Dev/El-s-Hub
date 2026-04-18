import { Link } from "react-router-dom";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* About */}
          <div className="footer-section">
            <h4>El's Hub</h4>
            <p>Your destination for stylish, quality fashion.</p>
            <div className="social-links">
              <a href="#" aria-label="Instagram">
                <span className="social-icon">📷</span>
                Instagram
              </a>
              <a href="#" aria-label="Twitter">
                <span className="social-icon">🐦</span>
                Twitter
              </a>
              <a href="#" aria-label="Facebook">
                <span className="social-icon">📘</span>
                Facebook
              </a>
              <a href="#" aria-label="TikTok">
                <span className="social-icon">🎵</span>
                TikTok
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="footer-section">
            <h4>Shop</h4>
            <ul>
              <li>
                <Link to="/shop">All Products</Link>
              </li>
              <li>
                <Link to="/shop">New Arrivals</Link>
              </li>
              <li>
                <Link to="/shop">Collections</Link>
              </li>
              <li>
                <a href="#">Sale</a>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div className="footer-section">
            <h4>Help</h4>
            <ul>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Shipping Info</a>
              </li>
              <li>
                <a href="#">Returns</a>
              </li>
              <li>
                <a href="#">Size Guide</a>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms & Conditions</a>
              </li>
              <li>
                <a href="#">Cookie Policy</a>
              </li>
              <li>
                <a href="#">Accessibility</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-section">
            <h4>Newsletter</h4>
            <p>Subscribe for exclusive offers and new arrivals</p>
            <form className="newsletter-form">
              <input type="email" placeholder="your@email.com" required />
              <button type="submit" className="btn btn-small btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; 2024 LUXE. All rights reserved.</p>
          <div className="payment-icons">
            <span>Secured Payments:</span>
            <span className="payment-icon" aria-label="Visa">
              💳
            </span>
            <span className="payment-icon" aria-label="Mastercard">
              🏦
            </span>
            <span className="payment-icon" aria-label="PayPal">
              🅿️
            </span>
            <span className="payment-icon" aria-label="Apple Pay">
              
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
