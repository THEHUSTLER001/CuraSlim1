import React, { useState } from 'react';
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
      
      // Reset form
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

  return (
    <div className="contact-form-container">
      <div className="product-section">
        <div className="product-image">
          <img src={productImg} alt="LIDERM Crème Solaire" />
        </div>
      </div>
      
      <div className="form-section">
        <h2>Commandez votre produit</h2>
        
        <div className="quantity-section">
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
<div className="form-container">
       <form onSubmit={handleSubmit} className="contact-form">

  <div className="input-group">
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

  <div className="input-group">
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

  <div className="input-group">
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
    <div className={`message ${message.includes('succès') ? 'success' : 'error'}`}>
      {message}
    </div>
  )}

  <button 
    type="submit" 
    className="submit-btn"
    disabled={isLoading}
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