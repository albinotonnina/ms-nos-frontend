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

        /** @private */
        modelEvents: {
            'change': 'render'
        },

        /** @private */
        ui: {
            'container': '.container',
            'toggle': '.toggle'
        },

        /** @private */
        serializeData: function (){
            return _.extend(this.model.toJSON(), {
                lastChecked: moment(this.model.get('lastChecked')).fromNow(),
                lastUpdated: moment(this.model.get('lastUpdated')).fromNow()
            });
        },

        /** @private */
        onRender: function (){
            this._initAccordion();
            if(this.$el.hasClass('collapsed')){
                $(this.ui.container).removeClass('hidden');
            }
        },

        /** @private */
        _onClickAccordion: function (e){
            e.preventDefault();
            var box = $(this.ui.container);
            box.slideToggle();
            this.$el.toggleClass('collapsed');
        },

        /** @private */
        _initAccordion: function (){
            this.ui.toggle.click(_.bind(this._onClickAccordion, this));
        }

    });

});