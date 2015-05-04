
/*global define*/

define(function (require){
    'use strict';

    var Backbone = require('backbone'),
        AgentModel = require('../models/AgentModel');

    /**
     * @class CompanyCollection
     * @extends Backbone.Collection
     */
    return Backbone.Collection.extend({

        /** @private */
        model: AgentModel,

        addAgent: function(agentData){
            var agentModel = new AgentModel(agentData);
            this.add(agentModel);
        }

    });
});