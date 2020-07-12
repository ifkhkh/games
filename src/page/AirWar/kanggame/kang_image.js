class KangImage {
    constructor(game, name) {
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
    }

    static new = (...params) => {
        return new this(...params)
    }
}

// 逻辑上不应该继承, 但是先这么做吧
class Player extends KangImage {
    constructor(game, name) {
        super(game, name)

    }

}

export {
    KangImage
}