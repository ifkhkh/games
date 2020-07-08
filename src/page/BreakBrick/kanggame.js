import {_e} from "../../utils/utils";

const KangGame = (fps) => {
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

    setInterval(() => {
        // events
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
    }, 1000 / fps);

    return g
}

export {
    KangGame,
}