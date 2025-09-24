import React, { useState } from 'react';
import { init, send } from '@emailjs/browser';
import './MessageForm.css';

// ✅ Init with env variable
init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);

const MessageForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (status.message) setStatus({ type: '', message: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: "Cura Slim"
      }
    )
      .then(() => {
        setIsSubmitting(false);
        setStatus({ type: 'success', message: '✅ Message envoyé avec succès !' });
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        setIsSubmitting(false);
        setStatus({ type: 'error', message: "❌ Erreur lors de l'envoi. Vérifiez vos identifiants." });
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Nom complet"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Adresse e-mail"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <textarea
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Envoi en cours..." : "Envoyer"}
      </button>
      {status.message && <p className={status.type}>{status.message}</p>}
    </form>
  );
};

export default MessageForm;
