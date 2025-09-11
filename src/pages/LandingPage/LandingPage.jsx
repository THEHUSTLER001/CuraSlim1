import React from 'react';
import Header from '../../components/Header/Header.jsx';
import Hero from '../../components/Hero/Hero.jsx';
import Showcase from '../../components/Showcase/Showcase.jsx';
import Posters from '../../components/Posters/Posters.jsx';
import ProductList from '../../components/ProductList/ProductList.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import './LandingPage.css';
import TestimonialCarousel from '../../components/Testimonial/Testimonial.jsx';
import ContactForm from '../../components/ContactForm/ContactForm.jsx';
import Categories from '../../components/Categories/Categories.jsx';

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className="landing-main">
        <Hero />
        <Showcase />
        <Posters />
        <ProductList />
        <TestimonialCarousel/>
        <Categories/>
        <ContactForm/>
      </main>
      <Footer />
    </>
  );
}
