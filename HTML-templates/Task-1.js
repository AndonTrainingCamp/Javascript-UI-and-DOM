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
    Handlebars.registerHelper('table', function(items, options) {
        let out = '<table class="items-table"><thead><tr>';
        for (let i = 0; i < items.length; i++) {
            out = out + '<th>' + options.fn(items[i]) + '</th>';
        }
        return out + '</tr></thead></table>';
    });
    let source = document.getElementById('entry-template').innerHTML;
    let template = Handlebars.compile(source);
    let html = template(context);
    el.append($(html));
}
let container = $('#container');
setTemplate(container, inputData);
