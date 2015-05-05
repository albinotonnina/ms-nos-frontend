/* global google */

define(function (require){
    'use strict';

    var Marionette = require('marionette'),
        IndexChildView = require('./IndexChildView');

    return Marionette.CompositeView.extend({

        template: require('text!./../templates/indexCompositeView.hbs'),

        className: 'items-wrapper',

        childView: IndexChildView,

        childViewContainer:'#items',

        initialize: function (options){
            this.controller = options.controller;
            this.map = options.map;
            this.latLangArray = [];
        },

        onAddChild: function(childView){
            var itemLocation = childView.model.get('location').gps;
            if(itemLocation){
                childView.addMarker(this.map, itemLocation, childView.model);
            }
        },

        onRender: function(){
          //  this._fitBounds(this.map);
        },

        /** @private */
        _fitBounds: function (map){
            var bounds = new google.maps.LatLngBounds();
            for(var i = 0, LtLgLen = this.latLangArray.length; i < LtLgLen; i++){
                bounds.extend(this.latLangArray[i]);
            }
            map.fitBounds(bounds);
        }

    });

});