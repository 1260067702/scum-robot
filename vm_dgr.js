

module.exports = async function (ctx) {
    await init()
    screen.config.resourceDirectory = `d:/z0/assets`
    sendLog("欢迎使用打工人脚本")
    sendLog("F10启动脚本F12停止")
    globalShortcut.unregisterAll()

    let f10 = globalShortcut.register("F10", () => start())
    let f11 = globalShortcut.register("F11", () => stop())
    if (!f11) {
        return globalShortcut.isRegistered('registration failed')
    }
    // await keyboard.pressKey(67);wdsawdsawdsawdsa
    // return findPic("zzcl.png", 0.1)
    let url = await screen.capture("screenshot.png");
    return fs.readFileSync(url)

    return globalShortcut.isRegistered('F10')


};


let scum = {
    status: "停止",
    imgs: {
        knife: "dao.png",    //刀
        knife2: "dao2.png",    //刀
        knife3: "dao3.png",    //刀
        scissors: "jd.png",
        scissors2: "jd2.png",
        scissors3: "jd3.png",
        scissors4: "jd4.png",
        cord: "shen.png",    //绳
        cord2: "shen2.png",    //绳
        cord3: "shen3.png",    //绳
        cord4: "shen4.png",    //绳
        cord5: "shen5.png",    //绳
        empty: "empty.png",   //空包
        empty2: "empty2.png",   //空包
        empty3: "empty3.png",   //空包
        empty4: "empty4.png",   //空包
        cloth: "bu.png",   //布
        cloth2: "bu2.png",   //布
        sr: "sr.png",
        bs: "bs.png",
        bs2: "bs2.png",
        cr: "cr.png",
        cr2: "cr2.png",
        tool: "tool.png",
        tool2: "tool2.png",
        crs: "crs.png",
        crs2: "crs2.png",
        crs3: "crs3.png",
        jcsb: "jcsb.png",
        info: "info.png",
        info2: "info2.png",
        jcb: "jcb.png",
        handjd: "handjd.png",
        handjd2: "handjd2.png",
        remove: "remove.png",
        zzcl: "zzcl.png",
        zzcl2: "zzcl2.png",
        shoppingempty: "shoppingempty.png",
        shoppingempty2: "shoppingempty2.png",
        goods: "goods.png",
        goods2: "goods2.png",
        ckkb: "ckkb.png",
        ckkb2: "ckkb2.png",
        ckkb3: "ckkb3.png",
        auto: "auto.png",
        cs: "cs.png",

    },
    path: "d:/Z0"
}

async function init() {
    let url = "http://file.source.0gyx.com:888/script"
    if (!fs.existsSync(scum.path)) {
        fs.mkdirSync(scum.path)
    }
    if (!fs.existsSync(`${scum.path}/assets`)) {
        fs.mkdirSync(`${scum.path}/assets`)
    }
    for (const key in scum.imgs) {
        await down(`${url}/image/${scum.imgs[key]}`, `${scum.path}/assets/${key}.png`)
    }

}
function start() {
    if (scum.status == "停止") {
        scum.status = "运行"
        sendLog("启动")
        run()
    } else {
        sendLog("脚本已在运行中")

    }
}

function stop() {
    if (scum.status == "运行") {
        scum.status = "停止"
        sendLog("已停止")
    } else {
        sendLog("脚本未运行")

    }
}
async function run() {
    sendLog("脚本开始运行")
    // await keyboard.pressKey(2)
    // await keyboard.releaseKey(2)
    // await wait(5)

    do {
        /* 
        检查制作列表
        */
        let maozi = await findPic("cr.png")
        if (maozi != "err") {
            sendLog("可制作物品")
            await spawn(maozi)
            continue
        }
        maozi = await findPic("cr2.png")
        if (maozi != "err") {
            sendLog("可制作物品")
            await spawn(maozi)
            continue
        }
        // 查找刀 
        sendLog("查找刀")
        let knife = await findPic("knife.png")
        if (knife == "err") {
            knife = await findPic("knife2.png")
            if (knife == "err") {
                knife = await findPic("knife3.png")
                if (knife == "err") {
                    sendLog("刀没有了")
                    continue
                }
            }

        }
        // 查找剪刀
        sendLog("查找剪刀")
        let scissors = await findPic("scissors.png")
        if (scissors == "err") {
            scissors = await findPic("scissors2.png")
            if (scissors == "err") {
                scissors = await findPic("scissors3.png")
                if (scissors == "err") {
                    scissors = await findPic("scissors4.png")
                    if (scissors == "err") {
                        sendLog("剪刀没有了")
                        await handleGetsSissors()
                        continue
                    }
                }

            }

        }
        // 查找绳子
        sendLog("查找绳子")
        let cord = await findPic("cord.png")
        if (cord == "err") {
            sendLog("绳子没有了")
            cord = await findPic("cord2.png")
            if (cord == "err") {
                await spawnCord()
                continue
            }

        } else {
            let cord3 = await findPic("cord3.png")
            if (cord3 != "err") {
                sendLog("绳子次数不足")
                await spawnCord()
            }
            let cord4 = await findPic("cord4.png")
            if (cord4 != "err") {
                sendLog("绳子次数不足")
                await spawnCord()
            }
            let cord5 = await findPic("cord5.png")
            if (cord5 != "err") {
                sendLog("绳子次数不足")
                await spawnCord()
            }

        }
        // 找布
        sendLog("查找布")
        let cloth = await findPic("cloth.png")
        if (cloth == "err") {
            sendLog("布没有了")
            await spawnCloth()
            continue
        }
        /* 
        可以制作
        */
        // sendLog("制作材料足够")
        // await spawn()

        await wait(10)
    } while (scum.status == "运行");
}

