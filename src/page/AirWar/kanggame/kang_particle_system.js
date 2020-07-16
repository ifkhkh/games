import {KangImage} from "./kang_image";
import {randomBetween} from "../../../utils/utils";

class KangParticle extends KangImage {
    constructor(game, x, y) {
        super(game, 'fire');
        this.setup(x, y)
    }

    setup(x, y) {
        this.x = x
        this.y = y
        // 设置初始坐标和速度

        const r = 5
        const vx = randomBetween(-r, r)
        const vy = randomBetween(-r, r)
        this.vx = vx
        this.vy = vy
        // 粒子消失的帧数
        this.life = 6

    }

    update() {
        this.x += this.vx
        this.y += this.vy
        this.加速度 = 0.01
        this.vx += this.vx * this.加速度
        this.vy += this.vy * this.加速度
        // this.vy += this.vy * this.加速度 + 2 // 加上重力
        this.life-- // 按帧数计数
    }
}

class KangParticleSystem {
    constructor(game, x, y) {
        this.game = game
        this.setup(x, y)
    }

    setup(x, y) {
        this.x = x || 150
        this.y = y || 200
        this.numberOfParticles = 10
        this.particles = []
    }

    update() {
        // 判断火花数量
        if (this.particles.length < this.numberOfParticles) {
            // 添加小火花
            const p = new KangParticle(this.game, this.x, this.y)
            this.particles.push(p)
        }

        // 更新所有的小火花
        this.particles.forEach(p => p.update())

        // 根据指定帧数, 删除死掉的小火花, 限定爆炸范围
        this.particles = this.particles.filter(who => who.life > 0).concat()

    }

    draw() {
        // 绘制所有的小火花
        this.particles.forEach(p => p.draw())
    }

}

export default KangParticleSystem