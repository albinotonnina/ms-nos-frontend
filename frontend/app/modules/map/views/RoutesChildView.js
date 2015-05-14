define(function (require){
    'use strict';

    var Marionette = require('marionette');

    return Marionette.ItemView.extend({

        /** @private */
        template: require('text!./../templates/RoutesChildView.hbs'),

        /** @private */
        tagName: 'li'

    });

});