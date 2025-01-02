import Phaser from "phaser";

export class Player extends Phaser.GameObjects.Image{

    constructor(scene){
        super(scene, scene.game.config.width/2,scene.game.config.height/2, "pA");

        scene.add.existing(this);
        scene.physics.world.enable(this);

        this.scene = scene;
        this.playerSpeed = 250

        this.body.pushable = false;
        this.body.setCollideWorldBounds(true);
        this.body.setSize(20, 15);

        //TODO figure out how to enable WASD
        this.cursor = this.scene.input.keyboard.createCursorKeys();

        this.spriteIndex = 0;

        this.setLetter(this.spriteIndex);

        this.points = 0;
        this.roundNum = 1;
        this.lives = 5;

        //recalls amount of collected coins
        //first time? set to 0
        this.coins = parseInt(localStorage.getItem('coins')) || 0;

        this.roundText = this.scene.add.text(10,6, "Round: 1",{
            font: "16px Arial",
            fill: "#42f54e",
        });

        this.scoreText = this.scene.add.text(710, 6, 'Score 0', {
            font: "16px Arial",
            fill: '#42f54e'
        });

        this.livesText = this.scene.add.text(370, 6, "Lives: 5", {
            font:"16px Arial",
            fill:'#fc1303',
        });

        //writes coin amount to screen
        this.coinText = this.scene.add.text(10, 525, "Coins " + this.coins, {
            font: "16px Arial",
            fill: "#42f54e",
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
                this.setLetter(this.spriteIndex);
                //this.body.setSize(this.width, this.height);
                this.body.setOffset(0,0);

                //change text accordingly
                this.nextRound();
            }
            else{
                //increase sprite to next index
                this.spriteIndex += 1;
                this.setLetter(this.spriteIndex);
                //adjust size of collider to match
                //this.body.setSize(this.width, this.height);
                this.body.setOffset(0,0);

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

        this.scoreText.setText(`Score ${this.points}`);
        this.roundText.setText(`Round: ${this.roundNum}`);
        this.livesText.setText(`Lives: ${this.lives}`);

        this.winSound.play();
    }

    //changes screen text when correct letter collected
    getLetter(){
        this.points += 1;
        this.scoreText.setText(`Score ${this.points}`);

        this.goodSound.play();
    }

    //changes screen text when incorrect letter collected
    badLetter(){

        if(this.points > 0){
            this.points -= 2;
            this.scoreText.setText(`Score ${this.points}`);
        }

        this.lives -= 1;
        this.livesText.setText(`Lives: ${this.lives}`);

        this.badSound.play();
    }

    //called by coin when colliding with player
    getCoin(){
        //TODO collect coin sound

        //increase coin amount by 1
        this.coins += 1;
        //save to local storage
        localStorage.setItem('coins', this.coins);

        this.coinText.setText(`Coins: ${this.coins}`);
    }

    //changes the sprite when player is created or when letter collected
    //takes sprite index and puts through big long switch statement
    setLetter(index){
        //create render texture and text object
        let renderTexture = this.scene.add.renderTexture(-100,-100,20,20);
        let text = this.scene.add.text(-200, -200, '',{
            font: '20px Soup',
            fill: '#B8E8FF'
        });
        //which sprite index?
        switch(index){
            case(0): //if start
                text.setText('A'); //set text as needed
                renderTexture.setSize(text.width, text.height); //change the size of the rendertexture
                renderTexture.draw(text, 0,0); //draw the text on it
                renderTexture.saveTexture('A'); //save it as a key
                this.setTexture('A'); //set the texture
                break;
            case(1):
                text.setText('AB');
                renderTexture.setSize(50, 20);
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('rB');
                this.setTexture('rB');
                break;
            case(2):
                text.setText('ABC');
                renderTexture.setSize(75, 20);
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('rC');
                this.setTexture('rC');
                break;
            case(3):
                text.setText('ABCD');
                renderTexture.setSize(100, 20);
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('rD');
                this.setTexture('rD');
                break;
            case(4):
                text.setText('ABCDE');
                renderTexture.setSize(125, 20);
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('rE');
                this.setTexture('rE');
                break;
            case(5):
                text.setText('ABCDE\nF');
                renderTexture.setSize(150, 50);
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('rF');
                this.setTexture('rF');
                break;
            case(6):
                text.setText('ABCDE\nFG');
                renderTexture.setSize(150, 50);
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('rG');
                this.setTexture('rG');
                break;
            case(7):
                text.setText('ABCDE\nFGH');
                renderTexture.setSize(150, 50);
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('rH');
                this.setTexture('rH');
                break;
            case(8):
                text.setText('ABCDE\nFGHI');
                renderTexture.setSize(150, 50);
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('rI');
                this.setTexture('rI');
                break;
            case(9):
                text.setText('ABCDE\nFGHIJ');
                renderTexture.setSize(150, 50);
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('rJ');
                this.setTexture('rJ');
                break;
            case(10):
                text.setText('ABCDE\nFGHIJK');
                renderTexture.setSize(150, 70);
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('rK');
                this.setTexture('rK');
                break;
            case(11):
                text.setText('ABCDE\nFGHIJK\nL');
                renderTexture.setSize(150, 70);
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('rL');
                this.setTexture('rL');
                break;
            case(12):
                text.setText('ABCDE\nFGHIJK\nLM');
                renderTexture.setSize(150, 70);
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('rM');
                this.setTexture('rM');
                break;
            case(13):
                text.setText('ABCDE\nFGHIJK\nLMN');
                renderTexture.setSize(150, 70);
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('rN');
                this.setTexture('rN');
                break;
            case(14):
                text.setText('ABCDE\nFGHIJK\nLMNO');
                renderTexture.setSize(150, 70);
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('rO');
                this.setTexture('rO');
                break;
            case(15):
                text.setText('ABCDE\nFGHIJK\nLMNO\nP');
                renderTexture.setSize(150, 90);
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('rP');
                this.setTexture('rP');
                break;
            case(16):
                text.setText('ABCDE\nFGHIJK\nLMNO\nPQ');
                renderTexture.setSize(150, 90);
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('rQ');
                this.setTexture('rQ');
                break;
            case(17):
                text.setText('ABCDE\nFGHIJK\nLMNO\nPQR');
                renderTexture.setSize(150, 90);
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('rR');
                this.setTexture('rR');
                break;
            case(18):
                text.setText('ABCDE\nFGHIJK\nLMNO\nPQRS');
                renderTexture.setSize(150, 90);
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('rS');
                this.setTexture('rS');
                break;
            case(19):
                text.setText('ABCDE\nFGHIJK\nLMNO\nPQRST');
                renderTexture.setSize(150, 90);
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('rT');
                this.setTexture('rT');
                break;
            case(20):
                text.setText('ABCDE\nFGHIJK\nLMNO\nPQRST\nU');
                renderTexture.setSize(150, 110);
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('rU');
                this.setTexture('rU');
                break;
            case(21):
                text.setText('ABCDE\nFGHIJK\nLMNO\nPQRST\nUV');
                renderTexture.setSize(150, 110);
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('rV');
                this.setTexture('rV');
                break;
            case(22):
                text.setText('ABCDE\nFGHIJK\nLMNO\nPQRST\nUVW');
                renderTexture.setSize(150, 110);
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('rW');
                this.setTexture('rW');
                break;
            case(23):
                text.setText('ABCDE\nFGHIJK\nLMNO\nPQRST\nUVWX');
                renderTexture.setSize(150, 110);
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('rX');
                this.setTexture('rX');
                break;
            case(24):
                text.setText('ABCDE\nFGHIJK\nLMNO\nPQRST\nUVWXY');
                renderTexture.setSize(150, 110);
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('rY');
                this.setTexture('rY');
                break;
        }
        this.body.setSize(text.width, text.height);
    }
}