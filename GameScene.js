import Phaser from "phaser";
import {Enemy} from "./enemy.js";
import {Player} from "./player.js";

export class GameScene extends Phaser.Scene {
    constructor() {
        super({key: "GameScene"});
        this.enemies;
    }

    preload() {
        //load all enemy images
        this.load.image("A", "/assets/player/A.png");
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
        //add player to scene
        this.player = new Player(this);
        //add 20 enemies to scene
        for (let i = 0; i < 20; i++) {
            new Enemy(this, this.player);
        }

    }

    update() {
        //create array of all enemies in scene
        this.enemies = this.children.getAll().filter(this.isEnemy)
       //for each enemy, check if they need to be deleted
        this.enemies.forEach((enemy) =>{
            enemy.handleOut();
        })
        //log number of enemies in scene to ensure number is constant
        console.log(this.enemies.length);

        //check for input for player movement
        this.player.move();
    }

    isEnemy(object){
        //returns true if object is an enemy
        return object instanceof Enemy;
    }
}

