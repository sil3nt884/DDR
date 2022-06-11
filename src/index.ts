import Phaser from 'phaser';
import SettingsConfig = Phaser.Types.Scenes.SettingsConfig;
const  { Scene, Game  } = Phaser




const config : SettingsConfig = {
    physics: {
        default: 'arcade',
        arcade: {
            checkCollision: {
                up: true,
                down: true,
                left: true,
                right: true

            }
        }
    }
};
  class gameScene extends Scene {

    gameFiles = []
    constructor(config) {
        super(config);
    }

    setGamesFiles (files) {
        this.gameFiles = files
    }
    preload ( ) {
        this.gameFiles.forEach(file => {
            this.load?.image(`${file.split('.')[0]}`, `assets/${file}`)
        })
    }

    start: Function
    create: Function
  }

export const scene = new gameScene(config)
const gameConfig = {
    type: Phaser.AUTO,
    width: 1024,
    height: 1024,
    backgroundColor: '#000000',
    parent: 'Friday',
    scene
};

export const game = new Phaser.Game(gameConfig)


