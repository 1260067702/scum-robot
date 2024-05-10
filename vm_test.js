// const { keyboard, imageResource, mouse, straightTo, centerOf } = require("@nut-tree/nut-js");


module.exports = async function (ctx) {
    init()
    screen.config.resourceDirectory = `d:/z0/assets`
    // let img = await imageResource('2.png')
    // console.log("图片", img);
    // let pos = await screen.find(img);
    // await mouse.move(straightTo(centerOf(pos)));
    sendLog("欢迎使用炼体脚本")
    sendLog("F10启动脚本F12停止")
    globalShortcut.unregisterAll()

    let f10 = globalShortcut.register("F10", () => start(scum))
    let f11 = globalShortcut.register("F11", () => stop(scum))
    if (!f11) {
        return globalShortcut.isRegistered('registration failed')
    }
    // await keyboard.pressKey(67);wdsawdsawdsawdsa
    return findPic("n.png", 0.8)
    // let url = await screen.capture("screenshot.png");
    // return fs.readFileSync(url)

    return globalShortcut.isRegistered('F10')


};

let scum = {
    status: "停止",
    imgs: {
        n: "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",
        s: "iVBORw0KGgoAAAANSUhEUgAAABIAAAALCAYAAAByF90EAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAHDSURBVDhPTVJNSwJRFD3vjTimUKNiUdAnGLSKVrWqdm1bRNCq3xYRtWrdom1BrYuignBhZEiFlo6OM9O511F7cLzv3Y9zz72j2fC82ACwxkDs8PAd0wii/3bgF0toHmF2SqW4nM0yBCzRtsMQ792uvp9aLbSiSAunXRdbnofjjw/sl0o4rddJQPKEzKzn87GoWRwb0+KBqmqnowmutdgkwWQ6jaNaTUn3SHRGIiERiCIrJKJohh0N74LpTAblXE7HDVh4+f2Nz16PyRZGQJ/aJF+xXiyqIivBxPLSV0Y7ywYrbLRA8oqo5Fmgr8Lxn/i+6/hURdLD+bl4Ju0ijGPkUyl4RIbdXnwfb0x+9tscx2C3UMD515fu5aBQxIne+2PpaI/tNq6aDdSCAOMkqbL45udHu98zJmuXker8CD0WhKJVLKH7sXwTtkkl2xMeylx2znGUPcWAkEpil4U73gQeqDBgTUCfnIjkCo4VEzZtHVxTwUWjgdvfXwQktgy4JF3lwteIzzDCK5cd0h+xiexSP7uqST7A8tSU/iH1MKh3/shNm8siB++EJMvmvob6byOKhG3ImtxHcEZ+Z+TzpTjx92HxB0sJovmmqWYbAAAAAElFTkSuQmCC",
        x: "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",
        b: "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",
        openwpl: "iVBORw0KGgoAAAANSUhEUgAAACcAAAARCAYAAABegLWFAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAP6SURBVEhLtVZbKGVvFP/t45wQuWVcSvQ33makzOCUW0gUeZFRXvDmFh7IIy8eFE8zqZl5cBkPeBBKKUQhf8mlFLnk8uSSXHPJX2f/11rn2y7HGTNq5tf+zv7W2mt/6/ety7ePZrZYdALogqZB7gyTSaNhIoVNlDo0urEdzZShMn0VeM27uzslvQyNjMUHTR6cs8wEHGCz2Z7p2f414PdtNn7npffIB10mCRdBnDAxQzZ0apHXkngZTtYiv+JbhlxETkET56SSGz+yGxjrSESV/q+A1lcM7H4JnEsSHtWPo38mRDYeHh4iurm5wWKxyPy10eR6c3FxUZITOKynzczM/NRDRUUF9vf28E94OOrr65GRkYG6ujrs7Oygp6fnGTla65nz5ORkXF9fyzw3NxcRERFoampCS0sLmpubZfPfvn5Fdna22HB0VDxgjo+PR2VlpXRQa2sr0tLSZJHy8nIx/ZSXh/C3b2XO4Gec3rKyMpG7u7vlPQYTi42NlTljYWHB3vFOMDU1hZKSEvHb19entCpRMiFyolFwzCjTf/f+PfKIYHBwMMbGxjA9PY3Q0FCMjo4iLi4O/v7+yvhl5Ofno7GxUUoiKCgISUlJMg8LC8P29jZWV1cp8v/aiakf2tYDpadJIokeMZHU1FTMzs5ibm4OnZ2dstuEhAQsLi7i7OxM2fOuNYmWMRh8/DC4DPr7+7G2tobq6mpER0cjMjISXl5eiIqKkpIQKg/soJFDPTAwUOrn8PBQjH19fbG7u4sfROTb9+9wdXXFxsYGhoaGsL6+jj2qw6KiInF4c3OD9vZ2WexXWFlZgbe3t5Dr7e1V2scgdkLQTs5kpdRw/gsLCylNVmkCrgGr1YrPX76gtLQUy8vLOD8/x+TkJHJycrC1tYWlpSX4+PhI5LhO9/f3JVpXV1eSqpOTE5FZn5WVhfT0dFxcXMhGeIPDw8OSCR6Dg4NC5j6JXHg0TCYq4sTEREmbM3B0OPxcF8fHx6itrUVVVRW6uroQ8OYNTk9Pxa6trU1Stbm5KfL4+LjIrGcwwY6ODtkkbywzMxMxMTEyeMMCjpiKGvM08RExMjIi7a7Td9Q4HoxPFe/89vZWdAMDA5IW7sD5+Xl8+PhRovo7aGhowMHBgZJ+DyYOd01NzZOWdzy/DJnJFhQUSKonJiZweXmJo6MjeVZcXCxp5HOMkZKSIjLrGUaEGdy13EyPBx9njyEeqdh1/vgbw93dXffz87uXiZAM1hlzx0FNpIeEhMiculvnNYmkyAEBAbqnp6fMqUZ1OkbY7/27iofDYD09ZwKkcArHCP4JECGn6z7V2btWM5vNzhmQ8Z+nRl8RKp//7v/Pcdn/zAvwP7Kg8TfiaYFiAAAAAElFTkSuQmCC",
        yml: "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",
        milk: "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",
        cg: "iVBORw0KGgoAAAANSUhEUgAAABcAAAAOCAYAAADE84fzAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAG+SURBVDhPxZOxjwFREMbHhoYQEpVIRAQRjdBQ6DQSGw1Cg0SUKhK9hlZLq6PQUZAQhYSEglDSKBT+hrm3c7t7u9lD7nLJfcmXmff2vXm/3TerAwBk/pF0OmHbe3Fi1MhgMLwt4nK5xOy5BHKNW60WVqtVzTzP82g2m5EdjJfLhaLFYsFMJkO50jJ5Op2G2+0Gj8cDwuEwVCoVqNVqsF6vyeVymdZZrVbodruUS+p0OuB0OsWRWkTEimO9Xsd+v4/T6RQbjYaGWrLwViaTiciF2G63NdQqcqUGgwEEAgFYrVbk4XAIHMdBLpeD7XYLyWQSFosFOBwOiolEAjabDaRSKbHCl4hGSe73+2kuGAzi/X7HeDyuIvd4PDibzYjufD5riCU/7RabzUbEpVKJ6JXyer1wvV7F0WvJ5OxCcb/fo9vtxslkQh0gPNPr9cguUibv9XqYz+eJ7hU5W/u5wefzYTQapVz4DOPxWC4WiUSQdQjlxWIRj8cjGo1GKnA6nehwdg9YKBS+L6603W7H0WiEh8OBvNvtMBaLYTabxfl8Tt9cKtBsNpFdJi6XSwyFQqri//P7/4V+RS70/HsBfAAmChPnvC0HHQAAAABJRU5ErkJggg==",
        hand: "iVBORw0KGgoAAAANSUhEUgAAACgAAAARCAYAAACvi+4IAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAARKSURBVEhLpVVfKGVrFF/7/DG44+EeIZf8zRkpkVL+pXNCYi75U+4kZULxRInkxZOUkDwi5c6DSUpqLuVBpPAgbngahCLKSKM70eWc89211t7fPvsczp3u3F+ts9e39vrz+9b69ncUi8UiFEUBI9xuNwghWJevaGmxmCH4VRBZ2U62J5cLV6iTk2Zzu9xgNpnAajWTlXM9PbnA4xHg9njYRvG0VkwKWMwWtj0Dxikmk0ll4geVIImXjNWCiTQ2bEOVCiqoCJUi+xHovUkx8dPl9iBhRSco86l+lND79EdAggQiKeMoIfp6F2SnSGNeXBNRKiYJSCdy86BRTsYfFPMSSa1iYKj51EBKrhfAh0+pl+tqkJ1T8xhpSGIvkSMEJJiamqppBFkdu8O/AK+Cg9lCC+JMndM5sqKvGHQm5eZ836gkA+HZiCMiImBkZATsdjtsbm7CwMAA3Hz5wkmNidbX16GlpQWODg+1guzB2uvXP0F0dDTKL5CUlAS5ublQUFAAo6OjMDExwT6dnZ1QVlbGuhH7+/vQ3d2trRBEkKS4uFgsLi6Kq6srsbKyIvr7+8Xa2pq4vLxkOyYT9fX1Ynt7m8Xlcum6lHfvfuNcHz78LmZnZwWSEbe3txyXlpYmzGYz7YJlcnJS5OTk0A3CsRSXmJgoVldXWZeidzA9PR1iYmIgKIiuEV/c3d0BEoVD7BZ18ePHGZiZmYFPn/6AhoYGWF5e5i5TA2mK8hjQSCnmzRu7Nl76eLgcIEGeEm4AHA4HYDMgNDSU6xcVFbEPQT+DBwcHeA14oLm5GaKionTp6OjQCn1mv5KSEtxILJMjVFdXg832s0aITbCKxXZ2dmB3dxfi4uJQ30X9T16HhISoToienh6oqamB4+NjqK2thba2Nu2NFz5nkD6MiooKCMYPICwsjDtKBdrb2zk5naOlpSUYGxuDb9/+grdvfwUcHZydncH9/T1UVlbC3devevdM2O3P2EF7SgrbJGgKXV1dUF5ezms6o1tbW6zv7e3x+ZRAX0X/J2lsbIQUTPb4+Mi76e3thYuLCzg9PYWTkxNobW2F5ORkeHh4gL6+Po6Zn59nP+4wsqDkje/f8zsCjZHGLDE9Pc0fC4E2QXJ+fg7x8fFsM4Le8X8MKUTRZrNxJwhEmjpIkpWVBUNDQzA+Ps4jycjI4BgJ0ulfgjCMNwCJxNHREZ9v2QT5XFhY4BuDEBkZCRsbG6wTnHgm/8YmEfQz6HA6ecQJCQksVqtV16mrTodT81SLSPk3SB88Rs/8q6qqIC8vj8d7fX0N+fn5LGST5AgYQ/+kXoSHh3O3YmNjobS0VLN6QR3MzMyEwsJCnwNPGB4ehrm5OdYHBwchOzsbbm5uoK6ujm0STU1N/DEGwtTUFAvhGUF/GHdNoG6Q4D2oWf4fjEflJXyXoBFM1Y/wj+B7pIxQtNv9P4NoykCdskZefnQSP1SAAfAP5IYA5cc1JzkAAAAASUVORK5CYII=",
        hg: "iVBORw0KGgoAAAANSUhEUgAAABkAAAAQCAYAAADj5tSrAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAKhSURBVDhPpVXNS2JRFP+9LzU/kAFXIQSJM8sCI0gXbkTEMSghsIUzzHJa5sY/oU2L/odmNX1ACG4KdTEtWkQr3YnQIrAIgppJzXfnnvOe9cI+Fv3geO65797zO1/vqaiqKlRNg6HrGGHwMISiKHgY9O2d1yGE4LNvQXW73dAkiRO6plracLH+KFSKRHVEQralTdaG6+NEMuSXU9Ud2VE5X8PU1JS9eh2Kx+MRzpqOMolEIiiVSrymHXM4xPr6Om5vb7G4uIharcbrdruN6elpBAIBpNNp7O7u8h0nZKWeCJaWltBqtXBxccEXfT4f9vf3sbe3h5mZGVD/CMFgEFtbW7weYWNjA+Fw2Laeg3syEsLm5ib+HB/DlLaiqHIodJ48CkbTDT6zvb2N8/NzeL1etknf3NyMEY9gjdEjLCJS3e4lEokElvPLyOfzaDabuL//h8LqKk5OTpDNZlGv1zE5Ock6lUrxfi6Xs3w4oFLEY5AVpMu6rknRWQzDYEe/d3YwPz+PQqHA0VMJ/X4/75FUKhXbyRN0bqokssbY6g/9rq39RCb7FV8+R3HZ7TJpRPZpOBjwmWg0ik6nw+v38FguIiJCmqhQKIRfsu4/vn9DfGGBS0DTdn19bR2WoBIeHh7a1ttQyfOoYNVqFbG5OSSTSZydnXGJSOSYIxaL4erqis8Vi0XE43EcHBywTUNDX41MJsNlHIPL5RaG+0lcbo+gd4dkYmKCRfZCnJ6eCjmiYmVlRRwdHQmZGb1fFJ8ol8tCNl00Gg0xOzvL+8+EnBHZ0DEA1BPqkfUKKY/j3ev1WDtBz6Qj23oZdk9kunTQ5iFl8tq6/J6T96D4g5+EoRGBFdFgaNpcisxGfiDtL/Ld3V/0++OZmKYJ+XdhW+Pw+AL4D1/s/S85ggQ0AAAAAElFTkSuQmCC",


    },
    path: "d:/Z0",
    energy: 100,
    water: 100,
    eat: 0
}

