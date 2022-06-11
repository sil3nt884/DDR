import "./index"
import {game, scene} from "./index";
import Up from './arrows/up'
import left from './arrows/left'
import down from './arrows/down'
import right from "./arrows/right";
import level1 from '../src/levels/level1'
import level2 from "../src/levels/level2";
import level3 from "../src/levels/level3";
import up from "./arrows/up";
import level4 from "./levels/level4";

class ArrowQueue {
    queue;
    timer;
    misses = 0;
    score = 0
    maxSize = 1;
    delay  = 0

    constructor(delay = 0) {
        this.queue = []
        this.timer = 0
        if(delay) {
            this.delay = delay
        }


    }

    addArrow (arrow) {

        if(this.queue.length < this.maxSize) {
            this.queue.push(arrow)
        }
        console.log("queue full")
    }

    getMaxSize () {
        return this.maxSize
    }

    deleteQueue () {
        this.queue = []
    }

    size () {
        return this.queue.length
    }

    setMisses(misses) {
        this.misses += misses
    }

    setScore (score ) {
        this.score += score
    }

    getScore () {
        return this.score
    }

    async updateAll({leftSprite, rightSprite, downSprite, upSprite , delta}) {
            this.timer += delta;
            if(this.timer >= this.delay) {
                const arrows = this?.queue[0]
                if(!arrows) {
                    return
                }
                const key = Object.keys(arrows)[0]
                let currentRow = [...arrows[key]]
                const uppdateAll = () => {
                    let showArrow = []
                    return new Promise<void>(resolve => {
                        currentRow.forEach((arrow, index, array) => {
                            const key = [...Object.keys(arrow)][0]
                            let currentArrow = arrow[key]
                            if (currentArrow.shouldRelease === 1) {
                                currentArrow.sprite.visible = true
                                currentArrow.updateSprite(this)
                                scene.physics.collide(currentArrow.sprite, leftSprite, () => game.events.emit("leftArrowHit", currentArrow.sprite, leftSprite))
                                scene.physics.collide(currentArrow.sprite, rightSprite, () => game.events.emit("rightArrowHit", currentArrow.sprite, rightSprite))
                                scene.physics.collide(currentArrow.sprite, downSprite, () => game.events.emit("downArrowHit", currentArrow.sprite, downSprite))
                                scene.physics.collide(currentArrow.sprite, upSprite, () => game.events.emit("upArrowHit", currentArrow.sprite, upSprite))
                                showArrow.push(currentArrow)
                            } else {
                                return
                            }
                            if (currentArrow.sprite.y > scene.renderer.height) {
                                currentArrow.sprite.visible = false
                            }
                        })
                        const endedArrows = showArrow.every(showArrow => {
                            if (showArrow.sprite.y > scene.renderer.height) {
                                return showArrow
                            }
                        })
                        if (endedArrows) {
                            resolve()
                        }
                    })


                }


                await uppdateAll()
                this.deleteQueue()
            }
    }
}




