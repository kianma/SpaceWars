//declare variables
var Game = {};

Game.Boot = function(game){
};

Game.Boot.prototype = {
	init:function(){
		this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = true;
	},

	preload:function(){
		//load preloader and splashscreen
		this.load.image('preloaderBar', 'assets/preload.png');
		this.load.image('splashScreen', 'assets/splashScreen.bmp');
	},

	create:function(){
		this.state.start('Preloader');//call Preloader
	}
}