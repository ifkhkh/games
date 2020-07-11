import Scene from "../scene"
import KangScene from "./kang_scene";
//
// // 结束
// const SceneTitle = (game) => {
//     const s = {
//         game: game,
//     }
//
//
//
//     // 初始化
//
//     s.draw = () => {
//
//
//         // 画出 分数
//         game.context.fillText(`游戏结束 按 r 回到 标题界面`, 100, 290)
//     }
//
//     s.update = () => {
//
//     }
//
//     return s
// }

class SceneTitle extends KangScene {
    constructor(game) {
        super(game)
        this.game.registerAction('k', () => {
            game.replaceScene(Scene(game))
        })

    }

    draw() {
        // 画出 分数
        this.game.context.fillText(`按 k 开始游戏`, 100, 290)
    }
}

export default SceneTitle