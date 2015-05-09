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
        _initMarkerIcons: function (){

            var MarkerIcon = Leaflet.Icon.extend({
                options: {
                    shadowUrl: 'static_files/images/marker-shadow.png',
                    iconSize: [30, 30],
                    shadowSize: [30, 30],
                    iconAnchor: [15, 15],
                    shadowAnchor: [10, 10],
                    popupAnchor: [0, -15]
                }
            });

            this.markerIcon = new MarkerIcon({iconUrl: 'static_files/images/marker.png'});
            this.markerActiveIcon = new MarkerIcon({iconUrl: 'static_files/images/marker-active.png'});

        },


        addMarker: function (map){
            this._initMarkerIcons();
            this.marker = Leaflet.marker([this.model.get('location').gps.latitude, this.model.get('location').gps.longitude], {icon: this.markerIcon});
            this.marker.on('mouseover', _.bind(this._markerOnHover, this));
            this.marker.on('mouseout', _.bind(this._markerOnOut, this));
            this.marker.on('click', _.bind(this._markerOnClick, this));
            this.marker.addTo(map);

            var popupText = this.model.get('location').city + ', ' + this.model.get('location').country;
            this.marker.bindPopup(popupText);
        },


        /** @private */
        _itemHover: function (){
            this.marker.setIcon(this.markerActiveIcon);
        },

        /** @private */
        _itemOut: function (){
            if(!this.isOpened){
                this.marker.setIcon(this.markerIcon);
            }
        },

        /** @private */
        _itemClick: function (){
            this.trigger('marker:click');
        },

        /** @private */
        _markerOnHover: function (){
            this.marker.openPopup();
        },

        /** @private */
        _markerOnOut: function (){
            this.marker.closePopup();
        },

        /** @private */
        _markerOnClick: function (){
            if(this.isOpened){
                this._scrollToMe();
            } else{
                $(this.ui.toggle).focus().trigger('click');
                $(this.ui.headerlink).one('accordion.opened', _.bind(function (){
                    this._scrollToMe();
                }, this));
            }

            this.trigger('marker:click');

        },

        /** @private */
        _scrollToMe: function (){
            this.$el.closest('.items-wrapper').scrollTo(this.$el, 500, {easing: 'linear'});
        },

        /** @private */
        onRender: function (){

            $(this.ui.headerlink).on('mouseover', _.bind(this._itemHover,this));
            $(this.ui.headerlink).on('mouseout', _.bind(this._itemOut,this));
            $(this.ui.headerlink).on('mousedown', _.bind(this._itemClick,this));

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