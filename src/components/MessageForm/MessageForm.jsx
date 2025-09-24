// src/components/MessageForm.jsx
import React, { useState, useEffect, useRef } from 'react';
import { init, send } from '@emailjs/browser';
import './MessageForm.css';

// ONLY use environment variables — no hardcoded fallbacks
const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

// client-side cooldown (ms) after a successful submit to prevent rapid resubmits
const SUBMIT_COOLDOWN_MS = 10_000;

const MessageForm = () => {
  const isMounted = useRef(true);
  const lastSubmitAt = useRef(0);

  useEffect(() => {
    // track mount state to avoid setState on unmounted component
    isMounted.current = true;
    if (PUBLIC_KEY) {
      try {
        init(PUBLIC_KEY);
      } catch (err) {
        // non-fatal: log init errors for debugging
        // EmailJS can still accept the public key as the 4th arg to send()
        // so we don't block the form here
        // eslint-disable-next-line no-console
        console.warn('EmailJS init warning:', err);
      }
    } else {
      // eslint-disable-next-line no-console
      console.warn('EmailJS public key (REACT_APP_EMAILJS_PUBLIC_KEY) is not set.');
    }

    if (!SERVICE_ID || !TEMPLATE_ID) {
      // eslint-disable-next-line no-console
      console.error('⚠️ EmailJS configuration error: set REACT_APP_EMAILJS_SERVICE_ID and REACT_APP_EMAILJS_TEMPLATE_ID in your .env');
    }

    return () => {
      isMounted.current = false;
    };
  }, []);

  const [formData, setFormData] = useState({ name: '', email: '', message: '', subject: '', hp: '' }); // hp = honeypot
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status.message) {
      setStatus({ type: '', message: '' });
    }
  };

  const isCooldownActive = () => {
    return Date.now() - lastSubmitAt.current < SUBMIT_COOLDOWN_MS;
  };

  const validateForm = () => {
    // Honeypot check: if it's filled, likely a bot
    if (formData.hp && formData.hp.trim() !== '') {
      setStatus({ type: 'error', message: 'Spam détecté.' });
      return false;
    }

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

    if (!SERVICE_ID || !TEMPLATE_ID) {
      setStatus({ type: 'error', message: "Configuration du service d'e-mail manquante. Contactez l'administrateur." });
      return false;
    }

    if (isCooldownActive()) {
      setStatus({ type: 'error', message: 'Veuillez patienter avant de renvoyer un message.' });
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
      subject: formData.subject || 'Message depuis le site',
      message: formData.message,
      to_name: 'Cura Slim'
    };

    try {
      // If PUBLIC_KEY is present we pass it; send() may still work without init.
      if (PUBLIC_KEY) {
        await send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      } else {
        await send(SERVICE_ID, TEMPLATE_ID, templateParams);
      }

      if (!isMounted.current) return;
      lastSubmitAt.current = Date.now();

      setIsSubmitting(false);
      setStatus({
        type: 'success',
        message: 'Votre message a été envoyé avec succès ! Nous vous contacterons dans les plus brefs délais.'
      });
      setFormData({ name: '', email: '', message: '', subject: '', hp: '' });

      // auto-clear success after a few seconds
      setTimeout(() => {
        if (isMounted.current) setStatus({ type: '', message: '' });
      }, 5000);
    } catch (error) {
      // try to extract useful message
      const serverMsg = error?.text || error?.message || JSON.stringify(error);
      // eslint-disable-next-line no-console
      console.error('EmailJS error:', serverMsg);

      if (!isMounted.current) return;
      setIsSubmitting(false);

      let errorMessage = "Une erreur s'est produite lors de l'envoi. Veuillez réessayer.";
      if (String(serverMsg).toLowerCase().includes('domain')) {
        errorMessage = "Erreur de domaine. Veuillez contacter l'administrateur du site.";
      } else if (error?.status === 429 || String(serverMsg).toLowerCase().includes('rate')) {
        errorMessage = "Trop de tentatives. Veuillez réessayer plus tard.";
      }

      setStatus({ type: 'error', message: errorMessage });
    }
  };

  const renderStatusMessage = () => {
    if (!status.message) return null;
    const isSuccess = status.type === 'success';
    return (
      <div
        className={`messageform-status-message ${status.type}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="messageform-status-icon" aria-hidden>
          {isSuccess ? '✓' : '⚠'}
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
        {/* Honeypot hidden field - keep name unusual */}
        <input
          type="text"
          name="hp"
          value={formData.hp}
          onChange={handleChange}
          style={{ display: 'none' }}
          autoComplete="off"
          tabIndex="-1"
        />

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

        <div className="messageform-form-group">
          <div className="messageform-input-group">
            <label htmlFor="subject">Sujet (optionnel)</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Sujet de votre message"
              disabled={isSubmitting}
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
              rows="5"
              placeholder="Entrez votre message"
              disabled={isSubmitting}
              required
              aria-required="true"
            />
          </div>
        </div>

        {/* disable submit if env is not configured */}
        <button
          type="submit"
          className={`messageform-submit-button ${isSubmitting ? 'loading' : ''}`}
          disabled={isSubmitting || !SERVICE_ID || !TEMPLATE_ID}
          aria-disabled={isSubmitting || !SERVICE_ID || !TEMPLATE_ID}
        >
          {isSubmitting ? (
            <>
              <span className="messageform-spinner" aria-hidden></span>
              Envoi en cours...
            </>
          ) : (!SERVICE_ID || !TEMPLATE_ID) ? 'Configuration manquante' : 'Envoyer le message'}
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
