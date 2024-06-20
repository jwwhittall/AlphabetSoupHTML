import Phaser from "phaser";

let spriteArr = ["pA", "pB", "pC", "pD", "pE", "pF", "pG", "pH", "pI", "pJ", "pK", "pL",
    "pM", "pN", "pO", "pP", "pQ", "pR", "pS", "pT", "pU", "pV", "pW", "pX", "pY"];

export class Player extends Phaser.GameObjects.Image{

    constructor(scene){
        super(scene, scene.game.config.width/2,scene.game.config.height/2, "pA");

        scene.add.existing(this);
        scene.physics.world.enable(this);

        this.scene = scene;
        this.playerSpeed = 250

        this.body.pushable = false;
        this.body.setCollideWorldBounds(true);

        //TODO figure out how to enable WASD
        this.cursor = this.scene.input.keyboard.createCursorKeys();

        this.spriteIndex = 0;

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

    //called every time an enemy collides with the player
    checkIndex(index){
        //did the player collide with the next letter it needs?
        if(index === this.spriteIndex)
        {
            //is the player at the letter "Y"?
            if (this.spriteIndex === 24)
            {
                //if so, reset back to the letter A
                this.spriteIndex = 0;
                this.setTexture(spriteArr[this.spriteIndex]);
                this.body.setSize(this.width, this.height);
            }
            else{
                //increase sprite to next index
                this.spriteIndex += 1;
                this.setTexture(spriteArr[this.spriteIndex]);
                //adjust size of collider to match
                this.body.setSize(this.width, this.height);
            }
        }
        //else deduct points and lives
    }

}