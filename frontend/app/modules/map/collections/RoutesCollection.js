/*global define*/

define(function (require){
    'use strict';

    var Backbone = require('backbone'),
        _ = require('underscore'),
        RouteModel = require('../models/RouteModel');

    /**
     * @class RingsCollection
     * @extends Backbone.Collection
     */
    return Backbone.Collection.extend({

        /** @private */
        model: RouteModel,

        /** @private */
        url: function (){
            return this.baseUrl ? decodeURIComponent(this.baseUrl) + '/admin/routes' : '/admin/routes';
        },

        fetchData: function (baseUrl){
            var deferred = $.Deferred();
            this.baseUrl = baseUrl;

            this.fetch()
                .done(deferred.resolve);

            return deferred.promise();
        },

        /** @private */
        parse: function (response){
            var parsedData = [];
            _.each(response, _.bind(function (obj, api){
                if(_.pluck(obj, 'type').indexOf('PUBLIC') > -1){
                    parsedData.push({
                        api: api,
                        url:this.baseUrl ? this.baseUrl+'admin'+api:'admin'+api
                    });
                }
            }, this));

            return parsedData;
        }

    });
});