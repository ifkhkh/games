import React, { useEffect } from "react";
import _css from './page.module.css'
import {Ball} from "./ball";
import {KangGame} from "./kanggame";
import {Block} from "./block";
import {Paddle} from "./paddle";

const Page = function () {



    const __main = () => {
        const game = KangGame(60)
        let paused = false

        const paddle = Paddle()
        const ball = Ball()

        const blocks = []
        for (let i = 0; i < 3; i++) {
            const b = Block({
                x: 100 * (i + 1),
                y: 50,
            })
            blocks.push(b)
        }

        // 游戏事件注册
        game.registerAction('a', paddle.moveLeft) // 左移
        game.registerAction('d', paddle.moveRight) // 右移
        game.registerAction('f', ball.fire) // 开始

        window.addEventListener('keydown', (event) =>{
            const k = event.key
            if (k === 'p') {
                paused = !paused
            }
        })

        // 游戏刷新帧
        game.update = () => {
            if (paused) {
                return
            }
            ball.move()
            // 挡板和球
            if (paddle.collide(ball)) {
                ball.rebound()
            }

            // 球和砖块
            blocks.forEach(b => {
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
            blocks.forEach(b => {
                if (b.alive) {
                    game.drawImage(b)
                }
            })

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