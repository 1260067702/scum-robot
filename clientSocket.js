const { ipcMain, BrowserWindow, clipboard, dialog } = require('electron')
const { io } = require("socket.io-client")


const utils = require("./util")

global.socket = null
let maindata = {}
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


ipcMain.on("service", (event, args, data) => {
    // console.log(args, data);
    switch (args) {
        case "loaded":
            event.reply("message", 'main', maindata)
            break
        case "connect":
            console.log("连接服务器", data);
            if (maindata.ws && data) {
                socket = io(maindata.ws, {
                    reconnectionDelayMax: 10000,
                    autoConnect: false,
                    maxhttpbuffersize: 1024 * 1024,
                    auth: {
                        token: data
                    },
                    perMessageDeflate: {
                        threshold: 2048, // defaults to 1024

                        zlibDeflateOptions: {
                            chunkSize: 8 * 1024, // defaults to 16 * 1024
                        },

                        zlibInflateOptions: {
                            windowBits: 14, // defaults to 15
                            memLevel: 7, // defaults to 8
                        },

                        clientNoContextTakeover: true, // defaults to negotiated value.
                        serverNoContextTakeover: true, // defaults to negotiated value.
                        serverMaxWindowBits: 10, // defaults to negotiated value.

                        concurrencyLimit: 20, // defaults to 10
                    }
                })
                connect(data)
            } else {
                dialog.showErrorBox("错误", "连接服务器失败，请检查网络")
            }
            break
    }
})




function connect(token) {
    socket.connect()
    socket.on("connection", (e) => {
        // console.log(e);
    })
    socket.on("disconnect", (e) => {
        console.log("连接被断开404");
        console.log(e);
        // socket.disconnect()
        // socket = null
        mainWindow.send("message", "status", "连接失败")
    })

    socket.on("system", (args, data) => {
        // console.log(args, data);
        switch (args) {
            case "connect":
                mainWindow.send("message", "status", data)
                break
        }
    })
    socket.on(token, require("./router").router)
    socket.on("close", () => {
        console.log("服务端关闭连接");
    })
    socket.on("error", () => {
        console.log("错误");
    })
    socket.on("reconnect", () => {
        console.log("重连事件11111111");
    })
}



