site.text = site.text || {};
site.text.display = function(){

	var realText, gameText;

	var realPoint, gamePoint;


	function renderText(text, context, fromPoint){
		context.save();
		context.font = '13pt Sans Serif, Arial';
		context.fillStyle = 'white';
		context.strokeStyle = 'white';
		context.textAlign = 'center';
		var textWidth = context.measureText(text).width;
		context.fillText('"'+text+'"', 250, 30);

		context.beginPath();
		context.moveTo(250 - (textWidth/2), 35);
		context.lineTo(fromPoint.x, fromPoint.y);
		context.stroke();

		context.restore();
	}

	return{
		init:function(){

		},
		renderReal:function(context){
			if (realText){
				renderText(realText, context, realPoint);
			}
		},
		renderGame:function(context){
			if (gameText){
				renderText(gameText, context, gamePoint);
			}
		},
		setRealText:function(text, fromPoint){
			realText = text;
			realPoint = fromPoint;
		},
		setGameText:function(text, fromPoint){
			gameText = text;
			gamePoint = fromPoint;
		}
	}
}();