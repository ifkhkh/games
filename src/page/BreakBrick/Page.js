import React, { useEffect } from "react";
import _css from './page.module.css'
import { Ball } from "./ball";
import { KangGame } from "./kanggame";
import { Block } from "./block";
import { Paddle } from "./paddle";
import { levels } from "./level";

const loadLevel = (n) => {
    n = n - 1
    const level = levels[n]
    const blocks = []
    for (let i = 0; i < level.length; i++) {
        const p = level[i];
        const b = Block(p)
        blocks.push(b)
    }
    return blocks
}

const enableDebugMode = enable => {
    if (!enable) {
        return
    }
    window.addEventListener('keydown', (event) => {
        const k = event.key
        if (k === 'p') {
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            window.blocks = loadLevel(k)
        }
    })
}

const Page = function () {

    const __main = () => {
        window.paused = false


        const game = KangGame(60)

        const paddle = Paddle()
        const ball = Ball()

        window.blocks = loadLevel(1)

        // 游戏事件注册
        game.registerAction('a', paddle.moveLeft) // 左移
        game.registerAction('d', paddle.moveRight) // 右移
        game.registerAction('f', ball.fire) // 开始

        enableDebugMode(true)

        // 游戏刷新帧
        game.update = () => {
            if (window.paused) {
                return
            }
            ball.move()
            // 挡板和球
            if (paddle.collide(ball)) {
                ball.rebound()
            }

            // 球和砖块
            window.blocks.forEach(b => {
                if (b.collide(ball)) {
                    ball.rebound()
                    b.kill()
                }
            })
        }
        game.draw = () => {
            game.drawImage(paddle)
            game.drawImage(ball)

            // block
            window.blocks.forEach(b => {
                if (b.alive) {
                    game.drawImage(b)
                }
            })

        }
    }

    useEffect(__main, [])

    // 控制球 fps 速度
    const handleChangeFps = event => {
        window.fps = event.target.value
    }
    return (
        <div>
            <div>
                <canvas
                    id='id-canvas'
                    width={400}
                    height={300}
                />
            </div>
            <hr />
            <input type='range' onChange={handleChangeFps} />
        </div>
    )
}

export default Page