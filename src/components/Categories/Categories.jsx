// src/components/Categories.jsx
import React from 'react';
import './Categories.css';

import coupeFaim from '../../assets/images/Cat1.jpg';
import creme from '../../assets/images/Cat2.jpg';
import fatBurner from '../../assets/images/Cat3.jpg';

const Categories = () => {
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      // prefer JS smooth scroll (works even if CSS not supported)
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // fallback: update location hash without jump
      // window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <section className="categories-section">
      <h2 className="categories-title">OUR CATEGORIES</h2>
      <div className="categories-grid">
        <div className="category-card">
          <img src={coupeFaim} alt="Coupe Faim" className="category-image" />
          <div className="category-overlay">
            {/* button now — keeps same classes so styles remain */}
            <button
              type="button"
              className="category-label light-gray"
              onClick={() => scrollToId('order')}
              aria-controls="coupe-faim"
              aria-label="Go to Coupe Faim section"
            >
              <span className="category-name">COUPE FAIM</span>
              <span className="category-products">12 products</span>
            </button>
          </div>
          <div className="reveal-cover"></div>
        </div>

        <div className="category-card">
          <img src={creme} alt="Crème" className="category-image" />
          <div className="category-overlay">
            <button
              type="button"
              className="category-label light-gray"
              onClick={() => scrollToId('order')}
              aria-controls="creme"
              aria-label="Go to Crème section"
            >
              <span className="category-name">CRÈME</span>
              <span className="category-products">3 products</span>
            </button>
          </div>
          <div className="reveal-cover"></div>
        </div>

        <div className="category-card">
          <img src={fatBurner} alt="Fat Burner" className="category-image" />
          <div className="category-overlay">
            <button
              type="button"
              className="category-label light-gray"
              onClick={() => scrollToId('order')}
              aria-controls="fat-burner"
              aria-label="Go to Fat Burner section"
            >
              <span className="category-name">FAT BURNER</span>
              <span className="category-products">3 products</span>
            </button>
          </div>
          <div className="reveal-cover"></div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
