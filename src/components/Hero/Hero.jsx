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
  };
  return (
    <section
      className="hero"
      aria-labelledby="hero-heading"
      style={cssVars}
    >
      <div className="hero__announcement" role="region" aria-label="Announcement">
        <div className="container hero__announcement-inner">
          <p className="hero__announcement-text">
            Limited time — 20% OFF on first order! Use code <strong>SAVE20</strong>
          </p>
        </div>
      </div>
      <div className="hero__overlay">
        <div className="container hero__inner">
          <div className="hero__left">
            <p className="hero__lead" style={{ color: '#FFFFFF' }}>
              3 Produits D'amincissement
            </p>
            <h1 id="hero-heading" className="hero__title">
              <span style={{ color: '#8E2CA6' }}>Pack</span> <span style={{ color: '#FFFFFF' }}>Minceur</span>
            </h1>
            <div className="hero__actions">
              <button className="btn btn--outline" type="button" aria-label="Discover">Discover</button>
              <button className="btn btn--primary" type="button" aria-label="Buy now">Buy</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}