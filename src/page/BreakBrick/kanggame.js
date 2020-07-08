import {_e} from "../../utils/utils";
window.fps = 30
const KangGame = () => {
    const canvas = _e('#id-canvas')
    const context = canvas.getContext('2d')
    const g = {
        actions: {},
        keydowns: {},
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
        g.update()

        // draw
        g.draw()
        setTimeout(() => {
            // events
            runLoop(window.fps)
        }, 1000 / window.fps);
    }

    setTimeout(() => {
        // events
        runLoop(window.fps)
    }, 1000 / window.fps);

    return g
}

export {
    KangGame,
}