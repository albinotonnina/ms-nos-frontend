
define(function (require){
    'use strict';

    var Backbone = require('backbone'),
        AgentsCollection = require('../collections/AgentsCollection');

    /**
     * @class NodeModule
     * @extends Backbone.Model
     */
    return Backbone.Model.extend({

        /** @private */
        initialize: function (){
            this.agentsCollection = new AgentsCollection();
            this.set('agents', this.agentsCollection);
        },

        /** @private */
        defaults: {
            uuid: undefined,
            name: undefined,
            location: {
                country: {
                    name: 'Ring'
                },
                city: {
                    name: 'Somewhere'
                }
            },
            agents: undefined
        },

        addAgent: function (agentData){
            this.agentsCollection.addAgent({
                uuid: agentData.agent.iden.uuid,
                name: agentData.name,
                faulty: agentData.faulty.value,
                apis: agentData.apis,
                lastUpdated: agentData.lastUpdated.value,
                lastChecked: agentData.lastChecked.value
            });
        },

        clear: function (){
            this.destroy();
        }
    });
});