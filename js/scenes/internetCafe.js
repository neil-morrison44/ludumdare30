site.scenes = site.scenes || {};
site.scenes.internetCafe = function() {
	"use strict";

	var knightImage = new Image();
	var deskImage = new Image();
	var backGroundImage = new Image();
	knightImage.src = 'assets/images/knightReal.png';
	deskImage.src = 'assets/images/computerDesk.png';
	backGroundImage.src = 'assets/images/internetCafeStrip.png';

	var lastX = 0;

	function shuffle(o) { //v1.0
		for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	};

	function changeToStreet() {
		site.character.player.setReal(320, 340);
		site.realChangeScene(site.scenes.street);
	}

	function setGameToRenFaire() {
		site.gameChangeScene(site.scenes.renFaire);
	}

	var players = [];

	function initPlayers() {
		players = [];
		var i = 0;
		while (i < 7) {
			players.push({
				number: i,
				moving: false
			});
			i++;
		}
		shuffle(players);
	}

	var renFaireActived = false;

	var linesWinner = [{
		you: true,
		text: "HEY"
	}, {
		you: false,
		text: "What? Dude, no wet-talking."
	}, {
		you: true,
		text: "You've taken something you shouldn't have."
	}, {
		you: false,
		text: "Oh Shit. I'm not looking for any trouble."
	},{
		you: true,
		text: "Give it up and this won't come to anything."
	},{
		you: false,
		text: "[Gives USB stick]."
	},{
		you: false,
		text: false
	}];

	var linesLoser = [{
		you: true,
		text: "HEY"
	}, {
		you: false,
		text: "What? Dude, no wet-talking."
	}, {
		you: true,
		text: "You've taken something you shouldn't have."
	}, {
		you: false,
		text: "What the hell are you talking about? get out",
		action: changeToStreet
	}, {
		you: false,
		text: false
	}];

	var linePos = -1;


	return {
		init: function() {
			site.character.player.setReal(0, 265);
			initPlayers();
			renFaireActived = false;
		},
		render: function(context) {

			context.fillStyle = 'rgb(23,23,23)';
			context.fillRect(0, 0, 500, 350);

			var i = 0;
			while (i < 45) {
				context.drawImage(backGroundImage, (i * 20) - (lastX / 1.5), 100, backGroundImage.width, backGroundImage.height);
				i++;
			}
			i = 0;
			while (i < 7) {
				var y = 165;
				if (players[i].moving) {
					y -= (Math.random() * 4);
				}
				context.drawImage(knightImage, ((i * 110) - (lastX / 1.5)) + 60, y, knightImage.width, knightImage.height);
				context.drawImage(deskImage, ((i * 110) - (lastX / 1.5)) + 20, 180, deskImage.width, deskImage.height);
				i++;
			}

			//context.drawImage(midGroundImage, 0-((lastX/2)+50),  y, midGroundImage.width, midGroundImage.height);
			//context.drawImage(foreGroundImage, 0-lastX,     y, foreGroundImage.width, foreGroundImage.height);

			site.character.player.renderReal(context);
		},
		deinit: function() {

		},
		yForX: function(x) {
			lastX = x;
			if (x < 0) {
				window.setTimeout(changeToStreet, 0);
			}
			return 265;
		},
		switchActivated: function() {
			if (!renFaireActived) {
				window.setTimeout(setGameToRenFaire, 0);
				renFaireActived = true;
			}
		},
		playerMoving: function(playerNumber) {
			//players[playerNumber].moving = true;

			for (var i = players.length - 1; i >= 0; i--) {
				if (players[i].number == playerNumber) {
					players[i].moving = true;
				}
			};
		},
		playerStopMoving: function(playerNumber) {
			//players[playerNumber].moving = false;

			for (var i = players.length - 1; i >= 0; i--) {
				if (players[i].number == playerNumber) {
					players[i].moving = false;
				}
			};

		},
		spacePressed: function(atX) {

			var nextToPlayer;
			if (atX < 54) {
				nextToPlayer = 1;
			} else if (atX < 118) {
				nextToPlayer = 2;
			} else if (atX < 186) {
				nextToPlayer = 3;
			} else if (atX < 250) {
				nextToPlayer = 4;
			} else if (atX < 315) {
				nextToPlayer = 5;
			} else if (atX < 384) {
				nextToPlayer = 6;
			} else if (atX < 447) {
				nextToPlayer = 7;
			}
			if (nextToPlayer == undefined){
				return;
			}
			var player = players[nextToPlayer - 1];
			if (site.scenes.renFaire.checkPlayerNumber(player.number)) {
				if (linePos < linesWinner.length) {
					linePos++;
					var fromPoint;
					var line = linesWinner[linePos];
					if (line.you) {
						fromPoint = {
							x: lastX,
							y: 160
						};
					} else {
						fromPoint = {
							x: lastX+10,
							y: 150
						};
					}
					site.text.display.setRealText(line.text, fromPoint);

					if (line.text === false){
						site.character.player.gotUSB = true;
					}
				}
			};

		}
	}
}();