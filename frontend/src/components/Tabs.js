// Tabs.js
import React from 'react';

function Tabs({ selectedTab, onTabChange }) {
  return (
    <div className="tabs">
      <button
        className={selectedTab === 'nowPlaying' ? 'active-tab' : ''}
        onClick={() => onTabChange('nowPlaying')}
      >
        Now Playing
      </button>
      <button
        className={selectedTab === 'upcoming' ? 'active-tab' : ''}
        onClick={() => onTabChange('upcoming')}
      >
        Upcoming
      </button>
    </div>
  );
}

export default Tabs;
