$(document).ready(function(){
    var canvas = $("#canvas");
    var context = $("#canvas").get(0).getContext("2d");
    $(window).resize(resizeCanvas);
    function resizeCanvas(){
        canvas.attr("width",$(window).get(0).innerWidth);
        canvas.attr("height",$(window).get(0).innerHeight);
        context.fillRect(0,0,canvas.width(),canvas.height());
    }
    resizeCanvas();

    var flag = false;
    var startX;
    var startY;
    $(canvas).on("mousedown",function(e) {
        flag = true;
        startX = e.clientX;
        startY = e.clientY;
    });
    $(canvas).on("mousemove",function(e) {
        if(flag){
            var endX = e.clientX;
            var endY = e.clientY;
            context.beginPath();
            context.moveTo(startX, startY);
            context.lineTo(endX, endY);
            context.strokeStyle = "rgb(255,255,255)"
            context.lineWidth = 4;
            context.lineCap = "round";
            context.stroke();

            startX = endX;
            startY = endY;
        }
    });
    $(canvas).on("mouseup", function(e) {
        flag = false;
    });
    $(canvas).on("click", function(e) {
        context.fillStyle = "rgb(255,255,255)"
        context.beginPath();
        context.arc(e.clientX, e.clientY, 2, 0, Math.PI*2, true);
        context.closePath();
        context.fill();
    })
});