// 砖块
import {imageFromPath, rectCollide} from "../../utils/utils";
import blockPng from "./image/block.png";

const Block = ({x, y}) => {
    const image = imageFromPath(blockPng)
    const o = {
        image: image,
        x: x,
        y: y,
        w: 40,
        h: 15,
        alive: true,
    }

    o.kill = () => {
        o.alive = false
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