site.scenes = site.scenes || {};
site.scenes.renFaire = function(){


	var horseImage = new Image();
	var midGroundImage = new Image();
	var backGroundImage = new Image();
	var helpStandImage = new Image();

	horseImage.src = 'assets/images/horseRider.png';
	midGroundImage.src = 'assets/images/renFaireMidground.png';
	backGroundImage.src = 'assets/images/renFaireBackground.png';
	helpStandImage.src = 'assets/images/renFaireHelpStand.png';

	var lastX = 0;

	var horses = [];

	function initHorses(){
		horses = [];
		var i = 0;
		while (i < 7){
			horses.push(newHorse(i));

			if (horses[i].direction == 0){
				horses[i].direction = -1;
			}
			i++;
		}
		
	}

	function newHorse(i){
		return {
			x:Math.random()*800,
			moving:false,
			horseNumber:i,
			direction:Math.round(Math.random())
		}
	}

	function updateHorses(){
		for (var i = horses.length - 1; i >= 0; i--) {
			horses[i]

			var isMoving = horses[i].moving;
			if (horses[i].moving){

				horses[i].x += (Math.random()*6)*horses[i].direction;

				horses[i].moving = (Math.random() < 0.9);
			}else{
				horses[i].moving = (Math.random() < 0.009);
			}

			if (horses[i].x < 0){
				horses[i].direction = 1;
			}else if (horses[i].x > 600){
				horses[i].direction = -1;
			}

			if (isMoving !== horses[i].moving){
				if (horses[i].moving){
					site.scenes.internetCafe.playerMoving(horses[i].horseNumber);
				}else{
					site.scenes.internetCafe.playerStopMoving(horses[i].horseNumber);
				}
				
			}
		}


	}

	function renderHorses(context){
		for (var i = horses.length - 1; i >= 0; i--) {
			//horses[i]

			var y = 40;
			if (horses[i].moving){
				y -= Math.random()*4;
			}
			context.drawImage(horseImage, horses[i].x - lastX, y, horseImage.width, horseImage.height);

			context.fillStyle = 'white';

			context.font = '14pt Arial';

			context.fillText(horses[i].horseNumber, (horses[i].x - lastX)+94, y+70);
		};
	}

	var playerSeeked = Math.round(Math.random()*7);

	var lines;

	var linesWithName = [
		{you:true, text:"Hey"},
		{you:false, text:"Need Some help?"},
		{you:true, text:"Yeah, I'm looking for funky butt stuff"},
		{you:false, text:"...meet me in the dungeon sim in 30."},
		{you:true, text:"What? No. XxX_FunkyButtStuff56_XxX."},
		{you:false, text:"Oh. Forget that. Yeah He's playing as Horse number " + playerSeeked},
		{you:true, text:"What's with the bouncing?"},
		{you:false, text:"It's a pretty intense sim, most people get really into it."},
		{you:false, text:"I mean, what bouncing, are you a wetwalker?"},
		{you:true, text:"Hah, no, felt it while I was being wheeled in"},
		{you:false, text:false}
	];

	var linesWithoutName = [
		{you:true, text:"Hey"},
		{you:false, text:"Need Some help?"},
		{you:true, text:"What's this?"},
		{you:false, text:"Ren Faire sim, the knights are about to start a horse battle soon"},
		{you:false, text:false}
	];

	
	var linePos = -1;
	return{
		init:function(){
			initHorses();

			if (site.character.player.gotName){
				lines = linesWithName;
			}else{
				lines = linesWithoutName;
			}

			linePos = -1;
		},
		render:function(context){
			var y = 0;

			context.drawImage(backGroundImage, 0-(lastX/4), y, backGroundImage.width, backGroundImage.height);
			context.drawImage(midGroundImage, 0-((lastX/2)),  y, midGroundImage.width, midGroundImage.height);
			context.drawImage(helpStandImage, 0 - lastX, 30, helpStandImage.width, helpStandImage.height);
			//context.drawImage(foreGroundImage, 0-lastX,     y, foreGroundImage.width, foreGroundImage.height);
			updateHorses();
			renderHorses(context);

		},
		deinit:function(){

		},
		yForX:function(x){
			lastX = x;
			return 150;
		},
		spacePressed: function(atX){
			console.log(atX);
			if (atX > -12 && atX < 30){
				//near the dame
				if (linePos < lines.length){
					linePos++;
					var fromPoint;
					var line = lines[linePos];
					if (line.you){
						fromPoint = {x: lastX, y: 60};
					}else{
						fromPoint = {x: 10-lastX, y: 60};
					}
					site.text.display.setGameText(line.text, fromPoint);
				}
			}
		},
		checkPlayerNumber:function(playerNumber){
			return (playerNumber == playerSeeked);
		}
	}
}();