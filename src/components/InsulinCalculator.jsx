// src/components/InsulinCalculator.jsx
import React, { useState } from 'react';

const InsulinCalculator = () => {
  const [glycemia, setGlycemia] = useState('');
  const [targetGlycemia, setTargetGlycemia] = useState('');
  const [isEating, setIsEating] = useState(false);
  const [carbs, setCarbs] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // Valori pre-calculate
  const ISF = 72; // Insulin Sensitivity Factor (mg/dL per unit)
  const ICR = 20; // Insulin to Carb Ratio (grams per unit)

  const calculateInsulinDose = () => {
    try {
      const currentGlycemia = parseFloat(glycemia);
      const targetGlycemiaValue = parseFloat(targetGlycemia);
      
      if (isNaN(currentGlycemia) || isNaN(targetGlycemiaValue)) {
        throw new Error('Vă rugăm introduceți valori numerice valide.');
      }

      // Calcularea dozei de corecție
      const correctionDose = Math.max(0, (currentGlycemia - targetGlycemiaValue) / ISF);
      
      // Calcularea dozei pentru carbohidrați dacă este cazul
      let carbDose = 0;
      if (isEating) {
        const carbsValue = parseFloat(carbs);
        if (isNaN(carbsValue)) {
          throw new Error('Vă rugăm introduceți o cantitate validă de carbohidrați.');
        }
        carbDose = carbsValue / ICR;
      }

      const totalDose = parseFloat((correctionDose + carbDose).toFixed(2));
      setResult(totalDose);
      setError('');
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Calculator Doză Insulină</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Glicemie curentă (mg/dL)
          </label>
          <input
            type="number"
            value={glycemia}
            onChange={(e) => setGlycemia(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Introduceți glicemia curentă"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Glicemie țintă (mg/dL)
          </label>
          <input
            type="number"
            value={targetGlycemia}
            onChange={(e) => setTargetGlycemia(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Introduceți glicemia țintă"
            required
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isEating}
            onChange={(e) => setIsEating(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Urmează să mănânc
          </label>
        </div>

        {isEating && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Carbohidrați (grame)
            </label>
            <input
              type="number"
              value={carbs}
              onChange={(e) => setCarbs(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Introduceți cantitatea de carbohidrați"
              required
            />
          </div>
        )}

        <button
          onClick={calculateInsulinDose}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Calculează doza
        </button>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md">
            {error}
          </div>
        )}

        {result !== null && !error && (
          <div className="bg-green-50 text-green-700 p-3 rounded-md text-center font-semibold">
            Doza totală de insulină: {result} unități
          </div>
        )}

        <div className="text-sm text-gray-500 mt-4">
          <p>ISF (Insulin Sensitivity Factor): {ISF} mg/dL per unitate</p>
          <p>ICR (Insulin to Carb Ratio): {ICR} grame per unitate</p>
        </div>
      </div>
    </div>
  );
};

export default InsulinCalculator;