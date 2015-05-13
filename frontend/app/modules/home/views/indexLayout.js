define(function (require){
    'use strict';

    var Marionette = require('marionette'),
        Backbone = require('backbone'),
        BackgroundView = require('./BackgroundView'),
        HomeView = require('./HomeView'),
        AboutView = require('./AboutView'),
        HowView = require('./HowView'),
        InputView = require('./InputView'),
        ContactsView = require('./ContactsView');

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
            backgroundRegion: '#background-region',
            homeRegion: '#home-region',
            aboutRegion: '#about-region',
            howRegion: '#how-region',
            inputRegion: '#input-region',
            contactsRegion: '#contacts-region'
        },

        /** @private */
        ui: {
            map_canvas: '#map_canvas',
            msnoslogo: '.msnos-logo',
            submenu: '#submenu'
        },

        /** @private */
        events: {
            'click @ui.msnoslogo': '_clickLogo'
        },

        /** @private */
        initialize: function (options){
            this.controller = options.controller;

            this.backgroundView = new BackgroundView();
            this.homeView = new HomeView();
            this.aboutView = new AboutView();
            this.howView = new HowView();
            this.inputView = new InputView();
            this.contactsView = new ContactsView();
        },

        /** @private */
        onShow: function (){
            this.backgroundRegion.show(this.backgroundView);
            this.homeRegion.show(this.homeView);
            this.aboutRegion.show(this.aboutView);
            this.howRegion.show(this.howView);
            this.inputRegion.show(this.inputView);
            this.contactsRegion.show(this.contactsView);

            this._initFullPage();

            var hashToLoad = Backbone.history.getFragment().split('/');
            $.fn.fullpage.silentMoveTo(hashToLoad[0], hashToLoad[1]);
        },

        onRender: function (){
        },

        onBeforeDestroy: function (){
            $.fn.fullpage.destroy('all');
        },

        _clickLogo: function (ev){
            ev.preventDefault();
            $.fn.fullpage.silentMoveTo(1);
        },

        _initFullPage: function (){
            $('#fullpage').fullpage({
                anchors: ['home', 'about', 'how', 'visualization', 'contacts'],
                menu: '#menu',
                css3: true,
                scrollingSpeed: 1000,
                touchSensitivity: 15,
                responsive: 768

            });
        }

    });
});