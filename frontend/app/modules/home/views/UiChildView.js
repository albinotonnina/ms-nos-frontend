define(function (require){
    'use strict';

    var Marionette = require('marionette'),
        _ = require('underscore'),
        UiMarker = require('./UiMarker'),
        AgentsCompositeView = require('./AgentsCompositeView');

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

        events: {
            'mouseover': '_itemHover',
            'mouseout': '_itemOut',
            'mousedown': '_itemClick',
            'accordion.opened': '_setOpened',
            'accordion.closed': '_setClosed'
        },

        /** @private */
        initialize: function (){
            this.agentsView = new AgentsCompositeView({
                collection: this.model.get('agents')
            });
        },

        /** @private */
        _initMarkerIcons: function (){

            this.uiMarker = new UiMarker({
                agentsLength: this.model.get('agents').length,
                apiLength: _.flatten(this.model.get('agents').pluck('apis')).length,

                apiKO: _.pluck(_.flatten(this.model.get('agents').pluck('apis')), 'faulty').indexOf(1) > -1,
                servicesKO: this.model.get('agents').pluck('faulty').indexOf(1) > -1,

            });

            this.markerIcon = this.uiMarker.markerIcon;
            this.markerActiveIcon = this.uiMarker.markerActiveIcon;
        },

        addMarker: function (map){
            this._initMarkerIcons();
            this.marker = this.uiMarker.getMarker([this.model.get('location').gps.latitude, this.model.get('location').gps.longitude]);
            this.marker.on('mouseover', _.bind(this._markerOnHover, this));
            this.marker.on('mouseout', _.bind(this._markerOnOut, this));
            this.marker.on('click', _.bind(this._markerOnClick, this));
            this.marker.addTo(map);
            var popupText = this._getMarkerPopup();
            this.marker.bindPopup(popupText,{
                closeButton:false
            });
        },

        /** @private */
        _getMarkerPopup: function (){

            var popupData = {
                location: this.model.get('location').city+ ', ' + this.model.get('location').country,
                servicesKOLength: _.compact(this.model.get('agents').pluck('faulty')).length,
                servicesOKLength: _.without(this.model.get('agents').pluck('faulty'), 1).length,
                apiKOLength: _.compact(_.pluck(_.flatten(this.model.get('agents').pluck('apis')), 'faulty')).length,
                apiOKLength: _.without(_.pluck(_.flatten(this.model.get('agents').pluck('apis')), 'faulty'),1).length
            };


            return this.uiMarker.getPopupContent(popupData);
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
        //    this.marker.closePopup();
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
        _setOpened: function (){
            this.isOpened = true;
        },
        /** @private */
        _setClosed: function (){
            this.isOpened = false;
        },

        /** @private */
        onRender: function (){
            this.agentsView.render();
            $(this.ui.agentscontainer).html(this.agentsView.$el);
            this.trigger('refresh');
        }

    });

});