import React from 'react';
import './Hero.css';

// Fallback to desktop image if mobile missing
const heroDesktop = require('../../assets/images/BannerDes.jpg');
let heroMobile;
try {
  heroMobile = require('../../assets/images/BannerDes.jpg');
} catch (e) {
  heroMobile = heroDesktop;
}

export default function Hero() {
  const cssVars = {
    '--hero-bg-desktop': `url(${heroDesktop})`,
    '--hero-bg-mobile': `url(${heroMobile})`,
    '--hero-height-desktop': '76vh',
    '--hero-height-desktop-min': '520px',
    '--hero-height-mobile': '72vh',
    '--price-color': '#a50e99' // Primary price color
  };
   
   const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  // Price data
  const prices = [
    { old: '600,00 DH', new: '400,00 DH' },
    { old: '600,00 DH', new: '400,00 DH' },
    { old: '600,00 DH', new: '400,00 DH' },
    { old: '600,00 DH', new: '400,00 DH' },
    { old: '600,00 DH', new: '400,00 DH' },
    { old: '600,00 DH', new: '400,00 DH' },
    { old: '600,00 DH', new: '400,00 DH' },
    { old: '600,00 DH', new: '400,00 DH' },
     { old: '600,00 DH', new: '400,00 DH' },
    { old: '600,00 DH', new: '400,00 DH' },
     { old: '600,00 DH', new: '400,00 DH' },
    { old: '600,00 DH', new: '400,00 DH' },
     { old: '600,00 DH', new: '400,00 DH' },
    { old: '600,00 DH', new: '400,00 DH' },
    { old: '600,00 DH', new: '400,00 DH' }
  ];

  return (
    <section
      className="hero"
      aria-labelledby="hero-heading"
      style={cssVars}
    >
          
          {/* Looping price stripe */}
          <div className="price-stripe">
            <div className="price-items" aria-live="polite">
              {prices.map((price, index) => (
                <div key={index} className="price-item">
                  <span className="old-price"> {price.old}</span>
                  <span className="new-price"> {price.new}</span>
                </div>
              ))}
            </div>
          </div>
        
      
      
      <div className="hero__overlay">
        <div className="container hero__inner">
          <div className="hero__left">
            <p className="hero__lead" style={{ color: '#FFFFFF' }}>
              3 Produits D'amincissement
            </p>
            <h1 id="hero-heading" className="hero__title">
              <span style={{ color: '#8E2CA6' }}>Pack</span> <br />
              <span style={{ color: '#FFFFFF' }}>Minceur</span>
            </h1>
            <div className="hero__actions">
              <button className="btn1 btn--outline" type="button" aria-label="Discover" oonClick={() => scrollToSection("")} >DECOUVIR</button>
              <button className="btn1 btn--primary" type="button" aria-label="Buy now" onClick={() => scrollToSection("order")} >COMMANDER</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}