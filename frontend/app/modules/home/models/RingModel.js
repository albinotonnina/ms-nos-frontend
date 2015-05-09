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

        setAgent: function (agentData){

            var existingModel = this.agentsCollection.findWhere({'uuid': agentData.agent.iden.uuid});
            var objData = {
                uuid: agentData.agent.iden.uuid,
                name: agentData.name,
                faulty: agentData.faulty.value,
                apis: agentData.apis,
                lastUpdated: agentData.lastUpdated.value,
                lastChecked: agentData.lastChecked.value
            };

            if(existingModel){
                existingModel.set(objData);
            } else{
                this.agentsCollection.addAgent(objData);
            }
        },

        clear: function (){
            this.destroy();
        }
    });
});