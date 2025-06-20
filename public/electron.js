const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

function createWindow() {
  // Stwórz okno przeglądarki
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true
    },
    icon: path.join(__dirname, 'icon.png'),
    show: false,
    titleBarStyle: 'default'
  });


  // Załaduj aplikację
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    // Otwórz Devtools
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Pokaż okno gdy bedzie gotowe
  mainWindow.once('ready-to-show', () => {
      mainWindow.show();
  });

  // Obsługa linkow zewnętrznych
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  return mainWindow;
}

// Stwórz menu aplikacji
function createMenu() {
  const template = [
    {
      label: 'Plik',
      submenu: [
        {
          label: 'Nowe zadanie',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            // Wyślij event do renderera
            BrowserWindow.getFocusedWindow()?.webContents.send('new-task');
          }
        },

        { type: 'separator' },
        {
          label: 'Zamknij',
          accelerator: process.platform === 'darwin' ? 'Cmd+W' : 'Ctrl+W',
          click: () => {
            BrowserWindow.getFocusedWindow()?.close();
          }
        },
        {
          label: 'Zakończ',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Edycja',
      submenu: [
        { label: 'Cofnij', accelerator: 'CmdOrCtrl+Z',        role: 'undo' },
        { label: 'Ponów',  accelerator: 'Shift+CmdOrCtrl+Z',  role: 'redo' },
        { type: 'separator' },
        { label: 'Wytnij', accelerator: 'CmdOrCtrl+X', role: 'cut' },
        { label: 'Kopiuj', accelerator: 'CmdOrCtrl+C', role: 'copy' },
        { label: 'Wklej', accelerator: 'CmdOrCtrl+V', role: 'paste' },
        { label: 'Zaznacz wszystko', accelerator: 'CmdOrCtrl+A', role: 'selectall' }
      ]
    },
    {
      label: 'Widok',
      submenu: [
        { label: 'Przeładuj', accelerator: 'CmdOrCtrl+R', role: 'reload' },
        { label: 'Wymuś przeładowanie', accelerator: 'CmdOrCtrl+Shift+R', role: 'forceReload' },
        { label: 'Narzędzia deweloperskie', accelerator: 'F12', role: 'toggleDevTools' },
        { type: 'separator' },
        { label: 'Powiększ', accelerator: 'CmdOrCtrl+Plus', role: 'zoomIn' },
        { label: 'Pomniejsz', accelerator: 'CmdOrCtrl+-', role: 'zoomOut' },
        { label: 'Resetuj zoom', accelerator: 'CmdOrCtrl+0', role: 'resetZoom' },
        { type: 'separator' },
        { label: 'Pełny ekran', accelerator: 'F11', role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Okno',
      submenu: [
        { label: 'Minimalizuj', accelerator: 'CmdOrCtrl+M', role: 'minimize' },
        { label: 'Zamknij', accelerator: 'CmdOrCtrl+W', role: 'close' }
      ]
    },
    {
      label: 'Pomoc',
      submenu: [
        {
          label: 'O aplikacji',
          click: () => {
            const aboutWindow = new BrowserWindow({
              width: 400,
              height: 300,
              resizable: false,
              minimizable: false,
              maximizable: false,
              webPreferences: {
                nodeIntegration: false,
                contextIsolation: true
              }
            });
            
            aboutWindow.load(`data:text/html;charset=utf-8,
              <html>
                <head>
                  <title>O aplikacji</title>
                  <style>
                    body { 
                      font-family: Arial, sans-serif; 
                      text-align: center; 
                      padding: 50px; 
                      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                      color: white;
                      margin: 0;
                    }
                    h1 { color: #fff; margin-bottom: 20px; }
                    p { margin: 10px 0; }
                  </style>
                </head>
                <body>
                  <h1>Menedżer Zadań</h1>
                  <p><strong>Wersja:</strong> 1.0.0</p>
                  <p><strong>Technologie:</strong> React + Electron</p>
                  <p><strong>Autor:</strong> Przemysław Dąbrowski </p>
                </body>
              </html>
            `);
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// Event listeners
app.whenReady().then(() => {
  createWindow();
  createMenu();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Zabezpieczenia
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
    shell.openExternal(navigationUrl);
  });
});