const queue = new ArrowQueue();
const queue2 = new ArrowQueue(1000);
const queue3 = new ArrowQueue(1000);
const queue4 = new ArrowQueue(1000);
(async () => {
    const assets = ['up.png', 'down.png', 'left.png', 'right.png', 'ColoredRight.png', 'ColorDown.png', 'ColorLeft.png', "ColorUp.png"]
    scene.setGamesFiles(assets)
    scene.preload()
    let levelArrows = []
    let rightSprite = undefined
    let leftSprite = undefined
    let downSprite = undefined
    let upSprite = undefined
    let downUp = false,
        downLeft = false,
        downDown = false,
        downRight = false
    let timer = 0
    let currentLevel = 0
    let text;
    let levels
    let levelText;
    let missesText;
    let maxScore;
    let maxScoreText;
    scene.create = async () => {
         levels = [level1(), level2(), level3(), level4()]
       // levels = [level4()]

        rightSprite = right()
        downSprite = down()
        leftSprite = left()
        upSprite = Up()
        levelArrows = [...levels[currentLevel].levelArrows]

        const all = levels.map(async (level) =>{
            const levelArrows = level.levelArrows
            let totalArrows = []
            const waitForCount =  () => {
                return new Promise<void>(resolve => {
                    levelArrows.forEach(arrow => {
                        const key = Object.keys(arrow)[0]
                        const currentRow = arrow[key]
                        currentRow.forEach(arrow => {
                            const key  = Object.keys(arrow)[0]
                            const currentArrow = arrow[key]
                            const shouldRelease = currentArrow.shouldRelease
                            if(shouldRelease) {
                                totalArrows.push(currentArrow)
                            }
                        })
                    })
                    resolve()
                })
            }
            await waitForCount()
            return totalArrows
        })
        const p = await Promise.all(all)
        maxScore = p.map((a) =>  a.length).reduce((a,b) => a+b)


        scene.physics.world.enable([rightSprite, upSprite, downSprite, leftSprite])
        const keys: any = scene.input.keyboard.addKeys("d,f,j,k", true, true)

        keys.j.on('down', () => {
           const held = Phaser.Input.Keyboard.DownDuration(keys.j,  1)
           if(held) {
               downUp = true
           }
           else {
               downUp = false
           }

        })
        keys.f.on('down', () => {
            const held = Phaser.Input.Keyboard.DownDuration(keys.f, 1)
            if(held) {
                downDown = true
            }
            else {
                downDown = false
            }
        })
        keys.d.on('down', () => {
            const held = Phaser.Input.Keyboard.DownDuration(keys.d, 1)
            if(held) {
                downLeft = true
            }
            else {
                downLeft = false
            }

        })
        keys.k.on('down', () => {
            const held = Phaser.Input.Keyboard.DownDuration(keys.k, 1)
            if(held) {
                downRight = true
            }
            else {
                downRight = false
            }
        })

        keys.j.on('up', () => {
            downUp = false
            upSprite.clearTint()
        })
        keys.f.on('up', () => {
            downDown = false
            downSprite.clearTint()
        })
        keys.d.on('up', () => {
            downLeft = false
            leftSprite.clearTint()
        })
        keys.k.on('up', () => {
            downRight = false
            rightSprite.clearTint()
        })
        text = scene.add.text(0, 100, `Score ${queue.getScore()}`, { color: "#FFFFFF",fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        levelText = scene.add.text(0, 200, `Level ${currentLevel}`, { color: "#FFFFFF",fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        missesText = scene.add.text(0, 300, `Misses ${0}`, { color: "#FFFFFF",fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
        maxScoreText = scene.add.text(0, 400, `Max Score ${maxScore}`, { color: "#FFFFFF",fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
    }

    scene.start = () => {
        scene.update =  (time, delta) => {

            timer += delta
            if(timer> 3000) {
                missesText.setText(`Misses ${queue.misses + queue2.misses + queue3.misses + queue4.misses}`)
                text.setText(`Score ${queue.getScore()+queue2.getScore() + queue3.getScore() + queue4.getScore()}`)
                if(levelArrows.length) {
                    const q1 = queue.size() < queue.getMaxSize()
                    const q2 = queue2.size() < queue2.getMaxSize()
                    const q3 = queue3.size() < queue3.getMaxSize()
                    const q4 = queue4.size() < queue4.getMaxSize()

                    if(q1) {
                        const row = levelArrows.reverse().pop()
                        queue.addArrow(row)
                    }
                    if(q2) {
                        const row = levelArrows.reverse().pop()
                        queue2.addArrow(row)
                    }
                    if(q3) {
                        const row = levelArrows.reverse().pop()
                        queue3.addArrow(row)
                    }
                    if(q4) {
                        const row = levelArrows.reverse().pop()
                        queue4.addArrow(row)
                    }


                }
                if(!levelArrows.length && levels[currentLevel]) {
                    levelArrows = [...levels[currentLevel].levelArrows]
                    currentLevel++
                    levelText.setText(`level ${currentLevel}`)
                }
                queue.updateAll({leftSprite, upSprite, downSprite, rightSprite, delta})
                queue2.updateAll({leftSprite, upSprite, downSprite, rightSprite, delta})
                queue3.updateAll({leftSprite, upSprite, downSprite, rightSprite, delta})
                queue4.updateAll({leftSprite, upSprite, downSprite, rightSprite, delta})
            }


        }
    }

    game.events.on('leftArrowHit', (currentSprtie, key) => {
        if(downLeft && currentSprtie.visible &&!currentSprtie.isTinted) {
            queue.setScore(1)
            queue2.setScore(1)
            queue3.setScore(1)
            queue4.setScore(1)
            currentSprtie.tint =0;
            currentSprtie.visible = false
            currentSprtie.enabled = false
            currentSprtie.passed = true
            currentSprtie.hit = true

            key.tint = 0xffffe0
        }
        else {
            key.clearTint()
        }
    })
    game.events.on('upArrowHit', (currentSprtie, key) => {
        if(downUp && currentSprtie.visible && !currentSprtie.isTinted) {
            queue.setScore(1)
            queue2.setScore(1)
            queue3.setScore(1)
            queue4.setScore(1)
            currentSprtie.tint = 0;
            currentSprtie.visible = false
            currentSprtie.enabled = false
            currentSprtie.pressed = true
            currentSprtie.hit = true
            key.tint = 0xffffe0
        }
        else {
            key.clearTint()
        }

    })
    game.events.on('downArrowHit', (currentSprtie,key) => {
        if(downDown && currentSprtie.visible && !currentSprtie.isTinted) {
            queue.setScore(1)
            queue2.setScore(1)
            queue3.setScore(1)
            queue4.setScore(1)
            currentSprtie.tint = 0;
            currentSprtie.visible = false
            currentSprtie.enabled = false
            currentSprtie.pressed = true
            currentSprtie.hit = true
            key.tint = 0xffffe0
        }
        else {
            key.clearTint()
        }

    })
    game.events.on('rightArrowHit', (currentSprtie, key) => {
        if(downRight && currentSprtie.visible && !currentSprtie.isTinted) {
            queue.setScore(1)
            queue2.setScore(1)
            queue3.setScore(1)
            queue4.setScore(1)
            currentSprtie.tint = 0;
            currentSprtie.visible = false
            currentSprtie.enabled = false
            currentSprtie.pressed = true
            currentSprtie.hit = true
            key.tint = 0xffffe0
        }
        else {
            key.clearTint()
        }
    })
    scene.start()
})()

