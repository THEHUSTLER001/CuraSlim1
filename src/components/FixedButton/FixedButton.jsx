import React from 'react';
import './FixedBuyButton.css';

const FixedBuyButton = () => {
  const handleScrollOrder = () => {
    const section = document.getElementById("order");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollContact = () => {
    const section = document.getElementById("message"); // you’ll set this id later
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Main Buy Button */}
      <button 
        id="fixed-buy-btn" 
        className="animated-child" 
        onClick={handleScrollOrder}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="22"
          height="22"
          fill="rgb(200, 162, 255)"
          stroke="rgb(200, 162, 255)"
          strokeWidth="2"
          style={{ marginRight: "8px" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.049 2.927c.3-.921 1.603-.921 
               1.902 0l1.519 4.674a1 1 0 00.95.69h4.915
               c.969 0 1.371 1.24.588 1.81l-3.976 
               2.888a1 1 0 00-.363 1.118l1.518 
               4.674c.3.922-.755 1.688-1.538 
               1.118l-3.976-2.888a1 1 0 00-1.176 
               0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118
               l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888
               c-.784-.57-.38-1.81.588-1.81h4.914a1 1 
               0 00.951-.69l1.519-4.674z"
          />
        </svg>
        أطلب الآن | <strong>Commander</strong>
      </button>

      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/212600000000" // replace with your real WhatsApp number
        target="_blank" 
        rel="noopener noreferrer"
        className="floating-btn whatsapp-btn"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="22" height="22">
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 2.13.56 4.18 1.63 5.99L.5 23.5l5.66-1.62A11.4 11.4 0 0012 23.5c6.35 0 11.5-5.15 11.5-11.5S18.35.5 12 .5zm0 20.83c-1.88 0-3.71-.52-5.29-1.5l-.38-.23-3.36.96.96-3.28-.25-.38a9.42 9.42 0 01-1.45-5.1C2.23 6.62 6.62 2.23 12 2.23c5.38 0 9.77 4.39 9.77 9.77 0 5.39-4.39 9.78-9.77 9.78z"/>
          <path d="M17.46 14.28c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.8-1.49-1.78-1.66-2.08-.17-.3-.02-.46.13-.61.14-.15.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.18-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.48 1.07 2.92 1.22 3.12.15.2 2.1 3.2 5.1 4.48.71.31 1.27.5 1.7.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.41.25-.7.25-1.3.18-1.41-.07-.11-.27-.17-.57-.32z"/>
        </svg>
      </a>

      {/* Email Button */}
      <button 
        className="floating-btn email-btn" 
        onClick={handleScrollContact}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="22" height="22">
          <path d="M20 4H4a2 2 0 00-2 2v12a2 
                   2 0 002 2h16a2 2 0 002-2V6a2 
                   2 0 00-2-2zm0 4l-8 5-8-5V6l8 
                   5 8-5v2z"/>
        </svg>
      </button>
    </>
  );
};

export default FixedBuyButton;
