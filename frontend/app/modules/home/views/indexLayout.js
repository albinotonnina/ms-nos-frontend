
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

            var MY_MAPTYPE_ID = 'custom_style';

            var styles = [
                {
                    elementType: 'geometry',
                    stylers: [
                        { hue: '#890000' },
                        { visibility: 'simplified' },
                        { gamma: 0.5 },
                        { weight: 0.5 }
                    ]
                }
            ];

            var featureOpts = [
                {
                    stylers: [
                        { hue: '#DBFFFF' },
                        { visibility: 'simplified' },
                        { gamma: 0.5 },
                        { weight: 0.5 }
                    ]
                },
                {
                    elementType: 'labels',
                    stylers: [
                        { visibility: 'off' }
                    ]
                },
                {
                    featureType: 'water',
                    stylers: [
                        { color: '#DBFFFF' }
                    ]
                }
            ];

            var mapOptions = {
                zoom: 3,
                center: center,
                mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
                },
                mapTypeId: MY_MAPTYPE_ID
            };

            var map = new google.maps.Map(this.ui.map_canvas.get(0), mapOptions);

            var styledMapOptions = {
                name: 'Custom Style'
            };

            var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

            map.mapTypes.set(MY_MAPTYPE_ID, customMapType);

            return map;
        },
    });
});