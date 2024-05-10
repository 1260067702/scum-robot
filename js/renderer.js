
/*
 * @Author: 菱 admin@example.com
 * @Date: 2023-08-26 12:19:38
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-11-16 19:31:04
 * @FilePath: \electron-quick-start\renderer.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
const { ipcRenderer } = require("electron")
window.addEventListener("DOMContentLoaded", () => {

    createApp({
        data() {
            return {
                message: 'Hello Vue!',
                key: "",
                image: "",
                status: "未连接",
                tp: "",
                flag: true,
                codeList: [],
                version: "0.0.0",
                author: ""
            }
        },
        created() {
            this.$data.key = localStorage.getItem("key")
            this.$data.image = localStorage.getItem("image")
            console.log("data", this.$data);

            ipcRenderer.send("service", "loaded")
            ipcRenderer.on("message", (event, args, data) => {
                // console.log(event);

                switch (args) {
                    case "main":
                        console.log(data);
                        this.$data.image = data.AD
                        this.$data.version = data.version
                        this.$data.codeList = ["初始化完成"]
                        break
                    case "status":
                        this.$data.status = data
                        if (data == "连接成功") {
                            this.$data.flag = false
                            localStorage.setItem("key", this.$data.key)
                        } else {
                            this.$data.flag = true
                        }
                        break
                    case "TP":
                        this.$data.tp = data
                        break
                    case "log":
                        if (this.$data.codeList.length > 500) {
                            this.$data.codeList = []
                        }
                        this.$data.codeList.unshift(data)
                        break

                }
            })

        },
        methods: {
            bind() {
                console.log("点击事件");
                if (!this.$data.key || this.$data.key == "") {
                    alert("请输入密钥")
                    return
                }
                this.$data.status = "连接中"
                ipcRenderer.send("service", "connect", this.$data.key)
            }
        }

    }).mount('#app')


})