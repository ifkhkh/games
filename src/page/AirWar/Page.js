import React, {useEffect} from "react";
import './page.module.css'
import {KangGame} from "./kanggame/kanggame";
import playerPng from "./image/player.png";
import skyPng from "./image/sky.png";
import bulletPng from "./image/bullet.png";
import enemy0Png from './image/enemy0.png'
import enemy1Png from './image/enemy1.png'
import enemy2Png from './image/enemy2.png'
import cloud0Png from './image/cloud0.png'
import cloud1Png from './image/cloud1.png'
import cloud2Png from './image/cloud2.png'
import firePng from './image/fire.png'
import Scene from "./scene/scene";
import {_e} from "../../utils/utils";


const enableDebugMode = (game, enable) => {
    if (!enable) {
        return
    }
    window.addEventListener('keydown', (event) => {
        const k = event.key
        if (k === 'p') {
            window.paused = !window.paused
        }
    })
}

window.paused = false

window.config = {
    player_speed: 10,
    bullet_speed: 11,
    cloud_speed: 2,
    fire_cooldown: 9,
    handleRangeChange: (event) => {
        const ele = event.target
        const v = ele.value
        const k = ele.dataset.value
        window.config[k] = Number(v)
        _e(`.${k}`).textContent = v
    }
}


const Page = function () {

    const __main = () => {

        const images = {
            bullet: bulletPng,
            player: playerPng,
            sky: skyPng,
            enemy0: enemy0Png,
            enemy1: enemy1Png,
            enemy2: enemy2Png,
            cloud0: cloud0Png,
            cloud1: cloud1Png,
            cloud2: cloud2Png,
            fire: firePng,
        }

        // 实例化 game
        const game = KangGame.instance(images, (g) => {
            // 初始化场景
            g.replaceScene(Scene.new(g))
            // g.replaceScene(SceneTitle.new(g))
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
                    height={600}
                />
            </div>
            <hr/>
            <input type='range' onChange={handleChangeFps}/>
            <hr/>
            <div>
                <input
                    type="range"
                    data-value='player_speed'
                    onChange={window.config.handleRangeChange}
                    // value={window.config.player_speed}
                />
                <label >
                    玩家速度: <span className='player_speed'/>
                </label>
            </div>
            <div>
                <input
                    type="range"
                    data-value='bullet_speed'
                    onChange={window.config.handleRangeChange}
                />
                <label >
                    子弹速度: <span className='bullet_speed'/>
                </label>
            </div>
            <div>
                <input
                    type="range"
                    data-value='fire_cooldown'
                    max={15}
                    onChange={window.config.handleRangeChange}
                />
                <label >
                    子弹CD: <span className='fire_cooldown'/>
                </label>
            </div>
            <div>
                <input
                    type="range"
                    data-value='cloud_speed'
                    onChange={window.config.handleRangeChange}
                />
                <label >
                    云朵速度: <span className='cloud_speed'/>
                </label>
            </div>

            {/*<textarea*/}
            {/*    id='id-text-log'*/}
            {/*    style={{*/}
            {/*        width: 400,*/}
            {/*        height: 300,*/}
            {/*    }}*/}
            {/*/>*/}
        </div>
    )
}

export default Page