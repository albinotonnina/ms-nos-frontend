define(function (require) {
    'use strict';

    var Backbone = require('backbone');
    var Marionette = require('marionette');

    /**
     * @type {Marionette.Application}
     */
    var app = window.app = new Marionette.Application();

    /**
     * Load our application
     */
    require('autoload/vendors')(app);
    require('autoload/plugins')(app);
    require('autoload/modules')(app);

    app.addRegions({
        container : '#container'
    });

    app.on('start', function (options) {
        var hashToLoad = 'home';
        if(window.location.hash){
            hashToLoad = window.location.hash.substr(1);
        }

        if (!Backbone.history.start({ pushState : options.pushState })) {
            Backbone.history.navigate(hashToLoad, { trigger : true });
        }
    });

    return app;
});








