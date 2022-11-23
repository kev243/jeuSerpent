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
    var applee;
    var widthInBlocks= canvasWidth/blockSize;
    var heightInBlocks=canvasHeight/blockSize;
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
        snakee = new Snake([[6,4], [5,4], [4,4]], "right");
        applee=new Apple([10,10]);
    
        refreshCanvas();
    }

    //fonction pour rafffraichir notre convas

    function refreshCanvas() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        snakee.advance();
        snakee.draw();
        applee.draw();
        setTimeout(refreshCanvas, delay);

    }

    function drawBlock(ctx, position) {
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);
    }

    function Snake(body, direction) {
        this.body = body;
        this.direction = direction;

        this.draw = function () {
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for (var i = 0; i < this.body.length; i++) {
                drawBlock(ctx, this.body[i]);
            }

            ctx.restore();

        };

        this.advance = function () {
            var nextPosition = this.body[0].slice();
            nextPosition[0]++;
            switch (this.direction) {
                case "left":
                    nextPosition[0] -= 1;
                    break;
                case "right":
                    nextPosition[0] += 1;
                    break;
                case "down":
                    nextPosition[1] += 1;
                    break;
                case "up":
                    nextPosition[1] -= 1;
                    break;
                    default:
                        throw("invalide direction")


            }
            this.body.unshift(nextPosition);
            this.body.pop();

        };

        this.setDirection=function(newDirection){
            var allowedDirections;
            switch (this.direction) {
                case "left":
                case "right":
                    allowedDirections = ["up", "down"];
                    break;
                case "down":
                case "up":
                    allowedDirections = ["left", "right"];
                    break;
                    default:
                        throw("invalide direction")
            }
            if (allowedDirections.indexOf(newDirection)> -1)
            {
                this.direction=newDirection
            }
        };

        this.checkCollision= function(){
            var wallCollision = false;
            var snakeCollision= false;
            var rest =this.body.slice(1);
            var head = this.body[0];
            var snakeY=head[1]
            var snakeX= head[0];
            var minX=0;
            var minY=0;
            var maxX=widthInBlocks-1;
            var maxY=widthInBlocks-1;
            var isNotBetweenHorizonrtalWalls=snakeX < minX || snakeX >maxX;
            var isNotBetweenVerticalWalls=snakeY < minY|| snakeY >maxY;
            if (isNotBetweenHorizonrtalWalls|| isNotBetweenVerticalWalls){
                wallCollision=true
            }
        }
    }

    function Apple(position){
        this.position =position;
        this.draw = function(){
            ctx.save();
            ctx.fillStyle="#33cc33";

            

            ctx.beginPath();
            var radius=blockSize/2;
            var x=position[0]*blockSize+radius;
            var y=position [1]*blockSize+radius;
            ctx.arc(x,y,radius,0,Math.PI*2,true),
            ctx.fill();
            

            ctx.restore();
        }
    }


    document.onkeydown = function handleKeyDowm(e) {
        var key = e.keyCode;
        var newDirection;
        switch (key) {
            case 37:
                newDirection = "left"
                break;
            case 38:
                newDirection = "up";
                break;
            case 39:
                newDirection = "right";
                break;
            case 40:
                newDirection = "down";
                break;

                default:
                  return
        }
        snakee.setDirection(newDirection);
    }




}