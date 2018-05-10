/*jslint devel: true */
/*jslint es6 */
'use strict';

$(document).ready(main);

function main() {
    $('html, body').css({
        'width': '100%',
        'height': '100%',
        'margin': '0px',
        'overflow': 'hidden'
    });
    $('body').append('<canvas id="canvasSnake">');
    $('#canvasSnake').css('display', 'block');
    window.requestAnimationFrame(snakeAnimation);

    let canvas = document.getElementById('canvasSnake');
    let ctx = canvas.getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    function Rect(a, b, color) {
        this.x = Math.floor(Math.random() * ctx.canvas.width); // Initial values
        this.y = Math.floor(Math.random() * ctx.canvas.height);
        this.a = a || 20;
        this.b = b || 20;
        this.color = color || 'rgb(255, 79, 252)';
        this.drawRect = function () {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.a, this.b);
        };
    }

    let head = new Rect();
    let snakeTail = [];
    let foods = [];

    let sx = 0;
    let sy = 0;
    let speed = 1;
    let direction = '';

    window.addEventListener('resize', function () {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        if (head.x > ctx.canvas.width) {
            head.x = ctx.canvas.width - head.a - sx - 1;
        }
        if (head.y > ctx.canvas.height) {
            head.y = ctx.canvas.height - head.b - sy - 1;
        }
    });

    document.querySelector('body').addEventListener('keydown', function (event) {
        if (event.key === 'w') {
            sy = -speed;
            sx = 0;
            direction = 'up';
        }
        if (event.key === 's') {
            sy = speed;
            sx = 0;
            direction = 'down';
        }
        if (event.key === 'a') {
            sx = -speed;
            sy = 0;
            direction = 'left';
        }
        if (event.key === 'd') {
            sx = speed;
            sy = 0;
            direction = 'right';
        }
    });

    for (let i = 0; i < window.innerWidth / 10; i++) {
        let food = new Rect(10, 10, 'rgb(132, 201, 12)');
        foods.push(food);
    }

    function snakeAnimation() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        foods.forEach(el => el.drawRect());
        head.drawRect();
        head.x += sx; // Head moving
        head.y += sy;

        for (let i = 0, j = 10; i < snakeTail.length; i++, j += 10) {
            if (direction === 'up') {
                snakeTail[i].x = head.x;
                snakeTail[i].y = head.y + j;
                snakeTail[i].drawRect();
            } else if (direction === 'down') {
                snakeTail[i].x = head.x;
                snakeTail[i].y = head.y - j;
                snakeTail[i].drawRect();
            } else if (direction === 'left') {
                snakeTail[i].x = head.x + j;
                snakeTail[i].y = head.y;
                snakeTail[i].drawRect();
            } else if (direction === 'right') {
                snakeTail[i].x = head.x - j;
                snakeTail[i].y = head.y;
                snakeTail[i].drawRect();
            }
        }

        for (let i = 0; i < foods.length; i++) {
            if (head.x <= foods[i].x + 9 && head.x >= foods[i].x - 19 &&
                head.y <= foods[i].y + 9 && head.y >= foods[i].y - 19) {
                let newPiece = new Rect(null, null, randomColor());
                snakeTail.push(newPiece);
                foods.splice(i, 1);
            }
        }

        if (head.x >= ctx.canvas.width - head.a || head.x <= 0) {
            sx *= -1;
        } else if (head.y >= ctx.canvas.height - head.b || head.y <= 0) {
            sy *= -1;
        }
        window.requestAnimationFrame(snakeAnimation);
    }
}

function randomColor() {
    return 'rgb(' + Math.floor(Math.random() * 100 + 100) +
        ', ' + Math.floor(Math.random() * 155) +
        ', ' + Math.floor(Math.random() * 100 + 155) + ')';
}
