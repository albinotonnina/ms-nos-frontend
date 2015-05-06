/*global define*/

define(function (require){
    'use strict';

    var Backbone = require('backbone'),
        _ = require('underscore'),
        RingModel = require('../models/RingModel');

    /**
     * @class CompanyCollection
     * @extends Backbone.Collection
     */
    return Backbone.Collection.extend({

        /** @private */
        model: RingModel,

        addRings: function (response){
            _.each(response, _.bind(function (responseItem){
                this._add_new(responseItem);
            }, this));
        },

        /** @private */
        _add_new: function (responseItem){
            var existingRingModel = this.findWhere({uuid: responseItem.agent.ring.uuid});
            if(!existingRingModel){
                var model = new RingModel(this._getSanitizedResponse(responseItem));
                this.add(model);
                model.addAgent(responseItem);
            } else{
                existingRingModel.addAgent(responseItem);
            }
        },

        /** @private */
        _getSanitizedResponse: function (response){

            return {
                uuid: response.agent.ring.uuid,
                location: {
                    country: response.agent.ring.location.country ? response.agent.ring.location.country.name : 'Ring',
                    city: response.agent.ring.location.city ? response.agent.ring.location.city.name : '',
                    gps: response.agent.ring.location.gps ? response.agent.ring.location.gps : {latitude:0,longitude:0}
                }
            };
        }

    });
});