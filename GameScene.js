import Phaser from "phaser";
import {Enemy} from "./enemy.js";


export class GameScene extends Phaser.Scene {
    constructor() {
        super({key: "GameScene"});
        this.enemies;
    }

    preload() {
        this.load.image("A", "/assets/A.png");
        this.load.image("B", "/assets/B.png");
        this.load.image("C", "/assets/C.png");
        this.load.image("D", "/assets/D.png");
        this.load.image("E", "/assets/E.png");
        this.load.image("F", "/assets/F.png");
        this.load.image("G", "/assets/G.png");
        this.load.image("H", "/assets/H.png");
        this.load.image("I", "/assets/I.png");
        this.load.image("J", "/assets/J.png");
        this.load.image("K", "/assets/K.png");
        this.load.image("L", "/assets/L.png");
        this.load.image("M", "/assets/M.png");
        this.load.image("N", "/assets/N.png");
        this.load.image("O", "/assets/O.png");
        this.load.image("P", "/assets/P.png");
        this.load.image("Q", "/assets/Q.png");
        this.load.image("R", "/assets/R.png");
        this.load.image("S", "/assets/S.png");
        this.load.image("T", "/assets/T.png");
        this.load.image("U", "/assets/U.png");
        this.load.image("V", "/assets/V.png");
        this.load.image("W", "/assets/W.png");
        this.load.image("X", "/assets/X.png");
        this.load.image("Y", "/assets/Y.png");
        this.load.image("Z", "/assets/Z.png");


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

