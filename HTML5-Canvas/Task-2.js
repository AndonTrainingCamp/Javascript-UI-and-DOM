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
    window.requestAnimationFrame(movingCircle);

    let canvas = document.getElementById('canvasSnake');
    let ctx = canvas.getContext('2d');

    let ellipse = {
        x: 40, // Initial values
        y: 75,
        r: 40,
        drawEllipse: function () {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = 'rgb(123, 180, 224)';
            ctx.fill();
        }
    };

    let sx = 4;
    let sy = 4;

    function movingCircle() {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        window.addEventListener('resize', function () {
            ctx.canvas.width = window.innerWidth;
            ctx.canvas.height = window.innerHeight;
            if (ellipse.x > ctx.canvas.width) {
                ellipse.x = ctx.canvas.width - ellipse.r - sx - 1;
            }
            if (ellipse.y > ctx.canvas.height) {
                ellipse.y = ctx.canvas.height - ellipse.r - sy - 1;
            }
            
        });
        ellipse.drawEllipse();
        ellipse.x += sx;
        ellipse.y += sy;
        if (ellipse.x >= ctx.canvas.width - ellipse.r || ellipse.x <= 0 + ellipse.r) {
            sx *= -1;
        } else if (ellipse.y >= ctx.canvas.height - ellipse.r || ellipse.y <= 0 + ellipse.r) {
            sy *= -1;
        }
        window.requestAnimationFrame(movingCircle);
    }
}
