define(function (require){
    'use strict';

    var Marionette = require('marionette'),
        _=require('underscore'),
        RingsChildView = require('./RingsChildView');


    return Marionette.CompositeView.extend({

        /** @private */
        template: require('text!./../templates/RingsCompositeView.hbs'),

        /** @private */
        className: 'items-wrapper',

        /** @private */
        childView: RingsChildView,

        /** @private */
        childViewContainer: '#items',

        /** @private */
        initialize: function (options){
            this.accordion = require('accordion');
            this.controller = options.controller;
            this.map = options.map;
            this.listenTo(this,'childview:refresh', _.bind(this._initAccordion,this));
        },

        /** @private */
        onAddChild: function (childView){
            var itemLocation = childView.model.get('location').gps;
            if(itemLocation){
                childView.addMarker(this.map);
            }

        },

        /** @private */
        onShow: function (){
            this._initAccordion();
        },

        /** @private */
        _initAccordion: function (){
           setTimeout(_.bind(function(){
               this.accordion.destroy();
               this.accordion.init({
                   naturalBehavior: true
               });
           },this),1);
        }
    });

});