'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Recruit = mongoose.model('Recruit'),
    config = require('meanio').loadConfig(),
    _ = require('lodash');

module.exports = function(Recruits) {

    return {
        /**
         * Find a recruit by id
         */
        findById: function(req, res, next) {
            Recruit.findOne({ _id: req.params.recruitId})
            .exec(function(err, recruit) {
                if (err) return next(err);
                if (!recruit) return next(new Error('Failed to load recruit ' + recruitId));
                res.json(recruit).status(200);
            });
        },

        /**
         * Get a list of recruits
         */
        findByParameters: function(req, res, next) {
            var params =
            //TODO -- search by parameters --- return entire list for now.
            Recruit.find()
            .sort([ ['graduationClass', 1], ['name', -1] ])
            .exec(function(err, recruits){
                if (err) {
                    return res.status(500).json({
                        error: 'An error occurred trying to retrieve a list of recruits.'
                    });
                }

                res.json(recruits).status(200);
            });
        },


        /**
         * Create an article
         */
        create: function(req, res, next) {
            var recruit = new Recruit(req.body);

            recruit.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'An error occurred trying to create this recruit.',
                        err: err
                    });
                }
                res.json(recruit).status(200);
                next();
            });
        },

        /**
         * Update an article
         */
        update: function(req, res, next) {

            var recruitId = req.params.recruitId;
            var recruit = new Recruit(req.body);
            delete recruit._id;

            if (!recruitId) {
                return res.status(400).json({
                    error: 'A valid recruit id is required.'
                });
            }


            Recruit.findOneAndUpdate({_id: recruitId}, recruit, null, function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'An error occurred trying to update this recruit.',
                        err: err
                    });
                }

                res.json(recruit).status(200);
                next();
            });
        }
    };
}