define(function (require){
    'use strict';

    var Marionette = require('marionette'),
        L = require('leaflet');

    return Marionette.Object.extend({


        /** @private */
        initialize: function (options){




            var MarkerIcon = L.Icon.extend({
                options: {
                    number: options.agentsLength,
                    shadowUrl: 'static_files/images/marker-shadow.png',
                    iconSize: new L.Point(30, 60),
                    shadowSize: new L.Point(30, 60),
                    iconAnchor: new L.Point(15, 60),
                    popupAnchor: new L.Point(0, -45),
                    shadowAnchor: new L.Point(10, 60),
                    /*
                     iconAnchor: (Point)
                     popupAnchor: (Point)
                     */
                    className: 'leaflet-div-icon'
                },

                createIcon: function () {
                    var div = document.createElement('div');
                    var img = this._createImg(this.options['iconUrl']);
                    var numdiv = document.createElement('div');
                    numdiv.setAttribute ( 'class', 'number' );
                    numdiv.innerHTML = this.options['number'] || '';
                    div.appendChild ( img );
                    div.appendChild ( numdiv );
                    this._setIconStyles(div, 'icon');
                    return div;
                },

                //you could change this to add a shadow like in the normal marker if you really wanted
                createShadow: function () {
                    var div = document.createElement('div');
                    var img = this._createImg(this.options['shadowUrl']);
                    div.appendChild ( img );
                    this._setIconStyles(div, 'shadow');
                    return div;
                }
            });



            //
            //var MarkerIcon = L.Icon.extend({
            //    options: {
            //        shadowUrl: 'static_files/images/marker-shadow.png',
            //        iconSize: [30, 30],
            //        shadowSize: [30, 30],
            //        iconAnchor: [15, 15],
            //        shadowAnchor: [10, 10],
            //        popupAnchor: [0, -15]
            //    }
            //});

if(options.faulty){
    this.markerIcon = new MarkerIcon({iconUrl: 'static_files/images/markerRed.png'});
}else{
    this.markerIcon = new MarkerIcon({iconUrl: 'static_files/images/markerGreen.png'});
}





            this.markerActiveIcon = new MarkerIcon({iconUrl: 'static_files/images/marker-active.png'});
        },


        getMarker: function(coordinates){
            this.marker = L.marker(coordinates, {icon: this.markerIcon});

            return this.marker;
        }


    });

});