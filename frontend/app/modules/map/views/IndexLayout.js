
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
            uiRegion: '#ui-region',
            mapRegion: '#map-region'
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
            this.uiView = this.controller.getUiView(this.mapView.getMapObject());
            this.uiRegion.show(this.uiView);
        },

        onRender: function(){
            $('html,body').css({
                'overflow' : 'visible',
                'height' : '100%'
            });
        }

    });
});