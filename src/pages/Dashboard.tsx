import React from 'react';
import Navbar from '../components/Navbar';
import AiAgent from './AiAgent';
import LiveWeather from './LiveWeather';
import LiveMarketPrices from './LiveMarketPrices';
import Profile from './Profile';

const Dashboard: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="space-y-6 lg:space-y-10 p-3 lg:p-6 min-h-screen animate-fade-in-scale">
        {/* Main dashboard content can be restored here if needed */}
      </div>
      <div className="mt-8">
        <AiAgent />
      </div>
      <div className="mt-8">
        <LiveWeather />
      </div>
      <div className="mt-8">
        <LiveMarketPrices />
      </div>
      <div className="mt-8">
        <Profile />
      </div>
    </>
  );
};

export default Dashboard;
