define(function (require){
    'use strict';

    var Marionette = require('marionette'),
        _ = require('underscore'),
        IndexView = require('./views/indexCompositeView'),
        IndexLayout = require('./views/indexLayout'),
        RingsCollection = require('./collections/RingsCollection'),
        MicroservicesCollection = require('./collections/MicroservicesCollection');

    return Marionette.Object.extend({

        initialize: function (options){
            this.app = options.app;
            this.logger = options.logger;
            this.microservicesCollection = new MicroservicesCollection();
            this.ringsCollection = new RingsCollection();
        },

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

        getMapBackground: function (map){
            this.mapBackgroundView = new IndexView({controller:this, collection: this.ringsCollection, map: map});
            return this.mapBackgroundView;
        }
    });

});