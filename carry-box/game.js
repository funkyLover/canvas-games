$(document).ready(function () {
    var canvas = $("#gameCanvas");
    var context = canvas.get(0).getContext("2d");
    var uiIntro = $("#gameIntro");
    var uiStats = $("#gameStats");
    var uiComplete = $("#gameComplete");
    var uiPlay = $("#gamePlay");
    var uiReset = $(".gameReset");
    var uiScore = $(".gameScore");

    var playGame;//标志值,用于判定游戏开始与否

    var j = 106;//键值对应按键J,下面分别对应 K L A
    var k = 107;
    var l = 108;
    var a = 97;
    var colors = ["#CC3399", "#CCCC00","#FF0000","#FF3300", "#FFFF00", "#66FFCC", "51153204", "#3300FF","#00CC00"];

    var boxes = new Array();//箱子

    function roundRect(ctx, x, y, w, h, r) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        ctx.beginPath();
        ctx.moveTo(x+r, y);
        ctx.arcTo(x+w, y, x+w, y+h, r);
        ctx.arcTo(x+w, y+h, x, y+h, r);
        ctx.arcTo(x, y+h, x, y, r);
        ctx.arcTo(x, y, x+w, y, r);
        ctx.closePath();
    }

    var Box = function(x, y, color){
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = 120;
        this.height = 40;
    }

    function startGame(){
        uiScore.html("0");
        uiStats.show();
        playGame = true;
        $(window).on("keypress", function(e) {
            var keyCode = e.which;
            if(keyCode == j) {
                /*
                * 选中左边的箱子或将箱子向左移
                * */
            } else if(keyCode == k) {
                /*
                * 选中中间的箱子或将箱子向中移
                * */
            } else if(keyCode == l) {
                /*
                * 选中的右边的箱子或将箱子向右移
                * */
            } else if(keyCode == a) {
                /*
                * 让箱子立即下降一层
                * */
            }
            alert(keyCode);
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
            $(window).unbind("keypress");
            startGame();
        });
    }

    function animate(){
        /*
        * 这里是游戏逻辑
        * */
        var num;
        var boxColor;

        for(var i=0;i<boxes.length;i++){
            boxes[i].y += 40;
            context.save();
            context.fillStyle = boxes[i].color;
            roundRect(context, boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height, 10);
            context.stroke();
            context.fill();
            context.restore();
        }
        for(var i=0;i<3;i++){
            num = Math.floor(Math.random()*3);
            boxColor = colors[num];
            var box = new Box(120*i, 0, boxColor);
            boxes.push(box);
            context.save();
            context.fillStyle = box.color;
            context.strokeStyle = "rgb(0,0,0)";
            roundRect(context, box.x, box.y, box.width, box.height, 10);
            context.stroke();
            context.fill();
            context.restore();
        }

        if(playGame) {
            setTimeout(animate, 1500);
        }

     }
    init();

});