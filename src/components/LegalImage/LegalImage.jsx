import React from "react";
import "./LegalImage.css";
import legalImg from "../../assets/images/legal.png"; // change path to your image

const LegalImage = () => {
  return (
    <div className="legal-wrapper">
      <img src={legalImg} alt="Legal Info" className="legal-img" />
    </div>
  );
};

export default LegalImage;
