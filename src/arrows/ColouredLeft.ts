import {scene} from '../index'
import Image = Phaser.GameObjects.Image;


function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}


const shouldRelease = () => {
    return randomIntFromInterval(1, 6)
}


export const createColourLeftArrow = (speed, shouldRelease): { create: Function } => {
    return {
        create: (): { updateSprite: Function, sprite: Image, shouldRelease: number } => {
            const props = {
                x: (scene.renderer.width / 2) * 0.70,
                y: 0
            }
            const body = scene.physics.add.sprite(props.x, props.y, "ColorLeft")
            body.scale = 0.70
            body.visible = false
            body.body.enable = true
            body.setDepth(1)
            let passed = false
            const updateSprite = (misses) => {
                if(body.y >= scene.renderer.height) {
                    body.visible = false
                    // body.destroy()
                }
                body.y += 1 * speed
                body.body.y += 1 * speed
                if(body.y > scene.renderer.height - 100 && !body.isTinted) {
                    if(!passed) {
                        misses.setMisses(1)
                        misses.setScore(-1)
                        passed = true
                    }
                }
                if(body.body.onWorldBounds) {
                    body.body.destroy()
                }
            }
            return {
                sprite: body,
                shouldRelease: shouldRelease,
                updateSprite
            }

        }
    }

}