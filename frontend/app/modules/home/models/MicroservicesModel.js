/**
 * Created by albinotonnina on 04/05/15.
 */

/*global define*/

define(function (require){
    'use strict';

    var Backbone = require('backbone');

    /**
     * @class NodeModule
     * @extends Backbone.Model
     */
    return Backbone.Model.extend({

        /** @private */
        initialize: function (){

        },

        /** @private */
        defaults: {},

        clear: function() {
            this.destroy();
        }
    });
});