// src/components/MessageForm.jsx
import React, { useState, useEffect } from 'react';
import { init, send } from '@emailjs/browser';
import './MessageForm.css';

// ONLY use environment variables — no hardcoded fallbacks
const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

const MessageForm = () => {
  useEffect(() => {
    if (PUBLIC_KEY) {
      init(PUBLIC_KEY);
    } else {
      console.warn('EmailJS public key (REACT_APP_EMAILJS_PUBLIC_KEY) is not set.');
    }

    if (!SERVICE_ID || !TEMPLATE_ID) {
      console.error('⚠️ EmailJS configuration error: set REACT_APP_EMAILJS_SERVICE_ID and REACT_APP_EMAILJS_TEMPLATE_ID in your .env');
    }
  }, []);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (status.message) setStatus({ type: '', message: '' });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validateForm()) return;

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: 'Cura Slim'
    };

    try {
      // pass PUBLIC_KEY as 4th arg if present, otherwise call without it
      if (PUBLIC_KEY) {
        await send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      } else {
        await send(SERVICE_ID, TEMPLATE_ID, templateParams);
      }

      setIsSubmitting(false);
      setStatus({
        type: 'success',
        message: 'Votre message a été envoyé avec succès ! Nous vous contacterons dans les plus brefs délais.'
      });
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus({ type: '', message: '' }), 5000);
    } catch (error) {
      console.error('EmailJS error:', error);
      setIsSubmitting(false);

      let errorMessage = "Une erreur s'est produite lors de l'envoi. Veuillez réessayer.";
      if (error?.text?.toLowerCase()?.includes('domain')) {
        errorMessage = "Erreur de domaine. Veuillez contacter l'administrateur du site.";
      } else if (error?.status === 429) {
        errorMessage = "Trop de tentatives. Veuillez réessayer plus tard.";
      }
      setStatus({ type: 'error', message: errorMessage });
    }
  };

  const renderStatusMessage = () => {
    if (!status.message) return null;
    return (
      <div className={`messageform-status-message ${status.type}`} role="status" aria-live="polite">
        <div className="messageform-status-icon" aria-hidden>
          {status.type === 'success' ? '✓' : '⚠'}
        </div>
        <p>{status.message}</p>
      </div>
    );
  };

  return (
    <div className="messageform-contact-container">
      <h1 className="messageform-contact-title">Contactez <span>Nous</span></h1>

      {renderStatusMessage()}

      <form className="messageform-contact-form" onSubmit={handleSubmit} noValidate>
        <div className="messageform-form-group">
          <div className="messageform-input-group">
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
              aria-required="true"
            />
          </div>

          <div className="messageform-input-group">
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
              aria-required="true"
            />
          </div>
        </div>

        <div className="messageform-form-group messageform-single-input">
          <div className="messageform-input-group">
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
              aria-required="true"
            />
          </div>
        </div>

        <button
          type="submit"
          className={`messageform-submit-button ${isSubmitting ? 'loading' : ''}`}
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="messageform-spinner" aria-hidden></span>
              Envoi en cours...
            </>
          ) : 'Envoyer le message'}
        </button>
      </form>

      <div className="messageform-contact-info">
        <p><span>Email:</span> contact@curaslim.com</p>
        <p><span>Téléphone:</span> +212 6 12 34 56 78</p>
      </div>
    </div>
  );
};

export default MessageForm;
