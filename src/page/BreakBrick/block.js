// 砖块
import {imageFromPath, rectCollide} from "../../utils/utils";
import blockPng from "./image/block.png";

/**
 *
 * @param {Object} game 游戏对象
 * @param {Array} position [0, 0] 格式的砖块坐标
 */
const Block = (game, position) => {
    const image = game.imageFromName('block')
    const p = position
    const o = {
        image: image,
        x: p[0],
        y: p[1],
        w: 40,
        h: 15,
        alive: true,
        lifes: p[2] || 1,
    }

    o.kill = () => {
        o.lifes--
        if (o.lifes < 1) {
            o.alive = false
        }
    }

    o.collide = (ball) => {
        return o.alive && rectCollide({
            x1: ball.x,
            y1: ball.y,
            w1: ball.image.width,
            h1: ball.image.height,
            x2: o.x,
            y2: o.y,
            w2: o.image.width,
            h2: o.image.height,
        })
    }
    return o
}

export {
    Block
}