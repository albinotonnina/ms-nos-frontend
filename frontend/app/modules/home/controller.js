define(function (require){
    'use strict';

    var Marionette = require('marionette'),
        IndexLayout = require('./views/IndexLayout');

    return Marionette.Object.extend({

        /** @private */
        initialize: function (options){
            this.app = options.app;
            this.logger = options.logger;
        },

        /** @private */
        index: function (){
            this._initIndexLayout();
        },

        /** @private */
        _initIndexLayout: function (){
            if(!this.indexLayout || this.indexLayout.isDestroyed){
                this.indexLayout = new IndexLayout({
                    controller: this
                });
            }
            this.app.container.show(this.indexLayout);
        }
    });

});