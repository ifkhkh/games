import {Paddle} from "../paddle";
import {Ball} from "../ball";
import {log} from "../../../utils/utils";
import {levels, loadLevel} from "../level";
import SceneEnd from "./scene_end";
// import KangScene from "./kang_scene";

// class Scene extends KangScene {
//     constructor(...params) {
//         super(...params)
//     }
// }

const Scene = (game) => {
    const s = {
        game: game,
    }

    // 初始化
    const paddle = Paddle(game)
    const ball = Ball(game)
    let score = 0

    window.blocks = loadLevel(game, levels, 1)


    // 游戏事件注册
    game.registerAction('a', paddle.moveLeft) // 左移
    game.registerAction('d', paddle.moveRight) // 右移
    game.registerAction('f', ball.fire) // 开始

    s.draw = () => {

        game.drawImage(paddle)
        game.drawImage(ball)

        // block
        window.blocks.forEach(b => {
            if (b.alive) {
                game.drawImage(b)
            }
        })

        // 画出 分数
        game.context.fillText(`分数: ${score}`, 10, 290)
    }

    s.update = () => {
        if (window.paused) {
            return
        }
        ball.move()
        // 挡板和球
        if (ball.y + ball.h >= paddle.y + paddle.h) {
            // 跳转游戏结束场景
            const end = SceneEnd.new(game)
            game.replaceScene(end)
            return
        }
        if (paddle.collide(ball)) {
            ball.rebound()
        }

        // 球和砖块
        window.blocks.forEach(b => {
            if (b.collide(ball)) {
                ball.rebound()
                b.kill()

                // 更新分数
                score += 10
                log(score, '-----score :::  is here-----')
            }
        })
    }

    // mouse event
    let enableDrag = false
    let deltaX = 0
    let deltaY = 0
    game.canvas.addEventListener('mousedown', event => {
        const x = event.offsetX
        const y = event.offsetY
        if (ball.hasPoint(x, y)) {
            enableDrag = true
            deltaX = x - ball.x
            deltaY = y - ball.y
            log(x, y, 'down-----x, y :::  is here-----')
        }
    })
    game.canvas.addEventListener('mousemove', event => {
        const x = event.offsetX
        const y = event.offsetY
        if (ball.hasPoint(x, y) && enableDrag) {

            log(x-deltaX, y-deltaY, 'move-----x, y :::  is here-----')
            ball.x = x - deltaX
            ball.y = y - deltaY
        }
    })
    game.canvas.addEventListener('mouseup', event => {
        const x = event.offsetX
        const y = event.offsetY
        if (ball.hasPoint(x, y)) {
            enableDrag = false
            log(x, y, 'up-----x, y :::  is here-----')
        }
    })

    return s
}

export default Scene