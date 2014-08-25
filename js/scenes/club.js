site.scenes = site.scenes || {};
site.scenes.club = function(){
	"use strict";

	var foreGroundImage = new Image();
	var midGroundImage = new Image();
	var backGroundImage = new Image();
	foreGroundImage.src = 'assets/images/clubForeground.png';
	midGroundImage.src = 'assets/images/clubMidground.png';
	backGroundImage.src = 'assets/images/clubBackground.png';

	var lastX = 0;

	var lines;

	var linesFirst = [
		{you:true, text:"Samantha?"},
		{you:false, text:"No wetworld names in here, wetwalker, it's Candy."},
		{you:true, text:"right, Candy, word's out that you've got some problems"},
		{you:true, text:"with folks taking things which don't belong to them?"},
		{you:false, text:"What about it? You getting busy about other folks's business?"},
		{you:true, text:"You.. asked me here?"},
		{you:false, text:"Play. the. game. wetwalker, the wetworld's gone to your head."},
		{you:true, text:"...sounded like someone had tricked you out of a fair bit of coin"},
		{you:false, text:"took me for six and robbed me blind..."},
		{you:false, text:"real smooth about it too,"}, 
		{you:false, text:"I thought men like that were meant to have honour..."},
		{you:true, text:"men like what?"},
		{you:false, text:"Knights."},
		{you:true, text:"a Knight in a club like this?"},
		{you:false, text:"No, you dumb wetwalker.."},
		{you:false, text:"he's usually bouncing around as a Knight in the Ren Faire sim"},
		{you:false, text:"goes by the name XxX_FunkyButtStuff56_XxX."},
		{you:true, text:"...And in the wetworld?"},
		{you:false, text:"Ugh, Dunno,"}, 
		{you:false, text:"I think he mentioned getting wheeled into the V-Cafe across town"},
		{you:true, text:"Across town? Alright, I'll start looking there."},
		{you:false, text:"Enough wetworld talk, don't let a lady down."},
		{you:false, text:false}
	];

	var linesUSB = [
		{you:false, text:"[ Away From HMD Message ]..."},
		{you:false, text:"HELP WETWALKERS, BANGING ON DOOR. PROTECT USB."},
		{you:false, text:false}
	];
	var linePos = -1;

	return{
		init:function(){
			linePos = -1;

			if (site.character.player.gotUSB){
				lines = linesUSB;
			}else{
				lines = linesFirst;
			}

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
		},
		spacePressed: function(atX){
			if (atX > 270 && atX < 327){
				//near the dame
				if (linePos < lines.length){
					linePos++;
					var fromPoint;
					var line = lines[linePos];
					if (line.you){
						fromPoint = {x: lastX, y: 60};
					}else{
						fromPoint = {x: 360, y: 60};
					}
					site.text.display.setGameText(line.text, fromPoint);

					if (line.text === false){
						site.character.player.gotName = true;
					}

					if (site.character.player.gotUSB && line.text == false){
						//end game
						$('body').addClass('fin');
					}
				}
			}
		}
	}
}();