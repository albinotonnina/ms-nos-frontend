/* global google */

define(function (require){
    'use strict';

    var Marionette = require('marionette'),
        _ = require('underscore');

    return Marionette.ItemView.extend({

        template: require('text!./../templates/index.hbs'),

        initialize: function (options){

        },
        
        /** @private */
        addMarker: function (map, latLng, ringObj){

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

            google.maps.event.addListener(this.marker, 'mouseover', _.bind(this._markerOnHover,this));
            google.maps.event.addListener(this.marker, 'mouseout',  _.bind(this._markerOnOut,this));
            google.maps.event.addListener(this.marker, 'click',  _.bind(this._markerOnClick,this));
        },
        
        _markerOnHover: function(){
            console.log('hover');
        },

        _markerOnOut: function(){
            console.log('out');
        },

        _markerOnClick: function(ev){
            console.log('click');
            console.log(ev);
        }

    });

});