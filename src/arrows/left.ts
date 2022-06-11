import {scene} from '../index'


export default function left() {
    const left = {
        x: (scene.renderer.width / 2) * 0.70,
        y: scene.renderer.height - 100,

    }
    const sprite = scene.physics.add.sprite(left.x, left.y, "left")
    sprite.body.enable = true
    sprite.scale = 0.70
    return sprite
}