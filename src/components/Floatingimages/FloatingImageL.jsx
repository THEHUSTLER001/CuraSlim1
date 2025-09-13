import React from "react";
import "./FloatingImages.css";
import Post1 from '../../assets/images/Pcard1.png'

export default function FloatingImageL() {
  return (
    <>
      {/* Left Bottle */}
      <img
        src={Post1}
        alt="Left Bottle"
        className="floating-image left animate-slide-left"
      />

    </>
  );
}
