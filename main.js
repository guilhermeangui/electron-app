// require('update-electron-app')()
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

// Tratamento de erros não capturados
process.on('uncaughtException', (error) => {
  console.error('Erro não capturado:', error)
})

const createWindow = () => {
  try {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })

    win.loadFile('index.html').catch(err => {
      console.error('Erro ao carregar index.html:', err)
    })
    
    // Abre o DevTools automaticamente para ver erros (remover em produção)
    // win.webContents.openDevTools()
  } catch (error) {
    console.error('Erro ao criar janela:', error)
  }
}

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
}).catch(error => {
  console.error('Erro no app.whenReady:', error)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})