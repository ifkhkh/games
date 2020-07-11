// 场景
class KangScene {
    constructor(game) {
        this.game = game
    }

    static new(game) {
        const i = new this(game)
        return i
    }

    draw() {
        // 希望后代必须继承重构的函数可以添加默认行为来提醒
        console.log('重构我 draw')
    }

    update() {

    }
}

export default KangScene