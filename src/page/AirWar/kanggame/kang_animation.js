class KangAnimation {
    constructor(game, x, y) {
        this.game = game
        this.x = x
        this.y = y
        this.setup()
    }

    setup() {
        // 硬编码一套动画
        this.frames = []
        for (let i = 1; i < 5; i++) {
            const name = `w${i}`
            const t = this.game.textureByName(name)
            this.frames.push(t)
        }
        this.texture = this.frames[0]
        this.frameIndex = 0
        this.frameCount = 3  //帧数

    }

    update() {
        this.frameCount--
        // 每 3 帧更新图片
        if (this.frameCount === 0) {
            this.frameCount = 3
            const len = this.frames.length
            this.frameIndex = (this.frameIndex + 1 + len) % len
            this.texture = this.frames[this.frameIndex]
        }
    }

    draw() {
        this.game.drawImage(this)
    }

    move(x) {
        this.x += x
    }
}

export default KangAnimation