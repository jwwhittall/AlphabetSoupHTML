import "./style.css";
import Phaser from "phaser";
import {GameScene} from "./GameScene.js";
import {MenuScene} from "./MenuScene.js";

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
            debug: false,
        },
    },
    scene: [MenuScene, GameScene],
};

const game = new Phaser.Game(config);