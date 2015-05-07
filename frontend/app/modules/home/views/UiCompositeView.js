define(function (require){
    'use strict';

    var Marionette = require('marionette'),
        UiChildView = require('./UiChildView');
        require('jquery.scrollto');

    return Marionette.CompositeView.extend({

        /** @private */
        template: require('text!./../templates/UiCompositeView.hbs'),

        /** @private */
        className: 'items-wrapper',

        /** @private */
        childView: UiChildView,

        /** @private */
        childViewContainer: '#items',

        /** @private */
        initialize: function (options){
            this.accordion = require('accordion');

            this.controller = options.controller;
            this.map = options.map;
            //this.latLangArray = [];
        },

        /** @private */
        onAddChild: function (childView){
            var itemLocation = childView.model.get('location').gps;
            if(itemLocation){
                childView.addMarker(this.map, itemLocation, childView.model);
            }
        },

        /** @private */
        onShow: function (){
            this.accordion.init({
                naturalBehavior: true
            });
        }

    });

});