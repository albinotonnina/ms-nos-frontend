define(function (require) {
    'use strict';

    var Handlebars = require('handlebars');
    var Marionette = require('marionette');

    return function () {

        /**
         * Handlebars setup
         */
        Marionette.Renderer.render = function (source, context) {
            var template = Handlebars.compile(source);
            return template(context);
        };


        Marionette.Object.prototype.renderTemplate = function (source, context) {
            var template = Handlebars.compile(source);
            return template(context);
        };

        /**
         * Base helpers
         */
        Handlebars.registerHelper('staticFile', function (file) {
            return window.application.paths.staticFiles + file;
        });

        Handlebars.registerHelper('list', function(context, options) {
            var ret = '<ul>';

            for(var i=0, j=context.length; i<j; i++) {
                ret = ret + '<li>' + options.fn(context[i]) + '</li>';
            }

            return ret + '</ul>';
        });

    };
});






