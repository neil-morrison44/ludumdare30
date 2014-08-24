site.scenes = site.scenes || {};
site.scenes.club = function(){


	var foreGroundImage = new Image();
	var midGroundImage = new Image();
	var backGroundImage = new Image();
	foreGroundImage.src = 'assets/images/clubForeground.png';
	midGroundImage.src = 'assets/images/clubMidground.png';
	backGroundImage.src = 'assets/images/clubBackground.png';

	var lastX = 0;

	return{
		init:function(){

		},
		render:function(context){

			var y = 0 - (lastX*1.25);
			if (lastX > 40){
				y = -50;
			}

			context.drawImage(backGroundImage, 0-(lastX/3), y, backGroundImage.width, backGroundImage.height);
			context.drawImage(midGroundImage, 0-((lastX/2)+50),  y, midGroundImage.width, midGroundImage.height);
			context.drawImage(foreGroundImage, 0-lastX,     y, foreGroundImage.width, foreGroundImage.height);

		},
		deinit:function(){

		},
		yForX:function(x){
			lastX = Math.max(0, x);

			if (x < 40){
				return 100+(x*1.8);
			}
			return 150;
		}
	}
}();