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
      setBmi('Invalid input');
      setIdealWeight('Invalid input');
    }
  };

  return (
    <div className="calculator-container">
      <h2 id="calculator-title">Weight Calculator</h2>
      <div id="calculator-grid">
        <div id="calculator-card" className="animated-child">
          <div id="input-group" className="animated-child">
            <label>Weight (kg):</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight"
            />
          </div>
          <div id="input-group" className="animated-child">
            <label>Height (cm):</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter height"
            />
          </div>
          <button id="calculator-btn" className="animated-child" onClick={handleCalculate}>
            Calculate BMI & Ideal Weight
          </button>
          <div id="result" className="animated-child">
            BMI: {bmi}
          </div>
          <div id="result" className="animated-child">
            Ideal Weight: {idealWeight}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeightCalculator;