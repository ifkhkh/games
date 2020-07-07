import React, {useEffect} from "react";
import _css from './page.module.css'
import {_e, log} from "../../utils/utils";
import paddlePng from './paddle.png'

const Page = function () {


    const __main = () => {
        const canvas = _e('#id-canvas')
        const context = canvas.getContext('2d')

        const img = new Image()
        img.src = paddlePng
        img.onload = () => {
            context.drawImage(img, 100, 250);
        }

    }

    useEffect(__main, [])

    return (
        <div>
            <canvas
                id='id-canvas'
                width={400}
                height={300}
            />
        </div>
    )
}

export default Page