
/*global define*/

define(function (require){
    'use strict';

    var Backbone = require('backbone'),
        NodeModule = require('../models/MicroservicesModel');

    /**
     * @class CompanyCollection
     * @extends Backbone.Collection
     */
    return Backbone.Collection.extend({

        /** @private */
        url: function (){
            return 'admin/microservices';
        },

        /** @private */
        model: NodeModule

    });
});