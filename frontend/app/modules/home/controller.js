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

            setInterval(_.bind(this._refreshCollections,this),10000);
        },

        /** @private */
        index: function (){

            var useCustomUrl = decodeURIComponent((new RegExp('[?|&]url=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,''])[1].replace(/\+/g, '%20'))||null;
            this._fetchData(useCustomUrl).done(_.bind(this._initCollections, this));
        },

        /** @private */
        _fetchData: function(useCustomUrl){
            return this.microservicesCollection.fetchData(useCustomUrl);
        },

        /** @private */
        _refreshCollections: function(){
            this._fetchData().done(_.bind(this._generateRingsModels,this));
        },

        _generateRingsModels: function(response){
            this.ringsCollection.addRings(response);
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