/* jshint -W079 */
/* Related to https://github.com/linnovate/mean/issues/898 */
'use strict';


/**
 * Module dependencies.
 */
var expect = require('expect.js'),
    mongoose = require('mongoose'),
    Recruit = mongoose.model('Recruit');

/**
 * Globals
 */
var recruit1, recruit2;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
    describe('Model Recruit:', function() {

        before(function(done) {
            recruit1 = {
                name: 'Glenn Logan',
                height: '72',
                weight: '300',
                benchPress: '365',
                squat: '465',
                deadlift: '505',
                powerClean: '285',
                birthDate: '2000-01-01',
                position: 'DE',
                graduationClass: '2016'
            };

            recruit2 = {
                name: 'Rashard Lawrence',
            };

            done();
        });

        describe('Method Save', function() {
            it('should save successfully', function(done){
                done();
            });
        });
    });
});
