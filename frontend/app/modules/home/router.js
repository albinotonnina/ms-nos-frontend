define(function (require) {
    'use strict';

    var Marionette = require('marionette');

    var Router = Marionette.AppRouter.extend({

        appRoutes: {
            'home(/)' : 'index',
            'about(/:page)(/)' : 'index',
            'how(/)' : 'index',
            'visualization(/)' : 'index',
            'contacts(/)' : 'index'
        }
    });

    return Router;
});