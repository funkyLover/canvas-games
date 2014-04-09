$(document).ready(function() {
	var canvas = $("#gameCanvas");
	var context = canvas.get(0).getContext("2d");

	var canvasWidth = canvas.width();
	var canvasHeight = canvas.height();

	var playGame;

	var asteroids;
	var numAsteroids;



	var ui = $("#gameUI"),
		uiIntro = $("#gameIntro"),
		uiStats = $("#gameStats"),
		uiComplete = $("#gameComplete"),
		uiPlay = $("#gamePlay"),
		uiReset = $(".gameReset"),
		uiScore = $(".gameScore");

	var Asteroid = function(x, y, radius, vX){
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.vX = vX;
	}
	function startGame() {
		uiScore.html("0");
		uiStats.show();

		playGame = false;
		asteroids = new Array();
		numAsteroids = 10;
		var radius,
			x,
			y,
			vX;
		for(var i=0;i<numAsteroids;i++){
			radius = 5+(Math.random()*10);
			x = canvasWidth + radius + Math.floor(Math.random() * canvasWidth);
			y = Math.floor(Math.random() * canvasHeight);
			vX = -5 -(Math.random() * 5);
			asteroids.push(new Asteroid(x, y, radius, vX));
		}

		animate();
	}

	function init() {
		uiStats.hide();
		uiComplete.hide();
		uiPlay.click(function(e) {
			e.preventDefault();
			uiIntro.hide();
			startGame();
		});

		uiReset.click(function(e) {
			e.preventDefault();
			uiCompelete.hide();
			startGame();
		});
	}

	function animate() {
		context.clearRect(0, 0, canvasWidth, canvasHeight);
		if(playGame) {
			setTimeout(animate, 33);
		}
	}

	init();
});