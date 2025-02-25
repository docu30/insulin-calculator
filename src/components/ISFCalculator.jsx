// src/components/ISFCalculator.jsx
import React, { useState } from 'react';

const ISFCalculator = () => {
  const [totalDailyDose, setTotalDailyDose] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculateISF = () => {
    try {
      const tdd = parseFloat(totalDailyDose);
      
      if (isNaN(tdd) || tdd <= 0) {
        throw new Error('Introduceți o valoare validă și pozitivă pentru doza zilnică totală.');
      }

      // Formula populară pentru calcul ISF: 1800 / TDD (regula 1800)
      const isf = Math.round(1800 / tdd);
      setResult(isf);
      setError('');
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-xl font-bold text-center mb-4">Calculator ISF</h2>
      <p className="text-sm text-gray-600 mb-4">
        Calculează Factorul de Sensibilitate la Insulină (ISF) pe baza Dozei Zilnice Totale (TDD).
      </p>
      
      <div className="space-y-4">
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

        <button
          onClick={calculateISF}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Calculează ISF
        </button>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md">
            {error}
          </div>
        )}

        {result !== null && !error && (
          <div className="bg-green-50 text-green-700 p-3 rounded-md text-center font-semibold">
            ISF: {result} mg/dL per unitate de insulină
          </div>
        )}
        
        <div className="text-sm text-gray-500 mt-2">
          <p>Formula: 1800 ÷ TDD (regula 1800)</p>
          <p>Exemplu: Pentru o doză zilnică totală de 25 unități, ISF = 1800 ÷ 25 = 72 mg/dL per unitate</p>
        </div>
      </div>
    </div>
  );
};

export default ISFCalculator;