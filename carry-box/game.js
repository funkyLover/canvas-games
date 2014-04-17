$(document).ready(function () {
    var canvas = $("#gameCanvas");
    var context = canvas.get(0).getContext("2d");
    var uiIntro = $("#gameIntro");
    var uiStats = $("#gameStats");
    var uiComplete = $("#gameComplete");
    var uiPlay = $("#gamePlay");
    var uiReset = $(".gameReset");
    var uiScore = $(".gameScore");

    var playGame = false;//标志值,用于判定游戏开始与否


    var left_boxes;//左侧箱子
    var mid_boxes;//中间箱子
    var right_boxes;;//右侧箱子
    var j = 106;//键值对应按键J,下面分别对应 K L A
    var k = 107;
    var l = 108;
    var a = 97;
    var colors = ["#CC3399", "#CCCC00","#FF0000","#FF3300", "#FFFF00", "#66FFCC", "51153204", "#3300FF","#00CC00"];
    var check = false;//检测是否已有任何方位的箱子被选中

    var timeoutId;//用于调用clearTimeout方法的参数
    /*
    * 画圆角矩形的方法
    * */
    function roundRect(ctx, x, y, w, h, r, style) {
        if (w < 2 * r) r = w / 2;
        if (h < 2 * r) r = h / 2;
        ctx.strokeStyle = style;
        ctx.beginPath();
        ctx.moveTo(x+r, y);
        ctx.arcTo(x+w, y, x+w, y+h, r);
        ctx.arcTo(x+w, y+h, x, y+h, r);
        ctx.arcTo(x, y+h, x, y, r);
        ctx.arcTo(x, y, x+w, y, r);
        ctx.closePath();
    }

    //箱子的构造函数
    var Box = function(x, y, color){
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = 119;
        this.height = 39;
        this.check = false;//是否被选中
        this.linecolor = "rgb(0,0,0)";
    }

    function startGame(){
        uiScore.html("0");
        uiStats.show();
        context.clearRect(0, 0, 360, 600);
        check = false;
        left_boxes = new Array();//左侧箱子
        mid_boxes = new Array();//中间箱子
        right_boxes = new Array();//右侧箱子
        playGame = true;
        $(window).on("keypress", function(e) {
            var keyCode = e.which;
            if(keyCode == j) {
                /*
                 * 选中左边的箱子或将箱子向左移
                 * */
                if(check){
                    moveBoxToLeft();
                } else {
                    selectBox(left_boxes);
                }
             } else if(keyCode == k) {
                /*
                * 选中中间的箱子或将箱子向中移
                * */
                if(check){
                    moveBoxToMid();
                } else {
                    selectBox(mid_boxes);
                }
             } else if(keyCode == l) {
                /*
                * 选中的右边的箱子或将箱子向右移
                * */
                if(check){
                    moveBoxToRight();
                } else {
                    selectBox(right_boxes);
                }
             } else if(keyCode == a) {
                clearTimeout(timeoutId);
                animate();
            }
            if((left_boxes.length + 1)*40>600 || (mid_boxes.length + 1)*40>600 || (right_boxes.length + 1)*40>600) {
                clearTimeout(timeoutId);
                playGame = false;
                uiStats.hide();
                uiComplete.show();
                $(window).unbind("keypress");
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
            $(window).unbind("keypress");
            startGame();
        });
    }

    function animate(){
        if((left_boxes.length + 1)*40>600 || (mid_boxes.length + 1)*40>600 || (right_boxes.length + 1)*40>600) {
            clearTimeout(timeoutId);
            playGame = false;
            uiStats.hide();
            uiComplete.show();
            $(window).unbind("keypress");
        }
        //没次向3个方位的箱子数组添加箱子
        pushBox(left_boxes, 0);
        pushBox(mid_boxes, 120);
        pushBox(right_boxes, 240);

        //左方箱子向下移动
        for(var i=0;i<left_boxes.length;i++){
            left_boxes[i].y += 40;
            context.save();
            context.fillStyle = left_boxes[i].color;
            roundRect(context, left_boxes[i].x, left_boxes[i].y, left_boxes[i].width, left_boxes[i].height, 10, left_boxes[i].linecolor);
            context.stroke();
            context.fill();
            context.restore();
        }
        //中间箱子向下移动
        for(var i=0;i<mid_boxes.length;i++){
            mid_boxes[i].y += 40;
            context.save();
            context.fillStyle = mid_boxes[i].color;
            roundRect(context, mid_boxes[i].x, mid_boxes[i].y, mid_boxes[i].width, mid_boxes[i].height, 10, mid_boxes[i].linecolor);
            context.stroke();
            context.fill();
            context.restore();
        }
        //右方箱子向下移动
        for(var i=0;i<right_boxes.length;i++){
            right_boxes[i].y += 40;
            context.save();
            context.fillStyle = right_boxes[i].color;
            roundRect(context, right_boxes[i].x, right_boxes[i].y, right_boxes[i].width, right_boxes[i].height, 10, right_boxes[i].linecolor);
            context.stroke();
            context.fill();
            context.restore();
        }
        if(playGame) {
            timeoutId = setTimeout(animate, 3000);
        }
    }

    function moveBoxToLeft(){
        if(left_boxes[0] && left_boxes[0].check){
            left_boxes[0].check = false;
            left_boxes[0].linecolor = "rgb(0,0,0)";
            context.save();
            context.fillStyle = left_boxes[0].color;
            roundRect(context, left_boxes[0].x, left_boxes[0].y, left_boxes[0].width, left_boxes[0].height, 10, left_boxes[0].linecolor);
            context.stroke();
            context.fill();
            context.restore();
        } else if(mid_boxes[0].check) {
            mid_boxes[0].check = false;
            mid_boxes[0].linecolor = "rgb(0,0,0)";
            context.clearRect(mid_boxes[0].x - 1, mid_boxes[0].y - 1, mid_boxes[0].width + 2, mid_boxes[0].height + 2);
            var shiftBox = mid_boxes.shift();
            shiftBox.y = left_boxes.length * 40;
            shiftBox.x = 0;
            left_boxes.unshift(shiftBox);
            context.save();
            context.fillStyle = left_boxes[0].color;
            roundRect(context, left_boxes[0].x, left_boxes[0].y, left_boxes[0].width, left_boxes[0].height, 10, left_boxes[0].linecolor);
            context.stroke();
            context.fill();
            context.restore();
        } else if(right_boxes[0].check) {
            right_boxes[0].check = false;
            right_boxes[0].linecolor = "rgb(0,0,0)";
            context.clearRect(right_boxes[0].x - 1, right_boxes[0].y - 1, right_boxes[0].width + 2, right_boxes[0].height + 2);
            var shiftBox = right_boxes.shift();
            shiftBox.y = left_boxes.length * 40;
            shiftBox.x = 0;
            left_boxes.unshift(shiftBox);
            context.save();
            context.fillStyle = left_boxes[0].color;
            roundRect(context, left_boxes[0].x, left_boxes[0].y, left_boxes[0].width, left_boxes[0].height, 10, left_boxes[0].linecolor);
            context.stroke();
            context.fill();
            context.restore();
        }
        check = false;
    }
    function moveBoxToMid(){
        if(mid_boxes[0] && mid_boxes[0].check){
            mid_boxes[0].check = false;
            mid_boxes[0].linecolor = "rgb(0,0,0)";
            context.save();
            context.fillStyle = mid_boxes[0].color;
            roundRect(context, mid_boxes[0].x, mid_boxes[0].y, mid_boxes[0].width, mid_boxes[0].height, 10, mid_boxes[0].linecolor);
            context.stroke();
            context.fill();
            context.restore();
        } else if(left_boxes[0].check) {
            left_boxes[0].check = false;
            left_boxes[0].linecolor = "rgb(0,0,0)";
            context.clearRect(left_boxes[0].x - 1, left_boxes[0].y - 1, left_boxes[0].width + 2, left_boxes[0].height + 2);
            var shiftBox = left_boxes.shift();
            shiftBox.y = mid_boxes.length * 40;
            shiftBox.x = 120;
            mid_boxes.unshift(shiftBox);
            context.save();
            context.fillStyle = mid_boxes[0].color;
            roundRect(context, mid_boxes[0].x, mid_boxes[0].y, mid_boxes[0].width, mid_boxes[0].height, 10, mid_boxes[0].linecolor);
            context.stroke();
            context.fill();
            context.restore();
        } else if(right_boxes[0].check) {
            right_boxes[0].check = false;
            right_boxes[0].linecolor = "rgb(0,0,0)";
            context.clearRect(right_boxes[0].x - 1, right_boxes[0].y - 1, right_boxes[0].width + 2, right_boxes[0].height + 2);
            var shiftBox = right_boxes.shift();
            shiftBox.y = mid_boxes.length * 40;
            shiftBox.x = 120;
            mid_boxes.unshift(shiftBox);
            context.save();
            context.fillStyle = mid_boxes[0].color;
            roundRect(context, mid_boxes[0].x, mid_boxes[0].y, mid_boxes[0].width, mid_boxes[0].height, 10, mid_boxes[0].linecolor);
            context.stroke();
            context.fill();
            context.restore();
        }
        check = false;
    }
    function moveBoxToRight(){
        if(right_boxes[0] && right_boxes[0].check){
            right_boxes[0].check = false;
            right_boxes[0].linecolor = "rgb(0,0,0)";
            context.save();
            context.fillStyle = right_boxes[0].color;
            roundRect(context, right_boxes[0].x, right_boxes[0].y, right_boxes[0].width, right_boxes[0].height, 10, right_boxes[0].linecolor);
            context.stroke();
            context.fill();
            context.restore();
        } else if(mid_boxes[0].check) {
            mid_boxes[0].check = false;
            mid_boxes[0].linecolor = "rgb(0,0,0)";
            context.clearRect(mid_boxes[0].x - 1, mid_boxes[0].y - 1, mid_boxes[0].width + 2, mid_boxes[0].height + 2);
            var shiftBox = mid_boxes.shift();
            shiftBox.y = right_boxes.length * 40;
            shiftBox.x = 240;
            right_boxes.unshift(shiftBox);
            context.save();
            context.fillStyle = right_boxes[0].color;
            roundRect(context, right_boxes[0].x, right_boxes[0].y, right_boxes[0].width, right_boxes[0].height, 10, right_boxes[0].linecolor);
            context.stroke();
            context.fill();
            context.restore();
        } else if(left_boxes[0].check) {
            left_boxes[0].check = false;
            left_boxes[0].linecolor = "rgb(0,0,0)";
            context.clearRect(left_boxes[0].x - 1, left_boxes[0].y - 1, left_boxes[0].width + 2, left_boxes[0].height + 2);
            var shiftBox = left_boxes.shift();
            shiftBox.y = right_boxes.length * 40;
            shiftBox.x = 240;
            right_boxes.unshift(shiftBox);
            context.save();
            context.fillStyle = right_boxes[0].color;
            roundRect(context, right_boxes[0].x, right_boxes[0].y, right_boxes[0].width, right_boxes[0].height, 10, right_boxes[0].linecolor);
            context.stroke();
            context.fill();
            context.restore();
        }
        check = false;
    }

    function selectBox(boxes){
        if(boxes[0]){
            boxes[0].check = boxes[0].check ? false : true;
            boxes[0].linecolor = "rgb(255,255,255)";
            context.save();
            context.fillStyle = boxes[0].color;
            roundRect(context, boxes[0].x, boxes[0].y, boxes[0].width, boxes[0].height, 10, boxes[0].linecolor);
            context.stroke();
            context.fill();
            context.restore();
            check = true;
        }
    }
    function pushBox(boxes, x){
        var num;
        var boxColor;
        num = Math.floor(Math.random()*3);
        boxColor = colors[num];
        var box = new Box(x, -40, boxColor);
        boxes.push(box);
    }
    init();

});