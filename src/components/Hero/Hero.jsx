import React from 'react';
import './Hero.css';

// Fallback to desktop image if mobile missing
const heroDesktop = require('../../assets/images/bannerhero.png');
let heroMobile;
try {
  heroMobile = require('../../assets/images/bannerhero.png');
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




    </section>
  );
}