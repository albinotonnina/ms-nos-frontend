/* global google */

define(function (require){
    'use strict';

    var Marionette = require('marionette'),
        _ = require('underscore'),
        Leaflet = require('leaflet');

    return Marionette.ItemView.extend({

        template: require('text!./../templates/IndexChildView.hbs'),

        /** @private */
        addMarker: function (map, itemLocation, ringObj){
            this.marker = Leaflet.marker([itemLocation.latitude, itemLocation.longitude]);
            this.marker.on('mouseover', _.bind(this._markerOnHover, this));
            this.marker.on('mouseout', _.bind(this._markerOnOut, this));
            this.marker.on('click', _.bind(this._markerOnClick, this));
            this.marker.addTo(map);
        },

        _markerOnHover: function (){
            console.log('hover');
        },

        _markerOnOut: function (){
            console.log('out');
        },

        _markerOnClick: function (ev){
            console.log('click');
            console.log(ev);
        }

    });

});