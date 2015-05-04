
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

        addRings: function(response){
            _.each(response, _.bind(function(responseItem){
                this._add_new(responseItem);
            },this));
        },

        /** @private */
        _add_new: function(responseItem) {
            var existingRingModel = this.findWhere({uuid:responseItem.agent.ring.uuid});
            if(!existingRingModel){
                var model = new RingModel(responseItem.agent.ring);
                this.add(model);
                model.addAgent(responseItem);
            }else{
                existingRingModel.addAgent(responseItem);
            }
        }

    });
});