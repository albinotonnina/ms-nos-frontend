define(function (require){
    'use strict';

    var Marionette = require('marionette'),
        Backbone = require('backbone'),
        InputView = require('./InputView');
    /**
     * @class indexLayout
     * @extends Marionette.Layout
     */
    return Marionette.LayoutView.extend({

        /** @private */
        id: 'indexLayout',

        /** @private */
        className: 'indexLayout',

        /** @private */
        template: require('text!./../templates/IndexLayout.hbs'),

        /** @private */
        regions: {
            inputRegion: '#input-region',
            mapRegion: '#map-region'
        },

        /** @private */
        ui: {
            map_canvas: '#map_canvas'
        },

        /** @private */
        initialize: function (options){
            this.controller = options.controller;
            this.inputView = new InputView();


        },

        /** @private */
        onShow: function (){
            this.inputRegion.show(this.inputView);
            $('#fullpage').fullpage({
                anchors: ['home', 'secondPage', '3rdPage', '4thpage'],
                sectionsColor: ['#f2f2f2', '#4BBFC3', '#7BAABE', 'whitesmoke', '#000'],
                menu: '#menu',
                css3: true,
                scrollingSpeed: 1000

            });

            $.fn.fullpage.silentMoveTo(Backbone.history.getFragment());
        },
        onBeforeDestroy: function (){
            $.fn.fullpage.destroy('all');
        }

    });
});