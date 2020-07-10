import React, {useEffect} from "react";
import _css from './page.module.css'
import {Ball} from "./ball";
import {KangGame} from "./kanggame";
import {Block} from "./block";
import {Paddle} from "./paddle";
import {levels} from "./level";
import {log} from "../../utils/utils";
import ballPng from "./image/ball.png";
import blockPng from "./image/block.png";
import paddlePng from "./image/paddle.png";


const loadLevel = (game, n) => {
    n = n - 1
    const level = levels[n]
    const blocks = []
    for (let i = 0; i < level.length; i++) {
        const p = level[i];
        const b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

const enableDebugMode = (game, enable) => {
    if (!enable) {
        return
    }
    window.addEventListener('keydown', (event) => {
        const k = event.key
        if (k === 'p') {
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            window.blocks = loadLevel(game, k)
        }
    })
}

const Page = function () {

    const __main = () => {
        window.paused = false
        window.fps = 30

        let score = 0

        const images = {
            paddle: paddlePng,
            ball: ballPng,
            block: blockPng,
        }
        const game = KangGame(images, (g) => {
            log(g.images)
            const paddle = Paddle(g)
            const ball = Ball(g)

            window.blocks = loadLevel(g, 1)

            // 游戏事件注册
            game.registerAction('a', paddle.moveLeft) // 左移
            game.registerAction('d', paddle.moveRight) // 右移
            game.registerAction('f', ball.fire) // 开始


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

                        // 更新分数
                        score += 10
                        log(score, '-----score :::  is here-----')
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

                // 画出 分数
                game.context.fillText(`分数: ${score}`, 10, 290)
            }


            // mouse event
            let enableDrag = false
            let deltaX = 0
            let deltaY = 0
            game.canvas.addEventListener('mousedown', event => {
                const x = event.offsetX
                const y = event.offsetY
                if (ball.hasPoint(x, y)) {
                    enableDrag = true
                    deltaX = x - ball.x
                    deltaY = y - ball.y
                    log(x, y, 'down-----x, y :::  is here-----')
                }
            })
            game.canvas.addEventListener('mousemove', event => {
                const x = event.offsetX
                const y = event.offsetY
                if (ball.hasPoint(x, y) && enableDrag) {

                    log(x-deltaX, y-deltaY, 'move-----x, y :::  is here-----')
                    ball.x = x - deltaX
                    ball.y = y - deltaY
                }
            })
            game.canvas.addEventListener('mouseup', event => {
                const x = event.offsetX
                const y = event.offsetY
                if (ball.hasPoint(x, y)) {
                    enableDrag = false
                    log(x, y, 'up-----x, y :::  is here-----')
                }
            })
        })


        enableDebugMode(game, true)

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
            <hr/>
            <input type='range' onChange={handleChangeFps}/>
            <hr/>
            <textarea
                id='id-text-log'
                style={{
                    width: 400,
                    height: 300,
                }}
            />
        </div>
    )
}

export default Page