class KangImage {
    constructor(game, name) {
        this.game = game
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
    }

    static new = (game, name) => {
        return this.i || new this(game, name)
    }

    static instance = (...params) => {
        if (this.i === undefined) {
            this.i = new this(...params)
        }
        return this.i
    }

    draw() {
        // 抽象到 game.drawImage 里统一 draw
        // 等于是内部的 element 变得更抽象了
        this.game.drawImage(this)
    }
}

export {
    KangImage
}