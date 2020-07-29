import React from "react";
import {
    Test,
    BreakBricks,
    AirWar,
    Solitaire,
} from "./index";

const Error = function () {

    return (
        <div>404</div>
    )
}


const routeMap = [
    {
        path: '/',
        component: Test,
        exact: true,
    },
    {
        path: '/404',
        component: Error,
        exact: true,
    },
    {
        path: '/break_bricks',
        component: BreakBricks,
        exact: true,
    },
    {
        path: '/air_war',
        component: AirWar,
        exact: true,
    },

    {
        path: '/solitaire',
        component: Solitaire,
        exact: true,
    },

]

export default routeMap