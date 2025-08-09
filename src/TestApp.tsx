import React from 'react';

const TestApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-800 mb-4">Smart Krishi Sahayak</h1>
        <p className="text-green-600">App is working! 🌾</p>
        <div className="mt-8">
          <a 
            href="/smart-krishi-sahayak/" 
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default TestApp;
