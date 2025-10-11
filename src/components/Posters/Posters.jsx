import React from 'react';
import './Posters.css';

let poster1, poster2, poster3,poster4;
try { poster1 = require('../../assets/images/Cura-Slim-Website-Banner-10.png'); } catch (e) { poster1 = null; }
try { poster2 = require('../../assets/images/Cura-Slim-Website-Banner-11.png'); } catch (e) { poster2 = null; }
try { poster3 = require('../../assets/images/mag.png'); } catch (e) { poster3 = null; }
try { poster4 = require('../../assets/images/oil.png'); } catch (e) { poster4 = null; }

export default function Posters() {
  const posters = [
    { id: 1, img: poster1, alt: 'Poster 1' },
    { id: 2, img: poster2, alt: 'Poster 2' },
    { id: 3, img: poster3, alt: 'Poster 3' },
    { id: 4, img: poster4, alt: 'Poster 4' }

  ];

  return (
    <section className="posters" aria-label="Featured posters">
      <div className="container">
        <div className="posters__inner">
          {posters.map(p => (
            <div className="poster-row" key={p.id}>
              {p.img ? (
                <img src={p.img} alt={p.alt} className="poster__img" />
              ) : (
                <div className="poster__placeholder">Poster {p.id}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
