define(function (require) {
    'use strict';

    var Marionette = require('marionette');

    var Router = Marionette.AppRouter.extend({

        appRoutes: {
            'home' : 'index',
            'secondPage' : 'index'
        }
    });

    return Router;
});