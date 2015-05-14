
define(function (require){
    'use strict';

    var Marionette = require('marionette');
    /**
     * @class indexLayout
     * @extends Marionette.Layout
     */
    return Marionette.LayoutView.extend({

        /** @private */
        id: 'indexLayoutMap',

        /** @private */
        className: 'indexLayout',

        /** @private */
        template: require('text!./../templates/IndexLayout.hbs'),

        /** @private */
        regions: {
            ringsRegion: '#rings-region',
            mapRegion: '#map-region',
            proxyRegion: '#proxy-region'
        },

        /** @private */
        ui: {
            map_canvas: '#map_canvas'
        },

        /** @private */
        initialize: function (options){
            this.controller = options.controller;
        },

        /** @private */
        onShow: function (){
            this.mapView = this.controller.getMapView();
            this.mapRegion.show(this.mapView);
            this.ringsView = this.controller.getRingsView(this.mapView.getMapObject());
            this.ringsRegion.show(this.ringsView);

            this.proxyView = this.controller.getProxyView(this.mapView.getMapObject());
            this.proxyRegion.show(this.proxyView);
        },

        onRender: function(){
            $('html,body').css({
                'overflow' : 'visible',
                'height' : '100%'
            });
        }

    });
});