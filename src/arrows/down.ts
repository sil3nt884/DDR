import {scene} from '../index'


export default function down() {
    const down = {
        x: (scene.renderer.width / 2) * 0.70 + 100,
        y: scene.renderer.height - 100,

    }
    const sprite = scene.physics.add.sprite(down.x, down.y, "down")
    sprite.body.enable = true
    sprite.scale = 0.70
    return sprite
}