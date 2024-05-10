/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-11-11 18:20:23
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-16 17:44:34
 * @FilePath: \electron-sample\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
try {
    require('electron-reloader')(module, {});
} catch (_) { }

const { app, ipcMain, BrowserWindow, Menu, Notification, Tray, dialog } = require('electron')

const path = require('path')
global.app = app
global.mainWindow = null
global.tray = null
global.menu = null


function createWindow() {
   

    mainWindow = new BrowserWindow({
        // width: 400,
        // height: 600,
        width: 400,
        height: 1000,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        },
        // resizable: false,
        title: "Z0机器人",
        icon: path.join(__dirname, "./image/icon.png")
    })

    menu = Menu.setApplicationMenu(Menu.buildFromTemplate([{
        label: "关于",
        click() {
            console.log("关于");
            // new Notification({
            //     title: "关于",
            //     body: "QQ:1260067702"
            // }).show()
            dialog.showMessageBox({
                title: "关于",
                message: "QQ:1260067702"
            })
        }
    }
    ]))

    mainWindow.loadFile(path.join(__dirname, "index.html"))

    // 最大化窗口
    // mainWindow.maximize();

    // 打开开发者工具
    mainWindow.webContents.openDevTools()

    mainWindow.on('close', (event) => {
        // 截获 close 默认行为
        event.preventDefault();
        // 点击关闭时触发close事件，我们按照之前的思路在关闭时，隐藏窗口，隐藏任务栏窗口
        mainWindow.hide();
        mainWindow.setSkipTaskbar(true);

    });

    // 新建托盘
    tray = new Tray(path.join(__dirname, "./image/icon.png"));

    // 托盘名称
    tray.setToolTip('机器人');

    // 托盘菜单
    const contextMenu = Menu.buildFromTemplate([{
        label: '打开窗口',
        click: () => {
            mainWindow.show()
        }
    },
    {
        label: '退出',
        click: () => {
            mainWindow.destroy()
            app.quit()
        }
    }
    ]);
    // 载入托盘菜单
    tray.setContextMenu(contextMenu);
    // 双击触发
    tray.on('double-click', () => {
        // 双击通知区图标实现应用的显示或隐藏
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
        mainWindow.isVisible() ? mainWindow.setSkipTaskbar(false) : mainWindow.setSkipTaskbar(true);
    });
}


app.whenReady().then(() => {
    // setTimeout(() => process.exit(1), 15000);
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
    // require("./clientSocket").init()
    require("./post").init()
})

ipcMain.on("main", (event, args) => {
    if (args === "quit") {
        // app.quit();
    }
});

app.on("close", () => {
    // 截获 close 默认行为
    event.preventDefault();
    // 点击关闭时触发close事件，我们按照之前的思路在关闭时，隐藏窗口，隐藏任务栏窗口
    win.hide();
    win.setSkipTaskbar(true);
})

app.on('window-all-closed', function () {
    console.log("Bye!");
    if (process.platform !== 'darwin') {
        // app.quit()

    }
})

app.on('will-quit', () => {
    // hotkey.unregisterGlobalShortcut('`')
})

app.on("ready", () => {
    console.log("界面加载完成");
})
