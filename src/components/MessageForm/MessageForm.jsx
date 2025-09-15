import React, { useState, useEffect } from 'react';
import { init, send } from '@emailjs/browser';
import './MessageForm.css';

// Initialize EmailJS with public key from environment variables
init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);

const MessageForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  // Form status
  const [status, setStatus] = useState({
    type: '', // 'success', 'error', or ''
    message: ''
  });
  
  // Submitting state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Verify environment variables once (log errors but don't block form)
  useEffect(() => {
    if (!process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 
        !process.env.REACT_APP_EMAILJS_SERVICE_ID || 
        !process.env.REACT_APP_EMAILJS_TEMPLATE_ID) {
      console.error('⚠️ EmailJS configuration error: Missing environment variables');
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear status when typing
    if (status.message) {
      setStatus({ type: '', message: '' });
    }
  };

  // Validate form
  const validateForm = () => {
    if (!formData.name.trim()) {
      setStatus({ type: 'error', message: 'Le nom est requis' });
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      setStatus({ type: 'error', message: "L'adresse e-mail n'est pas valide" });
      return false;
    }
    
    if (!formData.message.trim()) {
      setStatus({ type: 'error', message: 'Le message est requis' });
      return false;
    }
    
    return true;
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: "Liderm Cosmétique"
    };

    send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      templateParams
    )
      .then(() => {
        setIsSubmitting(false);
        setStatus({ 
          type: 'success', 
          message: 'Votre message a été envoyé avec succès ! Nous vous contacterons dans les plus brefs délais.'
        });
        setFormData({ name: '', email: '', message: '' });

        // Clear success after 5s
        setTimeout(() => {
          setStatus({ type: '', message: '' });
        }, 5000);
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        setIsSubmitting(false);

        let errorMessage = "Une erreur s'est produite lors de l'envoi. Veuillez réessayer.";
        if (error.text?.includes('domain')) {
          errorMessage = "Erreur de domaine. Veuillez contacter l'administrateur du site.";
        } else if (error.status === 429) {
          errorMessage = "Trop de tentatives. Veuillez réessayer plus tard.";
        }

        setStatus({ type: 'error', message: errorMessage });
      });
  };

  // Render status message
  const renderStatusMessage = () => {
    if (!status.message) return null;
    return (
      <div className={`status-message ${status.type}`}>
        <div className="status-icon">
          {status.type === 'success' ? '✓' : '⚠'}
        </div>
        <p>{status.message}</p>
      </div>
    );
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contactez <span>Nous</span></h1>
      
      {/* Status Message */}
      {renderStatusMessage()}
      
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="input-group">
            <label htmlFor="name">Nom complet</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Entrez votre nom" 
              disabled={isSubmitting}
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="email">Adresse e-mail</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Entrez votre e-mail" 
              disabled={isSubmitting}
              required
            />
          </div>
        </div>

        <div className="form-group single-input">
          <div className="input-group">
            <label htmlFor="message">Message</label>
            <textarea 
              id="message" 
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4" 
              placeholder="Entrez votre message" 
              disabled={isSubmitting}
              required
            ></textarea>
          </div>
        </div>

        <button 
          type="submit" 
          className={`submit-button ${isSubmitting ? 'loading' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Envoi en cours...
            </>
          ) : 'Envoyer le message'}
        </button>
      </form>

      <div className="contact-info">
        <p><span>Email:</span> contact@curaslim.com</p>
        <p><span>Téléphone:</span> +212 6 12 34 56 78</p>
      </div>
    </div>
  );
};

export default MessageForm;
