import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, MapPin } from "lucide-react";
import productImg from "../../assets/images/Bannnerform.JPG";
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
  const [packPrice, setPackPrice] = useState(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const API = 'https://curaslimback-production.up.railway.app';

  // Animation on scroll
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setAnimated(true);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );

    obs.observe(el);

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setAnimated(true);
      obs.unobserve(el);
    }

    return () => obs.disconnect();
  }, []);

  // Fetch pack price from backend (or fallback)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(`${API}/api/config`);
        if (!res.ok) throw new Error('no config');
        const json = await res.json();
        if (mounted && json.packPrice != null) setPackPrice(Number(json.packPrice));
      } catch (err) {
        if (mounted && packPrice == null) setPackPrice(400.00);
      }
    })();
    return () => { mounted = false; };
    // eslint-disable-next-line
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? Number(value) : value
    }));
  };

  // Quantity increment/decrement
  const handleQuantityChange = (operation) => {
    setFormData(prev => ({
      ...prev,
      quantity: operation === 'increment'
        ? Math.min(prev.quantity + 1, 10)
        : Math.max(1, prev.quantity - 1)
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        quantity: Number(formData.quantity || 1),
      };

      const url = `${API}/api/order`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errJson = await res.json().catch(()=>({ error: 'Unknown error' }));
        throw new Error(errJson.error || 'Failed to submit order');
      }

      await res.json();
      setFormData({ name: '', phone: '', address: '', quantity: 1 });
      navigate('/thank-you');
    } catch (error) {
      console.error('Order error:', error);
      setMessage('❌ Erreur lors de l\'envoi. Veuillez réessayer plus tard.');
    } finally {
      setIsLoading(false);
    }
  };

  // Compute total price
  const total = packPrice ? (packPrice * formData.quantity).toFixed(2) : "—";

  return (
    <div
      className={`contact-form-container ${animated ? 'animated' : ''}`}
      ref={containerRef}
    >
      <div className="product-section" style={{ ['--i']: 0 }}>
        <div className="product-image-wrap">
          <div className="product-image">
            <img src={productImg} alt="Crème Solaire" />
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

            <div className="input-groupp" style={{ ['--i']: 5 }}>
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

            <div className="input-groupp" style={{ ['--i']: 6 }}>
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

            <div className="input-groupp" style={{ ['--i']: 7 }}>
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
                className={`message ${message.includes('✅') ? 'success' : 'error'}`}
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
              {isLoading 
                ? 'Envoi... / جارٍ الإرسال...' 
                : `🛒 Acheter - ${total} DH - إشتري`
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
