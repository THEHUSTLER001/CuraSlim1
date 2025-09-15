import React from 'react';
import './DefSection.css';

export default function DefSection() {
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
    
    <section className="def-section">
      <div className="def-content">
        <h1 className="def-title">Transformez votre silhouette avec <span style={{color:"#a50e99"}}>CuraSlim</span></h1>
        <p className="def-subtitle">
          Découvrez la solution naturelle et innovante pour un corps mince et tonique. Rejoignez les milliers de clients satisfaits.
        </p>
        <div className="def-line"></div>
        <button className="def-button" onClick={() => scrollToSection("order")}>Essayez CuraSlim maintenant</button>
      </div>
    </section>
  );
}
