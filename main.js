import "./style.css";
import Phaser from "phaser";
import {GameScene} from "./GameScene.js";

const sizes = {
    width: 800,
    height: 550,
};

const config = {
    type: Phaser.WEBGL,
    width: sizes.width,
    height: sizes.height,
    canvas: gameCanvas,
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
        },
    },
    scene: [GameScene],
};

const game = new Phaser.Game(config);