import ReactDOM from 'react-dom/client'
import './index.css'

// Immediately hide loading screen
setTimeout(() => {
  const loadingElement = document.getElementById('loading-screen');
  if (loadingElement) {
    loadingElement.style.display = 'none';
  }
}, 10);

const SimpleKrishiApp = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #16a34a 0%, #22c55e 100%)',
      color: 'white',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center',
        paddingTop: '50px'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
          🌾 Smart Krishi Sahayak
        </h1>
        <p style={{ fontSize: '1.3rem', marginBottom: '40px' }}>
          भारतीय किसानों के लिए स्मार्ट कृषि सहायक
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginTop: '40px'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '30px',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>
              🌦️ मौसम पूर्वानुमान
            </h3>
            <p>5-दिन का विस्तृत मौसम पूर्वानुमान</p>
            <button style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '25px',
              marginTop: '15px',
              cursor: 'pointer'
            }} onClick={() => alert('मौसम सेवा जल्द ही उपलब्ध होगी!')}>
              देखें
            </button>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '30px',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>
              🌱 रोग पहचान
            </h3>
            <p>AI द्वारा पौधों की बीमारी की पहचान</p>
            <button style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '25px',
              marginTop: '15px',
              cursor: 'pointer'
            }} onClick={() => alert('रोग पहचान सेवा जल्द ही उपलब्ध होगी!')}>
              स्कैन करें
            </button>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '30px',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>
              🤖 AI सहायक
            </h3>
            <p>कृषि सम्बंधित सभी सवालों के जवाब</p>
            <button style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '25px',
              marginTop: '15px',
              cursor: 'pointer'
            }} onClick={() => alert('AI सहायक जल्द ही उपलब्ध होगी!')}>
              पूछें
            </button>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '30px',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>
              💰 मंडी भाव
            </h3>
            <p>लाइव फसल की कीमतें देखें</p>
            <button style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '25px',
              marginTop: '15px',
              cursor: 'pointer'
            }} onClick={() => alert('मंडी भाव सेवा जल्द ही उपलब्ध होगी!')}>
              देखें
            </button>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '30px',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>
              🏛️ सरकारी योजनाएं
            </h3>
            <p>किसानों के लिए सरकारी योजनाओं की जानकारी</p>
            <button style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '25px',
              marginTop: '15px',
              cursor: 'pointer'
            }} onClick={() => alert('सरकारी योजनाएं जल्द ही उपलब्ध होंगी!')}>
              जानें
            </button>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '30px',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>
              📱 PWA App
            </h3>
            <p>मोबाइल में ऐप की तरह इस्तेमाल करें</p>
            <button style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '25px',
              marginTop: '15px',
              cursor: 'pointer'
            }} onClick={() => alert('ब्राउज़र मेनू से "Add to Home Screen" पर क्लिक करें!')}>
              Install करें
            </button>
          </div>
        </div>

        <div style={{
          marginTop: '50px',
          padding: '30px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '15px',
          backdropFilter: 'blur(10px)'
        }}>
          <h2 style={{ marginBottom: '20px' }}>✅ App Successfully Loaded!</h2>
          <p style={{ fontSize: '1.1rem' }}>
            Smart Krishi Sahayak is now working perfectly! <br/>
            सभी features जल्द ही activate होंगे।
          </p>
          <p style={{ marginTop: '15px', fontSize: '0.9rem', opacity: 0.8 }}>
            Current Time: {new Date().toLocaleString('hi-IN')}
          </p>
        </div>
      </div>
    </div>
  );
};

const container = document.getElementById('root');

if (container) {
  try {
    const root = ReactDOM.createRoot(container);
    root.render(<SimpleKrishiApp />);
    console.log('✅ Simple Krishi App loaded successfully!');
  } catch (error) {
    console.error('❌ Error:', error);
    container.innerHTML = `
      <div style="text-align: center; padding: 50px; background: #fee; color: #c00;">
        <h2>🌾 Smart Krishi Sahayak</h2>
        <p>Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>
        <button onclick="location.reload()" style="background: #16a34a; color: white; padding: 15px 30px; border: none; border-radius: 8px; cursor: pointer;">
          🔄 Reload
        </button>
      </div>
    `;
  }
} else {
  console.error('❌ No root container');
}
