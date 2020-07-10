import {Block} from "./block";

const levels = [
    [
        [0, 0],
    ],
    [
        [0, 0,],
        [50, 100, 3,],
    ],
]

const loadLevel = (game, levelList, n) => {
    n = n - 1
    const level = levelList[n]
    const blocks = []
    for (let i = 0; i < level.length; i++) {
        const p = level[i];
        const b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

export {
    levels,
    loadLevel,
}