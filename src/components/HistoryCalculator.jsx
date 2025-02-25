// src/components/HistoryCalculator.jsx
import React, { useState, useEffect } from 'react';
import StorageService from '../services/StorageService';

const HistoryCalculator = () => {
  const [history, setHistory] = useState([]);
  const [confirmClear, setConfirmClear] = useState(false);

  // Încarcă istoricul la inițializare
  useEffect(() => {
    loadHistory();
  }, []);

  // Încarcă istoricul din localStorage
  const loadHistory = () => {
    const calculationHistory = StorageService.getCalculationHistory();
    setHistory(calculationHistory);
  };

  // Șterge tot istoricul
  const clearHistory = () => {
    StorageService.clearCalculationHistory();
    setHistory([]);
    setConfirmClear(false);
  };

  // Formatează data pentru afișare
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ro-RO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-center mb-4">Istoric Calcule</h2>
      
      {history.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          Nu există încă nicio intrare în istoric.
        </div>
      ) : (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Ultimele {history.length} calcule
            </p>
            
            {!confirmClear ? (
              <button
                onClick={() => setConfirmClear(true)}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Șterge istoricul
              </button>
            ) : (
              <div className="text-sm flex items-center space-x-2">
                <span className="text-red-600">Sigur?</span>
                <button 
                  onClick={clearHistory}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Da
                </button>
                <button 
                  onClick={() => setConfirmClear(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Nu
                </button>
              </div>
            )}
          </div>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {history.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-md p-3 text-sm">
                <div className="flex justify-between text-gray-500 text-xs mb-2">
                  <span>#{history.length - index}</span>
                  <span>{formatDate(item.timestamp)}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <div>Glicemie: <span className="font-medium">{item.glycemia} mg/dL</span></div>
                  <div>Țintă: <span className="font-medium">{item.targetGlycemia} mg/dL</span></div>
                  <div>ISF: <span className="font-medium">{item.isf} mg/dL/u</span></div>
                  <div>ICR: <span className="font-medium">{item.icr} g/u</span></div>
                  
                  {item.isEating && (
                    <div>Carbohidrați: <span className="font-medium">{item.carbs} g</span></div>
                  )}
                  
                  <div>Doză corecție: <span className="font-medium">{item.correctionDose} u</span></div>
                  
                  {item.isEating && (
                    <div>Doză carbohidrați: <span className="font-medium">{item.carbDose} u</span></div>
                  )}
                </div>
                
                <div className="mt-2 text-center font-medium text-blue-600">
                  Doză totală: {item.totalDose} unități
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryCalculator;