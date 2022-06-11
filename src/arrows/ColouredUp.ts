import {scene} from '../index'


export const createColourUpArrow = (speed, shouldRelease): { create: Function } => {
    return {
        create: (): { updateSprite: (misses) => void; sprite: Phaser.Physics.Arcade.Sprite & { body: Phaser.Physics.Arcade.Body }; shouldRelease: any } => {
            const props = {
                x: (scene.renderer.width / 2) * 0.70 + 200,
                y: 0
            }
            const body = scene.physics.add.sprite(props.x, props.y, "ColorUp")
            body.scale = 0.70
            body.visible = false
            body.body.enable = true
            let passed = false
            body.setDepth(1)
            const updateSprite = (misses) => {
                body.y += 1 * speed
                body.body.y += 1 * speed
                if(body.y > scene.renderer.height - 100 && !body.isTinted) {
                    if(!passed) {
                        misses.setMisses(1)
                        misses.setScore( -1)
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