//declare variables
var splashScreen;

Game.Preloader = function(game){
	this.preloadBar = null;
};

Game.Preloader.prototype = {

	preload:function(){
		//preloader
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
		this.preloadBar.anchor.setTo(0.5,0.5);
		this.time.advancedTiming = true;
		this.load.setPreloadSprite(this.preloadBar);

		//main menu and game over assets
		this.load.image('title', "assets/title.png");
		this.load.image('button', "assets/button.png");
		this.load.image('gameOver', "assets/gameOver.png");
		this.load.image('selector', "assets/selector.png");
		this.load.spritesheet('playerSprite1', 'assets/playerSprite1.png', 178, 107);
		this.load.spritesheet('playerSprite2', 'assets/playerSprite2.png', 186, 129);
		this.load.spritesheet('movingStar', 'assets/stars.png', 85, 87);

		//load all assets
		this.load.image('crater', "assets/backgrounds/MainGameBG1.png");
		this.load.image('stars', "assets/backgrounds/MainGameBG2.png");
		this.load.image('player1', "assets/player1.png");
		this.load.image('player2', "assets/player2.png");
		this.load.image('bullet', "assets/bullet.png");
		this.load.image('enemy', "assets/enemy.png");
		this.load.image('playerSprite', "assets/playerSprite.png");
		this.load.spritesheet('explosion', 'assets/explosion.png', 75, 50);

	},

	create:function(){
		splashScreen = this.add.sprite(0, 0, 'splashScreen');//add splash screen
		this.time.events.add(Phaser.Timer.SECOND * 2, this.splashScreenFade, this);//time before splashscreen fades
		this.time.events.add(Phaser.Timer.SECOND * 2.5, this.mainMenu, this);//time before MainMenu state loads
	},

	splashScreenFade: function(){
		this.add.tween(splashScreen).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);//fade
	},

	mainMenu: function(){
		this.state.start('MainMenu');//call MainMenu
	}
}