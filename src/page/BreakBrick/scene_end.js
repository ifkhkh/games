// 结束
const SceneEnd = (game) => {
    const s = {
        game: game,
    }

    // 初始化

    s.draw = () => {

        // 画出 分数
        game.context.fillText(`游戏结束`, 100, 290)
    }

    s.update = () => {

    }

    return s
}

export default SceneEnd