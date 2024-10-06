// src/components/Tabs.js
import React, { useState, Fragment } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Metrics from './Metrics';
import HomeComponent from './HomeComponent';
import Leaderboard from './Leaderboard';


const Tabs = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeComponent />;
      case "metrics":
        return <Metrics />;
      case "leaderboard":
        return <Leaderboard />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-start">
        <div className="tab-buttons">
          <button onClick={() => setActiveTab("home")}>Home</button>
          <button onClick={() => setActiveTab("metrics")}>Metrics</button>
          <button onClick={() => setActiveTab("leaderboard")}>Leaderboard</button>
        </div>
      </div>
      <div>
        <div className="d-flex justify-content-center">
          <div className="tab-content">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};


export default Tabs;
