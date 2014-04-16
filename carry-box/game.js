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
    var a = 97

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
    init();
});