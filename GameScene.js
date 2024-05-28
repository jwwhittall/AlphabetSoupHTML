import Phaser from "phaser";
import {Enemy} from "./enemy.js";


export class GameScene extends Phaser.Scene {
    constructor() {
        super({key: "GameScene"});
    }

    preload() {
        this.load.image("A", "/assets/A.png");
    }

    create() {
        for (let i = 0; i < 10; i++) {
            new Enemy(this);
        }
    }

    update() {
    }

}

