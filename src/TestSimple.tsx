import React from 'react';

const TestSimple: React.FC = () => {
  console.log('TestSimple component loaded');
  
  return (
    <div style={{
      padding: '20px',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      background: '#f0f8ff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ color: '#16a34a', marginBottom: '20px' }}>
        🌾 Smart Krishi Sahayak
      </h1>
      <p style={{ color: '#333', fontSize: '18px', marginBottom: '20px' }}>
        App loaded successfully! ✅
      </p>
      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        maxWidth: '500px'
      }}>
        <h3 style={{ color: '#16a34a' }}>Features Available:</h3>
        <ul style={{ textAlign: 'left', color: '#555' }}>
          <li>🌦️ Weather Forecasting</li>
          <li>🌱 Plant Disease Detection</li>
          <li>🤖 AI Agriculture Assistant</li>
          <li>💰 Mandi Price Tracking</li>
          <li>🏛️ Government Schemes</li>
        </ul>
      </div>
      <button 
        onClick={() => console.log('Button clicked!')}
        style={{
          background: '#16a34a',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Test Button
      </button>
    </div>
  );
};

export default TestSimple;
