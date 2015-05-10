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
            return this.baseUrl ? decodeURIComponent(this.baseUrl)+'/admin/microservices': 'admin/microservices';
        },

        /** @private */
        model: NodeModule,

        fetchData: function (baseUrl){
            var deferred = $.Deferred();
            this.baseUrl = baseUrl;

            this.fetch()
                .done(deferred.resolve);

            return deferred.promise();
        }

    });
});