import Phaser from "phaser";
import {Enemy} from "./enemy.js";
import {Player} from "./player.js";

export class GameScene extends Phaser.Scene {
    constructor() {
        super({key: "GameScene"});
        this.enemies;

    }

    preload() {
        //load player sprites
        this.load.image("pA", "/assets/player/A.png");
        this.load.image("pB", "/assets/player/B.png");
        this.load.image("pC", "/assets/player/C.png");
        this.load.image("pD", "/assets/player/D.png");
        this.load.image("pE", "/assets/player/E.png");
        this.load.image("pF", "/assets/player/F.png");
        this.load.image("pG", "/assets/player/G.png");
        this.load.image("pH", "/assets/player/H.png");
        this.load.image("pI", "/assets/player/i.png");
        this.load.image("pJ", "/assets/player/J.png");
        this.load.image("pK", "/assets/player/K.png");
        this.load.image("pL", "/assets/player/L.png");
        this.load.image("pM", "/assets/player/M.png");
        this.load.image("pN", "/assets/player/N.png");
        this.load.image("pO", "/assets/player/O.png");
        this.load.image("pP", "/assets/player/P.png");
        this.load.image("pQ", "/assets/player/Q.png");
        this.load.image("pR", "/assets/player/R.png");
        this.load.image("pS", "/assets/player/S.png");
        this.load.image("pT", "/assets/player/T.png");
        this.load.image("pU", "/assets/player/U.png");
        this.load.image("pV", "/assets/player/V.png");
        this.load.image("pW", "/assets/player/W.png");
        this.load.image("pX", "/assets/player/X.png");
        this.load.image("pY", "/assets/player/Y.png");

        //load all enemy images
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
        //console.log(this.enemies.length);

        //check for input for player movement
        this.player.move();

        if(this.player.lives <= 0){
            console.log("game over!");
            this.player.destroy();
        }
    }

    isEnemy(object){
        //returns true if object is an enemy
        return object instanceof Enemy;
    }


}

