import React from 'react';

const MinimalApp: React.FC = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f9fafb',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '600px' }}>
        <h1 style={{ 
          color: '#16a34a', 
          fontSize: '3rem', 
          marginBottom: '1rem',
          fontWeight: 'bold'
        }}>
          🌾 Smart Krishi Sahayak
        </h1>
        
        <p style={{ 
          color: '#6b7280', 
          fontSize: '1.2rem', 
          marginBottom: '2rem' 
        }}>
          Agriculture Assistant for Indian Farmers
        </p>
        
        <div style={{ 
          backgroundColor: 'white', 
          padding: '2rem', 
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ color: '#16a34a', marginBottom: '1rem' }}>
            ✅ App is Working!
          </h2>
          <p style={{ color: '#374151', marginBottom: '1rem' }}>
            Smart Krishi Sahayak is successfully loaded and running.
          </p>
          
          <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#f0fdf4', 
              borderRadius: '8px',
              border: '1px solid #16a34a'
            }}>
              <h3 style={{ color: '#16a34a', margin: 0, marginBottom: '0.5rem' }}>
                🌦️ Weather Forecasting
              </h3>
              <p style={{ color: '#15803d', margin: 0, fontSize: '0.9rem' }}>
                Get accurate weather updates for your farming needs
              </p>
            </div>
            
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#f0fdf4', 
              borderRadius: '8px',
              border: '1px solid #16a34a'
            }}>
              <h3 style={{ color: '#16a34a', margin: 0, marginBottom: '0.5rem' }}>
                🌾 Crop Information
              </h3>
              <p style={{ color: '#15803d', margin: 0, fontSize: '0.9rem' }}>
                Learn about different crops, planting times, and best practices
              </p>
            </div>
            
            <div style={{ 
              padding: '1rem', 
              backgroundColor: '#f0fdf4', 
              borderRadius: '8px',
              border: '1px solid #16a34a'
            }}>
              <h3 style={{ color: '#16a34a', margin: 0, marginBottom: '0.5rem' }}>
                🤖 AI Assistant
              </h3>
              <p style={{ color: '#15803d', margin: 0, fontSize: '0.9rem' }}>
                Get intelligent farming advice and solutions
              </p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => window.location.reload()}
          style={{
            backgroundColor: '#16a34a',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Load Full Application →
        </button>
        
        <p style={{ 
          color: '#9ca3af', 
          fontSize: '0.9rem', 
          marginTop: '1rem' 
        }}>
          This is a minimal version to test deployment. The full app will load next.
        </p>
      </div>
    </div>
  );
};

export default MinimalApp;
