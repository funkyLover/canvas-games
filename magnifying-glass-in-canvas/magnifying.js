$(document).ready(function () {
    var canvas = $("#canvas");
    var context = canvas.get(0).getContext("2d");
    loadImage("../image/example.jpg", function() {
        context.drawImage(this, 0, 0);
    });

    /*
    * 测试getImageData方法和putImageData方法
    * */
    var imgData = context.getImageData(0, 0, 800, 600);
    context.putImageData(imgData, 0, 0);

    /*
    * 放大镜
    * */
    canvas.on("mousemove", function(e) {
        context.strokeStyle = "rgb(255,255,255)";
        context.beginPath();
        context.arc(e.clientX, e.clientY, 50, 0, Math.PI*2, true);
        context.closePath();
        context.stroke();
    });

    function loadImage(url, callback) {
        var img = new Image(); //创建一个Image对象，实现图片的预下载
        img.src = url;

        if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
            callback.call(img);
            return; // 直接返回，不用再处理onload事件
        }
        img.onload = function () { //图片下载完毕时异步调用callback函数。
            callback.call(img);//将回调函数的this替换为Image对象
        };
    }

});

