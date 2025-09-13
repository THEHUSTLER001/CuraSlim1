import React from "react";
import "./FloatingImages.css";
import Post2 from '../../assets/images/Cura-Slim-Website-Tube-1.png'

export default function FloatingImageR() {
  return (
    <>
     
      {/* Right Tube */}
      <div className="floating-container">
      <img
        src={Post2}
        alt="Right Tube"
        className="floating-image right animate-slide-right"
      /></div>
    </>
  );
}
