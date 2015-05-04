
/*global define, google */

define(function (require){
    'use strict';

    var Marionette = require('marionette');
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

            //this.secondView = this.controller.getSecondView();
        },

        /** @private */
        onRender: function (){
            this.map = this._initializeMap();
            this.firstView = this.controller.getMapBackground();
            this.firstView.addMap(this.map);
            this.firstRegion.show(this.firstView);

           // this.secondRegion.show(this.secondView);
        },

        /** @private */
        _initializeMap : function() {
            var center = new google.maps.LatLng(10, 13);
            var styles = [
                {
                    elementType: 'geometry',
                    stylers: [
                        { lightness: 33 },
                        { saturation: -90 }
                    ]
                }
            ];

            var mapOptions = {
                zoom: 3,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                center: center,
                styles: styles
            };

            var map = new google.maps.Map(this.ui.map_canvas.get(0), mapOptions);

            return map;
        },
    });
});