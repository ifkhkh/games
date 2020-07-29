class Card {
    constructor(
        {
            name,
            number,
            char,
            icon,
            color,
        }
    ) {
        this.name = name
        this.number = number
        this.char = char
        this.icon = icon
        this.color = color
        this.show = false
    }
}

const symbolDict = {
    '1': 'A',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '10': '10',
    '11': 'J',
    '12': 'Q',
    '13': 'K',
}

const genCardGroup = (name) => {
    const r = []
    const colorDict = {
        '红桃': 'red',
        '黑桃': 'gray',
        '方块': 'red',
        '梅花': 'gray',
    }
    for (let i = 1; i < 14; i++) {
        r.push(new Card({
            number: i,
            char: symbolDict[i],
            icon: 'icon',
            name: name,
            color: colorDict[name],
        }))
    }
    return r
}

const shuffle = (arr) => {
    if (!arr || !Array.isArray(arr)) {
        throw '错误，请传入正确的数组格式';
    }

    const newArr = arr.slice(0);
    for (let i = newArr.length - 1; i >= 0; i--) {
        // 随机范围[0,1)
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const itemAtIndex = newArr[randomIndex];
        newArr[randomIndex] = newArr[i];
        newArr[i] = itemAtIndex;
    }

    return newArr;
}

class Cards {
    constructor() {
        this.setup()
    }

    setup() {
        const redPeachs = genCardGroup('红桃')
        const blackPeachs = genCardGroup('黑桃')
        const blocks = genCardGroup('方块')
        const flowers  = genCardGroup('梅花')
        this.allCards = shuffle([...redPeachs, ...blackPeachs, ...blocks, ...flowers])
    }

    releaseCard(count) {
        const l = this.allCards.splice(0, count)
        l[l.length - 1].show = true
        return l
    }
}

export {
    genCardGroup,
    shuffle,
    Cards,
}