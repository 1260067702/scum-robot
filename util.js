/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-11-13 07:45:25
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-16 20:01:20
 * @FilePath: \electron-sample\util.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { clipboard } = require("electron")
const axios = require("axios")
const iconv = require("iconv-lite")
const { exec } = require("child_process");
// const { mouse, screen, straightTo, centerOf, Region, imageResource, sleep } = require("@nut-tree/nut-js");
const { Button, jestMatchers, mouse, screen, straightTo,
    centerOf, randomPointIn, Region, Point, right, down,
    left, up, imageResource, sleep, Key, keyboard, pixelWithColor,
    RGBA } = require("@nut-tree/nut-js");
require("@nut-tree/template-matcher");
const path = require("path");
const fs = require("fs")

let url = "http://robot.if9.cc:5786"
// let url = "http://10.0.0.18:5786"
screen.config.resourceDirectory = `./`

module.exports.net = (config) => {
    config['url'] = url + config['url']
    return new Promise(resolve => {
        axios(config).then(({ data }) => {
            // console.log(data);
            resolve(data)
        })
    })
}

module.exports.moveTo = async (x, y) => {
    await mouse.move(straightTo(new Point(x, y)));
}

module.exports.moveToCenter = async (left = 0, top = 0, width = 10, height = 10) => {
    await mouse.move(straightTo(centerOf(new Region(left, top, width, height))));
}

module.exports.mouseClick = async (click) => {
    switch (click) {
        case "left":
            await mouse.leftClick()
            break
        case "right":
            await mouse.leftClick()
            break
        case "double":
            await mouse.leftClick()
            await mouse.leftClick()
            break
        default:

            return "参数错误"
    }
    await mouse.leftClick()
}

module.exports.board = async (data, t) => {
    if ((typeof data) == "string") {
        await wait(t)
        await keyboard.pressKey(eval(`Key.${data}`));
        await wait(t)
        await keyboard.releaseKey(eval(`Key.${data}`));
        return
    }
    let keys = []
    for (const s of data) {
        keys.push(eval(`Key.${s}`))
    }
    if (data.length > 0) {
        console.log(keys);
        await wait(t)
        await keyboard.pressKey(...keys);
        await wait(t)
        await keyboard.releaseKey(...keys);
    }
}

module.exports.clip = async (data, t) => {
    clipboard.writeText(data)
    await wait(t)
    await keyboard.pressKey(Key.LeftControl, Key.V)
    await wait(t)
    await keyboard.releaseKey(Key.LeftControl, Key.V)
}

module.exports.screenWindow = async () => {
    let url = await screen.capture("screenshot.png");
    console.log(url);
    let base64 = fs.readFileSync(url).toString("base64")
    return base64
}


module.exports.findImgPos = async (imagePath) => {
    let img = await imageResource(imagePath)
    console.log("图片", img);
    let pos = null
    try {
        pos = await screen.find(img);
        console.log("位置", pos);
        await mouse.move(straightTo(centerOf(pos)));
        // await mouse.leftClick();
    } catch (error) {
        console.log("没有找到图片");
    }
    return pos
}

async function wait(t) {
    console.log(t);
    return new Promise(resolve => {
        setTimeout(() => resolve(), t * 1000)
    })
}

module.exports.down = async function (url, path) {
    console.log(url, path);
    let writer = fs.createWriteStream(path);//创建一个写入流
    const response = await axios({
        url: url, //要下载的文件的url
        method: "GET",
        responseType: "stream",
    });
    response.data.pipe(writer);
}