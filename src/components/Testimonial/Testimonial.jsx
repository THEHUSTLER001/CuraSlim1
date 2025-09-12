import React, { useState, useEffect } from 'react';
import './Testimonial.css';

const testimonials = [
  {
    name: 'Aisha Al-Mansoori',
    review: 'Grâce au Pack Minceur, j\'ai perdu 10 kg en un mois ! Les produits sont naturels et efficaces pour l\'amincissement. Je me sens plus légère et pleine d\'énergie.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Fatima El-Khalid',
    review: 'Ce pack est incroyable pour l\'amincissement. J\'ai vu des résultats rapides sans effets secondaires. Parfait pour brûler les graisses et supprimer l\'appétit.',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'Nour Hassan',
    review: 'Le Pack Minceur a transformé ma silhouette. Les trois produits travaillent ensemble pour un amincissement optimal. Je recommande vivement à toutes les femmes !',
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
  },
  {
    name: 'Layla Al-Sayed',
    review: 'Avec le Pack Minceur, mon amincissement a été rapide et durable. Les ingrédients naturels m\'ont aidée à contrôler mon poids sans effort.',
    image: 'https://randomuser.me/api/portraits/women/22.jpg',
  },
  {
    name: 'Sara Benali',
    review: 'Je suis ravie des résultats du Pack Minceur pour l\'amincissement. Il a boosté mon métabolisme et réduit mes envies de grignotage.',
    image: 'https://randomuser.me/api/portraits/women/55.jpg',
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="testimonial-carousel">
      <div className="testimonial__content-wrapper">
        <div
          className="testimonial__slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial__content">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="testimonial__avatar"
              />
              <div className="testimonial__stars">
                ★★★★★
              </div>
              <p className="testimonial__review">
                {testimonial.review}
              </p>
              <p className="testimonial__name">
                {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="testimonial__dots">
        {testimonials.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </section>
  );
}