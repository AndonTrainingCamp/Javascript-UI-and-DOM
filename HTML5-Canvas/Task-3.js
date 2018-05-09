/*jslint devel: true */
/*jslint es6 */
'use strict';

$(document).ready(init);
let x = 0, y = 75, 
    speed = 5;

function init() {
    $('html, body').css({
        'width': '100%',
        'height': '100%',
        'margin': '0px',
        'overflow': 'hidden'
    });
    $('body').append('<canvas id="canvasSnake">');
    $('#canvasSnake').css('display', 'block');
    window.requestAnimationFrame(movingCircle);
}

function movingCircle() {
    let canvas = document.getElementById('canvasSnake');
    let ctx = canvas.getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    window.addEventListener('resize', function () {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    });
    ctx.fillStyle = 'rgb(123, 180, 224)';
    ctx.beginPath();
    ctx.arc(x, y, 50, 0, Math.PI * 2);
    x += speed;
    if (x >= ctx.canvas.width || x <= 0) {
        speed *= -1;
    }
    ctx.fill();
    window.requestAnimationFrame(movingCircle);
}
