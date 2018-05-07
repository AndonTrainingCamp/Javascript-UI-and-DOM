/*jslint devel: true */
/*jslint es6 */
'use strict';

(function ($) {
    $.fn.listview = function (list) {

    }
}(jQuery));

function setTemplate(el, context) {
    // Handlebars.registerHelper('table', function(items) {
    //     let out = '<table class="items-table"><thead><tr><th>#';
    //     items = context;
    //     for (let el of items.headers) {
    //         out += '<th>' + el + '</th>';
    //     }
    //     out += '</th></tr></thead>';
    //     out += '<tbody>';
    //     for (let index in items.items) {
    //         out += '<tr><td>' + index + '</td>';
    //         for (let value in items.items[index]) {
    //             out += '<td>' + items.items[index][value] + '</td>';
    //         }
    //         out += '</tr>';
    //     }
    //     out += '</tbody></table>'
    //     return new Handlebars.SafeString(out);
    // });
    let source = document.getElementById('entry-template').innerHTML;
    let template = Handlebars.compile(source);
    let html = template(context);
    el.html(html);
}
let container = $('#container');
setTemplate(container, inputData);