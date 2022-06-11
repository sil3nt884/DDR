import {scene} from '../index'


export default function up() {
    const up = {
        x: (scene.renderer.width / 2) * 0.70 + 200,
        y: scene.renderer.height - 100,

    }
    const sprite = scene.physics.add.sprite(up.x, up.y, "up")
    sprite.body.enable = true
    sprite.scale = 0.70
    return sprite
}