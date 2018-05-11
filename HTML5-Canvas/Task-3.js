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

    let snake = [];
    let foods = [];

    let sx = 1; // Starts forward at the begging 
    let sy = 0;
    let speed = 1;
    let isDirectionHit = false;

    function Rect(x, y, type) {
        this.type = type; // f - food, h - head, b - body
        this.x = x;
        this.y = y;
        this.offset = undefined;
        this.target = [];
        this.a = 20;
        this.b = 20;
        this.color = 'rgb(255, 79, 252)';
        this.drawRect = function () {
            ctx.fillStyle = this.color;
            if (this.type === 'f') {
                ctx.fillRect(this.x, this.y, this.a, this.b);
            } else if (this.type === 'h') {
                this.x += sx;
                this.y += sy;
                ctx.fillRect(this.x, this.y, this.a, this.b);
            } else if (this.type === 'b') {
                if (!this.offset) {
                    this.offset = (snake.length - 1) * 20;
                }
                if (this.target.length !== 0) {
                    if (this.x !== this.target[0].x) {
                        this.x += this.target[0].sx;
                        this.y += this.target[0].sy;
                        ctx.fillRect(this.x, this.y, this.a, this.b);
                    } else {
                        this.target.shift();
                    }
                } else {
                    this.x += sx;
                    this.y += sy;
                    ctx.fillRect(this.x - this.offset * sx, this.y - this.offset * sy, this.a, this.b);
                }
            }
        };
    }
    snake[0] = new Rect(0, 0, 'h'); // The _head_ of the snake

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
            if (snake.length > 1) isDirectionHit = true;
        } else if (event.key === 's') {
            sy = speed;
            sx = 0;
            if (snake.length > 1) isDirectionHit = true;
        } else if (event.key === 'a') {
            sx = -speed;
            sy = 0;
            if (snake.length > 1) isDirectionHit = true;
        } else if (event.key === 'd') {
            sx = speed;
            sy = 0;
            if (snake.length > 1) isDirectionHit = true;
        }
    });

    // Creating food

    for (let i = 0; i < 1/*window.innerWidth / 10 */; i++) {
        let x = Math.floor(Math.random() * ctx.canvas.width); // Initial values
        let y = Math.floor(Math.random() * ctx.canvas.height);
        let food = new Rect(x, y, 'f');
        food.a = 10;
        food.b = 10;
        food.color = 'rgb(132, 201, 12)';
        foods.push(food);
    }

    function snakeAnimation() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        foods.forEach(el => el.drawRect());
        snake[0].drawRect();

        if (isDirectionHit && snake.length > 1) {
            for (let i = 1; i < snake.length; i++) {
                snake[i].target.push({
                    x: snake[0].x,
                    y: snake[0].y,
                    sx: sx,
                    sy: sy
                });
            }
            isDirectionHit = false;
        }

        if (snake.length > 1) {
            for (let i = 1; i < snake.length; i++) {
                snake[i].drawRect();
            }
        }

        // Collision detection with the food

        for (let i = 0; i < foods.length; i++) {
            if (snake[0].x <= foods[i].x + 9 && snake[0].x >= foods[i].x - 19 &&
                snake[0].y <= foods[i].y + 9 && snake[0].y >= foods[i].y - 19) {
                let newPiece = new Rect(snake[0].x, snake[0].y, 'b');
                newPiece.color = randomColor();
                snake.push(newPiece);
                foods.splice(i, 1);
            }
        }

        // Collision detection with the walls

        if (snake[0].x >= ctx.canvas.width - snake[0].a || snake[0].x <= 0) {
            sx *= -1;
        } else if (snake[0].y >= ctx.canvas.height - snake[0].b || snake[0].y <= 0) {
            sy *= -1;
        }
        window.requestAnimationFrame(snakeAnimation);
    }

    function randomColor() {
        return 'rgb(' + Math.floor(Math.random() * 100 + 100) +
            ', ' + Math.floor(Math.random() * 155) +
            ', ' + Math.floor(Math.random() * 100 + 155) + ')';
    }
}
