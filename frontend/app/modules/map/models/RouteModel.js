define(function (require){
    'use strict';

    var Backbone = require('backbone');

    /**
     * @class NodeModule
     * @extends Backbone.Model
     */
    return Backbone.Model.extend({

        /** @private */
        defaults: {
            api: undefined,
            url: undefined
        }
    });
});