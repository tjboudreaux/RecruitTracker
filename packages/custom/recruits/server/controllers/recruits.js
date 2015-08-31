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
        findById: function(req, res, next, id) {
            Recruit.load(id, function(err, recruit) {
                if (err) return next(err);
                if (!recruit) return next(new Error('Failed to load recruit ' + id));
                req.recruit = recruit;
                next();
            });
        },

        /**
         * Get a list of recruits
         */
        findByParameters: function(req, res) {
            //TODO -- search by parameters --- return entire list for now.
            Recruit.find()
            .exec(function(err, recruits){
                if (err) {
                    return res.status(500).json({
                        error: 'An error occurred trying to retrieve a list of recruits.'
                    });
                }

                res.json(recruits);
            });
        },


        /**
         * Create an article
         */
        create: function(req, res) {
            var recruit = new Recruit(req.body);

            recruit.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'An error occurred trying to create this recruit.'
                    });
                }

                Recruit.events.publish({
                    action: 'created',
                    user: {
                        name: req.user.name
                    },
                    url: config.hostname + '/articles/' + article._id,
                    name: article.title
                });

                res.json(recruit);
            });
        },

        /**
         * Update an article
         */
        update: function(req, res) {
            var article = req.article;

            article = _.extend(article, req.body);


            article.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the article'
                    });
                }

                Articles.events.publish({
                    action: 'updated',
                    user: {
                        name: req.user.name
                    },
                    name: article.title,
                    url: config.hostname + '/articles/' + article._id
                });

                res.json(article);
            });
        }
    };
}