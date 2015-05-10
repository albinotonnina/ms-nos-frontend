define(function (require){
    'use strict';

    var Marionette = require('marionette'),
        L = require('leaflet');

    return Marionette.Object.extend({

        popupTemplate: require('text!./../templates/PopupTemplate.hbs'),

        /** @private */
        initialize: function (options){
            var MarkerIcon = L.Icon.extend({
                options: {
                    number: options.agentsLength,
                    shadowUrl: 'static_files/images/marker-shadow.png',
                    iconSize: new L.Point(30, 42),
                    shadowSize: new L.Point(30, 42),
                    iconAnchor: new L.Point(15, 42),
                    popupAnchor: new L.Point(0, -45),
                    shadowAnchor: new L.Point(10, 42),
                    className: 'leaflet-div-icon'
                },

                createIcon: function (){
                    var div = document.createElement('div');
                    var img = this._createImg(this.options['iconUrl']);
                    var numdiv = document.createElement('div');
                    numdiv.setAttribute('class', 'number');
                    numdiv.innerHTML = this.options['number'] || '';
                    div.appendChild(img);
                    div.appendChild(numdiv);
                    this._setIconStyles(div, 'icon');
                    return div;
                },

                //you could change this to add a shadow like in the normal marker if you really wanted
                createShadow: function (){
                    var div = document.createElement('div');
                    var img = this._createImg(this.options['shadowUrl']);
                    div.appendChild(img);
                    this._setIconStyles(div, 'shadow');
                    return div;
                }
            });



            if(options.servicesKO){
                this.markerIcon = new MarkerIcon({iconUrl: 'static_files/images/markerRed.png'});
            } else{
                if(options.apiKO){
                    this.markerIcon = new MarkerIcon({iconUrl: 'static_files/images/markerYellow.png'});
                } else{
                    this.markerIcon = new MarkerIcon({iconUrl: 'static_files/images/markerGreen.png'});
                }
            }

            if(options.apiLength === 0){
                this.markerIcon = new MarkerIcon({iconUrl: 'static_files/images/markerGrey.png'});
            }
            this.markerActiveIcon = new MarkerIcon({iconUrl: 'static_files/images/marker-active.png'});
        },

        getMarker: function (coordinates){
            this.marker = L.marker(coordinates, {icon: this.markerIcon});
            return this.marker;
        },

        getPopupContent: function (templateData){
            return this.renderTemplate(this.popupTemplate, templateData);
        }


    });

});