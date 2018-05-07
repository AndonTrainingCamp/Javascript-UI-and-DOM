/*jslint devel: true */
/*jslint es6 */
'use strict';

(function ($) {
    $.fn.listview = function (data) {
        let source = $('body script[type="text/handlebars-template"]');
        if (source.length !== 0) {
            for (let i = 0; i < source.length; i++) {
                const srcID = $(source[i]).attr('id');
                let template = Handlebars.compile($(source[i]).html());
                for (let j = 0; j < data.length; j++) {
                    let result = template(data[j]);
                    let $result = $(result);
                    $('body *[data-template="' + srcID + '"]').append($result);
                }
                $(source[i]).remove();
            }
        } else {
            return;
        }
    }
}(jQuery));

// TEST 1: Expect to work with the sample
var data = [],
    count = 5,
    id = 'students-table';

document.body.innerHTML = '<table><thead><tr><th>#</th><th>Name</th><th>Mark</th></tr></thead>' +
    '<tbody id="' + id + '" data-template="students-row-template"></tbody></table>' +
    '<script id="students-row-template" type="text/handlebars-template"><tr class="student-row"><td>{{number}}</td><td>{{name}}</td><td>{{mark}}</td></tr></script>';

for (var i = 0; i < count; i += 1) {
    var number = i + 1;
    var name = `Student ${i + 1}`;
    var mark = i % 5 + 2;
    data.push({
        number,
        name,
        mark
    });
}
$('#' + id).listview(data);
