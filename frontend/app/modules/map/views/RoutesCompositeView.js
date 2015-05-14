define(function (require){
    'use strict';

    var Marionette = require('marionette'),
        ProxyChildView = require('./RoutesChildView');


    return Marionette.CompositeView.extend({

        /** @private */
        template: require('text!./../templates/RoutesCompositeView.hbs'),

        /** @private */
        className: 'items-wrapper',

        /** @private */
        childView: ProxyChildView,

        /** @private */
        childViewContainer: '#publicapis',

        /** @private */
        initialize: function (options){
            this.controller = options.controller;
        }
    });

});