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

    function Rect(x, y, a, b, color) {
        this.x = x || Math.random() * ctx.canvas.width; // Initial values
        this.y = y || Math.random() * ctx.canvas.height;
        this.a = a || 20;
        this.b = b || 20;
        this.color = color || 'rgb(123, 180, 224)';
        this.drawRect = function () {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.a, this.b, );
        };
    }

    let sx = 0;
    let sy = 0;
    let snake = [];
    let foods = [];
    let obstacles = [];

    let head = new Rect();

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

    window.addEventListener('keyup', function (event) {
        if (event.key === 'w') {
            sy = -1;
            sx = 0;
        }
        if (event.key === 's') {
            sy = 1;
            sx = 0;
        }
        if (event.key === 'a') {
            sx = -1;
            sy = 0;
        }
        if (event.key === 'd') {
            sx = 1;
            sy = 0;
        }
    });

    for (let i = 0; i < window.innerWidth / 30; i++) {
        let food = new Rect(null, null, null, null, 'rgb(66, 229, 71)');
        foods.push(food);
    }

    function snakeAnimation() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        foods.forEach(el => el.drawRect());
        head.drawRect();
        head.x += sx;
        head.y += sy;

        if (head.x >= ctx.canvas.width - head.a || head.x <= 0) {
            sx *= -1;
        } else if (head.y >= ctx.canvas.height - head.b || head.y <= 0) {
            sy *= -1;
        }
        window.requestAnimationFrame(snakeAnimation);
    }
}
