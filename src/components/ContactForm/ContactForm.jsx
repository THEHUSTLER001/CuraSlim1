import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { User, Phone, MapPin } from "lucide-react";
import productImg from "../../assets/images/BannerDes.jpg";
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    quantity: 1
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [animated, setAnimated] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    // IntersectionObserver to trigger animations when the form enters viewport
    const el = containerRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setAnimated(true);
            obs.unobserve(el); // animate once
          }
        });
      },
      { threshold: 0.12 }
    );

    obs.observe(el);

    // also set animated immediately if already in viewport (e.g., refreshed mid-page)
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setAnimated(true);
      obs.unobserve(el);
    }

    return () => obs.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuantityChange = (operation) => {
    setFormData(prev => ({
      ...prev,
      quantity: operation === 'increment'
        ? prev.quantity + 1
        : Math.max(1, prev.quantity - 1)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // Replace these with your actual EmailJS credentials
      const serviceId = 'YOUR_SERVICE_ID';
      const templateId = 'YOUR_TEMPLATE_ID';
      const publicKey = 'YOUR_PUBLIC_KEY';

      const templateParams = {
        from_name: formData.name,
        phone: formData.phone,
        address: formData.address,
        quantity: formData.quantity,
        total_price: '179.89 dh'
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setMessage('Votre commande a été envoyée avec succès!');

      setFormData({
        name: '',
        phone: '',
        address: '',
        quantity: 1
      });
    } catch (error) {
      console.error('Error sending email:', error);
      setMessage('Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  // keep using --i for stagger, but button no longer bounces.
  return (
    <div
      className={`contact-form-container ${animated ? 'animated' : ''}`}
      ref={containerRef}
    >
      <div className="product-section" style={{ ['--i']: 0 }}>
        <div className="product-image-wrap">
          <div className="product-image">
            <img src={productImg} alt="LIDERM Crème Solaire" />
            <div className="image-cover" />
          </div>
        </div>
      </div>

      <div className="form-section" style={{ ['--i']: 1 }}>
        <h2 style={{ ['--i']: 2 }}>Commandez votre produit</h2>

        <div className="quantity-section" style={{ ['--i']: 3 }}>
          <label>Quantité</label>
          <div className="quantity-controls">
            <button
              type="button"
              className="quantity-btn"
              onClick={() => handleQuantityChange('decrement')}
            >
              -
            </button>
            <span className="quantity-display">{formData.quantity}</span>
            <button
              type="button"
              className="quantity-btn"
              onClick={() => handleQuantityChange('increment')}
            >
              +
            </button>
          </div>
        </div>

        <div className="form-container" style={{ ['--i']: 4 }}>
          <form onSubmit={handleSubmit} className="contact-form">

            <div className="input-group" style={{ ['--i']: 5 }}>
              <div className="input-wrapper">
                <User className="input-icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="Nom & Prénom / الاسم الكامل"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="input-group" style={{ ['--i']: 6 }}>
              <div className="input-wrapper">
                <Phone className="input-icon" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Téléphone / رقم الهاتف"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="input-group" style={{ ['--i']: 7 }}>
              <div className="input-wrapper">
                <MapPin className="input-icon" />
                <input
                  type="text"
                  name="address"
                  placeholder="Adresse ou Ville / العنوان"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {message && (
              <div
                className={`message ${message.includes('succès') ? 'success' : 'error'}`}
                style={{ ['--i']: 8 }}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              className="submit-btn"
              disabled={isLoading}
              style={{ ['--i']: 9 }}
            >
              {isLoading ? 'Envoi...' : '🛒 ACHETEZ / اشتري الآن'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
