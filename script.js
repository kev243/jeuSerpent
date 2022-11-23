//fonction lors du lancement de la page c

window.onload = function () {
    var canvas;
    var canvasWidth = 900;
    var canvasHeight = 600
    var canvasBorder = "1px solid"
    var blockSize = 30;
    var ctx;
    var delay = 1000;
    var snakee;
    init();
    //fontion d'initialisation 
    function init() {
        canvas = document.createElement("canvas");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = canvasBorder;
        document.body.appendChild(canvas);
        //pour deciner on va utiliser le contexte
        ctx = canvas.getContext("2d")//dessin en 2 dimension
        snakee = new Snake([[6,4], [5,4], [4,4]]);
        refreshCanvas();
    }

    //fonction pour rafffraichir notre convas

    function refreshCanvas() {
        ctx.clearRect(0,0,canvasWidth, canvasHeight);
        snakee.advance();
        snakee.draw();
        setTimeout(refreshCanvas, delay);

    }

    function drawBlock(ctx, position) {
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);
    }

    function Snake(body) {
        this.body = body;
        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for (var i = 0; i < this.body.length; i++) {
                drawBlock(ctx, this.body[i]);
            }

            ctx.restore();

        };

        this.advance=function(){
            var nextPosition= this.body[0].slice();
            nextPosition[0]++;
            this.body.unshift(nextPosition);
            this.body.pop();

        }
    }



    



}