$(document).ready(function () {
    var canvas = $("#canvas");
    var context = canvas.get(0).getContext("2d");
    loadImage("../image/example.jpg", function() {
        context.drawImage(this, 0, 0);
    });

    var imgData = null;
    var preX;//用于移动鼠标时恢复canvas
    var preY;
    var multiple = 2;//放大两倍

    canvas.on("mousemove", function(e) {
        /*
         * 如果鼠标是第一次移入canvas
         * 则根据坐标获取imgData用于将背景图像恢复到canvas中
         * 如果已有imgData,则用putImageData将图像恢复到canvas中
         *
         * */
        if(imgData) {
            context.putImageData(imgData, preX - 51, preY - 51);
            imgData = context.getImageData(e.clientX - 51, e.clientY - 51, 102, 102);
        } else {
            imgData = context.getImageData(e.clientX - 51, e.clientY - 51, 102, 102);
        }
        /*
        * 在调用getImageData putImageData 和 drawImage的时候
        * 参数与放大镜本身的尺寸50*50并不相等
        * 原本应该只获取放大镜的最小外接矩形,
        * 但是如果获取到的是最小外接矩形的话
        * 绘制时就会出现误差,这是因为忽略了放大镜圆形区域的边界的宽度,
        * 由于实在想不出更好的办法,所以就只能获取比最小外界矩形稍大的矩形区域
        * */
        context.save();
        //保存canvas状态
        context.strokeStyle = "rgb(255,255,255)";
        context.beginPath();
        context.arc(e.clientX, e.clientY, 50, 0, Math.PI*2, true);
        context.closePath();
        context.stroke();
        context.clip();
        //剪辑放大镜区域
        context.drawImage(canvas.get(0), e.clientX - 51, e.clientY - 51, 102, 102,
            e.clientX - 51*multiple, e.clientY - 51*multiple, 102*multiple, 102*multiple);
        context.restore();
        //恢复canvas状态
        /*
        * 这里赋值给preX 和 preY
        * 这两个坐标用于调用putImageData将图像
        * 恢复canvas中时的定位
        * */
        preX = e.clientX;
        preY = e.clientY;
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

