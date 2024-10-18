const { app, BrowserWindow } = require('electron')

function createWindow() {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    fullscreen: true, // Start the app in full-screen mode
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadURL(process.env.WEBPACK_DEV_SERVER_URL || `file://${__dirname}/index.html`)
}

app.on('ready', createWindow)
