import React, {useEffect} from "react";
import'./page.module.css'
import {KangGame} from "./kanggame";
import {levels, loadLevel} from "./level";
import ballPng from "./image/ball.png";
import blockPng from "./image/block.png";
import paddlePng from "./image/paddle.png";
import Scene from "./scene";


const enableDebugMode = (game, enable) => {
    if (!enable) {
        return
    }
    window.addEventListener('keydown', (event) => {
        const k = event.key
        if (k === 'p') {
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            window.blocks = loadLevel(game, levels, k)
        }
    })
}

window.paused = false


const Page = function () {

    const __main = () => {


        const images = {
            paddle: paddlePng,
            ball: ballPng,
            block: blockPng,
        }
        const game = KangGame(images, (g) => {

            g.scene = Scene(g)
            // const paddle = Paddle(g)
            // const ball = Ball(g)
            // let score = 0
            //
            // window.blocks = loadLevel(g, 1)




            // 游戏刷新帧
            // game.update = () => {
            //
            //     // s.update
            //     scene.update()
            // }
            // game.draw = () => {
            //     // s.draw
            //     scene.draw()
            // }



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