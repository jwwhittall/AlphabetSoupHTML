import Phaser from "phaser";
import {Enemy} from "./enemy.js";


export class GameScene extends Phaser.Scene {
    constructor() {
        super({key: "GameScene"});
        this.enemies;
    }

    preload() {
        this.load.image("A", "/assets/A.png");
    }

    create() {
        for (let i = 0; i < 20; i++) {
            new Enemy(this);

        }
    }

    update() {
        this.enemies = this.children.getAll().filter(this.isEnemy)
        this.enemies.forEach((enemy) =>{
            enemy.handleOut();
        })
        console.log(this.enemies.length);

    }
    isEnemy(object){
        return object instanceof Enemy;
    }
}

