import React from "react";
import { Truck, Gift, Shield, Headphones, Facebook, Twitter, Instagram,  } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Top Benefits Section */}
      <div className="footer-benefits">
        <div className="benefit-item">
          <Truck className="benefit-icon" />
          <div>
            <h4 className="benefit-title">FREE SHIPPING</h4>
            <p className="benefit-text">On order over $100</p>
          </div>
        </div>
        <div className="benefit-item">
          <Gift className="benefit-icon" />
          <div>
            <h4 className="benefit-title">BUY 1 GET 1 FREE</h4>
            <p className="benefit-text">On order over $100</p>
          </div>
        </div>
        <div className="benefit-item">
          <Shield className="benefit-icon" />
          <div>
            <h4 className="benefit-title">SECURITY PAYMENT</h4>
            <p className="benefit-text">On order over $100</p>
          </div>
        </div>
        <div className="benefit-item">
          <Headphones className="benefit-icon" />
          <div>
            <h4 className="benefit-title">SUPPORT ONLINE</h4>
            <p className="benefit-text">On order over $100</p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        {/* Newsletter */}
        <div className="footer-section newsletter">
          <h3>Socials</h3>
          
          <div className="social-icons">
            <Facebook />
            <Twitter />
            <Instagram />
            <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.690 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.562-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
            </svg>
          </div>
        </div>

        {/* Information */}
        <div className="footer-section">
          <h3>INFORMATION</h3>
          <ul>
            <li><a href="#">About Store</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contacts</a></li>
            <li><a href="#">Front Page</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">Theme Shortcodes</a></li>
            <li><a href="#">Typography</a></li>
          </ul>
        </div>

        {/* Instagram Shop */}
        <div className="footer-section instagram-shop">
          <h3>INSTAGRAM SHOP</h3>
          <div className="instagram-placeholder">
            <img src="https://www.instagram.com/curaslim/p/DOMBbPKDU4l/" alt="post" />
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <p>Copyright © 2025 NL Digital Agency All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
