$(document).ready(function() {
	var canvas = $("#gameCanvas");
	var context = canvas.get(0).getContext("2d");

	var canvasWidth = canvas.width();
	var canvasHeight = canvas.height();

	var playGame;

	var asteroids;
	var numAsteroids;
    var player;

    var arrowUp = 38;
    var arrowRight = 39;
    var arrowDown = 40;



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

    var Player = function(x, y) {
        this.x = x;
        this.y = y;
        this.width = 24;
        this.height = 24;
        this.halfWidth = this.width/2;
        this.halfHeight = this.height/2;
        this.vX = 0;
        this.vY = 0;
        this.moveRight = false;
        this.moveUp = false;
        this.moveDown = false;

    }

	function startGame() {
		uiScore.html("0");
		uiStats.show();

		playGame = false;
		asteroids = new Array();
		numAsteroids = 10;
        player = new Player(150, canvasHeight/2);

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
        $(window).keydown(function(e) {
            var keyCode = e.which;
            if(!playGame) {
                playGame = true;
                animate();
            }
            alert(keyCode);
            if(keyCode == arrowRight) {
                player.moveRight = true;
            } else if(keyCode == arrowUp) {
                player.moveUp = true;
            } else if(keyCode == arrowDown) {
                player.moveDown = true;
            }
        });
        $(window).keyup(function(e) {
            var keyCode = e.which;
            alert(keyCode);
            if(keyCode == arrowRight) {
                player.moveRight = false;
            } else if(keyCode == arrowUp) {
                player.moveUp = false;
            } else if(keyCode == arrowDown) {
                player.moveDown = false;
            }
        });
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
			uiComplete.hide();
            $(window).unbind("keyup");
            $(window).unbind("keydown");
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