/*global define, google */

define(function (require){
    'use strict';

    var Marionette = require('marionette'),
        Leaflet = require('leaflet');
    /**
     * @class indexLayout
     * @extends Marionette.Layout
     */
    return Marionette.LayoutView.extend({

        /** @private */
        id: 'indexLayout',

        /** @private */
        className: 'indexLayout',

        /** @private */
        template: require('text!./../templates/indexLayout.hbs'),

        /** @private */
        regions: {
            firstRegion: '#first-region',
            secondRegion: '#second-region'
        },

        ui: {
            map_canvas: '#map_canvas'
        },

        /** @private */
        initialize: function (options){
            this.controller = options.controller;
        },

        /** @private */
        onShow: function (){
            this.map = Leaflet.map(this.ui.map_canvas.get(0)).setView([10, 13], 3);
            this._initializeMapBackground();
            this.firstView = this.controller.getMapBackground(this.map);
            this.firstRegion.show(this.firstView);

            //this.secondView = this.controller.getSecondView();
            //this.secondRegion.show(this.secondView);
        },

        /** @private */
        _initializeMapBackground: function (){
            
            Leaflet.tileLayer('https://{s}.tiles.mapbox.com/v4/{mapId}/{z}/{x}/{y}.png?access_token={token}', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                subdomains: ['a', 'b', 'c', 'd'],
                mapId: 'msnos.m3mi291g',
                token: 'pk.eyJ1IjoibXNub3MiLCJhIjoiODZWbjFDWSJ9.w3qIikxygzbnPUiglLrvpA'
            }).addTo(this.map);

        }
    });
});