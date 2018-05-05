/*jslint devel: true */
/*jslint es6 */
'use strict';
let inputData = {
    headers: ['Vendor', 'Model', 'OS'],
    items: [{
        col1: 'Nokia',
        col2: 'Lumia 920',
        col3: 'Windows Phone'
    }, {
        col1: 'LG',
        col2: 'Nexus 5',
        col3: 'Android'
    }, {
        col1: 'Apple',
        col2: 'iPhone 6',
        col3: 'iOS'
    }]
};

function setTemplate(el, context) {
    Handlebars.registerHelper('table', function(items) {
        let out = '<table class="items-table"><thead><tr><th>#';
        items = context;
        for (let el of items.headers) {
            out += '<th>' + el + '</th>';
        }
        out += '</th></tr></thead>';
        out += '<tbody>';
        for (let index in items.items) {
            out += '<tr><td>' + index + '</td>';
            for (let value in items.items[index]) {
                out += '<td>' + items.items[index][value] + '</td>';
            }
            out += '</tr>';
        }
        out += '</tbody></table>'
        return new Handlebars.SafeString(out);
    });
    let source = document.getElementById('entry-template').innerHTML;
    let template = Handlebars.compile(source);
    let html = template(context);
    el.html(html);
}
let container = $('#container');
setTemplate(container, inputData);
