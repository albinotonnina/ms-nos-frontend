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
        ui:{
            agentscontainer: '.agents-container'
        },

        /** @private */
        initialize: function (){
            this.agentsView = new AgentsCompositeView({
                collection:this.model.get('agents')
            });
        },

        addMarker: function (map, itemLocation){
            this.marker = Leaflet.marker([itemLocation.latitude, itemLocation.longitude]);
            this.marker.on('mouseover', _.bind(this._markerOnHover, this));
            this.marker.on('mouseout', _.bind(this._markerOnOut, this));
            this.marker.on('click', _.bind(this._markerOnClick, this));
            this.marker.addTo(map);
        },

        /** @private */
        _markerOnHover: function (){
            console.log('hover');
        },

        /** @private */
        _markerOnOut: function (){
            console.log('out');
        },

        /** @private */
        _markerOnClick: function (ev){
            console.log('click');
            console.log(ev);
        },

        /** @private */
        onRender:function(){
            this.agentsView.render();
            $(this.ui.agentscontainer).html(this.agentsView.$el);
        }

    });

});