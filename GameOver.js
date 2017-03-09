//declare variables
var background, gameOver;

Game.GameOver = function(game){};

Game.GameOver.prototype = {
	create: function(){
		//add background
		background = this.add.tileSprite(0,0,800,600, 'stars');

		//adds logo
		gameOver = this.add.sprite(this.world.centerX, this.world.centerY, 'gameOver');
		gameOver.anchor.setTo(0.5);


		this.createButton("Again", this.world.centerX-150, this.world.centerY + 200, 230, 100, function(){
			this.state.start('MainGame');
		});

		this.createButton("Menu", this.world.centerX+150, this.world.centerY + 200, 230, 100, function(){
			this.state.start('MainMenu');
		});

	},

	update: function(){

	},

	createButton: function(string, x, y, w, h, callback){
		var mainMenuBtn = this.add.button(x, y, 'button', callback, this, 2, 1, 0);//declare button

		mainMenuBtn.anchor.setTo(0.5);//set button anchor
		mainMenuBtn.width = w;//set button width
		mainMenuBtn.height = h;//set button height

		var buttonTxt = this.add.text(mainMenuBtn.x, mainMenuBtn.y, string, {font: "40px Comic Sans MS", fill: "#FFF", align: "center"});//button font
		buttonTxt.anchor.setTo(0.5);//set text anchor
	},
}