import { createColourArrow } from "../arrows/ColouredRight";
import { createColourDownArrow } from "../arrows/ColouredDown"
import { createColourLeftArrow } from "../arrows/ColouredLeft"
import { createColourUpArrow } from "../arrows/ColouredUp";

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}



export default function  level1 () {
    const speed = 2
    const arrows = [
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 0, 1, 0],
        [1, 1, 1, 1],
        [1, 0, 1, 0],
        [1, 0, 1, 0],
        [1, 0, 1, 0],
        [1, 1, 1, 1],
        [1, 0, 1, 0],
        [1, 0, 1, 0],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 0, 1, 0],
        [1, 0, 1, 0],
        [1, 0, 1, 0],
        [1, 0, 1, 0],
        [1, 0, 1, 0],
        [1, 0, 1, 0],
        [1, 0, 1, 0],
    ]
    const levelCreate = () => {
        return arrows.map(row => {
            return row.map((cell, index) => {
                switch (index) {
                    case 0:
                        return {greenArrow: createColourArrow(speed+ randomIntFromInterval(1, speed) , cell).create()}

                        break
                    case 1:
                        return {downArrow: createColourDownArrow(speed +randomIntFromInterval(1, speed) , cell).create()}
                        break
                    case 2:
                        return {leftArrow: createColourLeftArrow(speed +randomIntFromInterval(1, speed) , cell).create()}
                        break
                    case 3:
                        return {upArrow: createColourUpArrow(speed + randomIntFromInterval(1, speed) , cell).create()}
                }
            })
        })
    }
    const levelArrows = levelCreate().map((row, index) => {
        return {[`row${index}`]: row}
    })
    return {
        levelArrows
    }
}