import 'phaser';

// create a new scene named "Game"
let gameScene = new Phaser.Scene('Game');

// some parameters for our scene (our own customer variables - these are NOT part of the Phaser API)
gameScene.init = function() {
    this.playerSpeed = 1.5;
    this.enemyMaxY = 280;
    this.enemyMinY = 80;
};

// load asset files for our game
gameScene.preload = function () {

    // load images
    this.load.image('background', 'assets/blue_screen.jpg');
    this.load.image('player', 'assets/cokecan.png');
    this.load.image('bender', 'assets/bender.jpg');
};

// executed once, after assets were loaded
gameScene.create = function () {

    for (let i = 0; i < 5; i++) {
        let bg = this.add.sprite(0, 0, 'background');
        let scale = 0.05,
            x = scale * i * bg.width,
            y = scale * i * bg.height;
        // console.log(x, y);
        bg.setScale(scale, scale);
        bg.setOrigin(0, 0);
        bg.setPosition(x, y);
    }

    // player
    this.player = this.add.sprite(40, this.sys.game.config.height / 2, 'player');
    this.player.setScale(0.5);

    // goal
    this.treasure = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height / 2, 'bender');
    this.treasure.setScale(0.09);

};

// executed on every frame (60 times per second)
gameScene.update = function() {
    // treasure collision
    if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.treasure.getBounds())) {
        this.gameOver();
    }
    // check for active input
    // if (this.input.activePointer.isDown) {
        // player walks
        this.player.x += this.playerSpeed;
    // }
};

// end the game
gameScene.gameOver = function() {
    // shake the camera
    this.cameras.main.shake(500);
    // restart game
    this.time.delayedCall(500, function() {
        this.scene.restart();
    }, [], this);
};

// our game's configuration
let config = {
    type: Phaser.AUTO,  //Phaser will decide how to render our game (WebGL or Canvas)
    width: 640, // game width
    height: 360, // game height
    scene: gameScene // our newly created scene
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);
