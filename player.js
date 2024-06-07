import Phaser from "phaser";

export class Player extends Phaser.GameObjects.Image{

    constructor(scene){
        super(scene, scene.game.config.width/2,scene.game.config.height/2, "A");

        scene.add.existing(this);
        scene.physics.world.enable(this);

        this.scene = scene;
        this.playerSpeed = 250

        this.body.pushable = false;
        this.body.setCollideWorldBounds(true);
        this.cursor = this.scene.input.keyboard.createCursorKeys();

    }

    //check for input and move accordingly
    move(){
        const {left, right, up, down} = this.cursor;

        if(left.isDown)
        {
            this.body.setVelocityY(0);
            this.body.setVelocityX(-this.playerSpeed);
        }
        else if (right.isDown) {
            this.body.setVelocityY(0);
            this.body.setVelocityX(this.playerSpeed);
        }
        else if(up.isDown){
            this.body.setVelocityX(0);
            this.body.setVelocityY(-this.playerSpeed);
        }
        else if (down.isDown){
            this.body.setVelocityX(0);
            this.body.setVelocityY(this.playerSpeed);
        }
        else{
            this.body.setVelocityX(0);
            this.body.setVelocityY(0);
        }
    }

}