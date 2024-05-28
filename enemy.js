import Phaser from "phaser";

export class Enemy extends Phaser.GameObjects.Sprite {

    //TODO change constructor to take player object
    constructor(scene){
        //TODO create new function to randomize sprite
        super (scene, 0,0,"A");

        //add enemy to scene
        scene.add.existing(this);

        scene.physics.world.enable(this);

        this.spawnPoints = [];
        this.scene = scene;
        //sets spawn index to a number randomly from 0 to 3
        this.spawnIndex = Math.floor(Math.random()*4);

        //set spawn point
        this.configureSpawn();

        //TODO correct velocity settings to target player
        this.configureVelocity();
    }

    //set spawn point to one of four locations outside of screen
    configureSpawn()
    {
        //add to spawn points array with four spawn points
        this.spawnPoints.push(new Phaser.Math.Vector2(this.scene.game.config.width/2, -30)); //top
        this.spawnPoints.push(new Phaser.Math.Vector2(this.scene.game.config.width/2, this.scene.game.config.height +30)); //bottom
        this.spawnPoints.push(new Phaser.Math.Vector2(-30, this.scene.game.config.height/2)); //left
        this.spawnPoints.push(new Phaser.Math.Vector2(this.scene.game.config.width +30, this.scene.game.config.height/2)); //right

        //set the location using random spawn index set in constructor
        this.setPosition(Math.round(this.spawnPoints[this.spawnIndex].x), Math.round(this.spawnPoints[this.spawnIndex].y));

        console.log("Enemy spawning at " + this.spawnPoints[this.spawnIndex].x + "," + this.spawnPoints[this.spawnIndex].y + " with index " + this.spawnIndex);
    }


    //temporary function to randomize velocity. will be replaced with
    //one that seeks out player
    configureVelocity(){
        switch(this.spawnIndex) {
            case(0): //if spawned in at top
                this.body.setVelocity(Math.round(16 - Math.random() * 10), 8);
                console.log("Enemy velocity: " + this.body.velocity.x + "," + this.body.velocity.y);
                break;
            case(1): //if spawned in bottom
                this.body.setVelocity(Math.round(16 - Math.random() * 10), -8);
                break;
            case(2): //if spawned in left
                this.body.setVelocity(24, Math.round(8- Math.random() * 6));
                break;
            case(3): //if spawned in right
                this.body.setVelocity(-24, Math.round(8-Math.random() * 6));
                break;
            default:
                break;
        }
    }
}