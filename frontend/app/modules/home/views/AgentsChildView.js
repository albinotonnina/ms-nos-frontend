define(function (require){
    'use strict';

    var Marionette = require('marionette'),
        _ = require('underscore'),
        moment = require('moment');


    return Marionette.ItemView.extend({

        /** @private */
        template: require('text!./../templates/AgentsChildView.hbs'),

        /** @private */
        tagName: 'li',

        serializeData: function (){

            //debugger;

            return _.extend(this.model.toJSON(), {
                lastChecked: moment(this.model.get('lastChecked')).fromNow(),
                lastUpdated: moment(this.model.get('lastUpdated')).fromNow()
            });

        }

    });

});