import React, {useEffect} from "react";
import'./page.module.css'
import {KangGame} from "./kanggame";
import {levels, loadLevel} from "./level";
import playerPng from "./image/player.png";
import skyPng from "./image/sky.png";
import cloudPng from "./image/cloud.png";
import bulletPng from "./image/bullet.png";
import SceneTitle from "./scene/scene_title";
import Scene from "./scene/scene";


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
            bullet: bulletPng,
            player: playerPng,
            sky: skyPng,
            cloud: cloudPng,
        }

        // 实例化 game
        const game = KangGame.instance(images, (g) => {
            // 初始化场景
            g.replaceScene(Scene.new(g))
        })

        // debug 模式
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