async function wait(t) {
    console.log(t);
    return new Promise(resolve => {
        setTimeout(() => resolve(), t * 100)
    })
}

async function findPic(picName, scaleSteps) {
    try {
        const region = await screen.find(imageResource(picName));
        // console.log(region);
        return region
    } catch (e) {
        // console.error(e);
        return "err"
    }
}

async function findAllPic(picName) {
    try {
        const region = await screen.findAll(imageResource(picName));
        // console.log(region);
        return region
    } catch (e) {
        // console.error(e);
        return "err"
    }
}

// 制作布
async function spawnCloth() {
    let empty = await findPic("empty.png")
    if (empty == "err") {
        empty = await findPic("empty2.png")
        if (empty == "err") {
            empty = await findPic("empty3.png")
            if (empty == "err") {
                empty = await findPic("empty4.png")
                if (empty == "err") {
                    sendLog("未找到空包")
                    await goodsEmpty()
                    return
                }
            }
        }

    }
    await await mouse.move(straightTo(centerOf(empty)))
    await wait(1)
    await mouse.rightClick()
    await wait(1)
    let jcb = await findPic("jcb.png")
    if (jcb == "err") {
        sendLog("未找到剪成布按钮")
    }
    await await mouse.move(straightTo(centerOf(jcb)))
    await wait(1)
    await mouse.leftClick()
    await wait(50)

}

// 制作帽子
async function spawn(maozi) {
    /* let maozi = await findPic("cr.png")
    if (maozi == "err") {
        maozi = await findPic("cr2.png")
        if (maozi == "err") {
            sendLog("未找到可制作物品")
            return
        }
    } */
    await mouse.move(straightTo(centerOf(maozi)))
    await mouse.leftClick()
    await wait(5)
    let tool = await findPic("tool.png")
    if (tool == "err") {
        tool = await findPic("tool2.png")
        if (tool == "err") {
            sendLog("未找到制作按钮")
            return
        }
    }
    await mouse.move(straightTo(centerOf(tool)))
    await mouse.leftClick()
    await wait(60)
    await clickInfo()
    let mo = await findPic("sr.png")
    if (mo == "err") {
        sendLog("未找到制作好的生日帽")
        return
    }
    await mouse.move(straightTo(centerOf(mo)))
    await wait(5)
    await mouse.leftClick()
    await mouse.leftClick()

}
// 制作绳子

async function spawnCord() {
    let crs = await findPic("crs.png")
    if (crs == "err") {
        await wait(10)
        crs = await findPic("crs2.png")
        if (crs == "err") {
            crs = await findPic("crs3.png")
            if (crs == "err") {
                sendLog("未找绳子制作列表")
                await dropCloth()
                return
            }
        }
    }
    await mouse.move(straightTo(centerOf(crs)))
    await mouse.leftClick()
    await wait(5)
    let tool = await findPic("tool.png")
    if (tool == "err") {
        tool = await findPic("tool2.png")
        if (tool == "err") {
            sendLog("未找到制作按钮")
            return
        }
    }
    await mouse.move(straightTo(centerOf(tool)))
    await mouse.leftClick()
    await wait(80)
    await clickInfo()
}

// 切碎布

async function dropCloth() {
    let bu = await findPic("cloth.png")
    if (bu == "err") {
        bu = await findPic("cloth2.png")
        if (bu == "err") {
            sendLog("未找到布")
            await spawnCloth()
            return
        }

    }
    await mouse.move(straightTo(centerOf(bu)))
    await wait(1)
    await mouse.rightClick()
    await wait(10)
    let drop = await findPic("jcsb.png")
    if (drop == "err") {
        sendLog("未识别到剪碎布按钮")
        return
    }
    await mouse.move(straightTo(centerOf(drop)))
    await mouse.leftClick()
    await wait(60)
    // await clickInfo()
}

// 点击详细制作材料查看


