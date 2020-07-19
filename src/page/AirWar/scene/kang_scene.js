// 场景

class KangScene {
    constructor(game) {
        this.game = game
        this.elements = []
        this.id = 0
        this.debugModeEnabled = true
    }

    static new(game) {
        const i = new this(game)
        return i
    }

    idTemp() {
        this.id = this.id + 1
        return this.id
    }

    addElements(kangImage) {
        kangImage.scene = this
        // 所有增加到场景内的 元素 都有个 id
        kangImage.id = this.idTemp()
        this.elements.push(kangImage)
    }

    removeElement(id) {
        const index = this.elements.findIndex(who => who.id=== id)
        this.elements.splice(index, 1)
        console.log(id, this.elements, 'remove')
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