import { app, BrowserWindow } from 'electron'
import { fileURLToPath } from 'url'
import path from 'path'

// Définir __filename et __dirname avec fileURLToPath pour les modules ES
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Fonction de création de fenêtre
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Isolation du contexte de rendu pour la sécurité
      contextIsolation: true,
      // Désactiver l'intégration Node.js pour la sécurité
      nodeIntegration: false
    }
  })

  // Charger l'application en mode production
  const startUrl = path.join(__dirname, 'dist/index.html')

  // Vérifiez si le fichier HTML existe, pour éviter des erreurs
  win.loadFile(startUrl).catch((err) => {
    console.error("Erreur lors du chargement de l'application :", err)
  })
}

// Événements Electron
app.on('ready', createWindow)

// Fermer l'application quand toutes les fenêtres sont fermées (sauf sur macOS)
app.on('window-all-closed', () => {
  // eslint-disable-next-line no-undef
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Re-créer une fenêtre quand l'icône est cliquée (comportement macOS)
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
