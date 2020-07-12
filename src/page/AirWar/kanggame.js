import { _e } from "../../utils/utils";
class KangGame {
    constructor(images, callback) {
        window.fps = 30
        this.imagesList = images
        this.callback = callback

        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.images = {} // 存储载入的图片

        this.canvas = _e('#id-canvas')
        this.context = this.canvas.getContext('2d')

        // events
        const self = this
        window.addEventListener('keydown', event => {
            const k = event.key
            self.keydowns[k] = true
        })
        window.addEventListener('keyup', event => {
            const k = event.key
            self.keydowns[k] = false
        })

        this.__init()
    }

    static instance = (...params) => {
        if (this.i === undefined) {
            this.i = new this(...params)
        }
        return this.i
    }

    // draw
    drawImage = (kangImage) => {
        // 参数是一个 kangImage
        this.context.drawImage(kangImage.texture, kangImage.x, kangImage.y)
    }

    // register
    registerAction = (key, callback) => {
        this.actions[key] = callback
    }

    // 替换更新场景
    replaceScene = scene => {
        this.scene = scene
    }

    // 根据 key 读取图片
    textureByName = (key) => {
        return this.images[key]
    }

    // 循环清空重新绘制画面
    runLoop = () => {
        const self = this
        const actions = Object.keys(self.actions)
        for (let i = 0; i < actions.length; i++) {
            const key = actions[i]
            if (self.keydowns[key]) {
                // 按键按下时调用
                self.actions[key]()
            }

        }

        // clear
        self.context.clearRect(0, 0, self.canvas.width, self.canvas.height)

        // update
        self.scene.update()

        // draw
        self.scene.draw()
        setTimeout(() => {
            // events
            self.runLoop()
        }, 1000 / window.fps);
    }

    __start = () => {
        const self = this
        self.callback(self)
        setTimeout(() => {
            // events
            self.runLoop()
        }, 1000 / window.fps);
    }

    __init = () => {
        const self = this
        // 预先载入所有图片
        const loads = []
        const images = self.imagesList
        const keys = Object.keys(images)

        for (let i = 0; i < keys.length; i++) {
            const k = keys[i]
            const path = images[k]
    
            const img = new Image()
            img.src = path
            img.onload = () => {
                // 所有图片载入成功后调用 g.run
                loads.push(1)
                // 存入 g.images
                self.images[k] = img
                if (loads.length === keys.length) {
                    self.__start()
                }
            }
        }
    }
}

export {
    KangGame,
}