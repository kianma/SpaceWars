//declare variables
var background;
var title;
var shipSelect;
var star;

Game.MainMenu = function(game){};

Game.MainMenu.prototype = {

	create: function(){
		//add background
		background = this.add.tileSprite(0,0,800,600, 'stars');	

		//star group
		star = this.add.group();
		star.enableBody = true;
		
		this.time.events.repeat(Phaser.Timer.SECOND * 1, 100, this.createStars, this);//loads an animated star every second

		shipSelect = 0;//default shipSelect value
		//creates ship1 button
		this.shipButton(1, this.world.centerX - 100, this.world.centerY, 178, 107, function(){
			shipSelect = 0;
			selector.position.x = this.world.centerX - 100;
		});
		//creates ship2 button
		this.shipButton(2, this.world.centerX + 100, this.world.centerY, 186, 129, function(){
			shipSelect = 1;
			selector.position.x = this.world.centerX + 100;
		});
		//indicator for the selected ship
		selector = this.add.sprite(this.world.centerX - 100, this.world.centerY, 'selector');
		selector.anchor.setTo(0.5);
		//creates start button
		this.createButton("Start", this.world.centerX - 100, this.world.centerY +170, 200, 60, -20, function(){
			this.state.start('MainGame', true, false, shipSelect);//starts Main Game
		});
		//creates exit button
		this.createButton("Exit", this.world.centerX + 80, this.world.centerY + 220, 200, 60, 10, function(){
			var win = window.open("about:blank", "_self");//bug for window.close in jscript
			win.close();//terminates the program
		});
		//adds logo
		title = this.add.sprite(this.world.centerX, this.world.centerY-192, 'title');
		title.anchor.setTo(0.5);
	},

	update: function(){
		
	},
	//create button with string, width, height, anchor points, angle and callback function for start and exit
	createButton: function(string, x, y, w, h, a, callback){
		var mainMenuBtn = this.add.button(x, y, 'button', callback, this, 2, 1, 0);//declare button

		mainMenuBtn.anchor.setTo(0.5);//set button anchor
		mainMenuBtn.width = w;//set button width
		mainMenuBtn.height = h;//set button height
		mainMenuBtn.angle += a;//set button angle

		var buttonTxt = this.add.text(mainMenuBtn.x, mainMenuBtn.y, string, {font: "40px Comic Sans MS", fill: "#FFF", align: "center"});//button font
		buttonTxt.anchor.setTo(0.5);//set text anchor
		buttonTxt.angle = mainMenuBtn.angle;//set text angle
	},
	//ship selection button
	shipButton: function(ship, x, y, w, h, callback){

		if(ship == 1){
			var shipBtn = this.add.button(x, y, 'playerSprite1', callback, this, 2, 0, 1);//declare button
		}
		else{
			var shipBtn = this.add.button(x, y, 'playerSprite2', callback, this, 2, 0, 1);//declare button
		}
		
		shipBtn.anchor.setTo(0.5);//set button anchor
		shipBtn.width = w;//set button width
		shipBtn.height = h;//set button height
	},
	//create random stars function
	createStars: function(){
		var stars = star.create(-20, this.world.randomY, 'movingStar');//declare and add star
		stars.anchor.setTo(0.5, 0.5);//set star anchor points
		this.physics.enable(stars, Phaser.Physics.ARCADE);//add star Physics
		stars.body.velocity.x = this.rnd.integerInRange(200, 500);//star speed
		stars.body.velocity.y = this.rnd.integerInRange(-300, 300);//star speed

		stars.animations.add('wiggle', [0,1,2], 1, false);//star animation
		stars.animations.play('wiggle', 5, true);//star animation play
	},
}