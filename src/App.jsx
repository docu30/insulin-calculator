// src/App.jsx
import React, { useState } from 'react';
import InsulinCalculator from './components/InsulinCalculator';
import ISFCalculator from './components/ISFCalculator';
import ICRCalculator from './components/ICRCalculator';

function App() {
  const [activeTab, setActiveTab] = useState('calculator');

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Management Diabet</h1>
      
      {/* Tab Navigation */}
      <div className="max-w-md mx-auto mb-6 flex border-b border-gray-200">
        <button 
          className={`py-2 px-4 font-medium ${activeTab === 'calculator' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
          onClick={() => setActiveTab('calculator')}
        >
          Doză Insulină
        </button>
        <button 
          className={`py-2 px-4 font-medium ${activeTab === 'isf' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
          onClick={() => setActiveTab('isf')}
        >
          Calculator ISF
        </button>
        <button 
          className={`py-2 px-4 font-medium ${activeTab === 'icr' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`}
          onClick={() => setActiveTab('icr')}
        >
          Calculator ICR
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="max-w-md mx-auto">
        {activeTab === 'calculator' && <InsulinCalculator />}
        {activeTab === 'isf' && <ISFCalculator />}
        {activeTab === 'icr' && <ICRCalculator />}
      </div>
      
      <div className="max-w-md mx-auto mt-8 text-center text-sm text-gray-500">
        <p>Această aplicație este destinată doar ca instrument de ajutor. Consultați întotdeauna medicul pentru ajustări în tratamentul dumneavoastră.</p>
      </div>
    </div>
  );
}

export default App;