/*jslint devel: true */
/*jslint es6 */
'use strict';

$(document).ready(draw);

function draw() {
    $('html, body').css({
        'width': '100%',
        'height': '100%',
        'margin': '0px'
    });
    $('body').append('<canvas id="tutorial">');
    $('#tutorial').css('border', '2px solid black');
    let canvas = document.getElementById('tutorial');
    let ctx;
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        $(window).resize(function () {
            ctx.canvas.width = $(window).width();
            ctx.canvas.height = $(window).height();
        });
    }
}
