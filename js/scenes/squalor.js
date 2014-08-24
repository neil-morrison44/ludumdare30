site.scenes = site.scenes || {};
site.scenes.squalor = function(){


	var foreGroundImage = new Image();
	var midGroundImage = new Image();
	var backGroundImage = new Image();
	foreGroundImage.src = 'assets/images/squalorForeground.png';
	backGroundImage.src = 'assets/images/squalorBackground.png';

	var lastX = 0;

	function exitToStreet(){
		site.realChangeScene(site.scenes.street);
	}
	return{
		init:function(){

		},
		render:function(context){

			context.save();
			context.fillStyle = 'rgb(123,123,123)';
			context.fillRect(0,0,500,350);

			context.fillStyle = 'rgb(73,73,73)';
			context.fillRect(96,96,308,158);

			context.strokeRect(96,96,308,158);

			context.drawImage(backGroundImage, 100, 100, backGroundImage.width, backGroundImage.height);
			// context.drawImage(midGroundImage, 0-((lastX/2)+50),  y, midGroundImage.width, midGroundImage.height);
			site.character.player.renderReal(context);
			context.drawImage(foreGroundImage, 100,  100, foreGroundImage.width, foreGroundImage.height);
			context.restore();
		},
		deinit:function(){

		},
		yForX:function(x){

			if (x < 90){
				window.setTimeout(exitToStreet,0);
			}

			return 100+150;
		}
	}
}();