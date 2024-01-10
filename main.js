// Import required modules from Electron
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Declare a variable to store the main window
let mainWindow;

// Function to create the main application window
function createWindow() {
    console.log(`Electron version: ${process.versions.electron}`);

    // Create a new BrowserWindow with specified properties
    mainWindow = new BrowserWindow({
        width: 1160,
        height: 720,
        frame: false, // Remove window frame
        webPreferences: {
            nodeIntegration: true, // Enable Node.js integration
            contextIsolation: false,
        }
    });

    // Load the HTML file for the main window
    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    // Event handler for when the main window is closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Event listener for when the app is ready
app.on('ready', createWindow);

// Event listener for when all windows are closed
app.on('window-all-closed', function() {
    // Quit the app on all platforms except macOS (darwin)
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Event listener for when the app is activated (e.g., clicking on the dock icon)
app.on('activate', function() {
    if (mainWindow === null) {
        createWindow();
    }
});

// Event listeners for IPC (Inter-Process Communication) messages
ipcMain.on('window-minimize', () => {
    mainWindow.minimize(); // Minimize the main window
});

ipcMain.on('window-maximize', () => {
    if (mainWindow.isMaximized()) {
        mainWindow.unmaximize(); // Unmaximize the main window if it's already maximized
    } else {
        mainWindow.maximize(); // Maximize the main window if it's not already maximized
    }
});

ipcMain.on('window-close', () => {
    mainWindow.close(); // Close the main window
});
