// src/components/ICRCalculator.jsx
import React, { useState } from 'react';

const ICRCalculator = () => {
  const [totalDailyDose, setTotalDailyDose] = useState('');
  const [weight, setWeight] = useState('');
  const [calculationMethod, setCalculationMethod] = useState('500-rule');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculateICR = () => {
    try {
      const tdd = parseFloat(totalDailyDose);
      
      if (isNaN(tdd) || tdd <= 0) {
        throw new Error('Introduceți o valoare validă și pozitivă pentru doza zilnică totală.');
      }

      let icr;
      
      if (calculationMethod === '500-rule') {
        // Formula cu regula 500
        icr = Math.round(500 / tdd);
      } else {
        // Formula bazată pe greutate
        const weightValue = parseFloat(weight);
        if (isNaN(weightValue) || weightValue <= 0) {
          throw new Error('Introduceți o valoare validă și pozitivă pentru greutate.');
        }
        
        // Formulă bazată pe greutate (exemplu)
        icr = Math.round((weightValue * 0.3 + 450) / tdd);
      }
      
      setResult(icr);
      setError('');
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-xl font-bold text-center mb-4">Calculator ICR</h2>
      <p className="text-sm text-gray-600 mb-4">
        Calculează Raportul Insulină-Carbohidrați (ICR) folosind metode diferite.
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Metodă de calcul
          </label>
          <select
            value={calculationMethod}
            onChange={(e) => setCalculationMethod(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="500-rule">Regula 500</option>
            <option value="weight-based">Bazată pe greutate</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Doza Zilnică Totală de Insulină (unități)
          </label>
          <input
            type="number"
            value={totalDailyDose}
            onChange={(e) => setTotalDailyDose(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Introduceți TDD"
            required
          />
        </div>

        {calculationMethod === 'weight-based' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Greutate (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Introduceți greutatea"
              required
            />
          </div>
        )}

        <button
          onClick={calculateICR}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Calculează ICR
        </button>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md">
            {error}
          </div>
        )}

        {result !== null && !error && (
          <div className="bg-green-50 text-green-700 p-3 rounded-md text-center font-semibold">
            ICR: {result} grame de carbohidrați per unitate de insulină
          </div>
        )}
        
        <div className="text-sm text-gray-500 mt-2">
          {calculationMethod === '500-rule' ? (
            <p>Formula: 500 ÷ TDD (regula 500)</p>
          ) : (
            <p>Formula: (Greutate × 0.3 + 450) ÷ TDD</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ICRCalculator;