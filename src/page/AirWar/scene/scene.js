import {log, randomBetween} from "../../../utils/utils";
import KangScene from "./kang_scene";
import {KangImage} from "../kanggame/kang_image";

class Bullet extends KangImage {
    constructor(game) {
        super(game, 'bullet');
        this.setup()
    }

    setup() {
        this.speed = window.config.bullet_speed
    }

    update() {
        this.y -= this.speed
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
    }

    moveLeft() {
        this.x -= this.speed
        if (this.x <= 0) {
            this.x = 0
        }
    }

    moveRight() {
        log('right----- :::  is here-----')
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
        if (this.cooldown > 0) {
            this.cooldown--
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
    }

    update() {
        this.y += this.speed
        if (this.y >= 600) {
            this.setup()
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
        this.addEnemies() // 敌军
    }

    addClouds() {
        for (let i = 0; i < this.numberOfClouds; i++) {
            const e = new Cloud(this.game)
            this.addElements(e)
            this.clouds.push(e)
        }
    }

    addEnemies() {
        for (let i = 0; i < this.numberOfEnemies; i++) {
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
        super.update();
    }

    // draw = () => {
    //     // this.game.drawImage(this.bg)
    //     // this.game.drawImage(this.player)
    // }

    static instance = (...params) => {
        if (this.i === undefined) {
            this.i = new this(...params)
        }
        return this.i
    }
}

// const Scene = (game) => {
//     const s = {
//         game: game,
//     }
//
//     // 初始化
//     const paddle = Paddle(game)
//     const ball = Ball(game)
//     let score = 0
//
//     window.blocks = loadLevel(game, levels, 1)
//
//
//     // 游戏事件注册
//     game.registerAction('a', paddle.moveLeft) // 左移
//     game.registerAction('d', paddle.moveRight) // 右移
//     game.registerAction('f', ball.fire) // 开始
//
//     s.draw = () => {
//
//         game.drawImage(paddle)
//         game.drawImage(ball)
//
//         // block
//         window.blocks.forEach(b => {
//             if (b.alive) {
//                 game.drawImage(b)
//             }
//         })
//
//         // 画出 分数
//         game.context.fillText(`分数: ${score}`, 10, 290)
//     }
//
//     s.update = () => {
//         if (window.paused) {
//             return
//         }
//         ball.move()
//         // 挡板和球
//         if (ball.y + ball.h >= paddle.y + paddle.h) {
//             // 跳转游戏结束场景
//             const end = SceneEnd.new(game)
//             game.replaceScene(end)
//             return
//         }
//         if (paddle.collide(ball)) {
//             ball.rebound()
//         }
//
//         // 球和砖块
//         window.blocks.forEach(b => {
//             if (b.collide(ball)) {
//                 ball.rebound()
//                 b.kill()
//
//                 // 更新分数
//                 score += 10
//                 log(score, '-----score :::  is here-----')
//             }
//         })
//     }
//
//     // mouse event
//     let enableDrag = false
//     let deltaX = 0
//     let deltaY = 0
//     game.canvas.addEventListener('mousedown', event => {
//         const x = event.offsetX
//         const y = event.offsetY
//         if (ball.hasPoint(x, y)) {
//             enableDrag = true
//             deltaX = x - ball.x
//             deltaY = y - ball.y
//             log(x, y, 'down-----x, y :::  is here-----')
//         }
//     })
//     game.canvas.addEventListener('mousemove', event => {
//         const x = event.offsetX
//         const y = event.offsetY
//         if (ball.hasPoint(x, y) && enableDrag) {
//
//             log(x-deltaX, y-deltaY, 'move-----x, y :::  is here-----')
//             ball.x = x - deltaX
//             ball.y = y - deltaY
//         }
//     })
//     game.canvas.addEventListener('mouseup', event => {
//         const x = event.offsetX
//         const y = event.offsetY
//         if (ball.hasPoint(x, y)) {
//             enableDrag = false
//             log(x, y, 'up-----x, y :::  is here-----')
//         }
//     })
//
//     return s
// }

export default Scene