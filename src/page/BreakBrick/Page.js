import React, { useEffect } from "react";
import _css from './page.module.css'
import { _e, log } from "../../utils/utils";
import paddlePng from './paddle.png'
import ballPng from './ball.png'

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
    g.drawImage = (paddle) => {
        g.context.drawImage(paddle.image, paddle.x, paddle.y)
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
    }, 1000 / 30);

    return g
}

const imageFromPath = (path) => {
    const img = new Image()
    img.src = path
    return img
}

const Paddle = () => {
    const image = imageFromPath(paddlePng)
    const o = {
        image: image,
        x: 100,
        y: 200,
        speed: 5,
    }
    o.moveLeft = () => {
        o.x -= o.speed
    }
    o.moveRight = () => {
        o.x += o.speed
    }
    return o
}

const Ball = () => {
    const image = imageFromPath(ballPng)
    const o = {
        image: image,
        x: 140,
        y: 160,
        speedX: 10,
        speedY: 10,
        fired: false,
    }

    o.fire = () => {
        o.fired = true
    }

    o.move = () => {
        if(o.fired) {
            if (o.x < 0 || o.x > 400) {
                o.speedX = - o.speedX
            }
            if (o.y < 0 || o.y > 300 ) {
                o.speedY = - o.speedY
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    return o
}

const Page = function () {



    const __main = () => {
        const game = KangGame()

        const paddle = Paddle()
        const ball = Ball()


        game.registerAction('a', paddle.moveLeft)
        game.registerAction('d', paddle.moveRight)
        game.registerAction('f', ball.fire)

        game.update = () => {
            ball.move()
        }
        game.draw = () => {
            game.drawImage(paddle)
            game.drawImage(ball)
        }
    }

    useEffect(__main, [])

    return (
        <div>
            <canvas
                id='id-canvas'
                width={400}
                height={300}
            />
        </div>
    )
}

export default Page