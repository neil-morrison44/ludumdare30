// shim layer with setTimeout fallback
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
})();

var site = function() {

	var currentGameScene, currentRealScene;
	var gameContext, realContext;

	function changeGameScene(toScene) {
		if (currentGameScene) {
			currentGameScene.deinit();
		}
		currentGameScene = toScene;
		currentGameScene.init();

	}

	function changeRealScene(toScene) {
		if (currentRealScene) {
			currentRealScene.deinit();
		}
		currentRealScene = toScene;
		currentRealScene.init();

	}

	function render() {
		window.requestAnimFrame(render);
		site.character.player.update();
		if (currentGameScene) {
			gameContext.clearRect(0,0,500,150);
			currentGameScene.render(gameContext);
			site.character.player.renderGame(gameContext);
		}
		if (currentRealScene) {
			realContext.clearRect(0,0,500,350);
			currentRealScene.render(realContext);
			//site.character.player.renderGame(gameContext);
		}
	}

	var isActiveReal = false;

	return {
		init: function() {
			gameContext = $('#gameWorldCanvas')[0].getContext('2d');
			realContext = $('#realWorldCanvas')[0].getContext('2d');
			currentGameScene = site.scenes.club;
			currentRealScene = site.scenes.squalor;
			site.character.player.init();
			$('#realWorldCanvas').addClass('inactive');
			render();
		},
		realChangeScene: function(toScene) {
			changeRealScene(toScene);
		},
		gameChangeScene: function(toScene) {
			changeGameScene(toScene);
		},
		getRealScene:function(){
			return currentRealScene;
		},
		getGameScene: function(){
			return currentGameScene;
		},
		isRealActive:function(){
			return isActiveReal;
		},
		switchActive:function(){
			isActiveReal = !isActiveReal;
			if (isActiveReal){
				$('#realWorldCanvas, #gameWorldCanvas').removeClass('inactive');
				$('#gameWorldCanvas').addClass('inactive');
			}else{
				$('#gameWorldCanvas').removeClass('inactive');
				$('#realWorldCanvas').addClass('inactive');
			}
		}
	}
}();

$(document).ready(site.init);