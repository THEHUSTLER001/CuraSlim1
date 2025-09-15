import React from "react";
import "./About.css";
import productImg from "../../assets/images/Cat3.jpg"; // <- adjust path to your asset

export default function About() {
  return (
    <section className="about-root" aria-labelledby="about-title">
      <div className="about-container">
        <h2 id="about-title" className="about-title">
          À propos de <span className="accent">Curaslim</span>
        </h2>

        <div className="about-underline" />

        {/* row: image left, content right (flex) */}
        <div className="about-row" role="group" aria-label="Curaslim presentation">
          <div className="about-image-wrap" aria-hidden="false">
            <div className="reveal-cover" aria-hidden="true" />
            <img
              src={productImg}
              alt="Curaslim product hero"
              className="about-image about-image-inner"
              loading="lazy"
            />
          </div>

          <div className="about-content">
            <div className="kicker">Soin minceur innovant</div>

            <h3 className="headline">Curaslim — Concentré pour l'amincissement ciblé</h3>

            <p className="sub">
              Curaslim est une formulation dermo-cosmétique dédiée à l'amincissement et à la tonification. Sa texture légère
              pénètre rapidement et agit sur l'apparence de la silhouette en ciblant la fermeté et la réduction de l'effet
              peau d'orange. Enrichi en extraits végétaux, caféine encapsulée et actifs drainants, Curaslim convient aux peaux sensibles.
            </p>

            <div className="capacity">Contenance : 150 ml</div>

            <p className="sub">
              Appliquez en massage circulaire sur les zones concernées matin et soir. Résultats visibles avec une application
              régulière et une hygiène de vie adaptée.
            </p>

            <div className="advantages-title">Les avantages de Curaslim</div>
            <ul className="sub">
              <li>Réduction de l'aspect capitons</li>
              <li>Effet raffermissant et lissant</li>
              <li>Texture non grasse, absorption rapide</li>
              <li>Formule testée dermatologiquement</li>
            </ul>

            <div className="divider" />

            <div className="price-wrap animate-fade-in delay">
              <div>
                <span className="original">320,00</span>
                <span className="discount">189.99 DH</span>
              </div>
              <div className="cta-note">Profitez de cette offre exceptionnelle dès maintenant !</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
