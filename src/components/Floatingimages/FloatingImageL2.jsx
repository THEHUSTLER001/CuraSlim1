import React from "react";
import "./FloatingImages.css";
import Post1 from '../../assets/images/Cura-Slim-Website-Tube-2.png'

export default function FloatingImageL2() {
  return (
    <>
      {/* Left Bottle */}
      <img
        src={Post1}
        alt="Left Bottle"
        className="floating-image left2 animate-slide-left"
      />

    </>
  );
}
