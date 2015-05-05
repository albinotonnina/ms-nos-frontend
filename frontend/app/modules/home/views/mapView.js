
define(function (require){
    'use strict';

    var Marionette = require('marionette'),
        Leaflet = require('leaflet');

    return Marionette.ItemView.extend({

        /** @private */
        template: require('text!./../templates/MapView.hbs'),

        /** @private */
        className: 'map-wrapper',

        /** @private */
        ui:{
            map_canvas:'#map_canvas'
        },

        /** @private */
        onShow: function(){
            this._initMap();
        },

        getMapObject: function(){
            return this.map || {};
        },

        /** @private */
        _initMap: function (){
            this.map = Leaflet.map(this.ui.map_canvas.get(0),{
                center:[0, 30],
                zoom:2,
                scrollWheelZoom: false,
                worldCopyJump:true
            });


            Leaflet.tileLayer('https://{s}.tiles.mapbox.com/v4/{mapId}/{z}/{x}/{y}.png?access_token={token}', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                subdomains: ['a', 'b', 'c', 'd'],
                mapId: 'msnos.m3mi291g',
                token: 'pk.eyJ1IjoibXNub3MiLCJhIjoiODZWbjFDWSJ9.w3qIikxygzbnPUiglLrvpA'
            }).addTo(this.map);

        }

    });

});