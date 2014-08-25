site.scenes = site.scenes || {};
site.scenes.static = function(){

	return{
		init:function(){
			site.character.player.setGame(0, -100);
		},
		render:function(context){
			var i = 0;
			while (i < 1000){
				var grey = Math.round(Math.random()*25);

				if (Math.random() < 0.025){
					grey = 255 - grey;
				}

				context.fillStyle = 'rgb('+grey+','+grey+','+grey+')';
				context.fillRect((i*15)%500,(Math.round((i*15)/500)*5)-5,15,15);
				i++;
			}
		},
		deinit:function(){

		},
		yForX:function(x){

			return -100;
		}
	}
}();