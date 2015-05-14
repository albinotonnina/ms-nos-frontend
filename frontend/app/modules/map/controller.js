define(function (require){
    'use strict';

    var Marionette = require('marionette'),
        _ = require('underscore'),
        RingsView = require('./views/RingsCompositeView'),
        ProxyView = require('./views/RoutesCompositeView'),
        MapView = require('./views/MapView'),
        IndexLayout = require('./views/IndexLayout'),
        RingsCollection = require('./collections/RingsCollection'),
        MicroservicesCollection = require('./collections/MicroservicesCollection'),
        RoutesCollection = require('./collections/RoutesCollection');

    return Marionette.Object.extend({

        /** @private */
        initialize: function (options){
            this.app = options.app;
            this.logger = options.logger;
            this.microservicesCollection = new MicroservicesCollection();
            this.routesCollection = new RoutesCollection();
            this.ringsCollection = new RingsCollection();
        },

        /** @private */
        index: function (options){
            this.baseUrl = decodeURIComponent((new RegExp('[?|&]url=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ''])[1].replace(/\+/g, '%20')) || null;

            if(options && options.url){
                this.baseUrl = options.url;
            }

            this._fetchRings(this.baseUrl).done(_.bind(this._initCollections, this));
            this._fetchRoutes(this.baseUrl);

            setInterval(_.bind(this._refreshCollections, this), 10000);
        },

        /** @private */
        _fetchRings: function (baseUrl){
            return this.microservicesCollection.fetchData(baseUrl);
        },

        /** @private */
        _fetchRoutes: function (baseUrl){
            return this.routesCollection.fetchData(baseUrl);
        },

        /** @private */
        _refreshCollections: function (){
            this._fetchRings(this.baseUrl).done(_.bind(this._generateRingsModels, this));
        },

        _generateRingsModels: function (response){
            this.ringsCollection.addRings(response);
        },

        /** @private */
        _initCollections: function (response){
            this._generateRingsModels(response);
            setTimeout(_.bind(function (){
                this._initIndexLayout();
            }, this), 1000);
        },

        /** @private */
        _initIndexLayout: function (){
            var indexLayout = new IndexLayout({
                controller: this
            });
            this.app.container.show(indexLayout);
        },

        getRingsView: function (map){
            this.ringsView = new RingsView({controller: this, collection: this.ringsCollection, map: map});
            return this.ringsView;
        },

        getProxyView: function (map){
            this.proxyView = new ProxyView({controller: this, collection: this.routesCollection, map: map});
            return this.proxyView;
        },

        getMapView: function (){
            this.mapView = new MapView({controller: this});
            return this.mapView;
        }
    });

});