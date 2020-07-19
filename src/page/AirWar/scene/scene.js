import {randomBetween, rectCollide} from "../../../utils/utils";
import KangScene from "./kang_scene";
import {KangImage} from "../kanggame/kang_image";
import KangParticleSystem from "../kanggame/kang_particle_system";
import SceneEnd from "./scene_end";

class Bullet extends KangImage {
    constructor(game) {
        super(game, 'bullet');
        this.game = game
        this.setup()
    }

    setup() {
        this.speed = window.config.bullet_speed
    }

    update() {
        this.y -= this.speed
        this.game.scene.enemies.forEach(e => {
            const collide = rectCollide({
                x1: e.x,
                y1: e.y,
                w1: e.w,
                h1: e.h,
                x2: this.x,
                y2: this.y,
                w2: this.w,
                h2: this.h,
            })
            if (collide) {
                // 如果子弹跟场景中的敌人碰撞
                // 敌人死了
                e.die = true
            }
        })
        if (this.y < 0) {
            this.die()
        }
    }

    die() {
        this.game.scene.removeElement(this.id)
    }

    debug() {
        this.speed = window.config.bullet_speed
    }
}

class Player extends KangImage {
    constructor(game) {
        super(game, 'player');
        this.setup()
    }

    setup() {
        this.speed = window.config.player_speed
        this.cooldown = 0 // 冷却时间
        this.coolDownMax = window.config.fire_cooldown
        this.die = false
    }

    moveLeft() {
        this.x -= this.speed
        if (this.x <= 0) {
            this.x = 0
        }
    }

    moveRight() {
        // log('right----- :::  is here-----')
        this.x += this.speed
        if (this.x >= 400 - this.w) {
            this.x = 400 - this.w
        }
    }

    moveDown() {
        this.y += this.speed
        if (this.y >= 600 - this.h) {
            this.y = 600 - this.h
        }
    }

    moveUp() {
        this.y -= this.speed
        if (this.y <= 0) {
            this.y = 0
        }
    }

    fire() {
        if (this.cooldown === 0) {
            const x = this.x + this.w / 2
            const y = this.y
            const b = new Bullet(this.game)
            b.x = x - b.w / 2
            b.y = y - b.h
            this.scene.addElements(b)
            this.cooldown = this.coolDownMax
        }
    }

    update() {
        if (this.die) {
            this.game.scene.dieWithParticle(this)
            const n = setTimeout(() => {
                this.game.replaceScene(SceneEnd.new(this.game))
                clearTimeout(n)
            }, 200)
            return
        }
        if (this.cooldown > 0) {
            this.cooldown--
        }

        // 检测敌我碰撞
        const p = this
        const enemies = this.game.scene.enemies
        for (let i = 0; i < enemies.length; i++) {
            const e = enemies[i]
            const boom = rectCollide({
                x1: e.x,
                y1: e.y,
                w1: e.w,
                h1: e.h,
                x2: p.x,
                y2: p.y,
                w2: p.w,
                h2: p.h,
            })
            if (boom) {
                p.die = true
                break
            }
        }
    }

    debug() {
        this.speed = window.config.player_speed
        this.coolDownMax = window.config.fire_cooldown
    }
}

class Enemy extends KangImage {
    constructor(game) {
        const type = randomBetween(0, 2)
        super(game, `enemy${type}`);
        this.setup()
    }

    setup() {
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
        this.die = false
    }

    update() {
        this.y += this.speed
        if (this.y >= 600) {
            this.setup()
        }
        if (this.die) {
            this.game.scene.dieWithParticle(this)
        }
    }

}

class Cloud extends KangImage {
    constructor(game) {
        const type = randomBetween(0, 2)
        super(game, `cloud${type}`);
        this.setup()
    }

    setup() {
        this.speed = window.config.cloud_speed
        this.x = randomBetween(0, 380)
        this.y = -randomBetween(0, 300)
    }

    update() {
        this.y += this.speed
        if (this.y >= 600) {
            this.setup()
        }
    }

    debug() {
        this.speed = window.config.cloud_speed
    }

}

class Scene extends KangScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }

    setup() {
        const game = this.game
        this.numberOfEnemies = 5
        this.enemies = []
        this.numberOfClouds = 5
        this.clouds = []
        this.bg = KangImage.new(game, 'sky')
        this.player = new Player(game)
        this.player.x = 100
        this.player.y = 150

        this.addElements(this.bg) // 背景
        this.addClouds() // 云朵
        this.addElements(this.player) // 飞机
        // this.addEnemies() // 敌军

        // this.addElements(new KangParticleSystem(game))
    }

    addClouds() {
        for (let i = 0; i < this.numberOfClouds; i++) {
            const e = new Cloud(this.game)
            this.addElements(e)
            this.clouds.push(e)
        }
    }

    addEnemies() {
        // for (let i = 0; i < this.numberOfEnemies; i++) {
        //     const e = new Enemy(this.game)
        //     this.addElements(e)
        //     this.enemies.push(e)
        // }
        // 更新本场景敌人
        this.enemies = this.enemies.filter(who => !who.die)
        // 补充死掉删除的敌人
        if (this.enemies.length < this.numberOfEnemies) {
            const e = new Enemy(this.game)
            this.addElements(e)
            this.enemies.push(e)
        }
    }

    setupInputs() {
        const g = this.game
        const p = this.player
        // 游戏事件注册
        g.registerAction('a', p.moveLeft.bind(p))
        g.registerAction('d', p.moveRight.bind(p))
        g.registerAction('s', p.moveDown.bind(p))
        g.registerAction('w', p.moveUp.bind(p))
        g.registerAction('j', p.fire.bind(p))
    }

    update() {
        // 动态更新敌人
        this.addEnemies()
        super.update();
    }

    // draw = () => {
    //     // this.game.drawImage(this.bg)
    //     // this.game.drawImage(this.player)
    // }

    dieWithParticle(element) {
        // 击中死亡就爆炸
        const x = element.x + element.w / 2
        const y = element.y + element.h / 2
        const boom = new KangParticleSystem(this.game, x, y)
        this.addElements(boom)
        // 死了就爆炸并且删除
        this.removeElement(element.id)
    }

    static instance = (...params) => {
        if (this.i === undefined) {
            this.i = new this(...params)
        }
        return this.i
    }
}

export default Scene