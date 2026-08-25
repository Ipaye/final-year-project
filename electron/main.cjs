const { app, BrowserWindow, session } = require('electron');
const path = require('node:path');

const isDev = process.env.NODE_ENV === 'development';

let mainWindow;

function createMainWindow() {
  const window = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 960,
    minHeight: 640,
    backgroundColor: '#faf9f6',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  if (isDev) {
    window.loadURL('http://localhost:5173');
    window.webContents.openDevTools({ mode: 'detach' });
  } else {
    window.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
  }

  window.on('closed', () => {
    mainWindow = null;
  });

  return window;
}

app.whenReady().then(() => {
  // Speeco needs the microphone — grant it without prompting through a
  // custom Electron dialog; macOS/Windows still show their own native
  // mic-access prompt on first use.
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    callback(permission === 'media');
  });

  mainWindow = createMainWindow();

  app.on('activate', () => {
    if (mainWindow === null) mainWindow = createMainWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
