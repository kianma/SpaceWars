//declare variables
var backgroundOne, backgroundTwo;
var player, enemies;
var cursors;
var bullets;
var bulletTime = 0;
var fireButton;
var explosions;

Game.MainGame = function(game){};

Game.MainGame.prototype = {
	//loads shipSelect parameters
	init : function (shipSelect){

	},

	create: function(){
		//add backgrounds
		backgroundTwo = this.add.tileSprite(0,0,800,600, 'stars');
		backgroundOne = this.add.tileSprite(0,500,1600,100, 'crater');

		//player ship selection condition
		if (shipSelect == 0){
			player = this.add.sprite(100, 300, 'player1');//add player
		}
		else{
			player = this.add.sprite(100, 300, 'player2');//add player
		}

		player.anchor.setTo(0.5);//set player anchor points
		this.physics.enable(player, Phaser.Physics.ARCADE);//add player Physics

		player.body.collideWorldBounds = true;//so player won't go beyond the resolution of the game

		cursors = this.input.keyboard.createCursorKeys();//player controller

		//bullet group
		bullets = this.add.group();
		bullets.enableBody = true;
		this.physics.enable(bullets, Phaser.Physics.ARCADE);//add bullet Physics
		bullets.createMultiple(10, 'bullet');//number of bullets
		bullets.setAll('anchor.x', 1);//anchor point
		bullets.setAll('anchor.y', 0.5);//anchor point
		bullets.setAll('outOfBoundsKill', true);
		bullets.setAll('checkWorldBounds', true);//check bullet position/existence

		fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);//fire button

		//enemies group
		enemies = this.add.group();
		enemies.enableBody = true;
		enemies.setAll('outOfBoundsKill', true);
		enemies.setAll('checkWorldBounds', true);//check enemy position/existence

		this.time.events.repeat(Phaser.Timer.SECOND * 2, 100, this.createEnemies, this);//enemy spawn event-calls enemy every 2 seconds

		//explosions group
		explosions = this.add.group();
		explosions.enableBody = true;
	},

	update: function(){
		player.body.velocity.y = 0;//default velocity of player	
		this.physics.arcade.overlap(bullets, enemies, this.collisionHandler, null, this);//bullet and enemy collision
		this.physics.arcade.overlap(enemies, player, this.enemyHitsPlayer, null, this);//player and enemy collision

		//background movement
		backgroundOne.tilePosition.x -= 4;
		backgroundTwo.tilePosition.x -= 1;

		//player controls
		if (cursors.up.isDown){
			player.body.velocity.y = -350;
		}
		if (cursors.down.isDown){
			player.body.velocity.y = 350;
		}

		//shoot control
		if(fireButton.isDown){
			this.fireBullets();//call fireBullets function
		}
	},

	fireBullets: function(){
		if(this.time.now > bulletTime){
				bullet = bullets.getFirstExists(false);

				if(bullet){
				bullet.reset(player.x + 100, player.y);//bullet position
				bullet.body.velocity.x = 400; //bullet speed
				bulletTime = this.time.now +200;
			}
		}
	},

	createEnemies: function(){
		var enemy = enemies.create(820, this.rnd.integerInRange(20, 580), 'enemy');//declare and add enemy
		enemy.angle += -25;//angles enemy ship
		enemy.anchor.setTo(0.5, 0.5);//set enemy anchor points
		this.physics.enable(enemy, Phaser.Physics.ARCADE);//add enemy Physics
		enemy.body.velocity.x = this.rnd.integerInRange(-200, -400);//enemy speed

	},

	collisionHandler: function(bullet, enemy){
		var explosion = explosions.create(enemy.body.x, enemy.body.y, 'explosion');//declare and create explosion
		explosion.animations.add('explode', [0,1], 1, false);//explosion animation
		explosion.animations.play('explode', 10, false, true);//explosion animation play

		bullet.kill();//deletes bullet
		enemy.kill();//deletes enemies
	},

	enemyHitsPlayer: function(player, enemy){
		var explosion = explosions.create(enemy.body.x, enemy.body.y, 'explosion');//declare and create explosion
		explosion.animations.add('explode', [0,1], 1, false);//explosion animation
		explosion.animations.play('explode', 10, false,true);//explosion animation play
 
		player.kill();//deletes player
		enemy.kill();//deletes enemies
		this.time.events.add(Phaser.Timer.SECOND * 0.5, this.gameOver, this);//time before Game Over state loads
	},
	//call GameOver state
	gameOver: function(){
		this.state.start('GameOver');
	}

};