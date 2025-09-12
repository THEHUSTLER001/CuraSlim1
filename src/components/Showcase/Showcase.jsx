import React from 'react';
import './Showcase.css';

let centerImg, logoHale1, logoGR1;
try { centerImg = require('../../assets/images/Annonce.jpg'); } catch (e) { centerImg = null; }
try { logoHale1 = require('../../assets/images/LOGOO.xcf'); } catch (e) { logoHale1 = null; }
try { logoGR1 = require('../../assets/images/LOGOOO.xcf'); } catch (e) { logoGR1 = null; }

export default function Showcase() {
  return (
    <section className="showcase-hero" aria-labelledby="showcase-heading">
      <div className="showcase-hero__container">
        {/* LEFT: Title area */}
        <div className="showcase-hero__left">
          <h2 id="showcase-heading" className="showcase-hero__title">Best Matte Lipsticks</h2>
        </div>
        {/* RIGHT: Bordered block that contains [brand-square-left] [image-center] [brand-square-right] */}
        <div className="showcase-hero__block" role="group" aria-label="Featured brands and hero">
          <div className="showcase-hero__block-inner">
            {/* LEFT brand square (contains two logos stacked) */}
            <div className="brand-square">
              <div className="brand-square__logo">
                {logoHale1 ? <img src={logoHale1} alt="Hale logo 1" /> : <div className="brand-square__placeholder">Hale®</div>}
              </div>
            </div>
            {/* CENTER visual */}
            <div className="showcase-hero__visual">
              <div className="showcase-hero__visual-bg" aria-hidden="true" />
              {centerImg ? (
                <img src={centerImg} alt="Featured model" className="showcase-hero__visual-img" />
              ) : (
                <div className="showcase-hero__visual-placeholder">Featured Image</div>
              )}
            </div>
            {/* RIGHT brand square (contains two logos stacked) */}
            <div className="brand-square">
              <div className="brand-square__logo">
                {logoGR1 ? <img src={logoGR1} alt="GR logo 1" /> : <div className="brand-square__placeholder">GR</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}