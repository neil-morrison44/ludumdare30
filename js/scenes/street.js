site.scenes = site.scenes || {};
site.scenes.street = function() {


	var backGroundImage = new Image();
	backGroundImage.src = 'assets/images/streetBackgroundStrip.png';

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

	return {
		init: function() {
			initRainDrops();
		},
		render: function(context) {

			updateRainDrops();

			var y = 0 - (lastX * 1.25);
			if (lastX > 40) {
				y = -50;
			}
			var i = 0;
			while (i < 26) {
				context.drawImage(backGroundImage, i * 20, 0, backGroundImage.width, backGroundImage.height);

				i++;
			}
			site.character.player.renderReal(context);
			renderRainDrops(context);
		},
		deinit: function() {
			rainDrops = [];
		},
		yForX: function(x) {
			return 340;
		}
	}
}();