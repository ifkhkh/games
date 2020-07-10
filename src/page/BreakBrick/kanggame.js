import {_e, log} from "../../utils/utils";
const KangGame = (images, callback) => {
    // images 提前载入图片
    const canvas = _e('#id-canvas')
    const context = canvas.getContext('2d')
    const g = {
        scene: null,
        actions: {},
        keydowns: {},
        images: {}, // 存储载入的图片
    }
    g.canvas = canvas
    g.context = context

    // draw
    g.drawImage = (kangElement) => {
        g.context.drawImage(kangElement.image, kangElement.x, kangElement.y)
    }

    // events
    window.addEventListener('keydown', event => {
        const k = event.key
        g.keydowns[k] = true
    })
    window.addEventListener('keyup', event => {
        const k = event.key
        g.keydowns[k] = false
    })

    // register
    g.registerAction = (key, callback) => {
        g.actions[key] = callback
    }

    g.replaceScene = scene => {
        log(scene, g.scene, '-----scene, g.scene :::  is here-----')
        g.scene = scene
    }

    const runLoop = () => {
        const actions = Object.keys(g.actions)
        for (let i = 0; i < actions.length; i++) {
            const key = actions[i]
            if (g.keydowns[key]) {
                // 按键按下时调用
                g.actions[key]()
            }

        }

        // clear
        context.clearRect(0, 0, canvas.width, canvas.height)

        // update
        g.scene.update()

        // draw
        g.scene.draw()
        setTimeout(() => {
            // events
            runLoop()
        }, 1000 / window.fps);
    }

    g.__start = () => {
        callback(g)
        setTimeout(() => {
            // events
            runLoop()
        }, 1000 / window.fps);
    }

    // 预先载入所有图片
    const loads = []
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
            g.images[k] = img
            if (loads.length === keys.length) {
                g.__start()
            }
        }
    }

    g.imageFromName = (key) => {
        return g.images[key]
    }

    return g
}

export {
    KangGame,
}