// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, Tray, dialog } = require('electron')
const path = require('path')

let mainWindow
let isQuiting = false

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  mainWindow.on('close', function (event) {
    if (!isQuiting) {
      event.preventDefault()
      dialog.showMessageBox({
        message: "Close button has been pressed!",
        buttons: ["OK"]
      })
      mainWindow.hide()
    }
  })

  mainWindow.on('minimize', function (event) {
    event.preventDefault()
    mainWindow.hide()
  })

  mainWindow.on('show', function () {
    // Init app
  })

  // Tray notification icon setup
  let iconPath = path.join(__dirname, 'assets/tray-icon/tray-icon-off.png');

  let appIcon = new Tray(iconPath);

  let contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show App', click: function () {
        mainWindow.show()
      }
    },
    {
      label: 'Quit', click: function () {
        isQuiting = true
        app.quit()
      }
    }
  ])

  appIcon.setToolTip('This is my application.');
  appIcon.setContextMenu(contextMenu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
