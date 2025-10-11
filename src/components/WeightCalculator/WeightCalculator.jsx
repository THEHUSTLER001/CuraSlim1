import React, { useState } from 'react';
import './WeightCalculator.css';

function WeightCalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [idealWeight, setIdealWeight] = useState('');

  const handleCalculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // Convert cm to meters
    if (!isNaN(w) && !isNaN(h) && w > 0 && h > 0) {
      const calculatedBmi = (w / (h * h)).toFixed(1);
      setBmi(calculatedBmi);
      const idealMin = (18.5 * h * h).toFixed(1);
      const idealMax = (24.9 * h * h).toFixed(1);
      setIdealWeight(`${idealMin} - ${idealMax} kg`);
    } else {
      setBmi('Entrée invalide');
      setIdealWeight('Entrée invalide');
    }
  };

  return (
    <div id="calculator-container">
      <h2 id="calculator-title">Calculateur de Poids</h2>

      <div className="weight-container">
        <div id="calculator-image">
          <img src={require('../../assets/images/poids.png')} alt="Balance" />
        </div>
        <div id="calculator-content">
          <div id="input-section" className="animated-child">
            <div id="input-group" className="animated-child">
              <label>Poids (kg) :</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Entrer le poids"
              />
            </div>
            <div id="input-group" className="animated-child">
              <label>Taille (cm) :</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Entrer la taille"
              />
            </div>
            <button id="calculator-btn" className="animated-child" onClick={handleCalculate}>
              Calculer IMC et Poids Idéal
            </button>
          </div>
          <div id="result-section" className="animated-child">
            <div id="result-card">
              <div id="result" className="animated-child">
                IMC : {bmi}
              </div>
              <div id="result" className="animated-child">
                Poids Idéal : {idealWeight}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="calculator-banner">
        <img
          className="calculator-banner-img"
          src={require('../../assets/images/bannerpoids.png')}
          alt="Bannière - conseils santé"
        />
      </div>
    </div>
  );
}

export default WeightCalculator;