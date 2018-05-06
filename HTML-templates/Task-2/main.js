/*jslint devel: true */
/*jslint es6 */
'use strict';
let data = {
    animals: [{
        name: 'Lion',
        url: 'https://susanmcmovies.files.wordpress.com/2014/12/the-lion-king-wallpaper-the-lion-king-2-simbas-pride-4685023-1024-768.jpg'
    }, {
        name: 'Turtle',
        url: 'http://www.enkivillage.com/s/upload/images/a231e4349b9e3f28c740d802d4565eaf.jpg'
    }, {
        name: 'Dog'
    }, {
        name: 'Cat',
        url: 'http://i.imgur.com/Ruuef.jpg'
    }, {
        name: 'Dog Again'
    }]
};

function setTemplate(el, context) {
    // Handlebars.registerHelper('ListAnimals', function (items) {
    //     items = context;
    //     let out = '<div class="container"><h1>Animals</h1><ul>';
    //     const defaultLink = 'http://cdn.playbuzz.com/cdn/3170bee8-985c-47bc-bbb5-2bcb41e85fe9/d8aa4750-deef-44ac-83a1-f2b5e6ee029a.jpg';
    //     for (let el of items.animals) {
    //         if (el.url) {
    //             out += `<li><a href="${el.url}">` + `See a ${el.name}` + '</a></li>';
    //         } else {
    //             out += `<li><a href="${defaultLink}">` + `No link for ${el.name}, here is Batman!` + '</a></li>';
    //         }
    //     }
    //     out += '</ul></div>';
    //     return new Handlebars.SafeString(out);
    // });
    let source = document.getElementById('entry-template').innerHTML;
    let template = Handlebars.compile(source);
    let html = template(context);
    el.html(html);
}
let container = $('body');
setTemplate(container, data);
