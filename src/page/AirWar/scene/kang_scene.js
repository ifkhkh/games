// 场景
class KangScene {
    constructor(game) {
        this.game = game
        this.elements = []
    }

    static new(game) {
        const i = new this(game)
        return i
    }

    addElements(kangImage) {
        this.elements.push(kangImage)
    }

    draw() {
        // 希望后代必须继承重构的函数可以添加默认行为来提醒
        console.log('重构我 draw')
        const eList = this.elements
        for (let i = 0; i < eList.length; i++) {
            const e = eList[i]
            this.game.drawImage(e)
        }
    }

    update() {

    }
}

export default KangScene