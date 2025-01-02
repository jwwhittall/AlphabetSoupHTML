import Phaser from "phaser";

export class Enemy extends Phaser.GameObjects.Image {
    constructor(scene, player){
        //temporarily set position and texture (overwritten)
        super (scene, 0,0,"B");

        //add enemy to scene
        scene.add.existing(this);
        scene.physics.world.enable(this);

        //access player
        this.player = player;


        //sets sprite based on player letter
        this.spriteIndex = this.generateIndex();
        //console.log("sprite index set to " + this.spriteIndex);
        this.setLetter(this.spriteIndex);

        //access GameScene
        this.scene = scene;

        //sets spawn index to a number randomly from 0 to 3
        this.spawnIndex = Math.floor(Math.random()*4);

        this.configureSpawn();

        //set velocity based on position of player
        this.configureVelocity();

        //register for collisions between enemy and player, and call playerCollide() when this happens
        this.scene.physics.add.overlap(this.player, this, () =>this.playerCollide(), null, this.scene);

    }

    //new spawn set function
    configureSpawn(){
        let x = 0;
        let y = 0;
        switch(this.spawnIndex){
            case(0): //top
                x = Math.random() * 800;
                y = -10;
                break;
            case(1): //bottom
                x = Math.random() * 800;
                y = 580;
                break;
            case(2): //left
                x = -10;
                y = Math.random() * 550;
                break;
            case(3): // right
                x = 830;
                y = Math.random() * 550;
                break;
            default: break;
        }
        this.setPosition(x,y);
    }

    //sets the velocity of the enemy to target the player
    configureVelocity(){
       let  x = (this.player.x - Math.random() * 80) - this.x;
       let  y = (this.player.y - Math.random() * 184) - this.y;

        let magnitude = Math.sqrt((x*x) + (y*y));

        //is magnitude of vector greater than zero?
        if (magnitude > 0)
        {
            //if so, normalize vector
            x = x / magnitude;
            y = y / magnitude;
        }

        //scale vector by 30 to start, then multiply by round number, so rounds get faster over time
        x = x * 27 * this.player.roundNum;
        y = y* 27 * this.player.roundNum;

        //set the velocity of the enemy
        this.body.setVelocity(x, y);
    }


    //function checks to see if enemy should be destroyed based on its position, given that it is out of bounds
    handleOut(){
        if (this.isOut())
        {
            switch (this.spawnIndex) {
                case (0): //if spawned in at top
                    if(this.body.position.y > 0)
                    {
                        new Enemy(this.scene, this.player);
                        this.destroy();
                    }
                    break;
                case(1): //spawned in at bottom
                    if(this.body.position.y < this.scene.game.config.height){
                        new Enemy(this.scene,this.player);
                        this.destroy();
                    }
                    break;
                case(2): // if spawned in left of screen
                    if(this.body.position.x > 0)
                    {
                        new Enemy(this.scene,this.player);
                        this.destroy();
                    }
                    break;
                case(3): // if spawned in right of screen
                    if(this.body.position.x < this.scene.game.config.width){
                        new Enemy(this.scene,this.player);
                        this.destroy();
                    }
                    break;
                default:
                    break;
            }
        }
    }

    //check if enemy is out of bounds
    isOut(){
        //is x out of bounds?
        if (this.body.position.x < -20 || this.body.position.x > this.scene.game.config.width +20)
        {
            return true;
        }
        else if (this.body.position.y < -20 || this.body.position.y > this.scene.game.config.height +20)
        {
            return true;
        }
        return false;
    }

    playerCollide(){
        //have player check if enemy is the next letter needed
        this.player.checkIndex(this.spriteIndex);

        //destroy enemy; "marked" as used in old code not needed as enemy is immediately destroyed with no delay
        new Enemy(this.scene,this.player);
        this.destroy();
    }

    //returns a number to be used as the sprite index for the enemy
    generateIndex(){
        //is the player nearing the end of the alphabet ("U" or later)
        if (this.player.spriteIndex >= 20){
            //if so, give set range of end of alphabet (avoiding index beyond array length)
            return Math.round(Math.random() *4) + 20;
        }
        //if not, add player index to random number 0-4
        else return Math.round(Math.random() * 4) + this.player.spriteIndex;
    }

    //changes the sprite when player is created or when letter collected
    //takes sprite index and puts through big long switch statement
    setLetter(index){
        //create render texture and text object
        let renderTexture = this.scene.add.renderTexture(0,0,50,50);
        let text = this.scene.add.text(-200, -200, '',{
            fontFamily: 'Soup',
            fontSize: '22px',
            fill: '#fcb632'
        });
        //which sprite index?
        switch(index){
            case(0): //if start
                text.setText('B'); //set text as needed
                renderTexture.draw(text, 0,0); //draw the text on it
                renderTexture.saveTexture('eB'); //save it as a key
                this.setTexture('eB'); //set the texture
                console.log("B letter!")
                break;
            case(1):
                text.setText('C');
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('eC');
                this.setTexture('eC');
                break;
            case(2):
                text.setText('D');
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('eD');
                this.setTexture('eD');
                break;
            case(3):
                text.setText('E');
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('eE');
                this.setTexture('eE');
                break;
            case(4):
                text.setText('F');
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('eF');
                this.setTexture('eF');
                break;
            case(5):
                text.setText('G');
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('eG');
                this.setTexture('eG');
                break;
            case(6):
                text.setText('H');
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('eH');
                this.setTexture('eH');
                break;
            case(7):
                text.setText('I');
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('eI');
                this.setTexture('eI');
                break;
            case(8):
                text.setText('J');
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('eJ');
                this.setTexture('eJ');
                break;
            case(9):
                text.setText('K');
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('eK');
                this.setTexture('eK');
                break;
            case(10):
                text.setText('L');
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('eL');
                this.setTexture('eL');
                break;
            case(11):
                text.setText('M');
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('eM');
                this.setTexture('eM');
                break;
            case(12):
                text.setText('N');
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('eN');
                this.setTexture('eN');
                break;
            case(13):
                text.setText('O');
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('eO');
                this.setTexture('eO');
                break;
            case(14):
                text.setText('P');
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('eP');
                this.setTexture('eP');
                break;
            case(15):
                text.setText('Q');
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('eQ');
                this.setTexture('eQ');
                break;
            case(16):
                text.setText('R');
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('eR');
                this.setTexture('eR');
                break;
            case(17):
                text.setText('S');
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('eS');
                this.setTexture('eS');
                break;
            case(18):
                text.setText('T');
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('eT');
                this.setTexture('eT');
                break;
            case(19):
                text.setText('U');
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('eU');
                this.setTexture('eU');
                break;
            case(20):
                text.setText('V');
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('eV');
                this.setTexture('eV');
                break;
            case(21):
                text.setText('W');
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('eW');
                this.setTexture('eW');
                break;
            case(22):
                text.setText('X');
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('eX');
                this.setTexture('eX');
                break;
            case(23):
                text.setText('Y');
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('eY');
                this.setTexture('eY');
                break;
            case(24):
                text.setText('Z');
                renderTexture.draw(text, 0,0);
                renderTexture.saveTexture('eZ');
                this.setTexture('eZ');
                break;
        }
        this.body.setSize(text.width, text.height);
        this.body.setOffset(0,0);
    }
}