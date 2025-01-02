import Phaer from "phaser";

export class Coin extends Phaser.GameObjects.Image{
    constructor(scene, player){
        //spawn is overwritten
        super(scene, 0,0, "coin");

        //add coin to world
        scene.add.existing(this);
        scene.physics.world.enable(this);

        //access scene and player
        this.scene = scene;
        this.player = player;

        //register for collisions between enemy and player, and call playerCollide() when this happens
        this.scene.physics.add.overlap(this.player, this, () =>this.playerCollide(), null, this.scene);

        //sets spawn index to a number randomly from 0 to 3
        this.spawnIndex = Math.floor(Math.random()*4);

        //override spawn with randomized point
        //copied from enemy
        this.configureSpawn();

        //set velocity based on position of player
        //copied from enemy
        this.configureVelocity();
    }

    configureSpawn(){
        let x = 0;
        let y = 0;
        switch(this.spawnIndex){
            case(0): //top
                x = Math.random() * 800;
                //non-random values set high to allow more time before entering screen
                y = -400;
                break;
            case(1): //bottom
                x = Math.random() * 800;
                y = 1300;
                break;
            case(2): //left
                x = -400;
                y = Math.random() * 550;
                break;
            case(3): // right
                x = 1300;
                y = Math.random() * 550;
                break;
            default: break;
        }
        this.setPosition(x,y);
    }

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

    //function checks to see if coin should be destroyed based on its position, given that it is out of bounds
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

    //check if coin is out of bounds
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

    //handles collision with player
    playerCollide(){
        this.player.getCoin();
        //destroy coin; "marked" as used in old code not needed as enemy is immediately destroyed with no delay
        new Coin(this.scene,this.player);
        this.destroy();
    }

}

