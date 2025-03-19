// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('PiP Anything extension installed');
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'pipStarted') {
    console.log('PiP mode started');
  }
}); 