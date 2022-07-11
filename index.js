const electron = require('electron');
//require('electron-reload')(__dirname);

const { app, BrowserWindow, Menu } = electron;
let mainWindow;
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    icon:'icon.png',
    webPreferences: {
      nodeIntegration: false
    }
  });
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  const menu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(menu);
});

const mainMenuTemplate = [
  {
    label: 'Devtool',
    accelerator: 'Ctrl+D',
    click() {
      mainWindow.webContents.openDevTools();
    }
  },
  {
    label: 'Reload',
    accelerator: 'Ctrl+R',
    click() {
      mainWindow.reload();
    }
  }
];
