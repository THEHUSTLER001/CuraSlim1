import React, { useEffect } from 'react';
import Header from '../../components/Header/Header.jsx';
import Hero from '../../components/Hero/Hero.jsx';
import Posters from '../../components/Posters/Posters.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import TestimonialCarousel from '../../components/Testimonial/Testimonial.jsx';
import ContactForm from '../../components/ContactForm/ContactForm.jsx';
import Categories from '../../components/Categories/Categories.jsx';
import ProductBenefit from '../../components/ProductBenefit/ProductBenefit.jsx';
import './LandingPage.css';
import WeightCalculator from '../../components/WeightCalculator/WeightCalculator.jsx';
import FloatingImageR from '../../components/Floatingimages/FloatingImageR.jsx';
import FixedBuyButton from '../../components/FixedButton/FixedButton.jsx';
import MessageForm from '../../components/MessageForm/MessageForm.jsx';
import DefSection from '../../components/DefSection/DefSection.jsx';
import About from '../../components/About/About.jsx';
import LegalImage from '../../components/LegalImage/LegalImage.jsx';

export default function LandingPage() {
  useEffect(() => {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once animated
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <>
      <Header />
      <main className="landing-main">
        <div id="home" className="section">
          <Hero />
        </div>
         <div id="about" className="section">
          <About/>
        </div>
        <div className="section">
          <DefSection/>
        </div>
          <div id="list"  className="section">
          <Posters />
        </div>
        <div className="section">
          <FloatingImageR/>
          <TestimonialCarousel />
        </div>
        <div className="section">
          <ProductBenefit />
        </div>
         <div id="order" className="section">
          <ContactForm />
        </div>
         <div id="weight" className="section">
           <WeightCalculator/>
           <LegalImage/>
        </div>
        <div className="section">
          <Categories />
        </div>
        <div id="message" className="section">
          <MessageForm/>
        </div>

      </main>

      <Footer />
      <FixedBuyButton/>
    </>
  );
}