import React, {useEffect} from "react";
import {Cards, genCardGroup, shuffle} from "./Card";
import _css from './page.module.css'
const log = console.log.bind(console)


const card = new Cards()
const bottomList = [
    card.releaseCard(1),
    card.releaseCard(2),
    card.releaseCard(3),
    card.releaseCard(4),
    card.releaseCard(5),
    card.releaseCard(6),
    card.releaseCard(7),
]
log(bottomList, card.allCards, '-----redPeachs :::  is here-----')

window.dragTarget = null

const Page = function () {

    useEffect(() => {



    }, [])


    const handleDrag = e => {
        e.target.style.backgroundColor = 'red'
        e.dataTransfer.setData("text/plain", e.target.innerText);
    }

    const handleEnter = e => {
        // log
    }

    const renderBottomList = list => {
        return list.map((item, index) => {
            log(item, '-----item :::  is here-----')
            if (item.show) {
                return (
                    <div key={index}
                         style={{
                             top: `${index * 20}px`,
                             backgroundColor: item.color,
                         }}
                         className={_css.bottomItem}
                         draggable
                         onDrag={(e) => {
                             if (window.dragTarget === null) {
                                 window.dragTarget = item
                                 log(window.dragTarget, '-----window.dragTarget :::  is here-----')
                             }
                         }}

                         onDragEnd={e => {
                             window.dragTarget = null
                         }}

                         onDragEnter={e => {
                             log(item, 'enter-----item :::  is here-----')
                             if (window.dragTarget) {
                                 const drag = window.dragTarget
                                 const self = item
                                 if (self.number - drag.number === 1 && self.color !== drag.number) {
                                     log('right----- :::  is here-----')
                                 }
                             }
                         }}
                    >
                        {`${item.name}${item.char}`}
                    </div>
                )
            } else {
                return (
                    <div
                        key={index}
                        className={_css.bottomItem}
                        style={{
                            top: `${index * 20}px`,
                        }}
                    />
                )
            }

        })
    }

    const renderBottom = () => {
        return bottomList.map((list, index) => {
            return (
                <div key={index}
                     className={_css.bottomList}>
                    {renderBottomList(list)}
                </div>
            )
        })
    }

    return (
        <div className={_css.main}>
            <div className={_css.head}>
                <div className={_css.card} draggable onDrag={handleDrag}></div>
                <div className={_css.card} onDragEnter={handleEnter}></div>
            </div>
            <div className={_css.bottom}>
                {renderBottom()}
            </div>
        </div>
    )
}

export default Page