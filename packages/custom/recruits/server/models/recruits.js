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

  birthDate: {
    type: Date
  },

  position: {
    type: String
  },

  graduationClass: {
    type: Number
  },

  mothersName: {},
  fathersName: {},
  coachesName: {},


});


/**
 * Virtuals
 */
RecruitSchema.virtual('heightFeet').get(function() {
  return Math.floor(this.height / 12);
});

RecruitSchema.virtual('heightInches').get(function() {
  return Math.floor(this.height - (this.heightFeet * 12));
});


/**
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
    obj.heightFeet = this.heightFeet;
    obj.heightInches = this.heightInches;
    return obj;
  }
};

mongoose.model('Recruit', RecruitSchema);

