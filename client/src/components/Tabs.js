// src/components/Tabs.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Metrics from './Metrics';
import CharacterSprite from './CharacterSprite';
import Input from "./Input";
import List from "./List";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeComponent />;
      case "metrics":
        return <Metrics />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="tab-buttons">
        <button onClick={() => setActiveTab("home")}>Home</button>
        <button onClick={() => setActiveTab("metrics")}>Metrics</button>
      </div>
      <div className="tab-content">
        {renderContent()}
      </div>
    </div>
  );
};

const HomeComponent = () => (
  <div>
    <h1>Home Page</h1>
    <div className="container">
                <CharacterSprite />
                <Input />
                <List />
    </div>
  </div>
);

export default Tabs;
