// 弹球
const Ball = (game) => {
    const image = game.imageFromName('ball')
    const o = {
        image: image,
        x: 140,
        y: 160,
        w: image.width,
        h: image.height,
        speedX: 5,
        speedY: 5,
        fired: false, // 是否开始发射
    }

    // 开始
    o.fire = () => {
        o.fired = true
    }


    // 移动
    o.move = () => {
        if(o.fired) {
            if (o.x <= 1 || o.x >= 400 - o.image.width - 1) {
                o.speedX = - o.speedX
            }
            if (o.y <= 1 || o.y >= 300 - o.image.height - 1) {
                o.speedY = - o.speedY
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }

    // 反弹
    o.rebound = () => {
        o.speedY *= -1
    }

    o.hasPoint = (x, y) => {
        const xIn = x >= o.x && x <= o.x + o.w
        const yIn = y >= o.y && y <= o.y + o.h
        return xIn && yIn
    }

    // 停止
    o.stop = () => {
        o.fired = false
    }

    return o
}

export {
    Ball
}