import React from 'react';
import './Posters.css';

let poster1, poster2, poster3;
try { poster1 = require('../../assets/images/Pr1.jpg'); } catch (e) { poster1 = null; }
try { poster2 = require('../../assets/images/Pr2.jpg'); } catch (e) { poster2 = null; }
try { poster3 = require('../../assets/images/Pr3.jpg'); } catch (e) { poster3 = null; }

export default function Posters() {
  const posters = [
    { id: 1, img: poster1, alt: 'Poster 1' },
    { id: 2, img: poster2, alt: 'Poster 2' },
    { id: 3, img: poster3, alt: 'Poster 3' }
  ];

  return (
    <section className="posters" aria-label="Featured posters">
      <div className="container posters__inner">
        {posters.map(p => (
          <div className="poster" key={p.id}>
            {p.img ? (
              <img src={p.img} alt={p.alt} className="poster__img" />
            ) : (
              <div className="poster__placeholder">Poster {p.id}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
