import React, { useState, useEffect, useRef } from 'react';
import './Testimonial.css';

const testimonials = [
  {
    name: 'Aisha Al-Mansoori',
    age: 29,
    review: 'Grâce au Pack Minceur, j\'ai perdu 10 kg en un mois ! Les produits sont naturels et efficaces pour l\'amincissement. Je me sens plus légère et pleine d\'énergie.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Fatima El-Khalid',
    age: 40,
    review: 'Ce pack est incroyable pour l\'amincissement. J\'ai vu des résultats rapides sans effets secondaires. Parfait pour brûler les graisses et supprimer l\'appétit.',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'Nour Hassan',
    age: 35,
    review: 'Le Pack Minceur a transformé ma silhouette. Les trois produits travaillent ensemble pour un amincissement optimal. Je recommande vivement à toutes les femmes !',
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
  },
  {
    name: 'Layla Al-Sayed',
    age: 30,
    review: 'Avec le Pack Minceur, mon amincissement a été rapide et durable. Les ingrédients naturels m\'ont aidée à contrôler mon poids sans effort.',
    image: 'https://randomuser.me/api/portraits/women/22.jpg',
  },
  {
    name: 'Sara Benali',
    age: 36,
    review: 'Je suis ravie des résultats du Pack Minceur pour l\'amincissement. Il a boosté mon métabolisme et réduit mes envies de grignotage.',
    image: 'https://randomuser.me/api/portraits/women/55.jpg',
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(3);
  const [extendedTestimonials, setExtendedTestimonials] = useState([]);
  const sliderRef = useRef(null);
  const originalLength = testimonials.length;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisible(1);
      } else if (window.innerWidth < 1024) {
        setVisible(2);
      } else {
        setVisible(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setExtendedTestimonials([...testimonials, ...testimonials.slice(0, visible)]);
    setCurrentIndex(0);
  }, [visible]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleTransitionEnd = () => {
      if (currentIndex === originalLength) {
        slider.style.transition = 'none';
        setCurrentIndex(0);
        // eslint-disable-next-line no-unused-expressions
        slider.offsetHeight; // Force reflow
        slider.style.transition = 'transform 0.5s ease';
      }
    };

    slider.addEventListener('transitionend', handleTransitionEnd);
    return () => slider.removeEventListener('transitionend', handleTransitionEnd);
  }, [currentIndex, originalLength]);

  return (
    <section className="testimonial-section">
      <h2 className="testimonial-title">Ce que disent nos clients</h2>
      <div className="testimonial-container">
        <div
          ref={sliderRef}
          className="testimonial-slider"
          style={{
            display: 'flex',
            transform: `translateX(-${currentIndex * (100 / visible)}%)`,
            transition: 'transform 0.5s ease',
          }}
        >
          {extendedTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card"
              style={{ flex: `0 0 ${100 / visible}%`, boxSizing: 'border-box', padding: '0 10px' }}
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="testimonial-avatar"
              />
              <p className="testimonial-name">{testimonial.name}</p>
              <p className="testimonial-age">Âge : {testimonial.age} ans</p>
              <p className="testimonial-review">{testimonial.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}