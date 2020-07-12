import KangScene from "./kang_scene";
import SceneTitle from "./scene_title";

class SceneEnd extends KangScene {
    constructor(game) {
        super(game)
        game.registerAction('r', () => {
            game.replaceScene(SceneTitle.new(game))
        })
    }

    draw() {
        // 画出 分数
        this.game.context.fillText(`游戏结束 按 r 回到标题界面`, 100, 290)
    }
}

export default SceneEnd