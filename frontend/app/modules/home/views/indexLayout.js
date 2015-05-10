
define(function (require){
    'use strict';

    var Marionette = require('marionette');
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
            uiRegion: '#ui-region',
            mapRegion: '#map-region'
        },

        /** @private */
        ui: {
            map_canvas: '#map_canvas'
        },

        /** @private */
        initialize: function (options){
            this.controller = options.controller;
        },

        /** @private */
        onShow: function (){

            $('#fullpage').fullpage({
                anchors:['firstPage', 'secondPage', '3rdPage','4thpage'],
                sectionsColor: ['#f2f2f2', '#4BBFC3', '#7BAABE', 'whitesmoke', '#000'],
                menu: '#menu'
            });


            $('#trigger_map').on('click', _.bind(function(ev){
                ev.preventDefault();
                this.controller.app.commands.execute('navigate:map',{url:'http://microservices.dev.workshare.com:9991'});


            },this));

        }

    });
});