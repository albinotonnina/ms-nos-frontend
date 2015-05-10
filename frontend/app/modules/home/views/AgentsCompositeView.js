define(function (require){
    'use strict';

    var Marionette = require('marionette'),
        AgentsChildView = require('./AgentsChildView');


    return Marionette.CompositeView.extend({

        /** @private */
        template: require('text!./../templates/AgentsCompositeView.hbs'),

        /** @private */
        className: 'agents-wrapper',

        /** @private */
        childView: AgentsChildView,

        /** @private */
        childViewContainer: '#agents',

        /** @private */
        collectionEvents: {
            'add': function(){
                this.trigger('refresh');
            },
            'remove': function(){
                this.trigger('refresh');
            }
        }
    });

});