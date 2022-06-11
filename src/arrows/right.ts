import {scene} from '../index'


export default function right() {
    const right = {
        x: (scene.renderer.width / 2) * 0.70 + 300,
        y: scene.renderer.height - 100,

    }
    const sprite = scene.physics.add.sprite(right.x, right.y, "right")
    sprite.body.enable = true
    sprite.scale = 0.70
    return sprite


}