import Scene from "./scene"
import KangScene from "./kang_scene";

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