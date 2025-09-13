import React from 'react';
import './FixedBuyButton.css';

const FixedBuyButton = () => {
  const handleScroll = () => {
    const section = document.getElementById("order");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button 
      id="fixed-buy-btn" 
      className="animated-child" 
      onClick={handleScroll}
    >
      Acheter Maintenant / اشتري الآن
    </button>
  );
};

export default FixedBuyButton;
