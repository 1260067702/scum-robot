/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-11-13 12:26:10
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-16 19:57:56
 * @FilePath: \electron-sample\router.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const path = require("path");
const { clipboard, globalShortcut } = require("electron")
const { moveTo, moveToCenter, mouseClick, board, clip, screenWindow, findImgPos, down } = require("./util")
const fs = require("fs")
module.exports = { router }

async function router(args, data, callback) {
    // console.log(args, data, callback);
    switch (args) {
        case "TP":
            mainWindow.send("message", "TP", data)
            if (callback) callback("更新模式")
            break
        case "log":
            mainWindow.send("message", "log", data.code)
            if (callback) callback("输出日志")
            break
        case "Mouse":
            // console.log("Mouse");
            sendLog(`鼠标移动${data}`)
            await moveTo(data.code.x, data.code.y)
            if (callback) callback("鼠标移动")
            break
        case "Keyboard":
            // console.log("Keyboard");
            sendLog(`键盘操作${data.code}`)
            await board(data.code, data.wait)
            if (callback) callback("键盘操作")
            break
        case "Clipboard":
            // console.log("Clipboard");
            sendLog(`粘贴${data.code}`)
            await clip(data.code, data.wait)
            if (callback) callback("粘贴")
            break
        case "Screen":
            // console.log("Screen");
            sendLog("截图")
            let base64 = await screenWindow()
            if (callback) callback(base64)
            break
        case "findImage":
            // console.log("findImage");
            let pos = await findImage(data.code)
            sendLog(`屏幕找图${pos}`)
            if (callback) callback(pos)
            break
        case "moveToCenter":
            // console.log("moveToCenter");
            sendLog(`鼠标移动至中心${data.code}`)
            await moveToCenter(...data.code)
            if (callback) callback("鼠标移动至中心")
            break
        case "mouseClick":
            // console.log("mouseClick");
            sendLog(`鼠标按键${data.code}`)
            await mouseClick(data.code)
            if (callback) callback("鼠标按键")
            break
        case "queue":
            // console.log("queue");
            sendLog(`操作队列${JSON.stringify(data.code)}`)
            let queueResult = await queue(data.code, data.wait)
            if (callback) callback(queueResult)
            break
        case "cloudRun":
            sendLog(`云代码`)
            runVm(callback, data.code)
            break
        default:
            sendLog(`错误${data}`)
            if (callback) callback("error")
            break
    }
}

function sendLog(text) {
    mainWindow.send("message", "log", text)
}

async function findImage(base64) {
    // console.log("save", base64);
    console.log(__dirname);
    let imgName = "findImage.png"
    fs.writeFileSync(path.join(`./`, imgName), Buffer.from(base64, "base64"))
    console.log(imgName);
    return findImgPos(imgName)
}


async function queue(queue = [], t = 1) {
    // console.log(this);
    if (!queue) return "队列为空"
    for (const iterator of queue) {
        console.log(iterator);
        iterator["wait"] = t
        await router(iterator.type, iterator)
    }

    return clipboard.readText()
}

const vm = require("vm")
const Sandbox = require("sandbox")
const { keyboard, mouse, screen, imageResource, straightTo, centerOf } = require("@nut-tree/nut-js")
const { AbortController } = require("node-abort-controller");
const axios = require("axios")
async function runVm(callback, script) {
    // console.log(this);
    const sandbox = {
        promise: null,
        module,
        fs,
        screen,
        mainWindow,
        path,
        keyboard,
        __dirname,
        sendLog,
        globalShortcut,
        board,
        setTimeout,
        mouse,
        imageResource,
        AbortController,
        clipboard,
        straightTo,
        centerOf,
        Buffer,
        setInterval,
        down
    }
    vm.createContext(sandbox)
    const code = `func = ${script}; promise = func();`;
    vm.runInNewContext(code, sandbox)
    sandbox.promise.then(data => {

        // console.log(data);
        if(callback) callback(data)
    }).catch(err => {

        if(callback) callback(err)
    })
    // let sandbox = new Sandbox()
    // sandbox.run(script, (output) => {
    //     console.log(output);
    //     callback(output)
    // })

}
