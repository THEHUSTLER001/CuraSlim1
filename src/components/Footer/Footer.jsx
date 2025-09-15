import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-main">
        {/* À propos */}
        <div className="footer-section">
          <h3>À propos de CuraSlim</h3>
          <p>
            Curaslim est solution naturelle et innovante pour un corps mince et tonique. Rejoignez les milliers de clients satisfaits.


          </p>
        </div>

        {/* Liens utiles */}
        <div className="footer-section">
          <h3>Liens utiles</h3>
          <ul>
            <li>
              <button onClick={() => scrollToSection("home")}>Accueil</button>
            </li>
            <li>
              <button onClick={() => scrollToSection("about")}>À propos</button>
            </li>
            <li>
              <button onClick={() => scrollToSection("list")}>Product</button>
            </li>
            <li>
              <button onClick={() => scrollToSection("faq")}>FAQ</button>
            </li>
            <li>
              <button onClick={() => scrollToSection("contact")}>Contact</button>
            </li>
          </ul>
        </div>

        {/* Suivez-nous */}
        <div className="footer-section">
          <h3>Suivez-nous</h3>
          <div className="social-icons">
            <Facebook />
            <Instagram />
            <Twitter />
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <p>© 2025 Liderm. Tous droits réservés.</p>
        <p>Par NL DIGITAL AGENCY</p>
      </div>
    </footer>
  );
};

export default Footer;
