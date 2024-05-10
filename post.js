module.exports.init = async () => {
    maindata = await utils.net({
        url: "/config",
        method: "get"
    })
    console.log(maindata);

    mainWindow.setTitle(maindata.title)
    // console.log(menu);
    // setTimeout(() => mainWindow.send("message", "test", { text: "aaa" }), 10000)
}

const { ipcMain, BrowserWindow, clipboard, dialog } = require('electron')
const { io } = require("socket.io-client")


const utils = require("./util")