async function clickInfo() {
    let info = await findPic("info.png")
    if (info == "err") {
        info = await findPic("info2.png")
        if (info == "err") {
            sendLog("未找到详情按钮")
            return
        }
    }
    await mouse.move(straightTo(centerOf(info)))
    await wait(1)
    await mouse.leftClick()
    await wait(1)
    await mouse.leftClick()
    await wait(10)
}

/* 
处理没有剪刀
*/

async function handleGetsSissors() {
    await keyboard.pressKey(2)
    await keyboard.releaseKey(2)
    await wait(1)
    await keyboard.pressKey(36)
    await keyboard.releaseKey(36)
    await wait(1)
    await keyboard.pressKey(2)
    await keyboard.releaseKey(2)
    await wait(5)
    return
    await keyboard.pressKey(36)
    await wait(1)
    await keyboard.releaseKey(36)
    let handjd = await findPic("handjd.png")
    if (handjd == "err") {
        handjd = await findPic("handjd2.png")
        if (handjd == "err") {
            sendLog("手上没有剪刀")
            return
        }

    }
    await mouse.move(straightTo(centerOf(handjd)))
    await wait(5)
    await mouse.rightClick()
    await wait(10)
    let remove = await findPic("remove.png")
    if (remove == "err") {
        sendLog("没有找到移除按钮")
        return
    }
    await mouse.move(straightTo(centerOf(remove)))
    await wait(1)
    await mouse.leftClick()
    await wait(1)
    await keyboard.pressKey(37)
    await wait(1)
    await keyboard.releaseKey(37)
    await wait(10)
}

/* 
购买空包
*/

async function goodsEmpty() {
    await keyboard.pressKey(2)
    await wait(1)
    await keyboard.releaseKey(2)
    await wait(10)
    await keyboard.pressKey(50)
    await keyboard.releaseKey(50)
    await wait(20)
    // 卖东西
    await mai()
    return
    // 
    let zzcl = await findPic("zzcl.png")
    if (zzcl == "err") {
        zzcl = await findPic("zzcl2.png")
        if (zzcl == "err") {
            sendLog("未找到制作材料选项")
            return
        }
    }
    await mouse.move(straightTo(centerOf(zzcl)))
    await wait(10)
    await mouse.leftClick()
    await wait(5)
    // await mouse.scrollDown(500);
    await wait(10)
    let shoppingempty = await findPic("shoppingempty.png")
    if (shoppingempty == "err") {
        sendLog("商店未找到空包")
        return
    }
    await mouse.move(straightTo(centerOf(shoppingempty)))
    await wait(10)
    await mouse.leftClick()
    await wait(20)
    let shoppingempty2 = await findPic("shoppingempty2.png")
    if (shoppingempty2 == "err") {
        sendLog("添加购物车时未找到空包")
        return
    }
    await mouse.move(straightTo(centerOf(shoppingempty2)))
    await wait(10)
    for (let i = 0; i < 10; i++) {
        await mouse.leftClick()
        await wait(3)
    }
    let goods = await findPic("goods.png")
    if (goods == "err") {
        goods = await findPic("goods2.png")
        if (goods == "err") {
            sendLog("添加购物车时出错")
            return
        }
    }
    await mouse.move(straightTo(centerOf(goods)))
    await wait(10)
    await mouse.leftClick()
    await wait(3)
    await mouse.leftClick()
    await wait(2)
    // 拾取到背包
    let ckkb;
    do {
        ckkb = await findPic("ckkb.png")
        sendLog(JSON.stringify(ckkb))
        if (ckkb == "err") {
            ckkb = await findPic("ckkb2.png")
            if (ckkb == "err") {
                ckkb = await findPic("ckkb3.png")
                if (ckkb == "err") {
                    sendLog("仓库里没有找到空包")
                } else {
                    await mouse.move(straightTo(centerOf(ckkb)))
                    await wait(10)
                    await mouse.leftClick()
                    await mouse.leftClick()
                    await wait(10)
                }
            }
        } else {
            await mouse.move(straightTo(centerOf(ckkb)))
            await wait(10)
            await mouse.leftClick()
            await mouse.leftClick()
            await wait(10)
        }

    } while (ckkb != "err");

    sendLog("购买完成")
    await keyboard.pressKey(2)
    await keyboard.releaseKey(2)
    await wait(5)
    await keyboard.pressKey(2)
    await keyboard.releaseKey(2)
    await wait(5)
    await keyboard.pressKey(37)
    await keyboard.releaseKey(37)
    await wait(10)
}

// 卖东西
async function mai() {
    let cs = await findPic("cs.png")
    if (cs == "err") {
        sendLog("没有找到出售按钮")
        return
    }
    await mouse.move(straightTo(centerOf(cs)))
    await wait(5)
    await mouse.leftClick()
    await wait(10)
    let mo;
    mo = await findAllPic("bs.png")
    sendLog(JSON.stringify(mo))

    return
}