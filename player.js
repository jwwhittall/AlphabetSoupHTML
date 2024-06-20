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

        this.points = 0;
        this.roundNum = 1;
        this.lives = 5;

        this.roundText = this.scene.add.text(10,6, "Round: 1",{
            font: "16px Arial",
            fill: "#42f54e",
        });

        this.scoreText = this.scene.add.text(710, 6, 'Score: 0', {
            font: "16px Arial",
            fill: '#42f54e'
        });

        this.livesText = this.scene.add.text(370, 6, "Lives: 5", {
            font:"16px Arial",
            fill:'#fc1303',
        });

        this.goodSound = this.scene.sound.add("collectLetter");
        this.badSound = this.scene.sound.add("badLetter");
        this.winSound = this.scene.sound.add("winRound");

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

                //change text accordingly
                this.nextRound();
            }
            else{
                //increase sprite to next index
                this.spriteIndex += 1;
                this.setTexture(spriteArr[this.spriteIndex]);
                //adjust size of collider to match
                this.body.setSize(this.width, this.height);

                //change text accordingly
                this.getLetter();
            }
        }
        //if wrong letter collected, change text accordingly
        else this.badLetter();
    }

    //changes text on screen when round advances
    nextRound(){
        this.points += 10;
        this.roundNum += 1;
        //adjust to go up by 2 every time like original?
        this.lives = 4 + this.roundNum;

        this.scoreText.setText(`Score: ${this.points}`);
        this.roundText.setText(`Round: ${this.roundNum}`);
        this.livesText.setText(`Lives: ${this.lives}`);

        this.winSound.play();
    }

    //changes screen text when correct letter collected
    getLetter(){
        this.points += 1;
        this.scoreText.setText(`Score: ${this.points}`);

        this.goodSound.play();
    }

    //changes screen text when incorrect letter collected
    badLetter(){

        if(this.points > 0){
            this.points -= 2;
            this.scoreText.setText(`Score: ${this.points}`);
        }

        this.lives -= 1;
        this.livesText.setText(`Lives: ${this.lives}`);

        this.badSound.play();
    }

}