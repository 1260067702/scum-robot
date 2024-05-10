/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-11-14 15:17:07
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-17 14:15:36
 * @FilePath: \electron-sample\test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/* const { Button, jestMatchers, mouse, screen, straightTo,
    centerOf, randomPointIn, Region, Point, right, down,
    left, up, imageResource, sleep, Key, keyboard, pixelWithColor,
    RGBA } = require("@nut-tree/nut-js");
require("@nut-tree/template-matcher"); */
const fs = require("fs")
/* (async () => {
    screen.config.resourceDirectory = `${__dirname}/assets`
    console.log(screen);
    // await mouse.move(straightTo(centerOf(new Region(0, 0, 200, 400))));
    // let pos = await screen.waitFor(imageResource("quit.png"), 10000)
    let img = await imageResource("1.png")
    console.log("图片", img);
    let pos = null
    try {
        pos = await screen.find(img);
        console.log("位置", pos);
        // await mouse.move(straightTo(centerOf(pos)));
        // await mouse.leftClick();
    } catch (error) {
        console.log("没有找到图片");
    }
})(); */


// console.log(fs.readFileSync("./assets/tool.png").toString("base64"));

//  keyboard.releaseKey(Key.LeftShift);
// if(!fs.existsSync(`${__dirname}/assets`)){
//     fs.mkdirSync(`${__dirname}/assets`)
// }

// console.log();
var axios = require('axios');
var data = JSON.stringify({
   "type": "cloudRun",
   "code":fs.readFileSync("vm_test.js").toString()
});

var config = {
   method: 'post',
   url: 'http://10.0.0.9:5786/api/message?selkey=111',
   headers: { 
      'User-Agent': 'Apifox/1.0.0 (https://apifox.com)', 
      'Content-Type': 'application/json'
   },
   data : data
};

axios(config)
.then(function (response) {
   console.log(response.data);
   if(response.data.data&&response.data.data[0].type=="Buffer"){
    fs.writeFileSync("./assets/img.png",Buffer.from(response.data.data[0]))
   }
})
.catch(function (error) {
   console.log(error);
});
