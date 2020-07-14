const log = console.log.bind(console)

const _e = document.querySelector.bind(document)

const _es = document.querySelectorAll.bind(document)

const imageFromPath = (path) => {
    const img = new Image()
    img.src = path
    return img
}

// 根据矩形左上角顶点坐标和各自长宽判断是否碰撞
const rectCollide = ({x1, y1, w1, h1, x2, y2, w2, h2}) => {

    // const maxX = x1 + w1 >= x2 + w2 ? x1 + w1 : x2 + w2
    // const maxY = y1 + h1 >= y2 + h2 ? y1 + h1 : y2 + h2
    // const minX = x1 <= x2 ? x1 : x2
    // const minY = y1 <= y2 ? y1 : y2
    // return maxX - minX <= w1 + w2 && maxY - minY <= h1 + h2

    // const a = x1 >= x2  && x1 <= x2 + w2
    // const b = y1 >= y2 && y1 <= y2 + h2
    // const c =  x2 >= x1 && x2 <= x1 + w1
    // const d = y2 >= y1 && y2 <= y1 + h1
    // return (a && b) || ( c && d)

    // const xa = x2 <= x1 + w1 && x2 >= x1
    // const xb = x2 <= x1 && x2 >= x1 - w2
    // const ya = y2 <= y1 + h1 && y2 >= y1
    // const yb = y2 >= y1 - h2 && y2 <= y1 + h1
    // return (xa && ya) || (xa && yb) || (xb && yb) || (xb && ya)

    return !(
        y1 + h1 < y2 ||
        y1 > y2 + h2 ||
        x1 + w1 < x2 ||
        x1 > x2 + w2
    )
}

/**
 * 获取指定区间随机数
 * @param start
 * @param end
 * @return {number}
 */
const randomBetween = (start, end) => {
    const n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}

export {
    log,
    _e,
    _es,
    imageFromPath,
    rectCollide,
    randomBetween,
}