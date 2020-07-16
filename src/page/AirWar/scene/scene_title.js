import Scene from "./scene"
import KangScene from "./kang_scene";
import {KangImage} from "../kanggame/kang_image";
import {log, randomBetween} from "../../../utils/utils";

// 抽象出来的类似 kangimage
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

// class KangLabel {
//     constructor(game, text) {
//         this.game = game
//         this.text = text
//     }
//
//     draw() {
//         this.game.context.fillText(this.text, 100, 290)
//
//     }
//
//     update() {
//
//     }
// }

class KangParticle extends KangImage{
    constructor(game) {
        super(game, 'fire');
        this.setup()
    }

    setup() {
        // this.life = 20
    }

    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }


    update() {
        this.x += this.vx
        this.y += this.vy
        this.加速度 = 0.01
        this.vx += this.vx * this.加速度
        this.vy += this.vy * this.加速度
        // this.life--
    }

    // draw()
}

class KangParticleSystem {
    constructor(game) {
        this.game = game
        this.setup()
    }

    setup() {
        this.x = 150
        this.y = 200
        this.numberOfParticles = 100
        this.particles = []
    }

    update() {
        if (this.particles.length < this.numberOfParticles) {
            // 添加小火花
                const p = new KangParticle(this.game)
                const vx = randomBetween(-10, 10)
                const vy = randomBetween(-10, 10)
                // 设置初始坐标和速度
                p.init(this.x, this.y, vx, vy)
                this.particles.push(p)
        }

        // 更新所有的小火花
        this.particles.forEach(p => p.update())

        // 删除死掉的小火花
        // this.particles = this.particles.filter(who => who.life > 0).concat()

        // console.log(this.particles)
        // debugger
    }

    draw() {
        // 绘制所有的小火花
        this.particles.forEach(p => p.draw())
    }

}

class SceneTitle extends KangScene {
    constructor(game) {
        super(game)
        this.game.registerAction('k', () => {
            game.replaceScene(new Scene(game))
        })

        this.label = new KangLabel(game, 'dudududu')
        this.addElements(this.label)
        const ps = new KangParticleSystem(game)
        this.addElements(ps)
    }

    draw() {
        super.draw()
        // 画出 分数
        // this.game.context.fillText(`按 k 开始游戏`, 100, 350)
    }
}

export default SceneTitle