import Phaser from "phaser";

let spriteArr = ["B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
"M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];


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
        console.log("sprite index set to " + this.spriteIndex);
        this.setTexture(spriteArr[this.spriteIndex]);

        //create empty array with spawn points
        this.spawnPoints = [];
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
                y = 560;
                break;
            case(2): //left
                x = -10;
                y = Math.random() * 550;
                break;
            case(3): // right
                x = 810;
                y = Math.random() * 550;
                break;
            default: break;
        }
        this.setPosition(x,y);
    }


    // //set spawn point to one of four locations outside of screen
    // configureSpawn()
    // {
    //     //add to spawn points array with four spawn points
    //     this.spawnPoints.push(new Phaser.Math.Vector2(this.scene.game.config.width/2, -10 - Math.random() * 60)); //top
    //     this.spawnPoints.push(new Phaser.Math.Vector2(this.scene.game.config.width/2, this.scene.game.config.height + 10 + Math.random() * 60)); //bottom
    //     this.spawnPoints.push(new Phaser.Math.Vector2(-10 - Math.random() * 60, this.scene.game.config.height/2)); //left
    //     this.spawnPoints.push(new Phaser.Math.Vector2(this.scene.game.config.width +10 + Math.random() * 60, this.scene.game.config.height/2)); //right
    //
    //     //set the location using random spawn index set in constructor
    //     this.setPosition(Math.round(this.spawnPoints[this.spawnIndex].x) , Math.round(this.spawnPoints[this.spawnIndex].y) + Math.random() * 20);
    //
    //     console.log("Enemy spawning at " + this.spawnPoints[this.spawnIndex].x + "," + this.spawnPoints[this.spawnIndex].y + " with index " + this.spawnIndex);
    // }

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

}