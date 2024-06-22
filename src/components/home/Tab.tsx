import React, { useState } from 'react';
import SafeTab from './SafeTab';
import DangerTab from './DangerTab';

export default function Tab() {
  const [activeTab, setActiveTab] = useState('safe');

  const renderContent = () => {
    switch (activeTab) {
      case 'safe':
        return <SafeTab />;
      case 'danger':
        return <DangerTab />;
      default:
        return <SafeTab />;
    }
  };

  return (
    <div>
      <ul className="nav nav-pills nav-fill">
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link ${activeTab === 'safe' ? 'active' : ''}`}
            onClick={() => setActiveTab('safe')}
          >
            안전지킴이
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className={`nav-link ${activeTab === 'danger' ? 'active' : ''}`}
            onClick={() => setActiveTab('danger')}
          >
            위험지역
          </button>
        </li>
      </ul>
      <div className="tab-content">{renderContent()}</div>
    </div>
  );
}
