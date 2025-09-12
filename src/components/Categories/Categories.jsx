// src/components/Categories.jsx
import React from 'react';
import './Categories.css';

import coupeFaim from '../../assets/images/Cat1.jpg'; // Assuming image names based on categories
import creme from '../../assets/images/Cat2.jpg';
import fatBurner from '../../assets/images/Cat3.jpg';

const Categories = () => {
  return (
    <section className="categories-section">
      <h2 className="categories-title">OUR CATEGORIES</h2>
      <div className="categories-grid">
        <div className="category-card">
          <img src={coupeFaim} alt="Coupe Faim" className="category-image" />
          <div className="category-overlay">
            <div className="category-label light-gray">
              <span className="category-name">COUPE FAIM</span>
              <span className="category-products">12 products</span>
            </div>
          </div>
          <div className="reveal-cover"></div>
        </div>
        <div className="category-card">
          <img src={creme} alt="Crème" className="category-image" />
          <div className="category-overlay">
            <div className="category-label light-gray">
              <span className="category-name">CRÈME</span>
              <span className="category-products">3 products</span>
            </div>
          </div>
          <div className="reveal-cover"></div>
        </div>
        <div className="category-card">
          <img src={fatBurner} alt="Fat Burner" className="category-image" />
          <div className="category-overlay">
            <div className="category-label light-gray">
              <span className="category-name">FAT BURNER</span>
              <span className="category-products">3 products</span>
            </div>
          </div>
          <div className="reveal-cover"></div>
        </div>
      </div>
    </section>
  );
};

export default Categories;