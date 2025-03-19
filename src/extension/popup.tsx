import React from 'react';
import { createRoot } from 'react-dom/client';

const Popup: React.FC = () => {
  const handleStartSelection = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'startSelection' });
        window.close();
      }
    });
  };

  return (
    <div style={{ width: '300px', padding: '16px' }}>
      <h2 style={{ marginTop: 0 }}>PiP Anything</h2>
      <p>Click the button below to start selecting an element to display in Picture-in-Picture mode.</p>
      <button
        onClick={handleStartSelection}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          width: '100%',
          marginTop: '16px'
        }}
      >
        Select Element
      </button>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<Popup />); 