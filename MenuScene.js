import Phaser from "phaser"
import {GameScene} from "./GameScene.js";

export class MenuScene extends Phaser.Scene {
    constructor(){
        super({key: "MenuScene"});
    }

    preload(){
        this.load.image("start menu", "/assets/SOUP.png");
    }

    create(){
        //display menu image and resize to fit
        this.menu = this.add.image(0,0,"start menu").setOrigin(0,0);
        this.menu.setScale(this.game.config.width / this.menu.width, this.game.config.height / this.menu.height);

        this.cursor = this.input.keyboard.createCursorKeys();
    }

    update(){

        const {space} = this.cursor;

        if(space.isDown){
            this.scene.start("GameScene");
        }
    }
}