function init() {
    if (!fs.existsSync(scum.path)) {
        fs.mkdirSync(scum.path)
    }
    if (!fs.existsSync(`${scum.path}/assets`)) {
        fs.mkdirSync(`${scum.path}/assets`)
    }
    for (const key in scum.imgs) {
        if (!fs.existsSync(`${scum.path}/assets/${key}.png`)) {
            fs.writeFileSync(`${scum.path}/assets/${key}.png`, new Buffer.from(scum.imgs[key], "base64"))
        }
    }

}



function start() {
    if (scum.status == "停止") {
        scum.status = "运行"
        scum.eat = 0
        run()
        search()
        sendLog("启动")
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

function puse() {
    console.log("暂停");
    sendLog("暂停")
}



async function run() {
    sendLog("脚本加载成功")
    do {
        await keyboard.pressKey(67);
        await keyboard.releaseKey(45);
        await wait(1)
        await keyboard.pressKey(48);
        await keyboard.releaseKey(67);
        await wait(1)
        await keyboard.pressKey(63);
        await keyboard.releaseKey(48);
        await wait(1)
        await keyboard.pressKey(45);
        await keyboard.releaseKey(63);
        await wait(1)
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
        const region = await screen.find(imageResource(picName), {
            providerData: {
                searchMultipleScales: false,
                scaleSteps
            }
        });
        // console.log(region);
        return region
    } catch (e) {
        // console.error(e);
        return "err"
    }
}

function search() {
    setInterval(async () => {
        if (scum.status == "运行" && scum.eat == 0) {
            try {
                let pos = await findPic("n.png")
                if (pos != "err") {
                    sendLog("能量不足")
                    sendLog(JSON.stringify(pos))
                    scum.eat = 1
                    eat("yml.png", 1)
                    return
                }

            } catch (error) {

            }

            try {
                let pos = await findPic("s.png")
                if (pos != "err") {
                    sendLog(JSON.stringify(pos))
                    sendLog("水不足")
                    scum.eat = 1
                    eat("milk.png", 2)
                    return
                }

            } catch (error) {

            }
        }
    }, 5000)
}


async function eat(name, type) {
    await keyboard.pressKey(36)
    await wait(1)
    await keyboard.releaseKey(36)
    await wait(1)
    let box
    try {
        box = await screen.waitFor(imageResource("x.png"), 30000, 1000)
        sendLog(`找到箱子：${JSON.stringify(box)}`)
    } catch (error) {
        sendLog("没找到箱子,已停止运行")
        scum.status = "停止"
        return
    }
    await mouse.move(straightTo(centerOf(box)));
    await wait(5)
    await mouse.rightClick()
    await wait(1)
    let openwpl;
    try {
        openwpl = await screen.waitFor(imageResource("openwpl.png"), 30000, 1000)
        sendLog(`打开物品栏:${JSON.stringify(openwpl)}`)
    } catch (error) {
        sendLog("未找到打开物品栏按钮,停止运行")
        return
    }
    await mouse.move(straightTo(centerOf(openwpl)))
    await wait(5)
    await mouse.leftClick()
    let eatW;
    try {
        eatW = await screen.waitFor(imageResource(name), 30000, 1000)
        sendLog(`找到${name}:${JSON.stringify(eatW)}`)
    } catch (error) {
        sendLog(`未找到${name},停止运行`)
        return
    }
    await mouse.move(straightTo(centerOf(eatW)));
    await wait(5)
    await mouse.rightClick()
    await wait(1)
    let tp = type == 1 ? 'cg' : 'hg'
    let eatOver;
    try {
        eatOver = await screen.waitFor(imageResource(`${tp}.png`), 30000, 1000)
        sendLog(`找到${type == 1 ? "吃光" : "喝光"}按钮:${JSON.stringify(eatOver)}`)
    } catch (error) {
        sendLog(`未找到${type == 1 ? "吃光" : "喝光"}按钮,停止运行`)
        return
    }
    await mouse.move(straightTo(centerOf(eatOver)));
    await wait(5)
    await mouse.leftClick()
    await wait(600)

    let getBack;
    try {
        getBack = await screen.waitFor(imageResource("b.png"), 30000, 1000)
        sendLog(`找到背包:${JSON.stringify(getBack)}`)
    } catch (error) {
        sendLog("没有找到背包")
        return
    }
    await mouse.move(straightTo(centerOf(getBack)));
    await wait(2)
    await mouse.rightClick()
    let hand;
    try {
        hand = await screen.waitFor(imageResource("hand.png"), 30000, 1000)
        sendLog(`找到按钮拿在手里:${JSON.stringify(hand)}`)
    } catch (error) {
        sendLog("没有找到按钮拿在手里")
        return
    }
    await mouse.move(straightTo(centerOf(hand)));
    await wait(2)
    await mouse.leftClick()
    await wait(1)
    await keyboard.pressKey(39)
    await wait(1)
    await keyboard.releaseKey(39)
    scum.eat = 0
}