/*global define*/

define(function (require){
    'use strict';

    var Backbone = require('backbone'),
        _ = require('underscore'),
        RingModel = require('../models/RingModel');

    /**
     * @class RingsCollection
     * @extends Backbone.Collection
     */
    return Backbone.Collection.extend({

        /** @private */
        model: RingModel,

        addRings: function (response){
            var models = [];
            _.each(response, _.bind(function (responseItem){
                var existingRingModel = this.findWhere({uuid: responseItem.agent.ring.uuid});
                if(!existingRingModel){
                    var model = new RingModel(this._getSanitizedResponse(responseItem));
                    model.setAgent(responseItem);
                    this.add(model);
                    models.push(model);
                } else{
                    existingRingModel.setAgent(responseItem);
                    models.push(existingRingModel);
                }


            }, this));

            this._removeInvalidAgents(response);

            this.remove(_.difference(this.models, models));
        },

        /** @private */
        _getSanitizedResponse: function (response){

            var randomLongitude = Math.floor(Math.random() * 40) + 1;
            randomLongitude *= Math.floor(Math.random() * 2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases

            return {
                uuid: response.agent.ring.uuid,
                location: {
                    country: response.agent.ring.location.country ? response.agent.ring.location.country.name : 'location',
                    city: response.agent.ring.location.city ? response.agent.ring.location.city.name : 'Undisclosed',
                    gps: response.agent.ring.location.gps ? response.agent.ring.location.gps : {
                        latitude: -84,
                        longitude: randomLongitude
                    }
                }
            };
        },

        /** @private */
        _removeInvalidAgents: function (response){

            this.agentsUUids = _.pluck(_.pluck(_.pluck(response, 'agent'), 'iden'), 'uuid');

            this.each(_.bind(function (ringModel){

                ringModel.get('agents').each(_.bind(function (agentModel){

                    if(this.agentsUUids.indexOf(agentModel.get('uuid')) === -1){

                        ringModel.get('agents').remove(agentModel);
                    }

                }, this));

            }, this));


        }

    });
});