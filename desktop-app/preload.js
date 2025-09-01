const { contextBridge, shell } = require('electron');

// Expose APIs to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  openExternal: (url) => shell.openExternal(url),
  platform: process.platform,
  version: process.versions.electron
});

window.addEventListener('DOMContentLoaded', () => {
  console.log('Smart Krishi Sahayak Desktop loaded');
});
