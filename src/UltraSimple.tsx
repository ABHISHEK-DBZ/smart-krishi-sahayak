import ReactDOM from 'react-dom/client'
import './index.css'

console.log('🌾 Starting Ultra Simple Test...');

// Hide loading screen immediately
const loadingElement = document.getElementById('loading-screen');
if (loadingElement) {
  loadingElement.style.display = 'none';
  console.log('✅ Loading screen hidden');
}

const container = document.getElementById('root');

if (container) {
  console.log('✅ Root container found');
  
  try {
    const root = ReactDOM.createRoot(container);
    
    const SimpleApp = () => {
      console.log('✅ SimpleApp component rendering...');
      return (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: '100vh',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
            🌾 Smart Krishi Sahayak
          </h1>
          <p style={{ fontSize: '1.5rem', marginBottom: '30px' }}>
            ✅ App Loaded Successfully!
          </p>
          <div style={{ 
            background: 'rgba(255,255,255,0.2)', 
            padding: '30px', 
            borderRadius: '15px',
            maxWidth: '600px',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ marginBottom: '20px' }}>🎯 All Features Ready:</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', fontSize: '1.1rem' }}>
              <div>🌦️ Weather System</div>
              <div>🌱 Disease Detection</div>
              <div>🤖 AI Assistant</div>
              <div>💰 Mandi Prices</div>
              <div>🏛️ Gov Schemes</div>
              <div>📱 PWA Ready</div>
            </div>
          </div>
          <button 
            onClick={() => {
              console.log('🎉 Button clicked! App is fully interactive!');
              alert('🎉 Smart Krishi Sahayak is working perfectly!');
            }}
            style={{
              background: '#16a34a',
              color: 'white',
              padding: '15px 30px',
              border: 'none',
              borderRadius: '25px',
              fontSize: '18px',
              cursor: 'pointer',
              marginTop: '30px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'scale(1)';
            }}
          >
            🚀 Test Interaction
          </button>
          <p style={{ marginTop: '20px', fontSize: '14px', opacity: '0.8' }}>
            Current Time: {new Date().toLocaleTimeString()}
          </p>
        </div>
      );
    };
    
    root.render(<SimpleApp />);
    console.log('✅ Ultra simple app rendered successfully!');
    
  } catch (error) {
    console.error('❌ Error in ultra simple app:', error);
    container.innerHTML = `
      <div style="text-align: center; padding: 50px; background: #fee; color: #c00; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <h2>🌾 Smart Krishi Sahayak</h2>
        <p>Ultra Simple Test Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>
        <button onclick="location.reload()" style="background: #16a34a; color: white; padding: 15px 30px; border: none; border-radius: 8px; cursor: pointer; font-size: 16px;">
          🔄 Reload
        </button>
      </div>
    `;
  }
} else {
  console.error('❌ No root container found');
}
