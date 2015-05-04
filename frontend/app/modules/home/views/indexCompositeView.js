/* global google */

define(function (require){
    'use strict';

    var Marionette = require('marionette'),
        IndexChildView = require('./IndexChildView');

    return Marionette.CompositeView.extend({

        template: require('text!./../templates/indexCompositeView.hbs'),

        childView: IndexChildView,

        childViewContainer:'#items',

        initialize: function (options){
            this.controller = options.controller;
            this.latLangArray = [];
        },

        /** @private */
        addMap: function (map){
            this.map = map;
        },

        onAddChild: function(childView){
            var pos = childView.model.get('location').gps;
            if(pos){
                var latLng = new google.maps.LatLng(pos.latitude, pos.longitude);
                this.latLangArray.push(latLng);
                childView.addMarker(this.map, latLng, childView.model);
            }
        },

        onRender: function(){
            this._fitBounds(this.map);
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