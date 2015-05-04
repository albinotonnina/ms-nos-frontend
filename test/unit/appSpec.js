define(function (require) {
    'use strict';

    var app = require('app');
    var Marionette = require('marionette');

    /** @type MockFactory */
    var mockFactory = require('mockFactory');

    describe('app', function () {
        before(function() {
        });

        after(function() {
        });

        beforeEach(function() {
        });

        afterEach(function() {
        });


        it('is an instance of marionette.application', function () {
            expect(app instanceof Marionette.Application).to.be.equal(true);
        });

    });

});