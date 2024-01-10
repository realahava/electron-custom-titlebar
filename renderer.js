// Import ipcRenderer from Electron
const { ipcRenderer } = require('electron');

// Event listener for the minimize button
document.getElementById('mini-button').addEventListener('click', () => {
    ipcRenderer.send('window-minimize'); // Send 'window-minimize' message
});

// Event listener for the maximize button
document.getElementById('max-button').addEventListener('click', () => {
    ipcRenderer.send('window-maximize'); // Send 'window-maximize' message
});

// Event listener for the close button
document.getElementById('close-button').addEventListener('click', () => {
    ipcRenderer.send('window-close'); // Send 'window-close' message
});
