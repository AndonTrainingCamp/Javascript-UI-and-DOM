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

    let snake = [];
    let foods = [];

    let sx = 0;
    let sy = 0;
    let speed = 1;
    let direction = '';

    snake[0] = new Rect(); // The _head_ of the snake
    window.addEventListener('resize', function () {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        if (snake[0].x > ctx.canvas.width) {
            snake[0].x = ctx.canvas.width - snake[0].a - sx - 1;
        }
        if (snake[0].y > ctx.canvas.height) {
            snake[0].y = ctx.canvas.height - snake[0].b - sy - 1;
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
        snake[0].drawRect();
        snake[0].x += sx; // Head moving
        snake[0].y += sy;

        for (let i = 0; i < foods.length; i++) {
            if (snake[0].x <= foods[i].x + 9 && snake[0].x >= foods[i].x - 19 &&
                snake[0].y <= foods[i].y + 9 && snake[0].y >= foods[i].y - 19) {
                let newPiece = new Rect(null, null, randomColor());
                snake.push(newPiece);
                foods.splice(i, 1);
            }
        }

        if (snake.length > 1) {
            for (let i = 0, j = 10; i < snake.length - 1; i++ , j += 10) {
                if (direction === 'up') {
                    snake[i + 1].x = snake[i].x;
                    snake[i + 1].y = snake[i].y + j;
                    snake[i + 1].drawRect();
                } else if (direction === 'down') {
                    snake[i + 1].x = snake[i].x;
                    snake[i + 1].y = snake[i].y - j;
                    snake[i + 1].drawRect();
                } else if (direction === 'left') {
                    snake[i + 1].x = snake[i].x + j;
                    snake[i + 1].y = snake[i].y;
                    snake[i + 1].drawRect();
                } else if (direction === 'right') {
                    snake[i + 1].x = snake[i].x - j;
                    snake[i + 1].y = snake[i].y;
                    snake[i + 1].drawRect();
                }
            }
        }

        if (snake[0].x >= ctx.canvas.width - snake[0].a || snake[0].x <= 0) {
            sx *= -1;
        } else if (snake[0].y >= ctx.canvas.height - snake[0].b || snake[0].y <= 0) {
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
