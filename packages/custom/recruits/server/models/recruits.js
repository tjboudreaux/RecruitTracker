'use strict';

/**
 * Module dependencies.
 */
var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema,
    crypto    = require('crypto'),
          _   = require('lodash');
/**
 * User Schema
 */
var RecruitSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  height: {
    type:Number,
    required: true,
    max: 120 /** No football reecruit will ever be 10ft tall **/
  },

  weight: {
    type: Number,
    required: true,
    max: 500, /** Highly likely no football player will weigh 500 lbs **/
  },

  benchPress: {
    type: Number
  },

  squat: {
    type: Number
  },

  powerClean: {
    type: Number

  },

  dateOfBirth: {
    type: Date
  },

  position: {
    type: String
  },

  graduationClass: {
    type: Number,
    required: true
  },

  mothersName: {},
  fathersName: {},
  coachesName: {},


});

/**
 * Virtuals
 */
RecruitSchema.virtual('heightFeet').set(function(height) {
  this._heightFeet = Math.floor(height / 12);
}).get(function() {
  return this._heightFeet;
});

RecruitSchema.virtual('heightInches').set(function(height) {
  this._heightFeet = Math.floor(height / 12);
  this._heightInches = Math.floor(height - (this._heightFeet * 12));
}).get(function() {
  return this._heightInches;
});

/**
 * Methods
 */
RecruitSchema.methods = {
  /**
   * Hide security sensitive fields
   *
   * @returns {*|Array|Binary|Object}
   */
  toJSON: function() {
    var obj = this.toObject();
    return obj;
  }
};

mongoose.model('Recruit', RecruitSchema);

