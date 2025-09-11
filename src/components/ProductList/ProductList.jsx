import React from 'react';
import './ProductList.css';
import products from '../../data/products';
import ProductCard from '../ProductCard/ProductCard.jsx';

export default function ProductList() {
  return (
    <section className="product-list" aria-label="Product list">
      <div className="container">
     

        <div className="product-list__grid">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
