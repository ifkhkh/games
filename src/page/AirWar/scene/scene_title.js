import Scene from "./scene"
import KangScene from "./kang_scene";
import KangParticleSystem from "../kanggame/kang_particle_system";

// 抽象出来的类似 kangmage
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
        const ps = new KangParticleSystem(game)
        this.addElements(ps)
    }

    draw() {
        super.draw()
        // 画出 分数
        this.game.context.fillText(`按 k 开始游戏`, 100, 350)
    }
}

export default SceneTitle