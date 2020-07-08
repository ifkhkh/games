
// 挡板
import {imageFromPath, rectCollide} from "../../utils/utils";
import paddlePng from "./image/paddle.png";

const Paddle = () => {
    const image = imageFromPath(paddlePng)
    const o = {
        image: image,
        x: 100,
        y: 285,
        speed: 10,
    }

    // 移动
    o.move = x => {
        const right = 400 - o.image.width - 1
        if (x <= 1) {
            x = 1
        } else if (x >= right) {
            x = right
        }
        o.x = x
    }

    // 左移动
    o.moveLeft = () => {
        o.move(o.x -= o.speed)
    }

    // 右移动
    o.moveRight = () => {
        o.move(o.x += o.speed)
    }

    o.collide = (ball) => {
        return rectCollide({
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
    Paddle,
}