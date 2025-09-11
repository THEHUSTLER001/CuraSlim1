import React from 'react';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const {
    name,
    price,
    oldPrice,
    short,
    image,
    rating,
    reviews,
    id
  } = product;

  const formatPrice = (p) => {
    try {
      return p.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
    } catch {
      return `$${p.toFixed(2)}`;
    }
  };

  // compute full stars (rounded)
  const stars = Math.round(Number(rating || 0));
  const starsArray = Array.from({ length: 5 }, (_, i) => i < stars);

  return (
    <article className="product-card" aria-labelledby={`p-${id}-title`}>
      <div className="product-card__media">
        {image ? (
          <img src={image} alt={`${name}`} className="product-card__img" />
        ) : (
          <div className="product-card__img--placeholder">Image</div>
        )}
      </div>

      <div className="product-card__body">
        <h3 id={`p-${id}-title`} className="product-card__title">{name}</h3>
        <p className="product-card__short">{short}</p>

        <div className="product-card__rating-row">
          <div className="product-card__stars" aria-hidden="true">
            {starsArray.map((filled, i) =>
              filled ? <span key={i} className="star">★</span> : <span key={i} className="star muted">☆</span>
            )}
          </div>
          <div className="product-card__reviews">({reviews ?? 0})</div>
        </div>

        <div className="product-card__price-row">
          {oldPrice ? <span className="product-card__oldprice">{formatPrice(oldPrice)}</span> : null}
          <span className="product-card__price">{formatPrice(price)}</span>
        </div>
      </div>
    </article>
  );
}
