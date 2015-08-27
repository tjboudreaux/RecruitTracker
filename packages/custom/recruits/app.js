'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Recruits = new Module('recruits');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Recruits.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Recruits.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Recruits.menus.add({
    title: 'View Recruits',
    link: 'View Recruits',
    roles: ['authenticated'],
    menu: 'main'
  });

  Recruits.aggregateAsset('css', 'recruits.css');

  return Recruits;
});
