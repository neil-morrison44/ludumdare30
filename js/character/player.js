site.character = site.character || {};
site.character.player = function() {
	"use strict";
	var realX = 100;
	var realY = 250;
	var gameX = 0;
	var gameY = 70;

	var velocityX = 0;

	var playerImage = new Image();
	playerImage.src = "assets/images/player.png";
	var playerHMDImage = new Image();
	playerHMDImage.src = "assets/images/playerHMD.png";

	function handleKeyDown(event) {
		switch (event.keyCode) {
			case 68:
			case 39:
				//right pressed
				velocityX = 0.75;
				break;
			case 65:
			case 37:
				//left pressed
				velocityX = -0.75;
				break;

		}
	}

	function handleKeyUp(event) {
		console.log(event.keyCode);
		switch (event.keyCode) {
			case 68:
			case 39:
				//right pressed
				velocityX = 0;
				break;
			case 65:
			case 37:
				//left pressed
				velocityX = 0;
				break;
			case 83:
				site.switchActive();

		}
	}

	function update() {
		if (site.isRealActive()) {
			realX += velocityX;
			realY = site.getRealScene().yForX(realX);

			if (velocityX !== 0) {
				realFrame += 1;
				if (realFrame == 30) {
					realFrame = 0;
				}
			} else {
				realFrame = 0
			}

			if (velocityX < 0) {
				realReverse = true;
			} else if (velocityX > 0) {
				realReverse = false;
			}


		} else {
			gameX += velocityX;
			gameY = site.getGameScene().yForX(gameX);

			if (velocityX !== 0) {
				gameFrame += 1;
				if (gameFrame == 30) {
					gameFrame = 0;
				}
			} else {
				gameFrame = 0
			}

			if (velocityX < 0) {
				gameReverse = true;
			} else if (velocityX > 0) {
				gameReverse = false;
			}
		}

		if (site.isRealActive() && HMDFrame > -1){
			HMDFrame--;
		}else if(HMDFrame < 2 && !site.isRealActive()){
			HMDFrame++;
		}

	}

	var gameReverse = false;
	var gameFrame = 0;

	var realReverse = false;
	var realFrame = 0;
	var HMDFrame = 2;

	return {
		init: function() {
			window.addEventListener('keydown', handleKeyDown);
			window.addEventListener('keyup', handleKeyUp);
		},
		renderReal: function(context) {


			context.save();
			context.fillStyle = 'red';

			var imageToUse;
			switch (Math.round(realFrame / 10)) {
				case 0:
					imageToUse = 0;
					break;
				case 1:
					imageToUse = 1;
					break;
				case 2:
					imageToUse = 0;
					break;
				case 3:
					imageToUse = 2;
					break;
			}
			var xPos = realX;
			if (realReverse) {
				context.translate(500, 0);
				context.scale(-1, 1);
				xPos = 500 - (realX + 40);
			}

			if (!site.isRealActive() || HMDFrame > -1){
				context.drawImage(playerHMDImage, (HMDFrame * 40), 0, 40, 100, xPos, realY - 100, 40, 100);
			}else{
				context.drawImage(playerImage, (imageToUse * 40), 0, 40, 100, xPos, realY - 100, 40, 100);
			}
			context.restore();
		},
		getReal: function() {
			return {
				x: realX,
				y: realY
			};
		},
		renderGame: function(context) {
			context.save();
			context.fillStyle = 'red';

			var imageToUse;
			switch (Math.round(gameFrame / 10)) {
				case 0:
					imageToUse = 0;
					break;
				case 1:
					imageToUse = 1;
					break;
				case 2:
					imageToUse = 0;
					break;
				case 3:
					imageToUse = 2;
					break;
			}
			var xPos = gameX;
			if (gameReverse) {
				context.translate(500, 0);
				context.scale(-1, 1);
				xPos = 500 - (gameX + 40);
			}
			context.drawImage(playerImage, (imageToUse * 40), 0, 40, 100, xPos, gameY - 100, 40, 100);
			context.restore();
		},
		getGame: function() {
			return {
				x: gameX,
				y: gameY
			};
		},
		deinit: function() {

		},
		update: function() {
			update();
		}
	}
}();