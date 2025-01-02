import Phaser from "phaser";
import {Enemy} from "./enemy.js";
import {Player} from "./player.js";
import {MenuScene} from "./MenuScene.js";
import {Coin} from "./coin.js";
import * as WebFontLoader from "/node_modules/webfontloader/webfontloader.js";

export class GameScene extends Phaser.Scene {
    constructor() {
        super({key: "GameScene"});
        this.enemies;
        this.done = false;
    }

    preload() {
        this.load.image("coin", "/assets/coin.png");

        this.load.audio("collectLetter", "/assets/audio/collectLetter.mp3");
        this.load.audio("badLetter", "/assets/audio/loseLetter.mp3");
        this.load.audio("winRound", "/assets/audio/winRound.mp3");
    }

    create() {
        //add player to scene
        this.player = new Player(this);
        //add 20 enemies to scene
        for (let i = 0; i < 18; i++) {
            new Enemy(this, this.player);
        }
        //add coin to scene
        this.coin = new Coin(this, this.player);
        this.done = false;

    }

    update() {
        //create array of all enemies in scene
        this.enemies = this.children.getAll().filter(this.isEnemy)

       //for each enemy, check if they need to be deleted
        this.enemies.forEach((enemy) =>{
            enemy.handleOut();
        })

        //check for input for player movement
        this.player.move();

        //check if the player ran out of lives
        if(this.player.lives <= 0 && this.done ===false){
                //if so, end game
                this.done = true;
                this.endScreen();
                //TODO game over sound
        }

        if(this.player.points < 0){
            this.player.points = 0;
            this.player.scoreText.setText('Score: ' + this.player.points);
        }
    }

    isEnemy(object){
        //returns true if object is an enemy
        return object instanceof Enemy;
    }

    endScreen(){
        let x = this.game.config.width;
        let y = this.game.config.height;
        //add a rectangle to fade the screen out
        this.add.rectangle(x/2, y/2,x, y, 0o00000, 0.71);

        //create text "GAME OVER"
        this.add.text(60, 30, 'GAME OVER!', {
            font: '80px Soup',
            fill: '#fac507'
        });
        //TODO add slide in animation?
        //TODO get the enemies to keep moving?

        //display text for score
       let score =  this.add.text(70, 150, "Score " + this.player.points, {
            font: '50px Soup',
            fill: '#fac507'
        });
       console.log(score.text);

        //TODO high score

        this.add.text(430, 150, this.player.coinText.text, {
            font: '50px Soup',
            fill: '#fac507'
        });

       // this.add.rectangle(200, 300, 500, 300, 0o00000, 0.71)
        let reheat = this.add.text(160, 350, 'REHEAT?', {
            font: '75px Soup',
            fill:'#fac507'
        });

        reheat.setInteractive();
        reheat.on('pointerdown', () =>
        {
            this.scene.restart();
        });

        reheat.on('pointerover', () =>{
            reheat.setAngle(-1);
            reheat.setPosition(160,350);
            reheat.setColor('#ff6200');
        });

        reheat.on('pointerout', () =>{
            reheat.setAngle(0);
            reheat.setPosition(150, 350)
            reheat.setColor('#fac507')
        });

    }
}

