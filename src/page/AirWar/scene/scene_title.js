import Scene from "./scene"
import KangScene from "./kang_scene";
import KangAnimation from "../kanggame/kang_animation";

// 抽象出来的类似 kangImage
class KangLabel {
    constructor(game, text) {
        this.game = game
        this.text = text
    }

    draw() {
        this.game.context.fillText(this.text, 100, 290)

    }

    update() {

    }
}

class SceneTitle extends KangScene {
    constructor(game) {
        super(game)
        this.game.registerAction('k', () => {
            game.replaceScene(new Scene(game))
        })

        this.label = new KangLabel(game, 'test text')
        this.addElements(this.label)
        this.runDemo = new KangAnimation(game, 10, 10)
        this.addElements(this.runDemo)

        this.setupInputs()
    }

    setupInputs() {
        const self = this
        self.game.registerAction('a', () => {
            self.runDemo.move(-2)
        })
        self.game.registerAction('d', () => {
            self.runDemo.move(2)
        })
    }

    draw() {
        super.draw()
        // 画出 分数
        this.game.context.fillText(`按 k 开始游戏`, 100, 350)
    }


}

export default SceneTitle