import React, { useState, useEffect } from 'react';
import './About.css';

const About = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsRevealed(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="about-container">
      <h1 className="about-title">À propos de Cura Slim</h1>
      <div className="about-content">
        <div className="image-section">
          <div className="image-wrapper">
            <img 
              src="https://via.placeholder.com/500x600?text=Cura+Slim+Transformation" 
              alt="Cura Slim transformation" 
              className="hero-image"
            />
            <div className={`cover ${isRevealed ? 'slide-out' : ''}`}></div>
          </div>
        </div>
        <div className="content-section">
          <h3>Barre Cura Slim - Minceur Extrême</h3>
          <p>Soin minceur anti-graisse et anti-cellulite haute performance</p>
          <p>Contenance : 50g</p>
          <p>La barre Cura Slim est un complément dermocosmétique de nouvelle génération qui allie action minceur avancée, prévention des vergetures et correction des graisses localisées. Conçu pour tous les types de corps, même les plus sensibles, elle offre une haute protection contre les excès alimentaires et les envies incontrôlables.</p>
          <p>Elle est enrichie en actifs dermatologiques puissants qui hydratent, raffermissent, unifient et protègent la silhouette au quotidien.</p>
          <h4>Les avantages de la barre Cura Slim</h4>
          <div className="price-promo">
            <span className="original-price">266.50</span>
            <span className="promo-price">179.89 DH</span>
            <p>Profitez de cette offre exceptionnelle dès maintenant !</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;