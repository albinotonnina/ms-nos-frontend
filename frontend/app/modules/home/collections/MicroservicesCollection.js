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
            return this.useCustomUrl ? decodeURIComponent(this.useCustomUrl): 'admin/microservices';
        },

        /** @private */
        model: NodeModule,

        fetchData: function (useCustomUrl){
            var deferred = $.Deferred();
            this.useCustomUrl = useCustomUrl;

            this.fetch()
                .done(deferred.resolve);

            return deferred.promise();
        }

    });
});