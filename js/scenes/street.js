site.scenes = site.scenes || {};
site.scenes.street = function() {


	var backGroundImage = new Image();
	backGroundImage.src = 'assets/images/streetBackgroundStrip.png';

	var appartmentImage = new Image();
	appartmentImage.src = 'assets/images/appartment.png';

	var internetCafeImage = new Image();
	internetCafeImage.src = 'assets/images/internetCafe.png';

	var lastX = 0;

	var rainDrops = [];

	function newRainDrop() {
		return {
			x: Math.random() * 1000,
			z: Math.max(1, Math.random() * 5),
			y: Math.random() * 350,
			lastX: undefined,
			lastY: undefined
		}
	}

	function initRainDrops() {
		var i = 0;
		while (i < 500) {
			rainDrops.push(newRainDrop());
			i++;
		}
	}

	function updateRainDrops() {
		for (var i = rainDrops.length - 1; i >= 0; i--) {
			if (rainDrops[i].y > 340) {
				rainDrops[i].y = rainDrops[i].y % 350;
			}

			if (rainDrops[i].x < 0){
				rainDrops[i].x = rainDrops[i].x + 500;
			}

			rainDrops[i].lastX = rainDrops[i].x + (Math.random()*1);
			rainDrops[i].lastY = rainDrops[i].y;

			rainDrops[i].x -= 2*(rainDrops[i].z);
			rainDrops[i].y += 4*(rainDrops[i].z);

		};
	}

	function renderRainDrops(context) {
		context.save();
		context.beginPath();
		for (var i = rainDrops.length - 1; i >= 0; i--) {
			context.moveTo(rainDrops[i].x, rainDrops[i].y);
			context.lineTo(rainDrops[i].lastX, rainDrops[i].lastY);
		};
		context.strokeStyle = 'rgb(29,30,173)';
		context.stroke();
		context.restore();
	}

	var lastX = 0;

	function changeToSqualor(){
		//site.character.player
		site.realChangeScene(site.scenes.squalor);
	}

	function setGameToStatic(){
		site.gameChangeScene(site.scenes.static);
	}

	function changeToInternetCafe(){
		site.realChangeScene(site.scenes.internetCafe);
	}

	return {
		init: function() {
			initRainDrops();

			window.setTimeout(setGameToStatic,0);
		},
		render: function(context) {

			updateRainDrops();

			var y = 0 - (lastX * 1.25);
			if (lastX > 40) {
				y = -50;
			}
			var i = 0;
			while (i < 26) {
				context.drawImage(backGroundImage, (i * 20) - (lastX%20), 0, backGroundImage.width, backGroundImage.height);

				i++;
			}
			context.drawImage(appartmentImage, 0-lastX, -10, appartmentImage.width, appartmentImage.height);

			context.drawImage(internetCafeImage, 600-lastX, 60, internetCafeImage.width, internetCafeImage.height);

			site.character.player.renderReal(context);
			renderRainDrops(context);
		},
		deinit: function() {
			rainDrops = [];
		},
		yForX: function(x) {
			lastX = x;
			return 340;
		},
		spacePressed: function(atX){
			if (atX > 53 && atX < 105){
				//change to appartment
				window.setTimeout(changeToSqualor, 0);
			}

			if (atX > 304 && atX < 335){
				//change to internetCafe
				window.setTimeout(changeToInternetCafe, 0);
			}
		}
	}
}();