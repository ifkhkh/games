class KangAnimation {
    constructor(game) {
        this.game = game
    }

    setup() {
        this.frames = []
        for (let i = 0; i < 10; i++) {
            const name = `w$${i}`
            const t = this.game.textureByName(name)
            this.frames.push(t)
        }
        this.texture = this.frames[0]
        this.frameIndex = 0
        this.frameCount = 3

    }

    update() {
        this.frameCount--
        if (this.frameCount === 0) {
            this.frameCount = 3
            const len = this.frames.length
            this.frameIndex = (this.frameIndex + 1 + len) % len
            this.texture = this.frames[this.frameIndex]
        }
    }

    draw() {

    }
}