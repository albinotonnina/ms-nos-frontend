define(function (require){
    'use strict';

    var Marionette = require('marionette'),
        _ = require('underscore'),
        AgentsCompositeView = require('./AgentsCompositeView'),
        Leaflet = require('leaflet');

    return Marionette.ItemView.extend({

        /** @private */
        template: require('text!./../templates/UiChildView.hbs'),

        /** @private */
        tagName: 'li',

        /** @private */
        ui: {
            agentscontainer: '.agents-container',
            toggle: '.toggle-this',
            contentdiv: '.accordion-content',
            headerlink: '.accordion-header'
        },

        /** @private */
        initialize: function (){
            this.agentsView = new AgentsCompositeView({
                collection: this.model.get('agents')
            });
        },

        /** @private */
        _getMarkerIcon: function (){

            return Leaflet.Icon.extend({
                options: {
                    shadowUrl: 'static_files/marker-shadow.png',
                    iconSize: [30, 30],
                    shadowSize: [30, 30],
                    iconAnchor: [0, 0],
                    shadowAnchor: [-10, 0],
                    popupAnchor: [0, 0]
                }
            });

        },


        addMarker: function (map, itemLocation){

            var MarkerIcon  = this._getMarkerIcon();
            var markerIcon = new MarkerIcon({iconUrl: 'static_files/marker.png'})


            this.marker = Leaflet.marker([itemLocation.latitude, itemLocation.longitude], {icon: markerIcon});
            this.marker.on('mouseover', _.bind(this._markerOnHover, this));
            this.marker.on('mouseout', _.bind(this._markerOnOut, this));
            this.marker.on('click', _.bind(this._markerOnClick, this));
            this.marker.addTo(map);
        },

        /** @private */
        _markerOnHover: function (){

        },

        /** @private */
        _scrollToMe: function (){
            this.$el.closest('.items-wrapper').scrollTo(this.$el, 500, {easing: 'linear'});
        },

        /** @private */
        _markerOnOut: function (){
            console.log('out');
        },

        /** @private */
        _markerOnClick: function (ev){
            if(this.isOpened){
                this._scrollToMe();
            } else{
                $(this.ui.toggle).focus().trigger('click');
                $(this.ui.headerlink).one('accordion.opened', _.bind(function (){
                    this._scrollToMe();
                }, this));
            }
        },

        /** @private */
        onRender: function (){

            $(this.ui.headerlink).on('accordion.opened', _.bind(function (){
                this.isOpened = true;
            }, this));

            $(this.ui.headerlink).on('accordion.closed', _.bind(function (){
                this.isOpened = false;
            }, this));

            this.agentsView.render();
            $(this.ui.agentscontainer).html(this.agentsView.$el);
        }

    });

});