// src/components/InsulinCalculator.jsx
import React, { useState } from 'react';

const InsulinCalculator = () => {
  const [glycemia, setGlycemia] = useState('');
  const [targetGlycemia, setTargetGlycemia] = useState('');
  const [isEating, setIsEating] = useState(false);
  const [carbs, setCarbs] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  
  // Noi state-uri pentru valorile personalizate
  const [useCustomValues, setUseCustomValues] = useState(false);
  const [customISF, setCustomISF] = useState('72');
  const [customICR, setCustomICR] = useState('20');

  // Valori pre-calculate
  const DEFAULT_ISF = 72; // Insulin Sensitivity Factor (mg/dL per unit)
  const DEFAULT_ICR = 20; // Insulin to Carb Ratio (grams per unit)

  const calculateInsulinDose = () => {
    try {
      const currentGlycemia = parseFloat(glycemia);
      const targetGlycemiaValue = parseFloat(targetGlycemia);
      
      if (isNaN(currentGlycemia) || isNaN(targetGlycemiaValue)) {
        throw new Error('Vă rugăm introduceți valori numerice valide.');
      }

      // Folosește valorile personalizate dacă checkbox-ul este bifat
      const isf = useCustomValues ? parseFloat(customISF) : DEFAULT_ISF;
      const icr = useCustomValues ? parseFloat(customICR) : DEFAULT_ICR;
      
      if (isNaN(isf) || isf <= 0 || (useCustomValues && (isNaN(icr) || icr <= 0))) {
        throw new Error('Valorile personalizate pentru ISF și ICR trebuie să fie numere pozitive.');
      }

      // Calcularea dozei de corecție
      const correctionDose = Math.max(0, (currentGlycemia - targetGlycemiaValue) / isf);
      
      // Calcularea dozei pentru carbohidrați dacă este cazul
      let carbDose = 0;
      if (isEating) {
        const carbsValue = parseFloat(carbs);
        if (isNaN(carbsValue)) {
          throw new Error('Vă rugăm introduceți o cantitate validă de carbohidrați.');
        }
        carbDose = carbsValue / icr;
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
      <h2 className="text-xl font-bold text-center mb-4">Calculator Doză Insulină</h2>
      
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

        {/* Secțiune pentru valori personalizate */}
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex items-center mb-3">
            <input
              type="checkbox"
              checked={useCustomValues}
              onChange={(e) => setUseCustomValues(e.target.checked)}
              id="useCustomValues"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="useCustomValues" className="ml-2 block text-sm text-gray-900 font-medium">
              Folosește valori personalizate pentru ISF și ICR
            </label>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ISF (mg/dL per unitate)
              </label>
              <input
                type="number"
                value={useCustomValues ? customISF : DEFAULT_ISF}
                onChange={(e) => setCustomISF(e.target.value)}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${useCustomValues ? 'bg-white focus:border-blue-500 focus:ring-blue-500' : 'bg-gray-100'}`}
                disabled={!useCustomValues}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ICR (grame per unitate)
              </label>
              <input
                type="number"
                value={useCustomValues ? customICR : DEFAULT_ICR}
                onChange={(e) => setCustomICR(e.target.value)}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm ${useCustomValues ? 'bg-white focus:border-blue-500 focus:ring-blue-500' : 'bg-gray-100'}`}
                disabled={!useCustomValues}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isEating}
            onChange={(e) => setIsEating(e.target.checked)}
            id="isEating"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isEating" className="ml-2 block text-sm text-gray-900">
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
          <p className="italic mb-1">Valorile folosite pentru calcul:</p>
          <p>ISF: {useCustomValues ? customISF : DEFAULT_ISF} mg/dL per unitate</p>
          <p>ICR: {useCustomValues ? customICR : DEFAULT_ICR} grame per unitate</p>
          <p className="mt-2 text-xs">Notă: Calculați valorile personalizate în tab-urile ISF și ICR</p>
        </div>
      </div>
    </div>
  );
};

export default InsulinCalculator;