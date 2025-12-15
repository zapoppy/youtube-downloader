const { app, BrowserWindow, ipcMain, dialog } = require("electron");

// create window
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    win.loadFile('index.html')
}


app.whenReady().then(() => {
    createWindow()
})

ipcMain.handle("choose-directory", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
    title: "Select a folder to save songs to",
  });

  return result.canceled ? null: result.filePaths[0];
});
