define(function (require){
    'use strict';

    var Marionette = require('marionette'),
        _ = require('underscore'),
        UiView = require('./views/UiCompositeView'),
        MapView = require('./views/MapView'),
        IndexLayout = require('./views/IndexLayout'),
        RingsCollection = require('./collections/RingsCollection'),
        MicroservicesCollection = require('./collections/MicroservicesCollection');

    return Marionette.Object.extend({

        /** @private */
        initialize: function (options){
            this.app = options.app;
            this.logger = options.logger;
            this.microservicesCollection = new MicroservicesCollection();
            this.ringsCollection = new RingsCollection();
        },

        /** @private */
        index: function (){
            this.microservicesCollection.fetch()
                .done(_.bind(this._initCollections, this));
        },

        /** @private */
        _initCollections: function (response){
            this.ringsCollection.addRings(response);
            this._initIndexLayout();
        },

        /** @private */
        _initIndexLayout: function (){
            var indexLayout = new IndexLayout({
                controller: this
            });
            this.app.container.show(indexLayout);
        },

        getUiView: function (map){
            this.uiView = new UiView({controller:this, collection: this.ringsCollection, map: map});
            return this.uiView;
        },

        getMapView: function (){
            this.mapView = new MapView({controller:this});
            return this.mapView;
        }
    });

});