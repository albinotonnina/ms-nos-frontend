define(function (require) {
    'use strict';

    return function (app) {
        /** Autoload plugins */
        require('vendors/handlebars')(app);
        require('jquery.scrollto');
        require('fullpage');
        require('three');
        require('highlightjs');



    };

});

