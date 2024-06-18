import Phaser from "phaser";

let spriteArr = ["B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
"M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

export class Enemy extends Phaser.GameObjects.Image {
    constructor(scene, player){
        super (scene, 0,0,"B");

        //add enemy to scene
        scene.add.existing(this);

        scene.physics.world.enable(this);

        //TODO adjust sprite to be within a close range of the player sprite alphabetically
       this.setTexture(spriteArr[Math.round(Math.random() * 25)]);

        this.spawnPoints = [];
        this.scene = scene;
        this.player = player;

        //sets spawn index to a number randomly from 0 to 3
        this.spawnIndex = Math.floor(Math.random()*4);

        //set spawn point
        this.configureSpawn();

        //set velocity based on position of player
        this.configureVelocity();

        this.scene.physics.add.overlap(this.player, this, this.playerCollide, null, this.scene);

    }

    //set spawn point to one of four locations outside of screen
    configureSpawn()
    {
        //add to spawn points array with four spawn points
        this.spawnPoints.push(new Phaser.Math.Vector2(this.scene.game.config.width/2, -10)); //top
        this.spawnPoints.push(new Phaser.Math.Vector2(this.scene.game.config.width/2, this.scene.game.config.height + 10)); //bottom
        this.spawnPoints.push(new Phaser.Math.Vector2(-10, this.scene.game.config.height/2)); //left
        this.spawnPoints.push(new Phaser.Math.Vector2(this.scene.game.config.width +10, this.scene.game.config.height/2)); //right

        //set the location using random spawn index set in constructor, add random number to avoid clumps
        this.setPosition(Math.round(this.spawnPoints[this.spawnIndex].x) + Math.random() * 60, Math.round(this.spawnPoints[this.spawnIndex].y) + Math.random() * 20);

        console.log("Enemy spawning at " + this.spawnPoints[this.spawnIndex].x + "," + this.spawnPoints[this.spawnIndex].y + " with index " + this.spawnIndex);
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

        //scale vector by 40
        x = x * 40;
        y = y* 40

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
        console.log("Enemy collided with player!");
    }
}