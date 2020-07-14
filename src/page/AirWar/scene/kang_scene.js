// 场景

class KangScene {
    constructor(game) {
        this.game = game
        this.elements = []
        this.debugModeEnabled = true
    }

    static new(game) {
        const i = new this(game)
        return i
    }

    addElements(kangImage) {
        kangImage.scene = this
        this.elements.push(kangImage)
    }

    draw() {
        const eList = this.elements
        for (let i = 0; i < eList.length; i++) {
            const e = eList[i]
            // this.game.drawImage(e)
            e.draw(e)
        }
    }

    update() {
        const eList = this.elements
        for (let i = 0; i < eList.length; i++) {
            const e = eList[i]
            // log(e, '-----e :::  is here-----')
            e.update && e.update()
        }
        if (this.debugModeEnabled) {
            for (let i = 0; i < eList.length; i++) {
                const e = eList[i]
                e.debug && e.debug()
            }
        }
    }
}

export default KangScene