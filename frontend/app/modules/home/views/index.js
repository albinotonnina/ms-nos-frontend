/* global google */

define(function (require){
    'use strict';

    var Marionette = require('marionette'),
        _ = require('underscore');

    return Marionette.ItemView.extend({

        template: require('text!./../templates/index.hbs'),

        initialize: function (options){
            this.controller = options.controller;
        },

        /** @private */
        addPointsToMap: function (map){
            this.latLangArray = [];
            this.controller.ringsCollection.each(_.bind(function (ringObj){
                var pos = ringObj.get('location').gps;
                if(pos){
                    var latLng = new google.maps.LatLng(pos.latitude, pos.longitude);
                    this.latLangArray.push(latLng);
                    this._addMarker(map, latLng, ringObj);
                }
            }, this));

            this._fitBounds(map);

        },

        /** @private */
        _addMarker: function (map, latLng, ringObj){

            this.marker = new google.maps.Marker({
                map: map,
                position: latLng,
                animation: google.maps.Animation.DROP,
                //icon : 'img/buildings_32x32.png',
                //title: this.model.get('name'),
                descr: 'descr',
                id: ringObj.get('uuid')
            });

            this.marker.infowindow = new google.maps.InfoWindow({
                content: this.marker.descr
            });

            //google.maps.event.addListener(this.marker, 'mouseover', self.show_company_info);
            //google.maps.event.addListener(this.marker, 'mouseout', self.hide_company_info);
            //google.maps.event.addListener(this.marker, 'click', self.show_company_detail);
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